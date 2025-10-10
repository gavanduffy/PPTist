import type { TurningMode } from '@/types/slides'

export const ANIMATION_DEFAULT_DURATION = 1000
export const ANIMATION_DEFAULT_TRIGGER = 'click'
export const ANIMATION_CLASS_PREFIX = 'animate__'

export const ENTER_ANIMATIONS = [
  {
    type: 'bounce',
    name: 'Bounce',
    children: [
      { name: 'Bounce In', value: 'bounceIn' },
      { name: 'Bounce In from Left', value: 'bounceInLeft' },
      { name: 'Bounce In from Right', value: 'bounceInRight' },
      { name: 'Bounce In from Bottom', value: 'bounceInUp' },
      { name: 'Bounce In from Top', value: 'bounceInDown' },
    ],
  },
  {
    type: 'fade',
    name: 'Fade',
    children: [
      { name: 'Fade In', value: 'fadeIn' },
      { name: 'Fade In from Top', value: 'fadeInDown' },
      { name: 'Fade In from Top (Far)', value: 'fadeInDownBig' },
      { name: 'Fade In from Left', value: 'fadeInLeft' },
      { name: 'Fade In from Left (Far)', value: 'fadeInLeftBig' },
      { name: 'Fade In from Right', value: 'fadeInRight' },
      { name: 'Fade In from Right (Far)', value: 'fadeInRightBig' },
      { name: 'Fade In from Bottom', value: 'fadeInUp' },
      { name: 'Fade In from Bottom (Far)', value: 'fadeInUpBig' },
      { name: 'Fade In from Top Left', value: 'fadeInTopLeft' },
      { name: 'Fade In from Top Right', value: 'fadeInTopRight' },
      { name: 'Fade In from Bottom Left', value: 'fadeInBottomLeft' },
      { name: 'Fade In from Bottom Right', value: 'fadeInBottomRight' },
    ],
  },
  {
    type: 'rotate',
    name: 'Rotate',
    children: [
      { name: 'Rotate In', value: 'rotateIn' },
      { name: 'Rotate In from Bottom Left', value: 'rotateInDownLeft' },
      { name: 'Rotate In from Bottom Right', value: 'rotateInDownRight' },
      { name: 'Rotate In from Top Left', value: 'rotateInUpLeft' },
      { name: 'Rotate In from Top Right', value: 'rotateInUpRight' },
    ],
  },
  {
    type: 'zoom',
    name: 'Zoom',
    children: [
      { name: 'Zoom In', value: 'zoomIn' },
      { name: 'Zoom In from Top', value: 'zoomInDown' },
      { name: 'Zoom In from Left', value: 'zoomInLeft' },
      { name: 'Zoom In from Right', value: 'zoomInRight' },
      { name: 'Zoom In from Bottom', value: 'zoomInUp' },
    ],
  },
  {
    type: 'slide',
    name: 'Slide In',
    children: [
      { name: 'Slide In from Top', value: 'slideInDown' },
      { name: 'Slide In from Left', value: 'slideInLeft' },
      { name: 'Slide In from Right', value: 'slideInRight' },
      { name: 'Slide In from Bottom', value: 'slideInUp' },
    ],
  },
  {
    type: 'flip',
    name: 'Flip',
    children: [
      { name: 'Flip In X', value: 'flipInX' },
      { name: 'Flip In Y', value: 'flipInY' },
    ],
  },
  {
    type: 'back',
    name: 'Back In',
    children: [
      { name: 'Back In from Top', value: 'backInDown' },
      { name: 'Back In from Left', value: 'backInLeft' },
      { name: 'Back In from Right', value: 'backInRight' },
      { name: 'Back In from Bottom', value: 'backInUp' },
    ],
  },
  {
    type: 'lightSpeed',
    name: 'Fly In',
    children: [
      { name: 'Light Speed In from Right', value: 'lightSpeedInRight' },
      { name: 'Light Speed In from Left', value: 'lightSpeedInLeft' },
    ],
  },
]

