Tailwind Prefixer

Reliable Utility Class Scoping for VS Code

This extension enables fast, accurate, whole-file prefixing of Tailwind CSS utility classes (e.g., changing flex to ts-flex). Unlike simple regex tools, it uses Abstract Syntax Tree (AST) parsing to safely and reliably transform classes in complex modern files (JS, JSX, TS, TSX, cva, cn). It ensures 100% accuracy, maintaining code structure and preserving all CSS variants.

✨ Key Features

AST Reliability: Guarantees accurate replacement in complex frameworks like React and Svelte.

Variant Preservation: Correctly prefixes the utility while preserving variants (md:hover:bg-red-500 becomes md:hover:ts-bg-red-500).

CVA/CN Support: Transforms classes within class-variance-authority and clsx/classnames functions.

Configuration Ignored: Smartly skips variant names in defaultVariants object properties.

🛠 How to Use It

Open File: Open the JS, JSX, TS, or TSX file containing the Tailwind classes.

Run Command: Open the VS Code Command Palette (Ctrl/Cmd + Shift + P).

Execute: Type and select "Tailwind Prefixer: Apply Prefix to File".

Enter Prefix: Enter your desired prefix (e.g., ts-, app-) and press Enter.

The utility classes in the active file will be instantly and correctly updated.

License

This project is licensed under the MIT License.
