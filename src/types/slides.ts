export const enum ShapePathFormulasKeys {
  ROUND_RECT = 'roundRect',
  ROUND_RECT_DIAGONAL = 'roundRectDiagonal',
  ROUND_RECT_SINGLE = 'roundRectSingle',
  ROUND_RECT_SAMESIDE = 'roundRectSameSide',
  CUT_RECT_DIAGONAL = 'cutRectDiagonal',
  CUT_RECT_SINGLE = 'cutRectSingle',
  CUT_RECT_SAMESIDE = 'cutRectSameSide',
  CUT_ROUND_RECT = 'cutRoundRect',
  MESSAGE = 'message',
  ROUND_MESSAGE = 'roundMessage',
  L = 'L',
  RING_RECT = 'ringRect',
  PLUS = 'plus',
  TRIANGLE = 'triangle',
  PARALLELOGRAM_LEFT = 'parallelogramLeft',
  PARALLELOGRAM_RIGHT = 'parallelogramRight',
  TRAPEZOID = 'trapezoid',
  BULLET = 'bullet',
  INDICATOR = 'indicator',
}

export const enum ElementTypes {
  TEXT = 'text',
  IMAGE = 'image',
  SHAPE = 'shape',
  LINE = 'line',
  CHART = 'chart',
  TABLE = 'table',
  LATEX = 'latex',
  VIDEO = 'video',
  AUDIO = 'audio',
}

/**
 * Gradient
 * 
 * type: Gradient type (radial or linear)
 * 
 * colors: Gradient stops (pos: percentage; color: value)
 * 
 * rotate: Gradient angle (for linear gradients)
 */
export type GradientType = 'linear' | 'radial'
export type GradientColor = {
  pos: number
  color: string
}
export interface Gradient {
  type: GradientType
  colors: GradientColor[]
  rotate: number
}

export type LineStyleType = 'solid' | 'dashed' | 'dotted'

/**
 * Element shadow
 * 
 * h: Horizontal offset
 * 
 * v: Vertical offset
 * 
 * blur: Blur radius
 * 
 * color: Shadow color
 */
export interface PPTElementShadow {
  h: number
  v: number
  blur: number
  color: string
}

/**
 * Element outline
 * 
 * style?: Outline style (solid or dashed)
 * 
 * width?: Outline width
 * 
 * color?: Outline color
 */
export interface PPTElementOutline {
  style?: LineStyleType
  width?: number
  color?: string
}

export type ElementLinkType = 'web' | 'slide'

/**
 * Element hyperlink
 * 
 * type: Link type (web page or slide)
 * 
 * target: Destination (URL or slide ID)
 */
export interface PPTElementLink {
  type: ElementLinkType
  target: string
}


/**
 * Common element attributes
 * 
 * id: Element ID
 * 
 * left: Horizontal position (distance from the canvas left edge)
 * 
 * top: Vertical position (distance from the canvas top edge)
 * 
 * lock?: Lock element
 * 
 * groupId?: Group ID (elements sharing the same ID belong to the same group)
 * 
 * width: Element width
 * 
 * height: Element height
 * 
 * rotate: Rotation angle
 * 
 * link?: Hyperlink
 * 
 * name?: Element name
 */
interface PPTBaseElement {
  id: string
  left: number
  top: number
  lock?: boolean
  groupId?: string
  width: number
  height: number
  rotate: number
  link?: PPTElementLink
  name?: string
}


export type TextType = 'title' | 'subtitle' | 'content' | 'item' | 'itemTitle' | 'notes' | 'header' | 'footer' | 'partNumber' | 'itemNumber'

/**
 * Text element
 * 
 * type: Element type (text)
 * 
 * content: Text content (HTML string)
 * 
 * defaultFontName: Default font (overridden by inline HTML styles)
 * 
 * defaultColor: Default color (overridden by inline HTML styles)
 * 
 * outline?: Outline
 * 
 * fill?: Fill color
 * 
 * lineHeight?: Line height (multiplier), default 1.5
 * 
 * wordSpace?: Letter spacing, default 0
 * 
 * opacity?: Opacity, default 1
 * 
 * shadow?: Shadow
 * 
 * paragraphSpace?: Paragraph spacing, default 5px
 * 
 * vertical?: Vertical text
 * 
 * textType?: Text type
 */
export interface PPTTextElement extends PPTBaseElement {
  type: 'text'
  content: string
  defaultFontName: string
  defaultColor: string
  outline?: PPTElementOutline
  fill?: string
  lineHeight?: number
  wordSpace?: number
  opacity?: number
  shadow?: PPTElementShadow
  paragraphSpace?: number
  vertical?: boolean
  textType?: TextType
}


