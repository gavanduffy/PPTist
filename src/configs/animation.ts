import type { TurningMode } from '@/types/slides'

export const ANIMATION_DEFAULT_DURATION = 1000
export const ANIMATION_DEFAULT_TRIGGER = 'click'
export const ANIMATION_CLASS_PREFIX = 'animate__'

export const ENTER_ANIMATIONS = [
  {
    type: 'bounce',
    name: 'Jump.',
    children: [
      { name: 'Eject', value: 'bounceIn' },
      { name: 'Pop right in.', value: 'bounceInLeft' },
      { name: 'Pop Left In', value: 'bounceInRight' },
      { name: 'Pop it up.', value: 'bounceInUp' },
      { name: 'Fall in.', value: 'bounceInDown' },
    ],
  },
  {
    type: 'fade',
    name: 'Out of sight',
    children: [
      { name: 'Float', value: 'fadeIn' },
      { name: 'Float Down', value: 'fadeInDown' },
      { name: 'Float down long distances in', value: 'fadeInDownBig' },
      { name: 'Float to Right', value: 'fadeInLeft' },
      { name: 'Float to the right long distance', value: 'fadeInLeftBig' },
      { name: 'Float to Left', value: 'fadeInRight' },
      { name: 'Float to Left Long Distance', value: 'fadeInRightBig' },
      { name: 'Float Up', value: 'fadeInUp' },
      { name: 'Float up long distance', value: 'fadeInUpBig' },
      { name: 'Float from Left', value: 'fadeInTopLeft' },
      { name: 'Float from Right', value: 'fadeInTopRight' },
      { name: 'Float from Bottom Left', value: 'fadeInBottomLeft' },
      { name: 'Float from Bottom Right', value: 'fadeInBottomRight' },
    ],
  },
  {
    type: 'rotate',
    name: 'Rotate',
    children: [
      { name: 'Rotate In', value: 'rotateIn' },
      { name: 'Go around the bottom left.', value: 'rotateInDownLeft' },
      { name: 'Go right in.', value: 'rotateInDownRight' },
      { name: 'Go left in.', value: 'rotateInUpLeft' },
      { name: 'Go right in.', value: 'rotateInUpRight' },
    ],
  },
  {
    type: 'zoom',
    name: 'Zoom',
    children: [
      { name: 'Zoom in.', value: 'zoomIn' },
      { name: 'Quantified access', value: 'zoomInDown' },
      { name: 'Zoom in from left.', value: 'zoomInLeft' },
      { name: 'Zoom Right In', value: 'zoomInRight' },
      { name: 'Zoom Up In', value: 'zoomInUp' },
    ],
  },
  {
    type: 'slide',
    name: 'Slide into',
    children: [
      { name: 'Falling in.', value: 'slideInDown' },
      { name: 'Slide from Right', value: 'slideInLeft' },
      { name: 'Slide from Left', value: 'slideInRight' },
      { name: 'Slide Up', value: 'slideInUp' },
    ],
  },
  {
    type: 'flip',
    name: 'Flip',
    children: [
      { name: 'XAxis Flip In', value: 'flipInX' },
      { name: 'YAxis Flip In', value: 'flipInY' },
    ],
  },
  {
    type: 'back',
    name: 'Zoom In Slidein',
    children: [
      { name: 'Slip in to the decentralised.', value: 'backInDown' },
      { name: 'Slide from Left Zoomin', value: 'backInLeft' },
      { name: 'Zoom Right In', value: 'backInRight' },
      { name: 'Zoom Up Slip', value: 'backInUp' },
    ],
  },
  {
    type: 'lightSpeed',
    name: 'Fly in.',
    children: [
      { name: 'Fly right in.', value: 'lightSpeedInRight' },
      { name: 'Fly left in.', value: 'lightSpeedInLeft' },
    ],
  },
]

