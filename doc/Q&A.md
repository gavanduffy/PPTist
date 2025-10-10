## Frequently Asked Questions

#### Q. Why doesn’t a shortcut work?
A. Some shortcuts only work when the focus is in a specific area. For example, the page manipulation shortcuts only work when the focus is on the thumbnail list on the left, and element shortcuts only work when the canvas area is focused.

#### Q. Why does paste do nothing?
A. Make sure the browser is allowed to access the system clipboard.

#### Q. Why is my work gone after refreshing or reopening the browser?
A. The hosted links provided in the repository are for demos only. The project is deployed as a purely front-end application without a backend, so it does not persist data.

#### Q. How do I reorder slides?
A. Drag the thumbnails on the left to rearrange them.

#### Q. Why does inserting an image make the app sluggish?
A. This demo does not rely on a backend. Local images are referenced as Base64 strings, which are very large. In production you should upload images and reference their URLs to avoid the slowdown.

#### Q. Why doesn’t a preset theme take effect?
A. Preset themes affect elements and pages that are added after you apply the theme. They do not modify existing elements. Use “Apply Theme to All” to apply the current theme to every page.

#### Q. Why doesn’t an online font take effect?
A. Setting an online font downloads the font file. The file can be large, so the new font only applies after the download finishes.

#### Q. Can PPTX files be imported or exported?
A. Importing and exporting PPTX files is important for an online presentation editor, but the implementation is far more complex than it may seem. Given limited time and resources, this feature relies on third-party tools.
- **Export:** Export currently depends on [PptxGenJS](https://github.com/gitbrent/PptxGenJS/). It handles most basic elements but still has many gaps. Keep in mind: (1) the feature depends on PptxGenJS, so limitations in that library (such as animations) also affect PPTist; (2) the goal is to export elements with similar styling, not to recreate the web page pixel for pixel. Some visual differences are expected.
- **Import:** There is no polished solution yet and the feature is still being researched. If you have experience or interest, please discuss it in the issues.
> PS. See the [pptx to json experiment](https://github.com/pipipi-pikachu/pptx2json). Use it as a reference if you need to implement PPTX import urgently.

It’s also worth repeating that PPTist is not a dedicated online editor for Microsoft PowerPoint. The ability to import or export PPT files is merely one **feature**, not the **goal** of the project.

#### Q. Which video formats are supported?
A. The project only provides basic video support and can play what the native `<video>` tag supports.

You can integrate [hls.js](https://github.com/video-dev/hls.js) or [flv.js](https://github.com/Bilibili/flv.js) to support additional formats (such as .m3u8 or .flv) by including the scripts (for example via CDN). No extra configuration is required.

#### Q. How should JSON import be handled?
A. For security reasons it is not recommended to expose this functionality directly on the front end, and end users should not have to deal with JSON. The export JSON feature was added mainly for development convenience. If you must support it, implement the feature on the server and carefully validate the data. The same applies to front-end validation.

#### Q. The printed or exported PDF does not match the on-screen layout.
A. Adjust the browser’s print dialog settings. Recommended options: margins to **Default**, disable **Headers and footers**, and enable **Background graphics**. In production consider generating PDFs on the backend (for example with Puppeteer) for more consistent results.

#### Q. Why is the mobile experience missing certain features?
A. No matter how polished it is, the mobile experience will always lag behind the desktop experience. The mobile version is intended for quick emergency edits. Full design and authoring work should happen on desktop. If you have a mobile-only requirement, try using desktop mode in your mobile browser (though the UX will suffer) or implement custom mobile features yourself.

#### Q. What browsers are supported?
A. The project primarily targets Chrome and Firefox. Safari may have compatibility issues. Internet Explorer is not supported.

#### Q. Why isn’t PPTist published as an npm package?
A. For many libraries an npm package is the easiest way to integrate with existing projects, but PPTist is different—it is a full application, not just a component. Real-world adoption typically requires heavy customization: backend integration, custom templates and assets, new element types, alternative implementations, custom themes, shortcut adjustments, and more. Shipping a generic npm package identical to the demo would not meet those needs, and maintaining a fully configurable package would require more effort than is currently feasible.

Therefore the recommended approach is to clone the full repository, understand how it works, and build your own product on top of it. Many similar projects adopt the same model (see [drawio](https://github.com/jgraph/drawio)).

#### Q. What about AI PPT?
A. AI PPT is only a small, simple feature in PPTist. It combines template customization, AI-generated data, and image replacement. Costs limit what the demo can show, so you will need to do more for production use—such as building more templates and creating detailed AI workflows.
> Image replacement only provides the hooks; you must supply your own images (AI-generated images, stock image searches, and so on).

#### Q. Anything else I should know?
A. PPTist is an open-source project that delivers technical solutions rather than a polished end-user product. Product-level requirements and optimizations are up to you to design and build.