/**
 * Image or shape flip
 * 
 * flipH?: Horizontal flip
 * 
 * flipV?: Vertical flip
 */
export interface ImageOrShapeFlip {
  flipH?: boolean
  flipV?: boolean
}

/**
 * Image filters
 * 
 * https://developer.mozilla.org/docs/Web/CSS/filter
 * 
 * 'blur'?: Blur, default 0 (px)
 * 
 * 'brightness'?: Brightness, default 100 (%)
 * 
 * 'contrast'?: Contrast, default 100 (%)
 * 
 * 'grayscale'?: Grayscale, default 0 (%)
 * 
 * 'saturate'?: Saturation, default 100 (%)
 * 
 * 'hue-rotate'?: Hue rotation, default 0 (deg)
 * 
 * 'opacity'?: Opacity, default 100 (%)
 */
export type ImageElementFilterKeys = 'blur' | 'brightness' | 'contrast' | 'grayscale' | 'saturate' | 'hue-rotate' | 'opacity' | 'sepia' | 'invert'
export interface ImageElementFilters {
  'blur'?: string
  'brightness'?: string
  'contrast'?: string
  'grayscale'?: string
  'saturate'?: string
  'hue-rotate'?: string
  'sepia'?: string
  'invert'?: string
  'opacity'?: string
}

export type ImageClipDataRange = [[number, number], [number, number]]

/**
 * Image cropping
 * 
 * range: Crop bounds, e.g. [[10, 10], [90, 90]] keeps the area from 10% to 90% of the original image
 * 
 * shape: Crop shape, see configs/imageClip.ts CLIPPATHS 
 */
export interface ImageElementClip {
  range: ImageClipDataRange
  shape: string
}

export type ImageType = 'pageFigure' | 'itemFigure' | 'background'

/**
 * Image element
 * 
 * type: Element type (image)
 * 
 * fixedRatio: Maintain image aspect ratio
 * 
 * src: Image URL
 * 
 * outline?: Outline
 * 
 * filters?: Image filters
 * 
 * clip?: Crop data
 * 
 * flipH?: Horizontal flip
 * 
 * flipV?: Vertical flip
 * 
 * shadow?: Shadow
 * 
 * radius?: Border radius
 * 
 * colorMask?: Color mask
 * 
 * imageType?: Image type
 */
export interface PPTImageElement extends PPTBaseElement {
  type: 'image'
  fixedRatio: boolean
  src: string
  outline?: PPTElementOutline
  filters?: ImageElementFilters
  clip?: ImageElementClip
  flipH?: boolean
  flipV?: boolean
  shadow?: PPTElementShadow
  radius?: number
  colorMask?: string
  imageType?: ImageType
}

export type ShapeTextAlign = 'top' | 'middle' | 'bottom' 

/**
 * Text inside shape
 * 
 * content: Text content (HTML string)
 * 
 * defaultFontName: Default font (overridden by inline HTML styles)
 * 
 * defaultColor: Default color (overridden by inline HTML styles)
 * 
 * align: Vertical alignment
 * 
 * type: Text type
 */
export interface ShapeText {
  content: string
  defaultFontName: string
  defaultColor: string
  align: ShapeTextAlign
  type?: TextType
}

/**
 * Shape element
 * 
 * type: Element type (shape)
 * 
 * viewBox: SVG viewBox, e.g. [1000, 1000] represents '0 0 1000 1000'
 * 
 * path: Shape path (SVG path 'd' attribute)
 * 
 * fixedRatio: Maintain aspect ratio
 * 
 * fill: Fill color used when no gradient is set
 * 
 * gradient?: Gradient fill (takes precedence when present)
 * 
 * pattern?: Pattern fill (takes precedence when present)
 * 
 * outline?: Outline
 * 
 * opacity?: Opacity
 * 
 * flipH?: Horizontal flip
 * 
 * flipV?: Vertical flip
 * 
 * shadow?: Shadow
 * 
 * special?: Special shape flag (for complex paths exported as images)
 * 
 * text?: Text inside the shape
 * 
 * pathFormula?: Shape path formula
 * Normally the shape scales via width/height relative to the viewBox while keeping the original viewBox and path unchanged,
 * but some shapes require precise control of key points, so a path formula recalculates the viewBox and path during scaling.
 * 
 * keypoints?: Key point percentages
 */
