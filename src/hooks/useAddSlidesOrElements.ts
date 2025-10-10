import { storeToRefs } from 'pinia'
import { nanoid } from 'nanoid'
import { useSlidesStore, useMainStore } from '@/store'
import type { PPTElement, Slide } from '@/types/slides'
import { createSlideIdMap, createElementIdMap, getElementRange } from '@/utils/element'
import useHistorySnapshot from '@/hooks/useHistorySnapshot'

export default () => {
  const mainStore = useMainStore()
  const slidesStore = useSlidesStore()
  const { currentSlide } = storeToRefs(slidesStore)

  const { addHistorySnapshot } = useHistorySnapshot()

  /**
   * Add the provided element data (a group of elements).
   * @param elements The list of elements to insert.
   */
  const addElementsFromData = (elements: PPTElement[]) => {
    const { groupIdMap, elIdMap } = createElementIdMap(elements)

    const firstElement = elements[0]
    let offset = 0
    let lastSameElement: PPTElement | undefined
    
    do {
      lastSameElement = currentSlide.value.elements.find(el => {
        if (el.type !== firstElement.type) return false
  
        const { minX: oMinX, maxX: oMaxX, minY: oMinY, maxY: oMaxY } = getElementRange(el)
        const { minX: nMinX, maxX: nMaxX, minY: nMinY, maxY: nMaxY } = getElementRange({
          ...firstElement,
          left: firstElement.left + offset,
          top: firstElement.top + offset
        })
        if (
          oMinX === nMinX &&
          oMaxX === nMaxX &&
          oMinY === nMinY &&
          oMaxY === nMaxY
        ) return true
  
        return false
      })
      if (lastSameElement) offset += 10

    } while (lastSameElement)
    
    for (const element of elements) {
      element.id = elIdMap[element.id]

      element.left = element.left + offset
      element.top = element.top + offset

      if (element.groupId) element.groupId = groupIdMap[element.groupId]
    }
    slidesStore.addElement(elements)
    mainStore.setActiveElementIdList(Object.values(elIdMap))
    addHistorySnapshot()
  }

  /**
   * Add the provided slide data.
   * @param slide The slides to insert.
   */
  const addSlidesFromData = (slides: Slide[]) => {
    const slideIdMap = createSlideIdMap(slides)
    const newSlides = slides.map(slide => {
      const { groupIdMap, elIdMap } = createElementIdMap(slide.elements)

      for (const element of slide.elements) {
        element.id = elIdMap[element.id]
        if (element.groupId) element.groupId = groupIdMap[element.groupId]
		
        // If the element is bound to a slide navigation link
        if (element.link && element.link.type === 'slide') {

          // If the destination slide exists in the slides being added, update the binding
          if (slideIdMap[element.link.target]) {
            element.link.target = slideIdMap[element.link.target]
          }
          // Otherwise remove the slide navigation link because the destination will not exist
          else delete element.link
        }
      }
      // Replace animation ids with freshly generated values
      if (slide.animations) {
        for (const animation of slide.animations) {
          animation.id = nanoid(10)
          animation.elId = elIdMap[animation.elId]
        }
      }
      return {
        ...slide,
        id: slideIdMap[slide.id],
      }
    })
    slidesStore.addSlide(newSlides)
    addHistorySnapshot()
  }

  return {
    addElementsFromData,
    addSlidesFromData,
  }
}