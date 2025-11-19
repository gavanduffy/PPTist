## Paint cloths and elements

#### Basic structure of the editor
```
└──Editor
    ├── Top Menu Bar
    ├── Left Navigation Bar
    ├── Right Navigator Bar
    ├── Insert Upper/Toolbars
    ├── Bottom speaker's note.
    └── The canvas.
         ├── Viewable Areas
         │    ├── Editable Elements
         │    └── Mouse Selection
         │
         └── Painting Tool
              ├── Reference Line
              ├── Ruler
              ├── Element Operation Node Layer（If you drag the zoom point）
              ├── Soaking Alignment
              └── Regional background
```

#### The basics of canvas.
We focus on the relative complexity.【The canvas.】Part。Each element in the canvas is described by a set of data.，For example...：
```typescript
interface PPTBaseElement {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
}
```
By name.，`left` Means the element's distance from the top left corner of the canvas.，`width` Shows the width of the element，And so on.。
The point is to know.：Visible area by default Kuan.1000Pixels 、High562.5Pixel-based Scale。That is, no matter how big or small the canvas and the visual area actually is.，One. `{ width: 1000px, height: 562.5px, left: 0, top: 0 }` The elements are bound to fill the entire visual area.。
It's a simple way to make it happen.：Assuming the actual width of the visible area is 1200px ，Calculate the scale of this time 1200 / 1000 = 1.2 ，And then zoom all the elements in the visual area. 1.2 It's a double.。
Same thing.【Thumbnails】 and 【Show Pages】 It's actually a much smaller or larger visual area.。
> Notes：1000×562.5♪ The breadth can be modified ♪`src/store/slides.ts`Medium`viewportSize`It's to adjust.。

#### Elements in canvas
Except for position and size information above，We can also carry more data.，Take a text element as an example：
```typescript
interface PPTTextElement {
  type: 'text';
  id: string;
  left: number;
  top: number;
  lock?: boolean;
  groupId?: string;
  width: number;
  height: number;
  link?: string;
  content: string;
  rotate: number;
  defaultFontName: string;
  defaultColor: string;
  outline?: PPTElementOutline;
  fill?: string;
  lineHeight?: number;
  wordSpace?: number;
  opacity?: number;
  shadow?: PPTElementShadow;
}
```
You can define one. `rotate` To indicate the angle of the rotation of the text box、Define one `opacity` To indicate transparency in text boxes Wait.。All you need to do is render the elements based on the data you define.，And the essence of editing elements is to modify the data.。
That's the basic composition of a canvas.。
