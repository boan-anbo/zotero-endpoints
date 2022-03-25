declare const Zotero: any

export const getCurrentItem = () => {
  const pane = Zotero.getActiveZoteroPane()
  const selectedItems = pane.getSelectedItems()
  const item = selectedItems[0]
  return item
}
