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

Simplified Chinese | [English](README.md)


# 🎨 PPTist
> PowerPoint-ist（/'pauəpɔintist/），One based on Web Online presentations（Slide）Apply，Most of it's restored. Office PowerPoint Common functions，Support Text、Pictures、Shape、Line、Charts、Table、Video、Audio、Formula Some of the most commonly used elements type，Yes. Web Edit in Browser/Presentation Slides。

<b>Online Expertion Address👉：[https://pipipi-pikachu.github.io/PPTist/](https://pipipi-pikachu.github.io/PPTist/)</b>

# ✨ Project characteristics
1. Easy to develop：Based on Vue3.x + TypeScript Build，Not dependentUIComponent Library，Avoid third-party components as much as possible.，Style customization is easier、Functional extension is easier。
2. Easy to use：Right-key menu available everywhere、Dozens of shortcuts、I've been doing a lot of editing details.，Try to restore the desktop application level experience。
3. Function rich.：Support PPT Most of the most commonly used elements and functions，SupportAIGeneratePPT、Support multiple format export、Support mobile end foundation editing and preview...


# 👀 Front row hint
1. This project is a... “Web Slide Edit/Demonstration application” ，Not. “Low-code platform”、“H5 Editor”、“Picture Editor” 、“Whiteboard application”Wait.。
2. The target audience for this project is<b>Yes.WebDeveloper of Slide Development Needs，We need a foundation.webDevelopment experience</b>，The link provided is just a demonstration address.，Do not provide any online services。You shouldn't be using this project directly as a tool.，You don't want to open it.。If you just need a service or a tool,，You can choose better and more mature products.，For example...：[Slidev](https://sli.dev/)、[revealjs](https://revealjs.com/) Wait.。
3. Here's some summary.[Frequent problems](/doc/Q&A.md)，First time. Issues and PR Hour，Make sure to read this document in advance。
4. For business-related reference[Commercial use](#-Commercial use)


# 🚀 Project run
```
npm install

npm run dev
```
Browser Access：http://127.0.0.1:5173/


# 📚 Function List
### Basic Functions
- History（Undo、Redo）
- Shortcuts
- Right Key Menu
- Export local files（PPTX、JSON、Pictures、PDF）
- Import Export Specific .pptist Documentation
- Print
- AIGeneratePPT
### Slide Page Edit
- Page Add、Delete
- Page Order Adjustment
- Page Copy Paste
- Slide Breaks
- Background Settings（Pure Color、Gradient、Pictures）
- Set canvas size
- Grid Line
- Ruler
- Scroll Scale、Move
- Theme Settings
- Extract already available slide style
- Presenter's Note（Rich Text）
- Slide Template
- Page Animation
- Element Animation（Enter.、Stand down.、Emphasizing）
- Select Panel（Hide Elements、Hierarchy Sorting、Element Naming）
- Page & Node Type Tag（Can be used for template-related functions）
- Find/Replace
- Comments
### Slide Element Edit
- Add Elements、Delete
- Paste Element
- Element drags to move
- Element Rotation
- Element Scale
- Multiple Element Selection（Box、Click）
- Multi-Element Group
- MultiElement Batch Edition
- Element Lock
- Element adsorption alignment（Move and Scale）
- Element Tier Adjustment
- Align elements to canvas
- Align elements to other elements
- Uneven distribution of multiple elements
- Drag to add text
- Paste External Pictures
- Element Coordinates、Size and rotation angle settings
- Element Hyperlink（Link to web page、Link to other slide pages）
#### Text
- Rich Text Editor（Colours、Highlight、Fonts、Symbol、Bold、Italic、Underline、Strikeout、Corner、Line code、Reference、Hyperlink、Alignment、Serial number、Bullets、Paragraph Indentation、Clear Format）
- Line height
- Word spacing
- Paragraph spacing
- First Line Indentation
- Fill Colours
- Borders
- Shadow
- Transparency
- Vertical Text
- AIRefine/Extended/Abbreviations
#### Pictures
- Crop（Custom、By Shape、By Horizontal Ratio）
- Round Corner
- Filter
- Color.（Mask）
- Flip
- Borders
- Shadow
- Replace Picture
- Reset Pictures
- Set as Background Diagram
#### Shape
- Draw any polygon
- Draw any line（Unclosed shape simulation）
- Replace Shape
- Fill（Pure Color、Gradient、Pictures）
- Borders
- Shadow
- Transparency
- Flip
- Shape Format Brush
- Edit Text（Support rich text，Similar to rich text editing for text elements）
#### Line
- Line、Base Line/Curve
- Colours
- width
- Styles（Solid、Delusion、Pointlines）
- End Style
#### Charts（Cylinder Chart、Bar Chart、Line Chart、Area Chart、Scatter Chart、Pie、Ring Chart、Radar Chart）
- Diagram Type Conversion
- Data editing
- Background Fill
- Theme Color
- Axis/Coordinate Text Colour
- Grid Colour
- Stack Mode、Smooth curves, etc.
#### Table
- Okay.、Column Add Delete
- Theme Settings（Theme Color、Header、Summary Rows、First column、Last Column）
- Merge Cells
- Cell Styles（Fill Colours、Text Colour、Bold、Italic、Underline、Strikeout、Alignment）
- Borders
#### Video
- Preview Cover Settings
- Auto Play
#### Audio
- Icon Colour
- Auto Play
- Loop
#### Formula
- LaTeXEdit
- Colour Settings
- Formula Line Thick Settings
### Slide Show
- Brush Tool（Brush/Shape/Arrow/Fluorescent Note、Eraser、Blackboard Mode）
- All Slide Previews
- Show thumbnails navigation on the bottom of the touch
- Timer Tool
- Laser Pen
- AutoShow
- Speaker View
### Move End
- Basic Edit
    - Page Add、Delete、Copy、Remarks、Undo Redo
    - Insert Text、Pictures、Rectangle、Circle
    - Element Universal Operation：Move、Zoom、Rotate、Copy、Delete、Tier adjustments、Alignment
    - Element Styles：Text（Bold、Italic、Underline、Strikeout、Symbol、Colours、Alignment）、Fill Colours
- Basic Preview
- Play Preview


# 🎯 Development
There is currently no complete development document，But these documents might help you.：
- [Project Directory and Data Structure](/doc/DirectoryAndData.md)
- [The basics of canvas and elements](/doc/Canvas.md)
- [How to customize an element](/doc/CustomElement.md)
- [AboutAIPPT](/doc/AIPPT.md)

Here are some of the tools that have been developed./Warehouse：
- ImportPPTXDocument references：[pptxtojson](https://github.com/pipipi-pikachu/pptxtojson)
- Draw shapes：[svgPathCreator](https://github.com/pipipi-pikachu/svgPathCreator)


# 📄 Copyright Declaration/Open Source Agreement
[AGPL-3.0 License](/LICENSE) | Copyright © 2020-PRESENT [pipipi-pikachu](https://github.com/pipipi-pikachu)


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