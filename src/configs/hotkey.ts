export const enum KEYS {
  C = 'C',
  X = 'X',
  Z = 'Z',
  Y = 'Y',
  A = 'A',
  G = 'G',
  L = 'L',
  F = 'F',
  D = 'D',
  B = 'B',
  P = 'P',
  O = 'O',
  R = 'R',
  T = 'T',
  MINUS = '-',
  EQUAL = '=',
  DIGIT_0 = '0',
  DELETE = 'DELETE',
  UP = 'ARROWUP',
  DOWN = 'ARROWDOWN',
  LEFT = 'ARROWLEFT',
  RIGHT = 'ARROWRIGHT',
  ENTER = 'ENTER',
  SPACE = ' ',
  TAB = 'TAB',
  BACKSPACE = 'BACKSPACE',
  ESC = 'ESCAPE',
  PAGEUP = 'PAGEUP',
  PAGEDOWN = 'PAGEDOWN',
  F5 = 'F5',
}

interface HotkeyItem {
  type: string
  children: {
    label: string
    value?: string
  }[] 
}

export const HOTKEY_DOC: HotkeyItem[] = [
  {
    type: 'General',
    children: [
      { label: 'Cut', value: 'Ctrl + X' },
      { label: 'Copy', value: 'Ctrl + C' },
      { label: 'Paste', value: 'Ctrl + V' },
      { label: 'Paste as Plain Text', value: 'Ctrl + Shift + V' },
      { label: 'Duplicate', value: 'Ctrl + D' },
      { label: 'Select All', value: 'Ctrl + A' },
      { label: 'Undo', value: 'Ctrl + Z' },
      { label: 'Redo', value: 'Ctrl + Y' },
      { label: 'Delete', value: 'Delete / Backspace' },
      { label: 'Multi-select', value: 'Hold Ctrl or Shift' },
      { label: 'Open Search & Replace', value: 'Ctrl + F' },
      { label: 'Print', value: 'Ctrl + P' },
      { label: 'Close Dialog', value: 'ESC' },
    ],
  },
  {
    type: 'Slide Show',
    children: [
      { label: 'Start Slideshow from Beginning', value: 'F5' },
      { label: 'Start Slideshow from Current Slide', value: 'Shift + F5' },
      { label: 'Previous Slide', value: '↑ / ← / PgUp' },
      { label: 'Next Slide', value: '↓ / → / PgDown' },
      { label: 'Next Slide', value: 'Enter / Space' },
      { label: 'Exit Slideshow', value: 'ESC' },
    ],
  },
  {
    type: 'Slide Editing',
    children: [
      { label: 'New Slide', value: 'Enter' },
      { label: 'Pan Canvas', value: 'Space + mouse drag' },
      { label: 'Zoom Canvas', value: 'Ctrl + mouse wheel' },
      { label: 'Zoom In Canvas', value: 'Ctrl + =' },
      { label: 'Zoom Out Canvas', value: 'Ctrl + -' },
      { label: 'Fit Canvas to Screen', value: 'Ctrl + 0' },
      { label: 'Previous Slide (no selection)', value: '↑' },
      { label: 'Next Slide (no selection)', value: '↓' },
      { label: 'Previous Slide', value: 'Mouse scroll up / PgUp' },
      { label: 'Next Slide', value: 'Mouse scroll down / PgDown' },
      { label: 'Quickly Create Text', value: 'Double-click empty area / T' },
      { label: 'Quickly Create Rectangle', value: 'R' },
      { label: 'Quickly Create Circle', value: 'O' },
      { label: 'Quickly Create Line', value: 'L' },
      { label: 'Exit Drawing Mode', value: 'Right-click' },
    ],
  },
  {
    type: 'Element Operations',
    children: [
      { label: 'Move', value: '↑ / ← / ↓ / →' },
      { label: 'Lock', value: 'Ctrl + L' },
      { label: 'Group', value: 'Ctrl + G' },
      { label: 'Ungroup', value: 'Ctrl + Shift + G' },
      { label: 'Bring to Front', value: 'Alt + F' },
      { label: 'Send to Back', value: 'Alt + B' },
      { label: 'Lock Aspect Ratio', value: 'Hold Ctrl or Shift' },
      { label: 'Create Horizontal / Vertical Lines', value: 'Hold Ctrl or Shift' },
      { label: 'Cycle Focused Element', value: 'Tab' },
      { label: 'Confirm Image Crop', value: 'Enter' },
      { label: 'Finish Custom Shape', value: 'Enter' },
    ],
  },
  {
    type: 'Table Editing',
    children: [
      { label: 'Focus Next Cell', value: 'Tab' },
      { label: 'Move Focused Cell', value: '↑ / ← / ↓ / →' },
      { label: 'Insert Row Above', value: 'Ctrl + ↑' },
      { label: 'Insert Row Below', value: 'Ctrl + ↓' },
      { label: 'Insert Column Left', value: 'Ctrl + ←' },
      { label: 'Insert Column Right', value: 'Ctrl + →' },
    ],
  },
  {
    type: 'Chart Data Editing',
    children: [
      { label: 'Focus Next Row', value: 'Enter' },
    ],
  },
  {
    type: 'Text Editing',
    children: [
      { label: 'Bold', value: 'Ctrl + B' },
      { label: 'Italic', value: 'Ctrl + I' },
      { label: 'Underline', value: 'Ctrl + U' },
      { label: 'Inline Code', value: 'Ctrl + E' },
      { label: 'Superscript', value: 'Ctrl + ;' },
      { label: 'Subscript', value: `Ctrl + '` },
      { label: 'Select Paragraph', value: `ESC` },
    ],
  },
  {
    type: 'Other Quick Actions',
    children: [
      { label: 'Add Image - Paste an image from the system clipboard' },
      { label: 'Add Image - Drag a local image onto the canvas' },
      { label: 'Add Image - Paste SVG code on the canvas' },
      { label: 'Add Image - Paste an image link from Pexels' },
      { label: 'Add Text - Paste text from the system clipboard' },
      { label: 'Add Text - Drag selected text from outside onto the canvas' },
      { label: 'Text Editing - Supports Markdown syntax for lists and blockquotes' },
    ],
  },
]