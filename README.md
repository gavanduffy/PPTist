<p align="center">
    <img src='/public/logo.png' />
</p>

<p align="center">
    <a href="https://www.github.com/pipipi-pikachu/PPTist/stargazers" target="_black"><img src="https://img.shields.io/github/stars/pipipi-pikachu/PPTist?logo=github" alt="stars" /></a>
    <a href="https://www.github.com/pipipi-pikachu/PPTist/network/members" target="_black"><img src="https://img.shields.io/github/forks/pipipi-pikachu/PPTist?logo=github" alt="forks" /></a>
    <a href="https://www.github.com/pipipi-pikachu/PPTist/blob/master/LICENSE" target="_black"><img src="https://img.shields.io/github/license/pipipi-pikachu/PPTist?color=%232DCE89&logo=github" alt="license" /></a>
    <a href="https://www.typescriptlang.org" target="_black"><img src="https://img.shields.io/badge/language-TypeScript-blue.svg" alt="language"></a>
    <a href="https://github.com/pipipi-pikachu/PPTist/issues" target="_black"><img src="https://img.shields.io/github/issues-closed/pipipi-pikachu/PPTist.svg" alt="issue"></a>
    <a href="https://gitee.com/pptist/PPTist" target="_black"><img src="https://gitee.com/pptist/PPTist/badge/star.svg?version=latest" alt="gitee"></a>
</p>

[Simplified Chinese](README_zh.md) | English


# 🎨 PPTist
> PowerPoint-ist（/'pauəpɔintist/）, A web-based presentation (slideshow) application. This application replicates most of the commonly used features of Microsoft Office PowerPoint. It supports various essential element types such as text, images, shapes, lines, charts, tables, videos, audio, and formulas. You can edit and present slides directly in a web browser.