export const EXIT_ANIMATIONS = [
  {
    type: 'bounce',
    name: 'Bounce',
    children: [
      { name: 'Bounce Out', value: 'bounceOut' },
      { name: 'Bounce Out to Left', value: 'bounceOutLeft' },
      { name: 'Bounce Out to Right', value: 'bounceOutRight' },
      { name: 'Bounce Out to Top', value: 'bounceOutUp' },
      { name: 'Bounce Out to Bottom', value: 'bounceOutDown' },
    ],
  },
  {
    type: 'fade',
    name: 'Fade',
    children: [
      { name: 'Fade Out', value: 'fadeOut' },
      { name: 'Fade Out to Bottom', value: 'fadeOutDown' },
      { name: 'Fade Out to Bottom (Far)', value: 'fadeOutDownBig' },
      { name: 'Fade Out to Left', value: 'fadeOutLeft' },
      { name: 'Fade Out to Left (Far)', value: 'fadeOutLeftBig' },
      { name: 'Fade Out to Right', value: 'fadeOutRight' },
      { name: 'Fade Out to Right (Far)', value: 'fadeOutRightBig' },
      { name: 'Fade Out to Top', value: 'fadeOutUp' },
      { name: 'Fade Out to Top (Far)', value: 'fadeOutUpBig' },
      { name: 'Fade Out to Top Left', value: 'fadeOutTopLeft' },
      { name: 'Fade Out to Top Right', value: 'fadeOutTopRight' },
      { name: 'Fade Out to Bottom Left', value: 'fadeOutBottomLeft' },
      { name: 'Fade Out to Bottom Right', value: 'fadeOutBottomRight' },
    ],
  },
  {
    type: 'rotate',
    name: 'Rotate',
    children: [
      { name: 'Rotate Out', value: 'rotateOut' },
      { name: 'Rotate Out to Bottom Left', value: 'rotateOutDownLeft' },
      { name: 'Rotate Out to Bottom Right', value: 'rotateOutDownRight' },
      { name: 'Rotate Out to Top Left', value: 'rotateOutUpLeft' },
      { name: 'Rotate Out to Top Right', value: 'rotateOutUpRight' },
    ],
  },
  {
    type: 'zoom',
    name: 'Zoom',
    children: [
      { name: 'Zoom Out', value: 'zoomOut' },
      { name: 'Zoom Out to Bottom', value: 'zoomOutDown' },
      { name: 'Zoom Out to Left', value: 'zoomOutLeft' },
      { name: 'Zoom Out to Right', value: 'zoomOutRight' },
      { name: 'Zoom Out to Top', value: 'zoomOutUp' },
    ],
  },
  {
    type: 'slide',
    name: 'Slide Out',
    children: [
      { name: 'Slide Out to Bottom', value: 'slideOutDown' },
      { name: 'Slide Out to Left', value: 'slideOutLeft' },
      { name: 'Slide Out to Right', value: 'slideOutRight' },
      { name: 'Slide Out to Top', value: 'slideOutUp' },
    ],
  },
  {
    type: 'flip',
    name: 'Flip',
    children: [
      { name: 'Flip Out X', value: 'flipOutX' },
      { name: 'Flip Out Y', value: 'flipOutY' },
    ],
  },
  {
    type: 'back',
    name: 'Back Out',
    children: [
      { name: 'Back Out to Bottom', value: 'backOutDown' },
      { name: 'Back Out to Left', value: 'backOutLeft' },
      { name: 'Back Out to Right', value: 'backOutRight' },
      { name: 'Back Out to Top', value: 'backOutUp' },
    ],
  },
  {
    type: 'lightSpeed',
    name: 'Fly Out',
    children: [
      { name: 'Light Speed Out to Right', value: 'lightSpeedOutRight' },
      { name: 'Light Speed Out to Left', value: 'lightSpeedOutLeft' },
    ],
  },
]

export const ATTENTION_ANIMATIONS = [
  {
    type: 'shake',
    name: 'Shake',
    children: [
      { name: 'Shake X', value: 'shakeX' },
      { name: 'Shake Y', value: 'shakeY' },
      { name: 'Head Shake', value: 'headShake' },
      { name: 'Swing', value: 'swing' },
      { name: 'Shake', value: 'wobble' },
      { name: 'Tada', value: 'tada' },
      { name: 'Jello', value: 'jello' },
    ],
  },
  {
    type: 'other',
    name: 'Other',
    children: [
      { name: 'Bounce', value: 'bounce' },
      { name: 'Flash', value: 'flash' },
      { name: 'Pulse', value: 'pulse' },
      { name: 'Rubber Band', value: 'rubberBand' },
      { name: 'Heart Beat (Fast)', value: 'heartBeat' },
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
  { label: 'Slide Left/Right', value: 'slideX' },
  { label: 'Slide Up/Down', value: 'slideY' },
  { label: 'Slide Left/Right (3D)', value: 'slideX3D' },
  { label: 'Slide Up/Down (3D)', value: 'slideY3D' },
  { label: 'Crossfade', value: 'fade' },
  { label: 'Rotate', value: 'rotate' },
  { label: 'Unfold Vertical', value: 'scaleY' },
  { label: 'Unfold Horizontal', value: 'scaleX' },
  { label: 'Zoom In', value: 'scale' },
  { label: 'Zoom Out', value: 'scaleReverse' },
]