import {SearchCondition} from '../types/search-condition';
import {getCompleteZoteroItems} from './get-complete-item';
import {Item, ZoteroItemWithMetadata} from '../types/complete-zotero-item';
import {GetZoteroItemOptions} from '../types/get-zotero-item-options';

declare const Zotero;

export const searchItemsByCiteKey = async (citeKeys: string[], opt?: GetZoteroItemOptions): Promise<ZoteroItemWithMetadata[]> => {
  // loop over async cite keys
  const items: ZoteroItemWithMetadata[] = [];
  for (const citeKey of citeKeys) {
    const result = await searchItems([new SearchCondition('citationKey', 'is', citeKey)], undefined, opt);
    if (result?.length > 0) {
      items.push(...result);
    }
  }
  return items;
}
export const searchItemsByKey = async (key: string, opt?: GetZoteroItemOptions): Promise<ZoteroItemWithMetadata[]> => await searchItems([new SearchCondition('key', 'is', key)], undefined, opt);

export const searchItems = async (conditions: SearchCondition[], joinMode?: JoinMode, opt?: GetZoteroItemOptions): Promise<ZoteroItemWithMetadata[]> => {
  const s = new Zotero.Search();
  s.libraryID = Zotero.Libraries.userLibraryID;
  if (joinMode === 'ANY' || joinMode === undefined) {
    s.addCondition('joinMode', 'any');
  }

  conditions.forEach(condition => {
    s.addCondition(condition.field, condition.operator, condition.query);
  });


  const itemIds: string[] = await s.search();
  // Zotero.debug(JSON.stringify(itemIds));
  const items = itemIds.map(itemId => Zotero.Items.get(itemId)) as Item[];
  return getCompleteZoteroItems(items, opt);
}

export type JoinMode = 'ANY' | 'ALL'
