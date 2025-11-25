const vscode = require('vscode');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

/**
 * Check if a string looks like it contains Tailwind classes
 * @param {string} str The string to check
 * @returns {boolean} True if it looks like Tailwind classes
 */
function looksLikeTailwindClasses(str) {
	if (!str || typeof str !== 'string') return false;

	// Trim the string
	const trimmed = str.trim();

	// Empty or very short strings are unlikely to be Tailwind classes
	if (trimmed.length < 2) return false;

	// Split into individual tokens
	const tokens = trimmed.split(/\s+/);

	// Check if at least one token looks like a Tailwind class
	// A token looks like Tailwind if it has a hyphen (bg-red-500) or colon (hover:)
	const hasAtLeastOneTailwindToken = tokens.some((token) => {
		// Remove variants to get the base utility
		const parts = token.split(':');
		const utility = parts[parts.length - 1];

		// Check if the utility part looks like Tailwind
		// Tailwind utilities typically have hyphens or are known single-word utilities
		return (
			utility.includes('-') ||
			utility.includes('[') || // Added check for arbitrary values
			[
				'flex',
				'grid',
				'block',
				'hidden',
				'inline',
				'absolute',
				'relative',
				'fixed',
				'sticky',
				'static',
				'container',
			].includes(utility)
		);
	});

	if (!hasAtLeastOneTailwindToken) return false;

	// Additional check: if it has more than 5 tokens without any hyphens/colons,
	// it's probably not class names (likely a sentence)
	const tokensWithoutTailwindPattern = tokens.filter((t) => !t.includes('-') && !t.includes(':'));
	if (tokensWithoutTailwindPattern.length > 5) return false;

	return true;
}

/**
 * Check if a class name is a known Tailwind utility class
 * @param {string} className The class name to check (without prefix or variants)
 * @returns {boolean} True if it's a known Tailwind class
 */
