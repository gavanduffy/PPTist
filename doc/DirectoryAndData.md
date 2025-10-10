## Project Structure and Data Model

### Project Directory Structure
```
├── assets                        // Static assets
│   ├── fonts                     // Hosted fonts
│   └── styles                    // Stylesheets
│       ├── antd.scss             // Overrides for default Ant Design styles
│       ├── font.scss             // Online font definitions
│       ├── global.scss           // Global shared styles
│       ├── mixin.scss            // Global SCSS mixins
│       ├── variable.scss         // Global SCSS variables
│       └── prosemirror.scss      // Default ProseMirror rich-text styles
├── components                    // Generic components without business logic
├── configs                       // Configuration such as canvas size, fonts, animation settings, shortcuts, preset shapes, preset lines, etc.
├── hooks                         // Hooks shared across components (modules)
├── mocks                         // Mock data
├── plugins                       // Custom Vue plugins
├── services                      // API helpers
├── types                         // Type definitions
├── store                         // Pinia stores, see https://pinia.vuejs.org/
├── utils                         // General utilities
└── views                         // Feature components split into `Editor` and `Player`
    ├── components                // Shared feature components
    ├── Editor                    // Editor module
    ├── Screen                    // Player module
    └── Mobile                    // Mobile module
```

### Data
Slide data primarily lives in `src/store/slides.ts`.
> In production you typically persist part of the state from this file to a database.

Key fields include:
- `title`: slide deck title / filename
- `slides`: slide pages, including each page’s ID, element content, notes, background, animations, transition mode, and more
- `theme`: theme settings such as background color, theme color, font color, and fonts
- `viewportSize`: base viewport width (default 1000, which equals a 1000 × 562.5 canvas)
- `viewportRatio`: viewport aspect ratio (width:height), default 16:9
- `templates`: slide templates

See the [complete type definitions](https://github.com/pipipi-pikachu/PPTist/blob/master/src/types/slides.ts) for details.