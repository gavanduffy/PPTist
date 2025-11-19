import { customAlphabet } from 'nanoid'
import { defineStore } from 'pinia'
import { ToolbarStates } from '@/types/toolbar'
import type { CreatingElement, ShapeFormatPainter, TextFormatPainter } from '@/types/edit'
import type { DialogForExportTypes } from '@/types/export'
import { type TextAttrs, defaultRichTextAttrs } from '@/utils/prosemirror/utils'

import { useSlidesStore } from './slides'

export interface MainState {
  activeElementIdList: string[]
  handleElementId: string
  activeGroupElementId: string
  hiddenElementIdList: string[]
  canvasPercentage: number
  canvasScale: number
  canvasDragged: boolean
  thumbnailsFocus: boolean
  editorAreaFocus: boolean
  disableHotkeys: boolean
  gridLineSize: number
  showRuler: boolean
  creatingElement: CreatingElement | null
  creatingCustomShape: boolean
  toolbarState: ToolbarStates
  clipingImageElementId: string
  isScaling: boolean
  richTextAttrs: TextAttrs
  selectedTableCells: string[]
  selectedSlidesIndex: number[]
  dialogForExport: DialogForExportTypes
  databaseId: string
  textFormatPainter: TextFormatPainter | null
  shapeFormatPainter: ShapeFormatPainter | null
  showSelectPanel: boolean
  showSearchPanel: boolean
  showNotesPanel: boolean
  showSymbolPanel: boolean
  showMarkupPanel: boolean
  showImageLibPanel: boolean
  showAIPPTDialog: boolean
}

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
export const databaseId = nanoid(10)

export const useMainStore = defineStore('main', {
  state: (): MainState => ({
    activeElementIdList: [], // selected elementIDgather，Include handleElementId
    handleElementId: '', // element being operated onID
    activeGroupElementId: '', // in the combined element member，Selected elements that can be manipulated independentlyID
    hiddenElementIdList: [], // hidden elementsIDgather
    canvasPercentage: 90, // Canvas visible area percentage
    canvasScale: 1, // Canvas scaling（Based on width{{slidesStore.viewportSize}}Pixel）
    canvasDragged: false, // The canvas is dragged and moved
    thumbnailsFocus: false, // Left navigation thumbnail area focus
    editorAreaFocus: false, //  Edit area focus
    disableHotkeys: false, // Disable shortcut keys
    gridLineSize: 0, // grid line size（0Indicates that grid lines are not displayed）
    showRuler: false, // Show ruler
    creatingElement: null, // Information about the element being inserted，Elements that need to be inserted by drawing（Word、shape、line）
    creatingCustomShape: false, // Drawing an arbitrary polygon
    toolbarState: ToolbarStates.SLIDE_DESIGN, // Right toolbar status
    clipingImageElementId: '', // Image currently being croppedID  
    richTextAttrs: defaultRichTextAttrs, // rich text state
    selectedTableCells: [], // Selected table cell
    isScaling: false, // Element scaling in progress
    selectedSlidesIndex: [], // The currently selected page index collection
    dialogForExport: '', // Export panel
    databaseId, // Identifies the currently appliedindexedDBdatabaseID
    textFormatPainter: null, // text format brush
    shapeFormatPainter: null, // Shape Format Painter
    showSelectPanel: false, // Open selection panel
    showSearchPanel: false, // Open the Find and Replace panel
    showNotesPanel: false, // Open the comments panel
    showSymbolPanel: false, // Open the Symbols panel
    showMarkupPanel: false, // Open the type annotation panel
    showImageLibPanel: false, // Open the Gallery panel
    showAIPPTDialog: false, // OpenAIPPTCreate window
  }),

  getters: {
    activeElementList(state) {
      const slidesStore = useSlidesStore()
      const currentSlide = slidesStore.currentSlide
      if (!currentSlide || !currentSlide.elements) return []
      return currentSlide.elements.filter(element => state.activeElementIdList.includes(element.id))
    },
  
    handleElement(state) {
      const slidesStore = useSlidesStore()
      const currentSlide = slidesStore.currentSlide
      if (!currentSlide || !currentSlide.elements) return null
      return currentSlide.elements.find(element => state.handleElementId === element.id) || null
    },
  },

  actions: {
    setActiveElementIdList(activeElementIdList: string[]) {
      if (activeElementIdList.length === 1) this.handleElementId = activeElementIdList[0]
      else this.handleElementId = ''
      
      this.activeElementIdList = activeElementIdList
    },
    
    setHandleElementId(handleElementId: string) {
      this.handleElementId = handleElementId
    },
    
    setActiveGroupElementId(activeGroupElementId: string) {
      this.activeGroupElementId = activeGroupElementId
    },
    
    setHiddenElementIdList(hiddenElementIdList: string[]) {
      this.hiddenElementIdList = hiddenElementIdList
    },
  
    setCanvasPercentage(percentage: number) {
      this.canvasPercentage = percentage
    },
  
    setCanvasScale(scale: number) {
      this.canvasScale = scale
    },
  
    setCanvasDragged(isDragged: boolean) {
      this.canvasDragged = isDragged
    },
  
    setThumbnailsFocus(isFocus: boolean) {
      this.thumbnailsFocus = isFocus
    },
  
    setEditorareaFocus(isFocus: boolean) {
      this.editorAreaFocus = isFocus
    },
  
    setDisableHotkeysState(disable: boolean) {
      this.disableHotkeys = disable
    },
  
    setGridLineSize(size: number) {
      this.gridLineSize = size
    },
  
    setRulerState(show: boolean) {
      this.showRuler = show
    },
  
    setCreatingElement(element: CreatingElement | null) {
      this.creatingElement = element
    },
  
    setCreatingCustomShapeState(state: boolean) {
      this.creatingCustomShape = state
    },
  
    setToolbarState(toolbarState: ToolbarStates) {
      this.toolbarState = toolbarState
    },
  
    setClipingImageElementId(elId: string) {
      this.clipingImageElementId = elId
    },
  
    setRichtextAttrs(attrs: TextAttrs) {
      this.richTextAttrs = attrs
    },
  
    setSelectedTableCells(cells: string[]) {
      this.selectedTableCells = cells
    },
  
    setScalingState(isScaling: boolean) {
      this.isScaling = isScaling
    },
    
    updateSelectedSlidesIndex(selectedSlidesIndex: number[]) {
      this.selectedSlidesIndex = selectedSlidesIndex
    },

    setDialogForExport(type: DialogForExportTypes) {
      this.dialogForExport = type
    },

    setTextFormatPainter(textFormatPainter: TextFormatPainter | null) {
      this.textFormatPainter = textFormatPainter
    },

    setShapeFormatPainter(shapeFormatPainter: ShapeFormatPainter | null) {
      this.shapeFormatPainter = shapeFormatPainter
    },

    setSelectPanelState(show: boolean) {
      this.showSelectPanel = show
    },

    setSearchPanelState(show: boolean) {
      this.showSearchPanel = show
    },

    setNotesPanelState(show: boolean) {
      this.showNotesPanel = show
    },

    setSymbolPanelState(show: boolean) {
      this.showSymbolPanel = show
    },

    setMarkupPanelState(show: boolean) {
      this.showMarkupPanel = show
    },

    setImageLibPanelState(show: boolean) {
      this.showImageLibPanel = show
    },

    setAIPPTDialogState(show: boolean) {
      this.showAIPPTDialog = show
    },
  },
})