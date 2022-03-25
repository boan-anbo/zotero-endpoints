import {ADDON_ROOT_PATH} from '../consts';
import {ResponseError, ResponseSuccessPayload} from '../responses/success';
import {searchItemsByCiteKey} from '../utils/search';
import {getSelectedCollection} from '../utils/collections';

declare const Zotero;

export const loadAddItemToCurrentCollectionByCiteKey = (rootPath: string, path: string): void => {
  const myEndpoint = Zotero.Server.Endpoints[`/${ADDON_ROOT_PATH}/${rootPath}/${path}`] = function() {
  };
  myEndpoint.prototype = {
    supportedMethods: ['GET'],
    supportedDataTypes: 'application/json',

    /**
         * @param {citeKey} string: the file extension to filter by; no filter if empty
         */
    async init(postData) {

      Zotero.debug(JSON.stringify(postData.query));

      const {citeKey}: { citeKey: string } = postData.query;

      try {
        // search items by cite key, the result should be the only item
        const items = await searchItemsByCiteKey(citeKey)
        const firstItem = items[0];
        const currentCollection = getSelectedCollection();

        if (firstItem && currentCollection) {
          firstItem.addToCollection(currentCollection.key);
          const saveResult = await firstItem.saveTx();
          Zotero.debug(JSON.stringify(saveResult));
          if (!saveResult) {
            return ResponseError( `Error saving item, item probably already in collection ${currentCollection.key}`, firstItem);
          }
        }
        else {
          throw new Error('No item or collection found or selected');
        }
        return ResponseSuccessPayload(firstItem);
      }
      catch (e: any) {
        return ResponseError(e.message as string);
      }
    },
  }
}
