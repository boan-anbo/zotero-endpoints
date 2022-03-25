declare const Zotero;

export const selectNextNumberofItems = (range: number, viewItems: boolean): void => {
  const pane = Zotero.getActiveZoteroPane()

  const items = pane.getSortedItems()
  const selectedItems = pane.getSelectedItems();

  let lastSelectedItem = selectedItems[selectedItems.length - 1]

  if (!lastSelectedItem) {
    lastSelectedItem = items[0]
  }

  if (!lastSelectedItem) {
    throw new Error('No last item selected')
  }

  const selectedItemId = lastSelectedItem.id;

  const currentIndex: number = items.findIndex(i => i.id === selectedItemId)

  let intervalIndex = 1

  let foundNext = false;

  let nextItems = [];

  while (foundNext === false) {
    const startIndex = currentIndex + intervalIndex;
    const endIndex = currentIndex + intervalIndex + range;
    nextItems = items.slice(startIndex, endIndex);
    const regularNextItems = nextItems.filter(nextItem => nextItem.isRegularItem())
    if (regularNextItems.length > 0) {
      foundNext = true;
    }

    if ( endIndex > items.length - 1) {
      nextItems = []
      foundNext = true
    }

    intervalIndex++


  }

  if (nextItems) {
    pane.selectItems(nextItems.map(i =>  i.id ))


    if (viewItems) {
      pane.viewItems(nextItems)
    }

  }
  else {
    return;
  }

}

export const getSelectedAttachments = (extension?: string): string[] => {
  const pane = Zotero.getActiveZoteroPane()
  const selectedItems = pane.getSelectedItems()
  const attachments = [];
  selectedItems.forEach(item =>     {
    if (item.isRegularItem()) {
      item.getAttachments().forEach(attachmentId => attachments.push(Zotero.Items.get(attachmentId)))
    }
  })
  let paths = attachments.map(att => att.getFilePath())

  if (extension) {
    paths = paths.filter(path => path.toLowerCase().endsWith(extension.toLowerCase()))
  }
  return paths.filter(path => path)
}
