import { storeToRefs } from 'pinia'
import { useSlidesStore } from '@/store'
import type { PPTElement } from '@/types/slides'
import { ElementOrderCommands } from '@/types/edit'
import useHistorySnapshot from '@/hooks/useHistorySnapshot'

export default () => {
  const slidesStore = useSlidesStore()
  const { currentSlide } = storeToRefs(slidesStore)

  const { addHistorySnapshot } = useHistorySnapshot()

  /**
   * Get the hierarchical range of the combined element
   * @param elementList List of all elements on this page
   * @param combineElementList List of combined elements
   */
  const getCombineElementLevelRange = (elementList: PPTElement[], combineElementList: PPTElement[]) => {
    return {
      minLevel: elementList.findIndex(_element => _element.id === combineElementList[0].id),
      maxLevel: elementList.findIndex(_element => _element.id === combineElementList[combineElementList.length - 1].id),
    }
  }

  /**
   * Move one level up
   * @param elementList List of all elements on this page
   * @param element The element currently being operated on
   */
  const moveUpElement = (elementList: PPTElement[], element: PPTElement) => {
    const copyOfElementList: PPTElement[] = JSON.parse(JSON.stringify(elementList))

    // If the element being operated on is a composite element member，All members of the group need to be moved together
    if (element.groupId) {

      // Get all members of the group，and the hierarchical scope of all members
      const combineElementList = copyOfElementList.filter(_element => _element.groupId === element.groupId)
      const { minLevel, maxLevel } = getCombineElementLevelRange(elementList, combineElementList)

      // Already at the top，Unable to move further
      if (maxLevel === elementList.length - 1) return

      // Maximum value by combining member ranges，Get the elements of the previous layer of the combination，Then remove the combined element from the element list（and cache the list of removed elements）
      // If the upper element is in another combination，Then insert the above removed combination element above the upper combination
      // If the upper element is not in any group，Then insert the above removed combined element above the upper element
      const nextElement = copyOfElementList[maxLevel + 1]
      const movedElementList = copyOfElementList.splice(minLevel, combineElementList.length)

      if (nextElement.groupId) {
        const nextCombineElementList = copyOfElementList.filter(_element => _element.groupId === nextElement.groupId)
        copyOfElementList.splice(minLevel + nextCombineElementList.length, 0, ...movedElementList)
      }
      else copyOfElementList.splice(minLevel + 1, 0, ...movedElementList)
    }

    // If the element being operated on is not a member of the composite element
    else {

      // Get the level of the element in the list
      const level = elementList.findIndex(item => item.id === element.id)

      // Already at the top，Unable to move further
      if (level === elementList.length - 1) return

      // Get the elements of the previous layer of the combination，Then remove the combined element from the element list（and cache the list of removed elements）
      const nextElement = copyOfElementList[level + 1]
      const movedElement = copyOfElementList.splice(level, 1)[0]

      // Maximum value by combining member ranges，Get the elements of the previous layer of the combination，Then remove the combined element from the element list（and cache the list of removed elements）
      // If the upper element is in another combination，Then insert the above removed combination element above the upper combination
      // If the upper element is not in any group，Then insert the above removed combined element above the upper element
      if (nextElement.groupId) {
        const combineElementList = copyOfElementList.filter(_element => _element.groupId === nextElement.groupId)
        copyOfElementList.splice(level + combineElementList.length, 0, movedElement)
      }
      else copyOfElementList.splice(level + 1, 0, movedElement)
    }

    return copyOfElementList
  }

  /**
   * Move down one level，The operation method is the same as moving up
   * @param elementList List of all elements on this page
   * @param element The element currently being operated on
   */
  const moveDownElement = (elementList: PPTElement[], element: PPTElement) => {
    const copyOfElementList: PPTElement[] = JSON.parse(JSON.stringify(elementList))

    if (element.groupId) {
      const combineElementList = copyOfElementList.filter(_element => _element.groupId === element.groupId)
      const { minLevel } = getCombineElementLevelRange(elementList, combineElementList)
      if (minLevel === 0) return

      const prevElement = copyOfElementList[minLevel - 1]
      const movedElementList = copyOfElementList.splice(minLevel, combineElementList.length)

      if (prevElement.groupId) {
        const prevCombineElementList = copyOfElementList.filter(_element => _element.groupId === prevElement.groupId)
        copyOfElementList.splice(minLevel - prevCombineElementList.length, 0, ...movedElementList)
      }
      else copyOfElementList.splice(minLevel - 1, 0, ...movedElementList)
    }

    else {
      const level = elementList.findIndex(item => item.id === element.id)
      if (level === 0) return

      const prevElement = copyOfElementList[level - 1]
      const movedElement = copyOfElementList.splice(level, 1)[0]

      if (prevElement.groupId) {
        const combineElementList = copyOfElementList.filter(_element => _element.groupId === prevElement.groupId)
        copyOfElementList.splice(level - combineElementList.length, 0, movedElement)
      }
      else copyOfElementList.splice(level - 1, 0, movedElement)
    }

    return copyOfElementList
  }

  /**
   * Put on top
   * @param elementList List of all elements on this page
   * @param element The element currently being operated on
   */
  const moveTopElement = (elementList: PPTElement[], element: PPTElement) => {
    const copyOfElementList: PPTElement[] = JSON.parse(JSON.stringify(elementList))

    // If the element being operated on is a composite element member，All members of the group need to be moved together
    if (element.groupId) {

      // Get all members of the group，and the hierarchical scope of all members
      const combineElementList = copyOfElementList.filter(_element => _element.groupId === element.groupId)
      const { minLevel, maxLevel } = getCombineElementLevelRange(elementList, combineElementList)

      // Already at the top，Unable to move further
      if (maxLevel === elementList.length - 1) return null

      // Remove the combined element from the element list，Then add the removed element to the top of the element list
      const movedElementList = copyOfElementList.splice(minLevel, combineElementList.length)
      copyOfElementList.push(...movedElementList)
    }

    // If the element being operated on is not a member of the composite element
    else {

      // Get the level of the element in the list
      const level = elementList.findIndex(item => item.id === element.id)

      // Already at the top，Unable to move further
      if (level === elementList.length - 1) return null

      // Remove the combined element from the element list，Then add the removed element to the bottom of the element list
      copyOfElementList.splice(level, 1)
      copyOfElementList.push(element)
    }

    return copyOfElementList
  }

  /**
   * Place on the ground floor，The operation method is the same as pinned
   * @param elementList List of all elements on this page
   * @param element The element currently being operated on
   */
  const moveBottomElement = (elementList: PPTElement[], element: PPTElement) => {
    const copyOfElementList: PPTElement[] = JSON.parse(JSON.stringify(elementList))

    if (element.groupId) {
      const combineElementList = copyOfElementList.filter(_element => _element.groupId === element.groupId)
      const { minLevel } = getCombineElementLevelRange(elementList, combineElementList)
      if (minLevel === 0) return

      const movedElementList = copyOfElementList.splice(minLevel, combineElementList.length)
      copyOfElementList.unshift(...movedElementList)
    }

    else {
      const level = elementList.findIndex(item => item.id === element.id)
      if (level === 0) return

      copyOfElementList.splice(level, 1)
      copyOfElementList.unshift(element)
    }

    return copyOfElementList
  }

  /**
   * Adjust element level
   * @param element Elements that need to be adjusted
   * @param command adjust command：move up、move down、pin to top、bottom
   */
  const orderElement = (element: PPTElement, command: ElementOrderCommands) => {
    let newElementList
    
    if (command === ElementOrderCommands.UP) newElementList = moveUpElement(currentSlide.value.elements, element)
    else if (command === ElementOrderCommands.DOWN) newElementList = moveDownElement(currentSlide.value.elements, element)
    else if (command === ElementOrderCommands.TOP) newElementList = moveTopElement(currentSlide.value.elements, element)
    else if (command === ElementOrderCommands.BOTTOM) newElementList = moveBottomElement(currentSlide.value.elements, element)

    if (!newElementList) return

    slidesStore.updateSlide({ elements: newElementList })
    addHistorySnapshot()
  }

  return {
    orderElement,
  }
}