export interface PPTShapeElement extends PPTBaseElement {
  type: 'shape'
  viewBox: [number, number]
  path: string
  fixedRatio: boolean
  fill: string
  gradient?: Gradient
  pattern?: string
  outline?: PPTElementOutline
  opacity?: number
  flipH?: boolean
  flipV?: boolean
  shadow?: PPTElementShadow
  special?: boolean
  text?: ShapeText
  pathFormula?: ShapePathFormulasKeys
  keypoints?: number[]
}


export type LinePoint = '' | 'arrow' | 'dot' 

/**
 * Line element
 * 
 * type: Element type (line)
 * 
 * start: Start point ([x, y])
 * 
 * end: End point ([x, y])
 * 
 * style: Line style (solid, dashed, dotted)
 * 
 * color: Line color
 * 
 * points: Endpoint styles ([start, end] options: none, arrow, dot)
 * 
 * shadow?: Shadow
 * 
 * broken?: Polyline control point ([x, y])
 * 
 * broken2?: Second polyline control point ([x, y])
 * 
 * curve?: Quadratic curve control point ([x, y])
 * 
 * cubic?: Cubic curve control points ([[x1, y1], [x2, y2]])
 */
export interface PPTLineElement extends Omit<PPTBaseElement, 'height' | 'rotate'> {
  type: 'line'
  start: [number, number]
  end: [number, number]
  style: LineStyleType
  color: string
  points: [LinePoint, LinePoint]
  shadow?: PPTElementShadow
  broken?: [number, number]
  broken2?: [number, number]
  curve?: [number, number]
  cubic?: [[number, number], [number, number]]
}


export type ChartType = 'bar' | 'column' | 'line' | 'pie' | 'ring' | 'area' | 'radar' | 'scatter'

export interface ChartOptions {
  lineSmooth?: boolean
  stack?: boolean
}

export interface ChartData {
  labels: string[]
  legends: string[]
  series: number[][]
}

/**
 * Chart element
 * 
 * type: Element type (chart)
 * 
 * fill?: Fill color
 * 
 * chartType: Base chart type (bar/line/pie); all charts derive from these
 * 
 * data: Chart data
 * 
 * options: Extended options
 * 
 * outline?: Outline
 * 
 * themeColors: Theme colors
 * 
 * textColor?: Axis/text color
 * 
 * lineColor?: Grid color
 */
export interface PPTChartElement extends PPTBaseElement {
  type: 'chart'
  fill?: string
  chartType: ChartType
  data: ChartData
  options?: ChartOptions
  outline?: PPTElementOutline
  themeColors: string[]
  textColor?: string
  lineColor?: string
}


export type TextAlign = 'left' | 'center' | 'right' | 'justify'
/**
 * Table cell style
 * 
 * bold?: Bold
 * 
 * em?: Italic
 * 
 * underline?: Underline
 * 
 * strikethrough?: Strikethrough
 * 
 * color?: Font color
 * 
 * backcolor?: Fill color
 * 
 * fontsize?: Font size
 * 
 * fontname?: Font family
 * 
 * align?: Alignment
 */
export interface TableCellStyle {
  bold?: boolean
  em?: boolean
  underline?: boolean
  strikethrough?: boolean
  color?: string
  backcolor?: string
  fontsize?: string
  fontname?: string
  align?: TextAlign
}


/**
 * Table cell
 * 
 * id: Cell ID
 * 
 * colspan: Number of merged columns
 * 
 * rowspan: Number of merged rows
 * 
 * text: Cell text
 * 
 * style?: Cell style
 */
export interface TableCell {
  id: string
  colspan: number
  rowspan: number
  text: string
  style?: TableCellStyle
}

/**
 * Table theme
 * 
 * color: Theme color
 * 
 * rowHeader: Header row
 * 
 * rowFooter: Summary row
 * 
 * colHeader: First column
 * 
 * colFooter: Last column
 */
export interface TableTheme {
  color: string
  rowHeader: boolean
  rowFooter: boolean
  colHeader: boolean
  colFooter: boolean
}

/**
 * Table element
 * 
 * type: Element type (table)
 * 
 * outline: Outline
 * 
 * theme?: Theme
 * 
 * colWidths: Column widths, e.g. [30, 50, 20] means 30%, 50%, 20%
 * 
 * cellMinHeight: Minimum cell height
 * 
 * data: Table data
 */
export interface PPTTableElement extends PPTBaseElement {
  type: 'table'
  outline: PPTElementOutline
  theme?: TableTheme
  colWidths: number[]
  cellMinHeight: number
  data: TableCell[][]
}


