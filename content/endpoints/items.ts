import {ADDON_ROOT_PATH} from '../consts';
import {ResponseError, ResponseSuccessPayloadOnly} from '../responses/success';
import {getSelectedItemsComplete} from '../utils/item';
import {getGetItemOptionFromRequest} from '../utils/get-item-option-from-request';
import {searchItemsByCiteKey} from '../utils/search';

declare const Zotero;

export const loadSelectedItems = (rootPath: string, path: string): void => {
  const myEndpoint = Zotero.Server.Endpoints[`/${ADDON_ROOT_PATH}/${rootPath}/${path}`] = function() {
  };
  myEndpoint.prototype = {
    supportedMethods: ['GET'],
    supportedDataTypes: 'application/json',

    async init() {
      try {
        // search items by cite key, the result should be the only item
        return ResponseSuccessPayloadOnly(getSelectedItemsComplete());
      }
      catch (e: any) {
        return ResponseError(e.message as string);
      }
    },
  }
}

export const loadGetItems = (rootPath: string, path: string): void => {
  const myEndpoint = Zotero.Server.Endpoints[`/${ADDON_ROOT_PATH}/${rootPath}${path ? (`/${  path}`) : ''}`] = function() {
  };
  myEndpoint.prototype = {
    supportedMethods: ['GET'],
    supportedDataTypes: 'application/json',

    async init(request) {
      const opt = getGetItemOptionFromRequest(request)
      const {citeKey}= request.query
      Zotero.debug({opt, citeKey})
      try {
        const items = await searchItemsByCiteKey([citeKey as string], opt);
        // search items by cite key, the result should be the only item
        return ResponseSuccessPayloadOnly(items);
      }
      catch (e: any) {
        return ResponseError(e.message as string);
      }
    },
  }
}