function isTailwindClass(className) {
	// Remove negative prefix if present
	const baseClass = className.startsWith('-') ? className.substring(1) : className;

	// Common Tailwind prefixes and utilities
	const tailwindPrefixes = [
		// Layout
		'container',
		'box-',
		'block',
		'inline-block',
		'inline',
		'flex',
		'inline-flex',
		'table',
		'inline-table',
		'table-caption',
		'table-cell',
		'table-column',
		'table-column-group',
		'table-footer-group',
		'table-header-group',
		'table-row-group',
		'table-row',
		'flow-root',
		'grid',
		'inline-grid',
		'contents',
		'list-item',
		'hidden',

		// Flexbox & Grid
		'basis-',
		'flex-',
		'grow',
		'grow-',
		'shrink',
		'shrink-',
		'order-',
		'grid-cols-',
		'grid-rows-',
		'auto-cols-',
		'auto-rows-',
		'gap-',
		'gap-x-',
		'gap-y-',
		'justify-',
		'justify-items-',
		'justify-self-',
		'content-',
		'items-',
		'self-',
		'place-content-',
		'place-items-',
		'place-self-',

		// Spacing
		'p-',
		'px-',
		'py-',
		'pt-',
		'pr-',
		'pb-',
		'pl-',
		'ps-',
		'pe-',
		'm-',
		'mx-',
		'my-',
		'mt-',
		'mr-',
		'mb-',
		'ml-',
		'ms-',
		'me-',
		'space-x-',
		'space-y-',

		// Sizing
		'w-',
		'min-w-',
		'max-w-',
		'h-',
		'min-h-',
		'max-h-',
		'size-',

		// Typography
		'text-',
		'font-',
		'leading-',
		'tracking-',
		'line-clamp-',
		'antialiased',
		'subpixel-antialiased',
		'italic',
		'not-italic',
		'underline',
		'overline',
		'line-through',
		'no-underline',
		'uppercase',
		'lowercase',
		'capitalize',
		'normal-case',
		'truncate',
		'text-ellipsis',
		'text-clip',
		'break-normal',
		'break-words',
		'break-all',
		'break-keep',

		// Backgrounds
		'bg-',
		'from-',
		'via-',
		'to-',

		// Borders
		'border',
		'border-',
		'rounded',
		'rounded-',
		'ring-',
		'ring-offset-',
		'divide-',
		'outline-',

		// Effects
		'shadow',
		'shadow-',
		'opacity-',
		'mix-blend-',
		'bg-blend-',

		// Filters
		'blur-',
		'brightness-',
		'contrast-',
		'grayscale',
		'hue-rotate-',
		'invert',
		'saturate-',
		'sepia',
		'backdrop-blur-',
		'backdrop-brightness-',
		'backdrop-contrast-',
		'backdrop-grayscale',
		'backdrop-hue-rotate-',
		'backdrop-invert',
		'backdrop-opacity-',
		'backdrop-saturate-',
		'backdrop-sepia',

		// Tables
		'border-collapse',
		'border-separate',
		'table-auto',
		'table-fixed',

		// Transitions & Animation
		'transition', // Keep 'transition' as a base utility
		'transition-',
		'duration-',
		'ease-',
		'delay-',
		'animate-',

		// Transforms
		'scale-',
		'rotate-',
		'translate-',
		'skew-',
		'origin-',
		'transform',
		'transform-gpu',
		'transform-none',

		// Interactivity
		'cursor-',
		'pointer-events-',
		'resize',
		'resize-',
		'select-',
		'scroll-',
		'snap-',
		'touch-',
		'will-change-',

		// SVG
		'fill-',
		'stroke-',
		'stroke-w-',

		// Accessibility
		'sr-only',
		'not-sr-only',

		// Position
		'static',
		'fixed',
		'absolute',
		'relative',
		'sticky',
		'inset-',
		'top-',
		'right-',
		'bottom-',
		'left-',
		'start-',
		'end-',
		'z-',

		// Overflow
		'overflow-',
		'overscroll-',

		// Display
		'visible',
		'invisible',
		'collapse',

		// Other
		'object-',
		'aspect-',
		'columns-',
		'break-',
		'decoration-',
		'underline-offset-',
		'accent-',
		'appearance-',
		'caret-',
		'list-',
		'placeholder-',
	];

	// Check if the class starts with any known Tailwind prefix
	return tailwindPrefixes.some((prefix) => baseClass.startsWith(prefix)) || tailwindPrefixes.includes(baseClass);
}

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

		// Find the index of the last colon to separate variants from the utility
		const lastColonIndex = cls.lastIndexOf(':');

		let utilityPart;
		let variantPart = '';

		if (lastColonIndex === -1) {
			// Case 1: Simple utility (e.g., 'flex')
			utilityPart = cls;
		} else {
			// Case 2: Utility with variants (e.g., 'md:hover:bg-red-500')
			variantPart = cls.substring(0, lastColonIndex + 1);
			utilityPart = cls.substring(lastColonIndex + 1);
		}

		// --- NEW LOGIC: Handle Arbitrary Utility Values (e.g., transition-[...], bg-[#fff]) ---
		if (utilityPart.includes('[') && utilityPart.endsWith(']')) {
			const bracketIndex = utilityPart.indexOf('[');

			// This is not a utility if the bracket is the very first character (e.g., arbitrary variant [a&]:)
			if (bracketIndex === 0) {
				return cls;
			}

			const baseUtility = utilityPart.substring(0, bracketIndex); // e.g., 'transition', 'bg'
			const arbitraryValue = utilityPart.substring(bracketIndex); // e.g., '[color,box-shadow]', '[#fff]'

			// 1. Check if the base name is a known Tailwind utility (e.g., 'transition', 'bg')
			if (!isTailwindClass(baseUtility)) {
				return cls; // Not a recognized Tailwind utility base, skip
			}

			// 2. Apply prefix to the base utility name
			let prefixedBaseUtility;
			if (baseUtility.startsWith('-')) {
				prefixedBaseUtility = `-${prefix}${baseUtility.substring(1)}`;
			} else {
				prefixedBaseUtility = prefix + baseUtility;
			}

			// 3. Reassemble: variant + prefixedBase + arbitraryValue
			return variantPart + prefixedBaseUtility + arbitraryValue;
		}
		// --- END NEW LOGIC ---

		// Check if this is actually a Tailwind class (Standard utility check, e.g., 'flex' or 'bg-red-500')
		if (!isTailwindClass(utilityPart)) {
			// Not a Tailwind class, leave it unchanged
			return cls;
		}

		// Apply prefix for standard utilities
		if (utilityPart.startsWith('-')) {
			return variantPart + `-${prefix}${utilityPart.substring(1)}`;
		}

		return variantPart + prefix + utilityPart;
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
		const fileName = document.fileName;
		let ast;

		// Determine file type for appropriate parsing
		const fileExtension = fileName.split('.').pop().toLowerCase();
		const isTSX = fileExtension === 'tsx' || fileExtension === 'jsx';
		const isTS = fileExtension === 'ts' || fileExtension === 'tsx';

		try {
			const plugins = [
				'objectRestSpread',
				'classProperties',
				'optionalChaining',
				'nullishCoalescing',
				'dynamicImport',
				'exportDefaultFrom',
				'classPrivateProperties',
				'logicalAssignment',
				'topLevelAwait',
				'numericSeparator',
				'optionalCatchBinding',
			];

			if (fileExtension === 'tsx') {
				plugins.unshift(['typescript', { isTSX: true }], 'jsx');
			} else if (fileExtension === 'ts') {
				plugins.unshift('typescript');
			} else if (fileExtension === 'jsx') {
				plugins.unshift('jsx');
			} else if (fileExtension === 'js') {
				plugins.unshift('jsx');
			}

			// Parse the document
			ast = parser.parse(fullText, {
				sourceType: 'module',
				plugins: plugins,
			});
		} catch (e) {
			vscode.window.showErrorMessage(
				`Failed to parse file: ${e.message}\n\nPlease ensure the file contains valid ${
					isTS ? 'TypeScript' : 'JavaScript'
				} syntax.`,
			);
			console.error('Parser error:', e);
			return;
		}

		let replacementsMade = false;
		let processedCount = 0;

		// 2. Traverse the AST and find class strings
		traverse(ast, {
			// --- Handler for JS/TS Code (cva, cn, object properties) ---
			StringLiteral(path) {
				const node = path.node;
				const parent = path.parent;

				if (!parent) return;

				// Check if string literal is inside a function call (cva, cn, or similar)
				const isCvaCnArg =
					parent.type === 'CallExpression' &&
					parent.callee &&
					(parent.callee.name === 'cva' || parent.callee.name === 'cn');

				// Check if string is a value in an object property (like statusColor object)
				const isObjectPropertyValue = parent.type === 'ObjectProperty' && parent.value === node;

				// Process if it's in cva/cn OR if it's an object property value that looks like classes
				if (isCvaCnArg || isObjectPropertyValue) {
					const classString = node.value;

					// Only process if it looks like Tailwind classes
					const looksTailwind = looksLikeTailwindClasses(classString);

					if (looksTailwind) {
						processedCount++;
						const newClassString = applyPrefix(classString, prefix);

						if (newClassString !== classString) {
							node.value = newClassString;
							replacementsMade = true;
						}
					}
				}
			},

			// --- Handler for JSX Attributes (className) ---
			JSXAttribute(path) {
				if (path.node.name.name === 'className' || path.node.name.name === 'class') {
					const valueNode = path.node.value;

					if (valueNode && valueNode.type === 'StringLiteral') {
						const classString = valueNode.value;
						const newClassString = applyPrefix(classString, prefix);

						if (newClassString !== classString) {
							valueNode.value = newClassString;
							replacementsMade = true;
							processedCount++;
						}
					}
				}
			},
		});

		// 3. If replacements were made, generate the new code and apply the edit
		if (replacementsMade) {
			const output = generate(ast, {
				retainLines: false,
				comments: true,
				compact: false,
			});

			const newText = output.code;

			await editor.edit((editBuilder) => {
				const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
				editBuilder.replace(fullRange, newText);
			});

			vscode.window.showInformationMessage(
				`Successfully applied '${prefix}' prefix to ${processedCount} Tailwind class string(s)!`,
			);
		} else {
			vscode.window.showInformationMessage('No un-prefixed Tailwind class strings found.');
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