/**
 * LaTeX element (formula)
 * 
 * type: Element type (latex)
 * 
 * latex: LaTeX code
 * 
 * path: svg path
 * 
 * color: Color
 * 
 * strokeWidth: Stroke width
 * 
 * viewBox: SVG viewBox
 * 
 * fixedRatio: Maintain aspect ratio
 */
export interface PPTLatexElement extends PPTBaseElement {
  type: 'latex'
  latex: string
  path: string
  color: string
  strokeWidth: number
  viewBox: [number, number]
  fixedRatio: boolean
}

/**
 * Video element
 * 
 * type: Element type (video)
 * 
 * src: Video URL
 * 
 * autoplay: Autoplay
 * 
 * poster: Poster image
 * 
 * ext: Video extension when the source URL lacks one
 */
export interface PPTVideoElement extends PPTBaseElement {
  type: 'video'
  src: string
  autoplay: boolean
  poster?: string
  ext?: string
}

/**
 * Audio element
 * 
 * type: Element type (audio)
 * 
 * fixedRatio: Maintain icon aspect ratio
 * 
 * color: Icon color
 * 
 * loop: Loop playback
 * 
 * autoplay: Autoplay
 * 
 * src: Audio URL
 * 
 * ext: Audio extension when the source URL lacks one
 */
export interface PPTAudioElement extends PPTBaseElement {
  type: 'audio'
  fixedRatio: boolean
  color: string
  loop: boolean
  autoplay: boolean
  src: string
  ext?: string
}


export type PPTElement = PPTTextElement | PPTImageElement | PPTShapeElement | PPTLineElement | PPTChartElement | PPTTableElement | PPTLatexElement | PPTVideoElement | PPTAudioElement

export type AnimationType = 'in' | 'out' | 'attention'
export type AnimationTrigger = 'click' | 'meantime' | 'auto'

/**
 * Element animation
 * 
 * id: Animation ID
 * 
 * elId: Element ID
 * 
 * effect: Animation effect
 * 
 * type: Animation type (entrance, exit, emphasis)
 * 
 * duration: Animation duration
 * 
 * trigger: Animation trigger (click - on click, meantime - with previous, auto - after previous)
 */
export interface PPTAnimation {
  id: string
  elId: string
  effect: string
  type: AnimationType
  duration: number
  trigger: AnimationTrigger
}

export type SlideBackgroundType = 'solid' | 'image' | 'gradient'
export type SlideBackgroundImageSize = 'cover' | 'contain' | 'repeat'
export interface SlideBackgroundImage {
  src: string
  size: SlideBackgroundImageSize,
}

/**
 * Slide background
 * 
 * type: Background type (solid, image, gradient)
 * 
 * color?: Background color (solid)
 * 
 * image?: Background image
 * 
 * gradient?: Gradient background
 */
export interface SlideBackground {
  type: SlideBackgroundType
  color?: string
  image?: SlideBackgroundImage
  gradient?: Gradient
}


export type TurningMode = 'no' | 'fade' | 'slideX' | 'slideY' | 'random' | 'slideX3D' | 'slideY3D' | 'rotate' | 'scaleY' | 'scaleX' | 'scale' | 'scaleReverse'

export interface NoteReply {
  id: string
  content: string
  time: number
  user: string
}

export interface Note {
  id: string
  content: string
  time: number
  user: string
  elId?: string
  replies?: NoteReply[]
}

export interface SectionTag {
  id: string
  title?: string
}

export type SlideType = 'cover' | 'contents' | 'transition' | 'content' | 'end'

/**
 * Slide
 * 
 * id: Slide ID
 * 
 * elements: Element list
 * 
 * notes?: Comments
 * 
 * remark?: Note
 * 
 * background?: Slide background
 * 
 * animations?: Element animations
 * 
 * turningMode?: Transition mode
 * 
 * slideType?: Slide type
 */
export interface Slide {
  id: string
  elements: PPTElement[]
  notes?: Note[]
  remark?: string
  background?: SlideBackground
  animations?: PPTAnimation[]
  turningMode?: TurningMode
  sectionTag?: SectionTag
  type?: SlideType
}

/**
 * Slide theme
 * 
 * backgroundColor: Slide background color
 * 
 * themeColor: Theme colors used for default shapes
 * 
 * fontColor: Font color
 * 
 * fontName: Font family
 */
export interface SlideTheme {
  backgroundColor: string
  themeColors: string[]
  fontColor: string
  fontName: string
  outline: PPTElementOutline
  shadow: PPTElementShadow
}

export interface SlideTemplate {
  name: string
  id: string
  cover: string
}