<b>Try it online👉：[https://pipipi-pikachu.github.io/PPTist/](https://pipipi-pikachu.github.io/PPTist/)</b>

# ✨ Highlights
1. <b>Easy Development</b>: Built with Vue 3.x and TypeScript, it does not rely on UI component libraries and avoids third-party components as much as possible. This makes styling customization easier and functionality extension more convenient.
2. <b>User Friendly</b>: It offers a context menu available everywhere, dozens of keyboard shortcuts, and countless editing detail optimizations, striving to replicate a desktop application-level experience.
3. <b>Feature Rich</b>: Supports most of the commonly used elements and functionalities found in PowerPoint, supports generate PPT by AI, supports exporting in various formats, and offers basic editing and previewing on mobile devices.

# 👀 Front-Row Reminder
1. This project is a "Web Slideshow Application", not a "low-code platform", "H5 editor", "image editor", "whiteboard application", or similar tools.
2. The target audience for this project is <b>developers with needs for [Web slideshow] development, basic web development experience is required</b>. The provided link is merely a demo address and does not offer any online services. You should not use this project directly as a tool, nor does it support out-of-the-box functionality. If you simply need a service or tool, you can opt for more excellent and mature products such as: [Slidev](https://sli.dev/)、[revealjs](https://revealjs.com/), etc.
3. Here are some summarized [Frequently Asked Questions](/doc/Q&A.md). When raising Issues or submitting PRs for the first time, be sure to read this document in advance.
4. For commercial use, please refer to [Commercial use](#-Commercial use)


# 🚀 Installation
```
npm install

npm run dev
```
Browser access: http://127.0.0.1:5173/


# 📚 Features
### Basic Features
- History (undo, redo)
- Shortcuts
- Right-click menu
- Export local files (PPTX, JSON, images, PDF)
- Import and export pptist files
- Print
- AI PPT
### Slide Page Editing
- Add/delete pages
- Copy/paste pages
- Adjust page order
- Create sections
- Background settings (solid color, gradient, image)
- Set canvas size
- Gridlines
- Rulers
- Canvas zoom and move
- Theme settings
- Extract slides style
- Speaker notes (rich text)
- Slide templates
- Transition animations
- Element animations (entrance, exit, emphasis)
- Selection panel (hide elements, layer sorting, element naming)
- Labels for Page and Node Types (usable for template-related features)
- Find/replace
- Annotations
### Slide Element Editing
- Add/delete elements
- Copy/paste elements
- Drag and move elements
- Rotate elements
- Scale elements
- Multiple element selection (marquee, point selection)
- Group multiple elements
- Batch edit multiple elements
- Lock elements
- Magnetic alignment of elements (move and scale)
- Adjust element layer
- Align elements to canvas
- Align elements to other elements
- Evenly distribute multiple elements
- Drag to add text and images
- Paste external images
- Set element coordinates, size, and rotation
- Element hyperlinks (link to webpage, link to other slide pages)
#### Text
- Rich text editing (color, highlight, font, font size, bold, italic, underline, strikethrough, subscript, inline code, quote, hyperlink, alignment, numbering, bullet points, paragraph indent, clear formatting)
- Line height
- Character spacing
- Paragraph spacing
- First line indent
- Fill color
- Border
- Shadow
- Transparency
- Vertical text
- AI Rewrite/Expand/Abbreviate
#### Images
- Crop (custom, shape, aspect ratio)
- Rounding
- Filters
- Tint (mask)
- Flip
- Border
- Shadow
- Replace image
- Reset image
- Set as background
#### Shapes
- Draw any polygon
- Draw any line (unclosed shape simulation)
- Replace shape
- Fill (solid color, gradient, image)
- Border
- Shadow
- Transparency
- Flip
- Shape format painter
- Edit text (supports rich text, similar to text element’s rich text editing)
#### Lines
- Straight lines, polylines, curves
- Color
- Width
- Style (solid, dashed, dotted)
- Endpoint style
#### Charts (bar, column, line, area, scatter, pie, donut, radar)
- Chart type conversion
- Data editing
- Background fill
- Theme color
- Coordinate system and axis text color
- Grid color
- Other chart settings
- Border
#### Tables
- Add/delete rows and columns
- Theme settings (theme color, header, total row, first column, last column)
- Merge cells
- Cell styles (fill color, text color, bold, italic, underline, strikethrough, alignment)
- Border
#### Video
- Preview cover settings
- Auto play
#### Audio
- Icon color
- Auto play
- Loop play
#### Formulas
- LaTeX editing
- Color settings
- Formula line thickness settings
### Slide Show
- Brush tools (pen/shape/arrow/highlighter annotation, eraser, blackboard mode)
- Preview all slides
- Bottom thumbnails navigation
- Timer tool
- Laser pointer
- Auto play
- Speaker view
### Mobile
- Basic editing
  - Add/delete/copy/note/undo redo pages
  - Insert text, images, rectangles, circles
  - General element operations: move, scale, rotate, copy, delete, layer adjust, align
  - Element styles: text (bold, italic, underline, strikethrough, font size, color, alignment), fill color
- Basic preview
- Play preview


# 👀 FAQ
Some common problems: [FAQ](/doc/Q&A.md)


# 🎯 Supplement
There is currently no complete development documentation, but the following documents may be of some help to you:
- [Project Directory and Data Structure](/doc/DirectoryAndData.md)
- [Fundamentals of Canvas and Elements](/doc/Canvas.md)
- [How to Customize an Element](/doc/CustomElement.md)
- [About AIPPT](/doc/AIPPT.md)

Here are some auxiliary development tools/repositories:
- Import PPTX file reference: [pptxtojson](https://github.com/pipipi-pikachu/pptxtojson)
- Draw shape: [svgPathCreator](https://github.com/pipipi-pikachu/svgPathCreator)


# 📄 License
[AGPL-3.0 License](https://github.com/pipipi-pikachu/PPTist/blob/master/LICENSE) | Copyright © 2020-PRESENT [pipipi-pikachu](https://github.com/pipipi-pikachu)

# 🧮 Commercial
If you wish to use this project for commercial gain, I hope you will respect open source and strictly adhere to the AGPL-3.0 license, giving back to the open source community. Or contact the author for an independent commercial license.





# 🧮 Commercial use
- This item is closed for commercial purposes，♪ If you want to be ♪PPTistFor profit on commercial projects，Please respect open source.，**Strict compliance [AGPL-3.0 Agreement](https://www.gnu.org/licenses/agpl-3.0.html)**，Back to the open source community.（It's the author's idea.）；
- If for any reason,，It has to be closed.，Unable to execute AGPL-3.0 Agreement，It's optional.：
    1. Use early Apache 2.0 Protocol version [（Final update of the version as2022Year5Month，No maintenance is currently available，Click here for downloadable code）](https://github.com/pipipi-pikachu/PPTist/archive/f1a35bb8e045124e37dcafd6acbf40b4531b69aa.zip)；
    2. Become an important contributor to the project，Including：
        - Your code is cited as a reliance on this project.，Including：npmInstall、script/styleWaiting for file references、Snippet Reference（The citation points.）；
        - You've submitted important information to this project. PR or Issue（By the author's subjective judgement.，Matches PR or Issue I'll hit him.`important contribution`Label）；
        - You've been involved in the maintenance of this project for a long time./Moving forward，For this item：Effective perimeter tools provided、A large number of templates have been produced, etc.（By the author's subjective judgement.）；
        - This does not apply if you violate the agreement and then become a contributor.；
    3. [Mail Contact Author](mailto:pipipi_pikachu@163.com)Payment for independent commercial authorizations。Independently authorized prices：
        - One year.1999Dollars；
        - Three years.2999Dollars；
        - Permanent5499Dollars（Without taxes）；
        - Found by the author after violating the agreement.，Not applicable to above price；
- Recommendation priority for implementationAGPL-3.0Agreement，Obtaining an independent commercial authorization for fees，Attention, please.：
    - Independent business authorization：Author to produce a separate commercial authorization agreement document，You are authorized to use the code for business purposes.，And you don't have to do it. AGPL-3.0 Agreement；
    - Authorization does not amount to sale of software or services，There is no other“Commercial version/Full Version”、Do not provide anything.API/SDK/Online services/Technical support/Technical advice/Custom development、Nor offer products that can be delivered directly；
    - This software is not open for immediate use.，At least you have to access backend data./Storage-related capabilities。And so...，The use of this project requires the most basicwebDevelopment experience（Understand what's the front end?&Backend、What's an interface?/Database、What's cross-domain, etc.?）；
    - Post-authorization，The second sale of the source code is still prohibited、Authorization、Open source or malicious transmission；
    - Post-authorization，If need be.，Author can provide the currentAIPPTRelevant background code for reference（But it's very simple.，No core logic，It's better to do it on its own.）；
    - Please do your basic research ahead of schedule.，JudgementPPTistCompatibility with needs，Including：Functions（Availability of operational requirements）and development（Accepts the current technology store/Achievement programme）；
    - Not accepted[Blacklist/Shame pillar.](/doc/Blacklist.md)Object obtains a separate business authorization or contribution code through payment；
    - The author advocates for antagonism.（Formal、Big amount of information、High information integration），**No personal tweets./QQ/Cell phone number, etc.**，Please contact e-mail for any authorized questions.，Thank you for understanding.；
    - It's a simple demand./Report!bug/Ask for advice on non-mandated issues such as technical programmes，Please. [Issues](https://github.com/pipipi-pikachu/PPTist/issues) Ongoing。Author does not accept mail requests/Report!bug/Query technology programmes。

---
# 🔔 Other notes
## What is it? AGPL-3.0 Agreement
The core requirements of the agreement are explained in plain language as follows:：
- **Open source obligation**：If you use it, AGPL The code.，No matter how you or your downstream use it./Modify，We have to make all your final codes public.（It's not just the part that gives changes.，It doesn't mean that rewriting the frame would separate from the original code.），AND CONTINUE TO AGPL Open Source Agreement（Emphasizing：It has to continue. AGPL Agreement，Keep the open source contagious.，Unable to replace other protocols）。
- **We need to open up the network.**：Even if you just use it. AGPL The code did a website or a network service.，When people use your services online,，You'll have to follow the previous one.**Open source obligation**。
- **Reservation of copyright declarations**：You can't delete the original author's information and license statement from the code.，We have to tell everyone where the code came from.。
- **No extra restrictions.**：You can't be born. AGPL Put some restrictions on the code.，Like not getting people to distribute the code again.，Or ask someone else to pay for the code.（but not limited to：Requesting permission to buy./Services/Products, etc.）。
- **Disclaimer**：Authors don't guarantee no code. bug，And not responsible for the consequences of the use.。

> The details of the protocol can be found in the official document.：[AGPL-3.0 Agreement](https://www.gnu.org/licenses/agpl-3.0.html)

## Statement
Github、GiteeRedevelopment of some warehouses based on this project code is carried out by the waiting code hosting platform，Not complied withAGPL-3.0Agreement，It was deleted without permission.AGPL-3.0Agreement licence declaration or conversion to other agreements，Here's what the author says.：**The codes of these warehouses still actually belong to them.AGPL-3.0Agreement，Don't be misled.。**