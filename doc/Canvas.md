## Canvas and Elements

#### Basic Editor Structure
```
└── Editor
    ├── Top menu bar
    ├── Left navigation bar
    ├── Right navigation bar
    ├── Upper middle insert/tools bar
    ├── Speaker notes at the bottom
    └── Canvas
         ├── Viewport
         │    ├── Editable elements
         │    └── Mouse selection box
         │
         └── Canvas tools
              ├── Guides
              ├── Rulers
              ├── Element control layer (for example, drag and resize handles)
              ├── Alignment snapping lines
              └── Viewport background
```

#### How the Canvas Works
Let’s focus on the more complex **canvas** portion. Every element on the canvas is described by a data object, for example:
```typescript
interface PPTBaseElement {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
}
```
As the names imply, `left` is the distance from the top-left corner of the canvas, `width` is the element width, and so on.
The key point is that the viewport defaults to a base size of 1000 × 562.5 pixels. Regardless of the actual size of the canvas or viewport, an element defined as `{ width: 1000px, height: 562.5px, left: 0, top: 0 }` will exactly fill the entire viewport.
Implementing this is straightforward: if the actual viewport width is 1200px, the scale factor is 1200 / 1000 = 1.2, so scale every element within the viewport by 1.2.
Similarly, the **thumbnail** and **presentation view** are just viewports with smaller or larger sizes.
> Note: You can adjust the 1000 × 562.5 base size by updating `viewportSize` in `src/store/slides.ts`.

#### Elements on the Canvas
In addition to position and size, elements can hold much more data. Take a text element as an example:
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
You can add a `rotate` property to represent the rotation angle of the text box, or an `opacity` property for its transparency. Rendering the element simply means drawing it according to the data you define, and editing the element is ultimately just modifying that data.

That’s the core structure of the canvas.
