import {ADDON_ROOT_PATH} from '../consts';
import {ResponseError, ResponseSuccess} from '../responses/success';
import {searchItemsByCiteKey} from '../utils/search';
import {getSelectedCollection} from '../utils/collections';
import {GetZoteroItemOptions} from '../types/get-zotero-item-options';
import {getGetItemOptionFromRequest} from '../utils/get-item-option-from-request';
import {Log} from '../utils/EndpointsLogger';
import {getItemCompleteByURI} from '../utils/item';
import {ZoteroItemWithMetadata} from '../types/complete-zotero-item';
import {paramsParser} from '../utils/params-parser';

declare const Zotero;

export const loadAddItemToCurrentCollection = (rootPath: string, path: string): void => {
  const myEndpoint = Zotero.Server.Endpoints[`/${ADDON_ROOT_PATH}/${rootPath}/${path}`] = function() {
  };
  myEndpoint.prototype = {
    supportedMethods: ['GET'],
    supportedDataTypes: 'application/json',

    /**
         * @param {citeKey} string: the file extension to filter by; no filter if empty
         * @param {uris} string: get item(s) by Zotero URI
         */
    async init(postData) {

      Zotero.debug(JSON.stringify(postData.query));

      const {citeKey, uris}  = paramsParser(postData.query as Record<string, string>) as { citeKey: string []| undefined, uris: string[] | undefined };



      const option: GetZoteroItemOptions = getGetItemOptionFromRequest(postData);


      try {

        if ((!citeKey || citeKey?.length === 0) && (!uris || uris?.length === 0)) {

          throw new Error('citeKey or key for item to add to collection is required');
        }

        let items: ZoteroItemWithMetadata[] = [];

        if (uris && uris.length > 0) {

          const itemsToAdd = await getItemCompleteByURI(uris);
          if (itemsToAdd?.length > 0) {
            items = itemsToAdd;
          }
        }

        if (citeKey && citeKey.length > 0) {

          // search items by cite key, the result should be the only item
          items = await searchItemsByCiteKey(citeKey, option)
        }

        /**
                 * Check if item is found, if not throw error
                 */
        if (items.length === 0) {
          throw new Error(`No item found for the identifier: ${citeKey}`);
        }

        Log('total number of results: ', items.length);
        Log('Add item to collection:', items);
        const currentCollection = getSelectedCollection();

        let itemsAdded = 0;
        if (currentCollection) {
          Log('Add item to collection:', currentCollection)
          for (const itemComplete of items) {
            itemComplete.item.addToCollection(currentCollection.key);
            await itemComplete.item.saveTx();
            itemsAdded++;
          }
        }
        else {
          throw new Error('No item or collection found or selected');
        }
        return ResponseSuccess(`
          ${itemsAdded} items added to collection ${currentCollection.key}`, items.map(item => item.uri));
      }
      catch (e: any) {
        return ResponseError(e.message as string);
      }
    },
  }
}
