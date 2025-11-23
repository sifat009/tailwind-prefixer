const vscode = require('vscode');

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const recast = require('recast');

/**
 * The core logic to prefix Tailwind classes while correctly handling variants and complex syntax.
 * @param {string} classNameString The raw string of Tailwind classes.
 * @param {string} prefix The custom prefix to apply (e.g., 'ts-').
 * @returns {string} The prefixed class string.
 */
function applyPrefix(classNameString, prefix) {
	if (!classNameString) return '';

	// Split the string into individual classes/tokens, filtering out empty strings.
	const classes = classNameString
		.trim()
		.split(/\s+/)
		.filter((c) => c.length > 0);

	const prefixedClasses = classes.map((cls) => {
		// Optimization: Check if the class is already correctly prefixed.
		if (cls.startsWith(prefix) || cls.includes(':' + prefix)) {
			return cls;
		}

		// --- Ignore Arbitrary Values ---
		if (cls.includes('[') && cls.includes(']')) {
			// A basic check to skip complex arbitrary utility values like w-[200px]
			// We specifically allow arbitrary variants like [a&]:hover: utility to pass through
			if (!cls.includes(']:')) {
				return cls;
			}
		}

		// Find the index of the last colon to separate variants from the utility
		const lastColonIndex = cls.lastIndexOf(':');

		if (lastColonIndex === -1) {
			// Case 1: Simple utility (e.g., 'flex')
			if (cls.startsWith('-')) {
				return `-${prefix}${cls.substring(1)}`;
			}
			return prefix + cls;
		} else {
			// Case 2: Utility with variants (e.g., 'md:hover:bg-red-500')

			const variantPart = cls.substring(0, lastColonIndex + 1);
			const utilityPart = cls.substring(lastColonIndex + 1);

			if (utilityPart.startsWith('-')) {
				return variantPart + `-${prefix}${utilityPart.substring(1)}`;
			}

			return variantPart + prefix + utilityPart;
		}
	});

	return prefixedClasses.join(' ');
}

/**
 * Main activation function for the VS Code extension.
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('tailwindPrefixHelper.applyTsPrefix', async () => {
		const prefix = await vscode.window.showInputBox({
			prompt: 'Enter the Tailwind prefix you want to apply (e.g., ts-, custom-).',
			placeHolder: 'ts-',
			value: 'ts-',
			ignoreFocusOut: true,
			validateInput: (text) => (!text || text.trim() === '' ? 'Prefix cannot be empty.' : null),
		});

		if (!prefix) return;

		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showWarningMessage('No active text editor found.');
			return;
		}

		const document = editor.document;
		const fullText = document.getText();
		let ast;

		try {
			// 1. Parse the document content into an AST
			ast = recast.parse(fullText, {
				parser: {
					parse: (code) =>
						parser.parse(code, {
							sourceType: 'module',
							// Enable all relevant Babel plugins for modern JS/TS/React code
							plugins: ['jsx', 'typescript', 'objectRestSpread', 'classProperties', 'decorators-legacy'],
						}),
				},
			});
		} catch (e) {
			// Provide context about the parsing failure
			vscode.window.showErrorMessage(`AST Parsing Failed (Is this a valid JS/TS/JSX file?): ${e.message}`);
			return;
		}

		let replacementsMade = false;

		// 2. Traverse the AST and find class strings
		traverse(ast, {
			// --- Handler for JS/TS Code (cva, cn, object properties) ---
			StringLiteral(path) {
				const node = path.node;
				const parent = path.parent; // ObjectProperty (e.g., variant: 'default')
				const propertyNode = path.parentPath.parentPath.parent; // ObjectProperty (e.g., defaultVariants: { ... })

				// Check 1: Is the string literal a value in an object property (e.g., variant definitions)
				const isObjectPropertyValue = parent.type === 'ObjectProperty' && parent.value === node;

				// --- CRITICAL CHECK: Skip Variant Names in defaultVariants ---
				if (isObjectPropertyValue) {
					// We must check the containing ObjectProperty (propertyNode) to see if it's named 'defaultVariants'
					if (propertyNode && propertyNode.type === 'ObjectProperty' && propertyNode.key.name === 'defaultVariants') {
						// This StringLiteral is a variant name (e.g., 'default', 'small') inside defaultVariants, NOT a class string.
						return;
					}
				}

				// Check 2: Is the string literal inside a function call (cva, cn, or a utility function)
				const isCvaCnArg =
					parent.type === 'CallExpression' && (parent.callee.name === 'cva' || parent.callee.name === 'cn');

				// Check 3: Proceed if it's a class string
				if (isCvaCnArg || isObjectPropertyValue) {
					const classString = node.value;
					const newClassString = applyPrefix(classString, prefix);

					if (newClassString !== classString) {
						node.value = newClassString;
						replacementsMade = true;
					}
				}
			},

			// --- Handler for JSX Attributes (className) ---
			JSXAttribute(path) {
				if (path.node.name.name === 'className' || path.node.name.name === 'class') {
					const valueNode = path.node.value;

					if (valueNode && valueNode.type === 'StringLiteral') {
						// Case: className="flex bg-red-500"
						const classString = valueNode.value;
						const newClassString = applyPrefix(classString, prefix);

						if (newClassString !== classString) {
							valueNode.value = newClassString;
							replacementsMade = true;
						}
					}
				}
			},
		});

		// 3. If replacements were made, generate the new code and apply the edit.
		if (replacementsMade) {
			// Recast preserves formatting (whitespace, comments, etc.) much better than babel-generator
			const { code: newText } = recast.print(ast);

			editor
				.edit((editBuilder) => {
					const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
					editBuilder.replace(fullRange, newText);
				})
				.then((success) => {
					if (success) {
						vscode.window.showInformationMessage(
							`Successfully applied '${prefix}' prefix to Tailwind classes across the entire file.`,
						);
					} else {
						vscode.window.showErrorMessage('Failed to apply prefixes to the document.');
					}
				});
		} else {
			vscode.window.showInformationMessage('No un-prefixed Tailwind class strings found to replace.');
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
