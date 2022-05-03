import {getCompleteZoteroItems} from './get-complete-item';
import {Item} from '../types/complete-zotero-item';

declare const Zotero: any

export const getCurrentItem = () => {
  const pane = Zotero.getActiveZoteroPane()
  const selectedItems = pane.getSelectedItems()
  const item = selectedItems[0]
  return item
}

export const getSelectedItems = () => {
  const pane = Zotero.getActiveZoteroPane()
  const selectedItems = pane.getSelectedItems() as Item[]
  return getCompleteZoteroItems(selectedItems);
}
