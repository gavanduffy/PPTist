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
 * type: gradient type（Radial、Linear）
 * 
 * colors: Gradient color list（pos: percentile position；color: color）
 * 
 * rotate: gradient angle（linear gradient）
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
 * element shadow
 * 
 * h: horizontal offset
 * 
 * v: vertical offset
 * 
 * blur: degree of ambiguity
 * 
 * color: shadow color
 */
export interface PPTElementShadow {
  h: number
  v: number
  blur: number
  color: string
}

/**
 * element border
 * 
 * style?: border style（solid or dashed line）
 * 
 * width?: border width
 * 
 * color?: border color
 */
export interface PPTElementOutline {
  style?: LineStyleType
  width?: number
  color?: string
}

export type ElementLinkType = 'web' | 'slide'

/**
 * element hyperlink
 * 
 * type: Link type（Web page、Slideshow page）
 * 
 * target: destination address（Web link、Slideshow pageID）
 */
export interface PPTElementLink {
  type: ElementLinkType
  target: string
}


/**
 * Common properties of elements
 * 
 * id: elementID
 * 
 * left: element horizontal position（Distance from the left side of the canvas）
 * 
 * top: element vertical position（Distance from top of canvas）
 * 
 * lock?: Lock element
 * 
 * groupId?: combinationID（have the same combinationIDThe elements of are members of the same combined element）
 * 
 * width: element width
 * 
 * height: element height
 * 
 * rotate: rotation angle
 * 
 * link?: hyperlink
 * 
 * name?: element name
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
 * text element
 * 
 * type: element type（text）
 * 
 * content: text content（HTMLstring）
 * 
 * defaultFontName: Default font（will be included in the text contentHTMLInline style override）
 * 
 * defaultColor: Default color（will be included in the text contentHTMLInline style override）
 * 
 * outline?: frame
 * 
 * fill?: fill color
 * 
 * lineHeight?: row height（times），default1.5
 * 
 * wordSpace?: word spacing，default0
 * 
 * opacity?: opacity，default1
 * 
 * shadow?: shadow
 * 
 * paragraphSpace?: segment spacing，default 5px
 * 
 * vertical?: vertical text
 * 
 * textType?: text type
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
 * Image flip、shape flip
 * 
 * flipH?: Flip horizontally
 * 
 * flipV?: flip vertically
 */
export interface ImageOrShapeFlip {
  flipH?: boolean
  flipV?: boolean
}

/**
 * Picture filters
 * 
 * https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter
 * 
 * 'blur'?: Vague，default0（px）
 * 
 * 'brightness'?: brightness，default100（%）
 * 
 * 'contrast'?: Contrast，default100（%）
 * 
 * 'grayscale'?: Grayscale，default0（%）
 * 
 * 'saturate'?: saturation，default100（%）
 * 
 * 'hue-rotate'?: Hue rotation，default0（deg）
 * 
 * 'opacity'?: opacity，default100（%）
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
 * range: Cropping range，For example：[[10, 10], [90, 90]] Indicates cropping the original image from the upper left corner 10%, 10% arrive 90%, 90% range
 * 
 * shape: Crop shape，See configs/imageClip.ts CLIPPATHS 
 */
export interface ImageElementClip {
  range: ImageClipDataRange
  shape: string
}

export type ImageType = 'pageFigure' | 'itemFigure' | 'background'

/**
 * Picture elements
 * 
 * type: element type（image）
 * 
 * fixedRatio: Fixed image aspect ratio
 * 
 * src: Image address
 * 
 * outline?: frame
 * 
 * filters?: Picture filters
 * 
 * clip?: Cropping information
 * 
 * flipH?: Flip horizontally
 * 
 * flipV?: flip vertically
 * 
 * shadow?: shadow
 * 
 * radius?: corner radius
 * 
 * colorMask?: color mask
 * 
 * imageType?: Picture type
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
 * text within shape
 * 
 * content: text content（HTMLstring）
 * 
 * defaultFontName: Default font（will be included in the text contentHTMLInline style override）
 * 
 * defaultColor: Default color（will be included in the text contentHTMLInline style override）
 * 
 * align: text alignment direction（vertical direction）
 * 
 * type: text type
 */
export interface ShapeText {
  content: string
  defaultFontName: string
  defaultColor: string
  align: ShapeTextAlign
  type?: TextType
}

