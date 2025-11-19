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
    type: 'Universal',
    children: [
      { label: 'Cut', value: 'Ctrl + X' },
      { label: 'Copy', value: 'Ctrl + C' },
      { label: 'Paste', value: 'Ctrl + V' },
      { label: 'Paste as Plain Text', value: 'Ctrl + Shift + V' },
      { label: 'Quick Copy Paste', value: 'Ctrl + D' },
      { label: 'Select All', value: 'Ctrl + A' },
      { label: 'Undo', value: 'Ctrl + Z' },
      { label: 'Restore', value: 'Ctrl + Y' },
      { label: 'Delete', value: 'Delete / Backspace' },
      { label: 'Multiple', value: 'Hold it. Ctrl or Shift' },
      { label: 'Open Search Replace', value: 'Ctrl + F' },
      { label: 'Print', value: 'Ctrl + P' },
      { label: 'Close the window', value: 'ESC' },
    ],
  },
  {
    type: 'Slide Show',
    children: [
      { label: 'Slideshow from the beginning', value: 'F5' },
      { label: 'Slideshow from the current', value: 'Shift + F5' },
      { label: 'Toggle Previous Page', value: '↑ / ← / PgUp' },
      { label: 'Switch to Next Page', value: '↓ / → / PgDown' },
      { label: 'Switch to Next Page', value: 'Enter / Space' },
      { label: 'Quit Show', value: 'ESC' },
    ],
  },
  {
    type: 'Slide Edit',
    children: [
      { label: 'New Slide', value: 'Enter' },
      { label: 'Move canvas', value: 'Space + Mouse Drag' },
      { label: 'Scale canvas', value: 'Ctrl + Mouse Wheel' },
      { label: 'Zoom in on the canvas.', value: 'Ctrl + =' },
      { label: 'Zoom out the canvas.', value: 'Ctrl + -' },
      { label: 'Fit canvas to the current screen', value: 'Ctrl + 0' },
      { label: 'Previous Page（No element selected）', value: '↑' },
      { label: 'Next Page（No element selected）', value: '↓' },
      { label: 'Previous Page', value: 'Mouse Roll / PgUp' },
      { label: 'Next Page', value: 'Mouse Down Roll / PgDown' },
      { label: 'Quick Create Text', value: 'Double-click the space / T' },
      { label: 'Create a rectangle quickly', value: 'R' },
      { label: 'Quick Create a Circle', value: 'O' },
      { label: 'Quick Create Line', value: 'L' },
      { label: 'Quit drawing status', value: 'Right mouse button' },
    ],
  },
  {
    type: 'Element Operation',
    children: [
      { label: 'Move', value: '↑ / ← / ↓ / →' },
      { label: 'Lock', value: 'Ctrl + L' },
      { label: 'Group', value: 'Ctrl + G' },
      { label: 'Ungroup', value: 'Ctrl + Shift + G' },
      { label: 'Top floor', value: 'Alt + F' },
      { label: 'Set Bottom', value: 'Alt + B' },
      { label: 'Lock Wide Scale', value: 'Hold it. Ctrl or Shift' },
      { label: 'Create Horizontal / Vertical Lines', value: 'Hold it. Ctrl or Shift' },
      { label: 'Toggle Focus Elements', value: 'Tab' },
      { label: 'Confirm image crop', value: 'Enter' },
      { label: 'Completion of custom shape drawing', value: 'Enter' },
    ],
  },
  {
    type: 'Table Edit',
    children: [
      { label: 'Focus on Next Cell', value: 'Tab' },
      { label: 'Move Focus Cells', value: '↑ / ← / ↓ / →' },
      { label: 'Insert a line above', value: 'Ctrl + ↑' },
      { label: 'Insert a row below', value: 'Ctrl + ↓' },
      { label: 'Insert a column to the left', value: 'Ctrl + ←' },
      { label: 'Insert a column to the right', value: 'Ctrl + →' },
    ],
  },
  {
    type: 'Chart Data Editing',
    children: [
      { label: 'Focus on the next line', value: 'Enter' },
    ],
  },
  {
    type: 'Text Edit',
    children: [
      { label: 'Bold', value: 'Ctrl + B' },
      { label: 'Italic', value: 'Ctrl + I' },
      { label: 'Underline', value: 'Ctrl + U' },
      { label: 'Line code', value: 'Ctrl + E' },
      { label: 'Upper Corner', value: 'Ctrl + ;' },
      { label: 'Lower Corner', value: `Ctrl + '` },
      { label: 'Selected Paragraph', value: `ESC` },
    ],
  },
  {
    type: 'Other Shortcut Operations',
    children: [
      { label: 'Add Picture - Paste pictures from the system clipboard' },
      { label: 'Add Picture - Drag local pictures into canvas' },
      { label: 'Add Picture - Paste in canvasSVGCode' },
      { label: 'Add Picture - Paste From pexels _Other Organiser' },
      { label: 'Add Text - Paste Text From System Clipboard' },
      { label: 'Add Text - Drag external selected text to canvas' },
      { label: 'Text Edit - Support markdown Syntax Create List and Reference' },
    ],
  },
]