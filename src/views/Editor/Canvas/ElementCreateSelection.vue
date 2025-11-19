<template>
  <div 
    class="element-create-selection"
    ref="selectionRef"
    @mousedown.stop="$event => createSelection($event)"
    @contextmenu.stop.prevent
  >
    <div :class="['selection', creatingElement?.type]" v-if="start && end" :style="position">

      <!-- Special for drawing lines -->
      <svg
        v-if="creatingElement?.type === 'line' && lineData"
        overflow="visible" 
        :width="lineData.svgWidth"
        :height="lineData.svgHeight"
      >
				<path
          :d="lineData.path" 
          stroke="#d14424" 
          fill="none" 
          stroke-width="2" 
        ></path>
			</svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore, useKeyboardStore } from '@/store'
import type { CreateElementSelectionData } from '@/types/edit'

const emit = defineEmits<{
  (event: 'created', payload: CreateElementSelectionData): void
}>()

const mainStore = useMainStore()
const { creatingElement } = storeToRefs(mainStore)
const { ctrlOrShiftKeyActive } = storeToRefs(useKeyboardStore())

const start = ref<[number, number]>()
const end = ref<[number, number]>()

const selectionRef = useTemplateRef<HTMLElement>('selectionRef')
const offset = ref({
  x: 0,
  y: 0,
})
onMounted(() => {
  if (!selectionRef.value) return
  const { x, y } = selectionRef.value.getBoundingClientRect()
  offset.value = { x, y }
})

// Drag the mouse to create an element to generate the position and size
// Get the start and end positions of a range
const createSelection = (e: MouseEvent) => {
  let isMouseDown = true

  const startPageX = e.pageX
  const startPageY = e.pageY
  start.value = [startPageX, startPageY]

  document.onmousemove = e => {
    if (!creatingElement.value || !isMouseDown) return

    let currentPageX = e.pageX
    let currentPageY = e.pageY

    // Press and holdCtrlkey orShiftKey time：
    // For non-line elements, you need to lock the width and height ratio，Line elements need to be locked horizontally or vertically
    if (ctrlOrShiftKeyActive.value) {
      const moveX = currentPageX - startPageX
      const moveY = currentPageY - startPageY

      // Horizontal and vertical drag distance，Later, the data in the other direction is calculated based on the direction with the larger drag distance.
      const absX = Math.abs(moveX)
      const absY = Math.abs(moveY)

      if (creatingElement.value.type === 'shape') {

        // Determine whether it is reverse drag：From upper left to lower right is forward operation，In addition, all cases are reverse operations
        const isOpposite = (moveY > 0 && moveX < 0) || (moveY < 0 && moveX > 0)

        if (absX > absY) {
          currentPageY = isOpposite ? startPageY - moveX : startPageY + moveX
        }
        else {
          currentPageX = isOpposite ? startPageX - moveY : startPageX + moveY
        }
      }

      else if (creatingElement.value.type === 'line') {
        if (absX > absY) currentPageY = startPageY
        else currentPageX = startPageX
      }
    }

    end.value = [currentPageX, currentPageY]
  }

  document.onmouseup = e => {
    document.onmousemove = null
    document.onmouseup = null

    if (e.button === 2) {
      setTimeout(() => mainStore.setCreatingElement(null), 0)
      return
    }

    isMouseDown = false

    const endPageX = e.pageX
    const endPageY = e.pageY

    const minSize = 30

    if (
      creatingElement.value?.type === 'line' &&
      (Math.abs(endPageX - startPageX) >= minSize || Math.abs(endPageY - startPageY) >= minSize)
    ) {
      emit('created', {
        start: start.value!,
        end: end.value!,
      })
    }
    else if (
      creatingElement.value?.type !== 'line' &&
      (Math.abs(endPageX - startPageX) >= minSize && Math.abs(endPageY - startPageY) >= minSize)
    ) {
      emit('created', {
        start: start.value!,
        end: end.value!,
      })
    }
    else {
      const defaultSize = 200
      const minX = Math.min(endPageX, startPageX)
      const minY = Math.min(endPageY, startPageY)
      const maxX = Math.max(endPageX, startPageX)
      const maxY = Math.max(endPageY, startPageY)
      const offsetX = maxX - minX >= minSize ? maxX - minX : defaultSize
      const offsetY = maxY - minY >= minSize ? maxY - minY : defaultSize
      emit('created', {
        start: [minX, minY],
        end: [minX + offsetX, minY + offsetY],
      })
    }
  }
}

// Data related to the path of drawing lines（Only used when the drawing element type is line）
const lineData = computed(() => {
  if (!start.value || !end.value) return null
  if (!creatingElement.value || creatingElement.value.type !== 'line') return null

  const [_startX, _startY] = start.value
  const [_endX, _endY] = end.value
  const minX = Math.min(_startX, _endX)
  const maxX = Math.max(_startX, _endX)
  const minY = Math.min(_startY, _endY)
  const maxY = Math.max(_startY, _endY)

  const svgWidth = maxX - minX >= 24 ? maxX - minX : 24
  const svgHeight = maxY - minY >= 24 ? maxY - minY : 24

  const startX = _startX === minX ? 0 : maxX - minX
  const startY = _startY === minY ? 0 : maxY - minY
  const endX = _endX === minX ? 0 : maxX - minX
  const endY = _endY === minY ? 0 : maxY - minY

  const path = `M${startX}, ${startY} L${endX}, ${endY}`

  return {
    svgWidth,
    svgHeight,
    startX,
    startY,
    endX,
    endY,
    path,
  }
})

// Based on the starting position and end position of the generated range，Calculate the position and size of an element when it is created
const position = computed(() => {
  if (!start.value || !end.value) return {}

  const [startX, startY] = start.value
  const [endX, endY] = end.value
  const minX = Math.min(startX, endX)
  const maxX = Math.max(startX, endX)
  const minY = Math.min(startY, endY)
  const maxY = Math.max(startY, endY)

  const width = maxX - minX
  const height = maxY - minY

  return {
    left: minX - offset.value.x + 'px',
    top: minY - offset.value.y + 'px',
    width: width + 'px',
    height: height + 'px',
  }
})
</script>

<style lang="scss" scoped>
.element-create-selection {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  cursor: crosshair;

  svg {
    overflow: visible;
  }
}
.selection {
  position: absolute;
  opacity: .8;

  &:not(.line) {
    border: 1px solid $themeColor;
  }
}
</style>