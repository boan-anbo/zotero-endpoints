declare const Zotero;

export const searchItemsByCiteKey = async (citeKey: string): Promise<any[]> => await searchItems('citationKey', citeKey)

export const searchItems = async (field: string, query: string, operator?:string): Promise<any[]> => {
  const s = new Zotero.Search();
  s.libraryID = Zotero.Libraries.userLibraryID;

  Zotero.debug(`Searching for ${field} ${operator} ${query}`);
  s.addCondition(field, operator === undefined ? 'is' : operator, query);
  const itemIds: string[] = await s.search();
  Zotero.debug(JSON.stringify(itemIds));
  return itemIds.map(itemId => Zotero.Items.get(itemId))
}
