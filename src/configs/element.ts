export const ELEMENT_TYPE_ZH: { [key: string]: string } = {
  text: 'text',
  image: 'picture',
  shape: 'shape',
  line: 'line',
  chart: 'chart',
  table: 'sheet',
  video: 'video',
  audio: 'Audio',
  latex: 'formula',
}

export const MIN_SIZE: { [key: string]: number } = {
  text: 40,
  image: 20,
  shape: 20,
  chart: 200,
  table: 30,
  video: 250,
  audio: 20,
  latex: 20,
}