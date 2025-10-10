import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/store'

export default () => {
  const mainStore = useMainStore()
  const { canvasPercentage, canvasScale, canvasDragged } = storeToRefs(mainStore)

  const canvasScalePercentage = computed(() => Math.round(canvasScale.value * 100) + '%')

  /**
   * Adjust the canvas zoom percentage.
   * @param command Zoom command: increase or decrease.
   */
  const scaleCanvas = (command: '+' | '-') => {
    let percentage = canvasPercentage.value
    const step = 5
    const max = 200
    const min = 30
    if (command === '+' && percentage <= max) percentage += step
    if (command === '-' && percentage >= min) percentage -= step

    mainStore.setCanvasPercentage(percentage)
  }

  /**
   * Set the canvas scale.
   * Instead of applying the value directly, update the visible area percentage
   * so the scale is recalculated dynamically.
   * @param value Target canvas scale.
   */
  const setCanvasScalePercentage = (value: number) => {
    const percentage = Math.round(value / canvasScale.value * canvasPercentage.value) / 100
    mainStore.setCanvasPercentage(percentage)
  }

  /**
   * Reset canvas size and position.
   */
  const resetCanvas = () => {
    mainStore.setCanvasPercentage(90)
    if (canvasDragged) mainStore.setCanvasDragged(false)
  }

  return {
    canvasScalePercentage,
    setCanvasScalePercentage,
    scaleCanvas,
    resetCanvas,
  }
}