export const EXIT_ANIMATIONS = [
  {
    type: 'bounce',
    name: 'Jump.',
    children: [
      { name: 'Eject', value: 'bounceOut' },
      { name: 'Popup Left', value: 'bounceOutLeft' },
      { name: 'Popup Right', value: 'bounceOutRight' },
      { name: 'Popup Up', value: 'bounceOutUp' },
      { name: 'Popup Down', value: 'bounceOutDown' },
    ],
  },
  {
    type: 'fade',
    name: 'Out of sight',
    children: [
      { name: 'Eject', value: 'fadeOut' },
      { name: 'Float Down', value: 'fadeOutDown' },
      { name: 'Float down long distances', value: 'fadeOutDownBig' },
      { name: 'Float to Left', value: 'fadeOutLeft' },
      { name: 'Float to Left Long Distance', value: 'fadeOutLeftBig' },
      { name: 'Float to Right', value: 'fadeOutRight' },
      { name: 'Float to the right long distance', value: 'fadeOutRightBig' },
      { name: 'Float Up', value: 'fadeOutUp' },
      { name: 'Float up long distances', value: 'fadeOutUpBig' },
      { name: 'Float from Left', value: 'fadeOutTopLeft' },
      { name: 'Float from Right', value: 'fadeOutTopRight' },
      { name: 'Float from Bottom Left', value: 'fadeOutBottomLeft' },
      { name: 'Float from Bottom Right', value: 'fadeOutBottomRight' },
    ],
  },
  {
    type: 'rotate',
    name: 'Rotate',
    children: [
      { name: 'Rotate Quit', value: 'rotateOut' },
      { name: 'Exiting Around Bottom Left', value: 'rotateOutDownLeft' },
      { name: 'Exiting Around Bottom Right', value: 'rotateOutDownRight' },
      { name: 'Exiting around the top left', value: 'rotateOutUpLeft' },
      { name: 'Exiting around the right', value: 'rotateOutUpRight' },
    ],
  },
  {
    type: 'zoom',
    name: 'Zoom',
    children: [
      { name: 'Zoom Out', value: 'zoomOut' },
      { name: 'Zoom Out Down', value: 'zoomOutDown' },
      { name: 'Exit from Left Zoom Out', value: 'zoomOutLeft' },
      { name: 'Exit from Right Zoom Out', value: 'zoomOutRight' },
      { name: 'Zoom Out Up', value: 'zoomOutUp' },
    ],
  },
  {
    type: 'slide',
    name: 'Slide Out',
    children: [
      { name: 'Falling out.', value: 'slideOutDown' },
      { name: 'Slide from Left', value: 'slideOutLeft' },
      { name: 'Slide From Right', value: 'slideOutRight' },
      { name: 'Slide Up', value: 'slideOutUp' },
    ],
  },
  {
    type: 'flip',
    name: 'Flip',
    children: [
      { name: 'XAxes Flip Out', value: 'flipOutX' },
      { name: 'YAxes Flip Out', value: 'flipOutY' },
    ],
  },
  {
    type: 'back',
    name: 'Zoom Out',
    children: [
      { name: 'Zoom Out Down', value: 'backOutDown' },
      { name: 'Slide out of Left Zoom Out', value: 'backOutLeft' },
      { name: 'Slip From Right Zoom Out', value: 'backOutRight' },
      { name: 'Zoom Out Up', value: 'backOutUp' },
    ],
  },
  {
    type: 'lightSpeed',
    name: 'Fly out.',
    children: [
      { name: 'Fly from the right.', value: 'lightSpeedOutRight' },
      { name: 'Fly out of left.', value: 'lightSpeedOutLeft' },
    ],
  },
]

export const ATTENTION_ANIMATIONS = [
  {
    type: 'shake',
    name: 'Shake',
    children: [
      { name: 'Shake right and left.', value: 'shakeX' },
      { name: 'Shake it up and down.', value: 'shakeY' },
      { name: 'Shake your head.', value: 'headShake' },
      { name: 'Swing', value: 'swing' },
      { name: 'Shake', value: 'wobble' },
      { name: 'Scared.', value: 'tada' },
      { name: 'Jelly.', value: 'jello' },
    ],
  },
  {
    type: 'other',
    name: 'Other',
    children: [
      { name: 'Jump.', value: 'bounce' },
      { name: 'Blink', value: 'flash' },
      { name: 'Pulse.', value: 'pulse' },
      { name: 'Rubber band.', value: 'rubberBand' },
      { name: 'Heart rate.（Come on.）', value: 'heartBeat' },
    ],
  },
]

interface SlideAnimation {
  label: string
  value: TurningMode
}

export const SLIDE_ANIMATIONS: SlideAnimation[] = [
  { label: 'None', value: 'no' },
  { label: 'Random', value: 'random' },
  { label: 'Move Left and Left', value: 'slideX' },
  { label: 'Move Up and Down', value: 'slideY' },
  { label: 'Move Left and Left（3D）', value: 'slideX3D' },
  { label: 'Move Up and Down（3D）', value: 'slideY3D' },
  { label: 'Fade', value: 'fade' },
  { label: 'Rotate', value: 'rotate' },
  { label: 'Expand Up and Down', value: 'scaleY' },
  { label: 'Expand Left/ Right', value: 'scaleX' },
  { label: 'Zoom In', value: 'scale' },
  { label: 'Zoom Out', value: 'scaleReverse' },
]