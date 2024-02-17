import {getCompleteZoteroItems} from './get-complete-item';
import {Item, ZoteroItemWithMetadata} from '../types/complete-zotero-item';
import {GetZoteroItemOptions} from '../types/get-zotero-item-options';

declare const Zotero: any

export const getCurrentItem = (): Item => {
  const pane = Zotero.getActiveZoteroPane()
  const selectedItems = pane.getSelectedItems()
  return selectedItems[0]
}

export const getSelectedItems = (): Item[] => {
  const pane = Zotero.getActiveZoteroPane()
  return pane.getSelectedItems() as Item[]
}
export const getSelectedItemsComplete = (): ZoteroItemWithMetadata[] => {
  const selectedItems = getSelectedItems()
  return getCompleteZoteroItems(selectedItems);
}
export const getItemById = (id: string): Item => Zotero.Items.get(id) as Item

export const getItemByIdComplete = (id: string): ZoteroItemWithMetadata[] => getCompleteZoteroItems([getItemById(id)]);

export const getItemByURI = async (key: string): Promise<Item> => await Zotero.URI.getURIItem(key) as Item

export const getItemCompleteByURI = async (URIs: string[], opt?: GetZoteroItemOptions): Promise<ZoteroItemWithMetadata[]> => {
  const items: Item[] = [];
  for ( const URI of URIs) {

    const item = await getItemByURI(URI);
    if (item) {
      items.push(item);
    }
  }

  return getCompleteZoteroItems(items, opt);
}
