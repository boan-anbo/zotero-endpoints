import {Item} from '../types/complete-zotero-item';

declare const Zotero;

export const getSelectedCollection = () => {
  const panel = Zotero.getActiveZoteroPane()
  return panel.getSelectedCollection();
}

/**
 * Get all items in sorted order (as currently shown in Zotero) in the current active collection, even when the collection is not activated.
 */
export const getAllItemsInSelectedCollection = (): Item[] => {
  const pane = Zotero.getActiveZoteroPane()
  const items = pane.getSortedItems()
  return items
}
