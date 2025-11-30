/**
 * Comprehensive list of all Tailwind CSS utility class prefixes
 * This list includes all standard Tailwind utility classes to ensure
 * proper detection and prefixing of Tailwind classes.
 */
const tailwindClassPrefixes = [
	// Layout - Container & Box Sizing
	'container',
	'box-',
	// Layout - Display
	'block',
	'inline-block',
	'inline',
	'flex',
	'inline-flex',
	'grid',
	'inline-grid',
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
	'contents',
	'list-item',
	'hidden',
	// Layout - Position
	'static',
	'fixed',
	'absolute',
	'relative',
	'sticky',
	// Layout - Position Values
	'inset-',
	'top-',
	'right-',
	'bottom-',
	'left-',
	'start-',
	'end-',
	// Layout - Z-Index
	'z-',
	// Layout - Float
	'float-',
	'clear-',
	// Layout - Object Fit
	'object-',
	// Layout - Overflow
	'overflow-',
	'overscroll-',
	// Layout - Visibility
	'visible',
	'invisible',
	'collapse',
	// Flexbox & Grid
	'basis-',
	'flex-',
	'flex-col',
	'flex-row',
	'flex-wrap',
	'flex-nowrap',
	'flex-wrap-reverse',
	'grow',
	'shrink',
	'order-',
	'gap-',
	'gap-x-',
	'gap-y-',
	'justify-',
	'justify-items-',
	'justify-self-',
	'items-',
	'content-',
	'self-',
	'place-',
	'place-items-',
	'place-content-',
	'place-self-',
	// Spacing - Margin
	'm-',
	'mt',
	'mb',
	'ml',
	'mr',
	'mx',
	'my',
	'ms',
	'me',
	'mt-',
	'mb-',
	'ml-',
	'mr-',
	'mx-',
	'my-',
	'ms-',
	'me-',
	// Spacing - Padding
	'p-',
	'pt',
	'pb',
	'pl',
	'pr',
	'px',
	'py',
	'ps',
	'pe',
	'pt-',
	'pb-',
	'pl-',
	'pr-',
	'px-',
	'py-',
	'ps-',
	'pe-',
	// Spacing - Space Between
	'space-x-',
	'space-y-',
	'space-x-reverse',
	'space-y-reverse',
	// Sizing - Width
	'w-',
	'min-w-',
	'max-w-',
	// Sizing - Height
	'h-',
	'min-h-',
	'max-h-',
	// Sizing - Size
	'size-',
	// Typography - Font Family
	'font-',
	// Typography - Font Size
	'text-',
	// Typography - Font Smoothing
	'antialiased',
	'subpixel-antialiased',
	// Typography - Font Style
	'italic',
	'not-italic',
	// Typography - Font Weight
	'font-',
	// Typography - Font Variant Numeric
	'normal-nums',
	'ordinal',
	'slashed-zero',
	'lining-nums',
	'oldstyle-nums',
	'proportional-nums',
	'tabular-nums',
	'diagonal-fractions',
	'stacked-fractions',
	// Typography - Letter Spacing
	'tracking-',
	// Typography - Line Height
	'leading-',
	// Typography - List Style Type
	'list-',
	// Typography - List Style Position
	'list-',
	// Typography - Text Align
	'text-',
	// Typography - Text Color
	'text-',
	// Typography - Text Decoration
	'underline',
	'overline',
	'line-through',
	'no-underline',
	'decoration-',
	'underline-offset-',
	// Typography - Text Decoration Color
	'decoration-',
	// Typography - Text Decoration Style
	'decoration-',
	// Typography - Text Decoration Thickness
	'decoration-',
	// Typography - Text Underline Offset
	'underline-offset-',
	// Typography - Text Transform
	'uppercase',
	'lowercase',
	'capitalize',
	'normal-case',
	// Typography - Text Overflow
	'truncate',
	'text-ellipsis',
	'text-clip',
	// Typography - Text Indent
	'indent-',
	// Typography - Vertical Align
	'align-',
	// Typography - Whitespace
	'whitespace-',
	// Typography - Word Break
	'break-',
	// Typography - Line Clamp
	'line-clamp-',
	// Typography - Content
	'content-',
	// Backgrounds - Background Attachment
	'bg-',
	// Backgrounds - Background Clip
	'bg-clip-',
	// Backgrounds - Background Color
	'bg-',
	// Backgrounds - Background Origin
	'bg-origin-',
	// Backgrounds - Background Position
	'bg-',
	// Backgrounds - Background Repeat
	'bg-repeat-',
	// Backgrounds - Background Size
	'bg-',
	// Backgrounds - Background Image
	'bg-',
	// Backgrounds - Gradient Color Stops
	'from-',
	'via-',
	'to-',
	// Borders - Border Radius
	'rounded',
	'rounded-',
	'rounded-t',
	'rounded-r',
	'rounded-b',
	'rounded-l',
	'rounded-tl',
	'rounded-tr',
	'rounded-br',
	'rounded-bl',
	'rounded-ss',
	'rounded-se',
	'rounded-ee',
	'rounded-es',
	'rounded-t-',
	'rounded-r-',
	'rounded-b-',
	'rounded-l-',
	'rounded-tl-',
	'rounded-tr-',
	'rounded-br-',
	'rounded-bl-',
	'rounded-ss-',
	'rounded-se-',
	'rounded-ee-',
	'rounded-es-',
	// Borders - Border Width
	'border',
	'border-',
	'border-t',
	'border-r',
	'border-b',
	'border-l',
	'border-x',
	'border-y',
	'border-s',
	'border-e',
	'border-t-',
	'border-r-',
	'border-b-',
	'border-l-',
	'border-x-',
	'border-y-',
	'border-s-',
	'border-e-',
	// Borders - Border Color
	'border-',
	// Borders - Border Style
	'border-',
	// Borders - Divide Width
	'divide-',
	'divide-x',
	'divide-y',
	'divide-x-',
	'divide-y-',
	'divide-x-reverse',
	'divide-y-reverse',
	// Borders - Divide Color
	'divide-',
	// Borders - Divide Style
	'divide-',
	// Borders - Outline Width
	'outline-',
	// Borders - Outline Color
	'outline-',
	// Borders - Outline Style
	'outline-',
	// Borders - Outline Offset
	'outline-offset-',
	// Borders - Ring Width
	'ring',
	'ring-',
	'ring-inset',
	// Borders - Ring Color
	'ring-',
	// Borders - Ring Offset Width
	'ring-offset-',
	// Borders - Ring Offset Color
	'ring-offset-',
	// Effects - Box Shadow
	'shadow',
	'shadow-',
	// Effects - Opacity
	'opacity-',
	// Effects - Mix Blend Mode
	'mix-blend-',
	// Effects - Background Blend Mode
	'bg-blend-',
	// Filters - Blur
	'blur-',
	// Filters - Brightness
	'brightness-',
	// Filters - Contrast
	'contrast-',
	// Filters - Drop Shadow
	'drop-shadow-',
	// Filters - Grayscale
	'grayscale',
	'grayscale-',
	// Filters - Hue Rotate
	'hue-rotate-',
	// Filters - Invert
	'invert',
	'invert-',
	// Filters - Saturate
	'saturate-',
	// Filters - Sepia
	'sepia',
	'sepia-',
	// Filters - Backdrop Blur
	'backdrop-blur-',
	// Filters - Backdrop Brightness
	'backdrop-brightness-',
	// Filters - Backdrop Contrast
	'backdrop-contrast-',
	// Filters - Backdrop Grayscale
	'backdrop-grayscale',
	'backdrop-grayscale-',
	// Filters - Backdrop Hue Rotate
	'backdrop-hue-rotate-',
	// Filters - Backdrop Invert
	'backdrop-invert',
	'backdrop-invert-',
	// Filters - Backdrop Opacity
	'backdrop-opacity-',
	// Filters - Backdrop Saturate
	'backdrop-saturate-',
	// Filters - Backdrop Sepia
	'backdrop-sepia',
	'backdrop-sepia-',
	// Tables - Border Collapse
	'border-collapse',
	'border-separate',
	// Tables - Border Spacing
	'border-spacing-',
	'border-spacing-x-',
	'border-spacing-y-',
	// Tables - Table Layout
	'table-auto',
	'table-fixed',
	// Transitions & Animation - Transition Property
	'transition',
	'transition-',
	// Transitions & Animation - Transition Duration
	'duration-',
	// Transitions & Animation - Transition Timing Function
	'ease-',
	// Transitions & Animation - Transition Delay
	'delay-',
	// Transitions & Animation - Animation
	'animate-',
	// Transforms - Transform
	'transform',
	'transform-gpu',
	'transform-cpu',
	// Transforms - Scale
	'scale-',
	'scale-x-',
	'scale-y-',
	// Transforms - Rotate
	'rotate-',
	'-rotate-',
	// Transforms - Translate
	'translate-x-',
	'translate-y-',
	'-translate-x-',
	'-translate-y-',
	// Transforms - Skew
	'skew-x-',
	'skew-y-',
	'-skew-x-',
	'-skew-y-',
	// Transforms - Transform Origin
	'origin-',
	// Interactivity - Accent Color
	'accent-',
	// Interactivity - Appearance
	'appearance-',
	// Interactivity - Cursor
	'cursor-',
	// Interactivity - Caret Color
	'caret-',
	// Interactivity - Pointer Events
	'pointer-events-',
	// Interactivity - Resize
	'resize',
	'resize-',
	// Interactivity - Scroll Behavior
	'scroll-',
	'scroll-auto',
	'scroll-smooth',
	// Interactivity - Scroll Margin
	'scroll-m-',
	'scroll-mt-',
	'scroll-mr-',
	'scroll-mb-',
	'scroll-ml-',
	'scroll-mx-',
	'scroll-my-',
	'scroll-ms-',
	'scroll-me-',
	// Interactivity - Scroll Padding
	'scroll-p-',
	'scroll-pt-',
	'scroll-pr-',
	'scroll-pb-',
	'scroll-pl-',
	'scroll-px-',
	'scroll-py-',
	'scroll-ps-',
	'scroll-pe-',
	// Interactivity - Scroll Snap Align
	'snap-',
	'snap-start',
	'snap-end',
	'snap-center',
	'snap-align-none',
	// Interactivity - Scroll Snap Stop
	'snap-',
	'snap-normal',
	'snap-always',
	// Interactivity - Scroll Snap Type
	'snap-',
	'snap-none',
	'snap-x',
	'snap-y',
	'snap-both',
	'snap-mandatory',
	'snap-proximity',
	// Interactivity - Touch Action
	'touch-',
	'touch-auto',
	'touch-none',
	'touch-pan-x',
	'touch-pan-left',
	'touch-pan-right',
	'touch-pan-y',
	'touch-pan-up',
	'touch-pan-down',
	'touch-pinch-zoom',
	'touch-manipulation',
	// Interactivity - User Select
	'select-',
	'select-none',
	'select-text',
	'select-all',
	'select-auto',
	// Interactivity - Will Change
	'will-change-',
	// SVG - Fill
	'fill-',
	// SVG - Stroke
	'stroke-',
	// SVG - Stroke Width
	'stroke-',
	// Accessibility - Screen Readers
	'sr-only',
	'not-sr-only',
];

module.exports = tailwindClassPrefixes;
