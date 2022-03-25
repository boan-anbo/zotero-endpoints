import {ADDON_ROOT_PATH} from '../consts';
import {searchItems} from '../utils/search';
import {ResponseError, ResponseSuccessPayload} from '../responses/success';

declare const Zotero;

export const loadSearchItems = (rootPath: string, path: string): void => {
  const myEndpoint = Zotero.Server.Endpoints[`/${ADDON_ROOT_PATH}/${rootPath}/${path}`] = function() {
  };
  myEndpoint.prototype = {
    supportedMethods: ['GET'],
    supportedDataTypes: 'application/json',

    /**
         * @param {field} string: the field to search for
         * @param {qeury} string: the query to search for
         */
    async init(postData) {

      Zotero.debug(JSON.stringify(postData.query));

      const {field, query, operator}: { field: string, query: string, operator: string | undefined } = postData.query;

      try {
        // search items by cite key, the result should be the only item
        const items = await searchItems(field, query, operator ?? 'is');
        Zotero.debug('Ready to return', JSON.stringify(items));
        return ResponseSuccessPayload(items);
      }
      catch (e: any) {
        return ResponseError(e.message as string);
      }
    },
  }
}
