<template>
  <div class="multi-position-panel">
    <ButtonGroup class="row">
      <Button style="flex: 1;" v-tooltip="'Align left'" @click="alignElement(ElementAlignCommands.LEFT)"><IconAlignLeft /></Button>
      <Button style="flex: 1;" v-tooltip="'Center horizontally'" @click="alignElement(ElementAlignCommands.HORIZONTAL)"><IconAlignHorizontally /></Button>
      <Button style="flex: 1;" v-tooltip="'Align right'" @click="alignElement(ElementAlignCommands.RIGHT)"><IconAlignRight /></Button>
    </ButtonGroup>
    <ButtonGroup class="row">
      <Button style="flex: 1;" v-tooltip="'Align top'" @click="alignElement(ElementAlignCommands.TOP)"><IconAlignTop /></Button>
      <Button style="flex: 1;" v-tooltip="'Center vertically'" @click="alignElement(ElementAlignCommands.VERTICAL)"><IconAlignVertically /></Button>
      <Button style="flex: 1;" v-tooltip="'Align bottom'" @click="alignElement(ElementAlignCommands.BOTTOM)"><IconAlignBottom /></Button>
    </ButtonGroup>
    <ButtonGroup class="row" v-if="displayItemCount > 2">
      <Button style="flex: 1;" @click="uniformHorizontalDisplay()">Distribute Horizontally</Button>
      <Button style="flex: 1;" @click="uniformVerticalDisplay()">Distribute Vertically</Button>
    </ButtonGroup>

    <Divider />

    <ButtonGroup class="row">
      <Button :disabled="!canCombine" @click="combineElements()" style="flex: 1;"><IconGroup style="margin-right: 3px;" />Group</Button>
      <Button :disabled="canCombine" @click="uncombineElements()" style="flex: 1;"><IconUngroup style="margin-right: 3px;" />Ungroup</Button>
    </ButtonGroup>
  </div>
</template>

<script lang="ts" setup>
import { ElementAlignCommands } from '@/types/edit'
import useCombineElement from '@/hooks/useCombineElement'
import useAlignActiveElement from '@/hooks/useAlignActiveElement'
import useAlignElementToCanvas from '@/hooks/useAlignElementToCanvas'
import useUniformDisplayElement from '@/hooks/useUniformDisplayElement'
import Divider from '@/components/Divider.vue'
import Button from '@/components/Button.vue'
import ButtonGroup from '@/components/ButtonGroup.vue'

const { canCombine, combineElements, uncombineElements } = useCombineElement()
const { alignActiveElement } = useAlignActiveElement()
const { alignElementToCanvas } = useAlignElementToCanvas()
const { displayItemCount, uniformHorizontalDisplay, uniformVerticalDisplay } = useUniformDisplayElement()

// When multiple elements are selected, determine their state before aligning:
// If the selection is a grouped element, align it to the canvas.
// Otherwise (the selection can be grouped or includes multiple groups), align the elements relative to one another.
const alignElement = (command: ElementAlignCommands) => {
  if (canCombine.value) alignActiveElement(command)
  else alignElementToCanvas(command)
}
</script>

<style lang="scss" scoped>
.row {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>