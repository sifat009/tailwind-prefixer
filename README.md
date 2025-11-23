Tailwind Prefixer

The bulletproof VS Code extension for batch-prefixing Tailwind CSS utility classes across your entire file using the Abstract Syntax Tree (AST). Ensures variants (like hover:, md:, aria-invalid:) are preserved while only applying the prefix to the core utility class.

✨ Features

AST-Based Reliability: Unlike regex-based tools, this extension uses a Babel-powered AST parser (Recast) to structurally analyze your code, guaranteeing correct replacement in complex files (JSX, TypeScript, cva usage).

Variant Preservation: Correctly handles all Tailwind variants.

Input: md:hover:bg-red-500

Output (with prefix ts-): md:hover:ts-bg-red-500

cva and cn Support: Reliably transforms classes defined in class-variance-authority (cva) and clsx/classnames/cn utility function calls.

Interactive Prefix: Prompts the user for the prefix (e.g., ts-, custom-) every time the command is run.

Whole-File Operation: Processes the entire active file with a single command.

🚀 Usage

Open the file containing the Tailwind classes you wish to prefix.

Open the Command Palette (Ctrl/Cmd + Shift + P).

Type and select "Tailwind Prefixer: Apply Prefix to File".

Enter the prefix you want (e.g., ts- or project-) and press Enter.

The utility classes in the active file will be instantly updated.

🛠 Installation

You can install this extension directly from the VS Code Marketplace.

📦 Building and Publishing

To build this extension locally, ensure you have Node.js and the dependencies installed:

# Install required AST and bundling dependencies

npm install @babel/parser @babel/traverse @babel/generator recast webpack webpack-cli ts-loader @types/webpack vsce

# Run the build script to bundle extension.js into dist/extension.js

npm run vscode:prepublish

To publish, use the vsce tool after setting up your publisher ID:

# Log in with your publisher ID and PAT

vsce login YOUR-PUBLISHER-ID

# Publish to the Marketplace

vsce publish
