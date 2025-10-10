import { storeToRefs } from 'pinia'
import { useMainStore } from '@/store'
import { copyText, readClipboard } from '@/utils/clipboard'
import { encrypt } from '@/utils/crypto'
import message from '@/utils/message'
import usePasteTextClipboardData from '@/hooks/usePasteTextClipboardData'
import useDeleteElement from './useDeleteElement'

export default () => {
  const mainStore = useMainStore()
  const { activeElementIdList, activeElementList } = storeToRefs(mainStore)

  const { pasteTextClipboardData } = usePasteTextClipboardData()
  const { deleteElement } = useDeleteElement()

  // Encrypt the selected elements and copy them to the clipboard
  const copyElement = () => {
    if (!activeElementIdList.value.length) return

    const text = encrypt(JSON.stringify({
      type: 'elements',
      data: activeElementList.value,
    }))

    copyText(text).then(() => {
      mainStore.setEditorareaFocus(true)
    })
  }

  // Copy the selected elements and then delete them (cut)
  const cutElement = () => {
    copyElement()
    deleteElement()
  }

  // Attempt to decrypt and paste element data from the clipboard
  const pasteElement = () => {
    readClipboard().then(text => {
      pasteTextClipboardData(text)
    }).catch(err => message.warning(err))
  }

  // Copy the selected elements and immediately paste them
  const quickCopyElement = () => {
    copyElement()
    pasteElement()
  }

  return {
    copyElement,
    cutElement,
    pasteElement,
    quickCopyElement,
  }
}