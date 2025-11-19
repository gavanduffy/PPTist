## Project Directory and Data Structure

### Project catalogue structure
```
├── assets                        // Static resources
│   ├── fonts                     // Online font files
│   └── styles                    // Styles
│       ├── antd.scss             // antdDefault Style Overwrite
│       ├── font.scss             // Online font definition
│       ├── global.scss           // Universal Global Styles
│       ├── mixin.scss            // scssGlobal blending
│       ├── variable.scss         // scssGlobal variable
│       └── prosemirror.scss      // ProseMirror Rich Text Default Style
├── components                    // General components not related to business logic
├── configs                       // Profile，Like：Script size、Fonts、Animation Configuration、Shortcut Configuration、Preset Shapes、Prearrange data such as lines。
├── hooks                         // For multiple components（Modules）Use hooks Methodology
├── mocks                         // mocks Data
├── plugins                       // Custom Vue Plugins
├── services                      // APIMethodology
├── types                         // Type Definition File
├── store                         // Pinia store，References：https://pinia.vuejs.org/
├── utils                         // Common tool methodology
└── views                         // Directory of operational components，Split `Editor` and `Player` Two parts。
    ├── components                // Operational components for public use
    ├── Editor                    // Editor Module
    ├── Screen                    // Player Module
    └── Mobile                    // Mobile End Module
```


### Data
The data on the slides is stored mainly in `src/store/slides.ts` Medium。
> In other words,，In the actual production environment，General need to include this documentstateData in %1（Part）Save to Database。

Including：
- `title` Slide Title/Filename
- `slides` Slide Page Data，Including each page.ID、Element Contents、Remarks、Background、Animation、Can not open message
- `theme` Slide Theme Data，Include background colours、Theme Color、Font Colour、Information such as fonts
- `viewportSize` Slide Viewable Area Width Base（Default1000，i.e.,1000×562.5The canvas.）
- `viewportRatio` Slide View Area Scale（Kuan.:High），Default16:9
- `templates` Slide Template

Specific types of definitions are visible：[Complete data type definition](https://github.com/pipipi-pikachu/PPTist/blob/master/src/types/slides.ts)