/**
 * shape element
 * 
 * type: element type（shape）
 * 
 * viewBox: SVGofviewBoxproperty，For example [1000, 1000] express '0 0 1000 1000'
 * 
 * path: shape path，SVG path of d property
 * 
 * fixedRatio: Fixed shape width to height ratio
 * 
 * fill: filling，Takes effect when there is no gradient
 * 
 * gradient?: Gradient，When this attribute exists, it will be used as fill first.
 * 
 * pattern?: pattern，When this attribute exists, it will be used as fill first.
 * 
 * outline?: frame
 * 
 * opacity?: opacity
 * 
 * flipH?: Flip horizontally
 * 
 * flipV?: flip vertically
 * 
 * shadow?: shadow
 * 
 * special?: special shape（Mark some shapes that are difficult to parse，For example, the path uses L Q C A Types other than，This type of shape will become a picture after exporting）
 * 
 * text?: text within shape
 * 
 * pathFormula?: Shape path calculation formula
 * Normally，The size of the shape changes based only on the width and height viewBox scale to adjust the shape，and viewBox itself and path Will not change，
 * But there are also some shapes that I hope to control the position of some key points more accurately.，At this time, you need to provide the path calculation formula，by updating on zoom viewBox and recalculate path to redraw the shape
 * 
 * keypoints?: Key point position percentage
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
 * line elements
 * 
 * type: element type（line）
 * 
 * start: starting position（[x, y]）
 * 
 * end: end position（[x, y]）
 * 
 * style: line style（solid line、dotted line、dotted line）
 * 
 * color: line color
 * 
 * points: endpoint style（[Starting point style, end style]，Optional：none、arrow、dots）
 * 
 * shadow?: shadow
 * 
 * broken?: Polyline control point position（[x, y]）
 * 
 * broken2?: Double polyline control point position（[x, y]）
 * 
 * curve?: Quadratic curve control point location（[x, y]）
 * 
 * cubic?: Cubic curve control point location（[[x1, y1], [x2, y2]]）
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
 * chart elements
 * 
 * type: element type（chart）
 * 
 * fill?: fill color
 * 
 * chartType: Chart base types（bar/line/pie），All chart types are derived from these three basic types
 * 
 * data: chart data
 * 
 * options: Extended options
 * 
 * outline?: frame
 * 
 * themeColors: theme color
 * 
 * textColor?: Coordinates and text color
 * 
 * lineColor?: grid color
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
 * table cell style
 * 
 * bold?: Bold
 * 
 * em?: italics
 * 
 * underline?: Underline
 * 
 * strikethrough?: strikethrough
 * 
 * color?: Font color
 * 
 * backcolor?: fill color
 * 
 * fontsize?: font size
 * 
 * fontname?: font
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
 * table cell
 * 
 * id: cellID
 * 
 * colspan: Number of merged columns
 * 
 * rowspan: Number of merged rows
 * 
 * text: Text content
 * 
 * style?: cell style
 */
export interface TableCell {
  id: string
  colspan: number
  rowspan: number
  text: string
  style?: TableCellStyle
}

/**
 * table theme
 * 
 * color: theme color
 * 
 * rowHeader: title line
 * 
 * rowFooter: summary row
 * 
 * colHeader: first column
 * 
 * colFooter: last column
 */
export interface TableTheme {
  color: string
  rowHeader: boolean
  rowFooter: boolean
  colHeader: boolean
  colFooter: boolean
}

/**
 * table element
 * 
 * type: element type（table）
 * 
 * outline: frame
 * 
 * theme?: theme
 * 
 * colWidths: column width array，like[0.3, 0.5, 0.2]Indicates that the width of the three columns accounts for the total width.30%, 50%, 20%
 * 
 * cellMinHeight: Minimum cell height
 * 
 * data: tabular data
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
 * LaTeXelement（formula）
 * 
 * type: element type（latex）
 * 
 * latex: latexcode
 * 
 * path: svg path
 * 
 * color: color
 * 
 * strokeWidth: path width
 * 
 * viewBox: SVGofviewBoxproperty
 * 
 * fixedRatio: Fixed shape width to height ratio
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
 * video element
 * 
 * type: element type（video）
 * 
 * src: Video address
 * 
 * autoplay: Autoplay
 * 
 * poster: Preview cover
 * 
 * ext: video suffix，Use this field to confirm the resource type when the resource link lacks a suffix.
 */
export interface PPTVideoElement extends PPTBaseElement {
  type: 'video'
  src: string
  autoplay: boolean
  poster?: string
  ext?: string
}

/**
 * audio elements
 * 
 * type: element type（audio）
 * 
 * fixedRatio: Fixed icon width-to-height ratio
 * 
 * color: icon color
 * 
 * loop: Loop play
 * 
 * autoplay: Autoplay
 * 
 * src: audio address
 * 
 * ext: audio suffix，Use this field to confirm the resource type when the resource link lacks a suffix.
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
 * id: animationid
 * 
 * elId: elementID
 * 
 * effect: Animation effects
 * 
 * type: animation type（Admission、Exit、emphasize）
 * 
 * duration: animation duration
 * 
 * trigger: Animation triggering method(click - on click、meantime - At the same time as the previous animation、auto - After the previous animation)
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
 * slide background
 * 
 * type: background type（solid color、picture、Gradient）
 * 
 * color?: background color（solid color）
 * 
 * image?: Picture background
 * 
 * gradientType?: gradient background
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
 * Slideshow page
 * 
 * id: pageID
 * 
 * elements: collection of elements
 * 
 * notes?: annotation
 * 
 * remark?: Remark
 * 
 * background?: Page background
 * 
 * animations?: Element animation collection
 * 
 * turningMode?: Page turning method
 * 
 * slideType?: Page type
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
 * Slideshow theme
 * 
 * backgroundColor: Page background color
 * 
 * themeColor: theme color，For default created shape colors etc.
 * 
 * fontColor: Font color
 * 
 * fontName: font
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
  origin?: string
}