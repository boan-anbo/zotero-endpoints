import {ADDON_ROOT_PATH} from '../consts';
import {getSelectedAttachments, selectAnItemInCurrentCollection, selectNextNumberofItems} from '../utils/selection';
import {ResponseError, ResponseSuccess, ResponseSuccessPayloadOnly} from '../responses/success';

declare const Zotero: any

export const loadSelectNextItemsEndpoint = (rootPath: string, path: string): void => {
  const myEndpoint = Zotero.Server.Endpoints[`/${ADDON_ROOT_PATH}/${rootPath}/${path}`] = function() {
  };
  myEndpoint.prototype = {
    supportedMethods: ['GET'],
    supportedDataTypes: 'application/json',

    /**
     * @param {range} number: The number of items to select
     * @param {viewItems} boolean: Whether to view the selected items
     */
    async init(postData)  {

      Zotero.debug(JSON.stringify(postData.query));

      let {range, viewItems}: {range: number, viewItems: boolean} = postData.query;

      if (!range) {
        range = 1;
      }

      if (!viewItems) {
        viewItems = false;
      }

      try {
        selectNextNumberofItems(range, viewItems)
      }
      catch (e: any) {
        return ResponseError(e.message as string);
      }
      return ResponseSuccess();
    },
  }
}

export const loadGetSelectedItemAttachments = (rootPath: string, path: string): void => {
  const myEndpoint = Zotero.Server.Endpoints[`/${ADDON_ROOT_PATH}/${rootPath}/${path}`] = function() {
  };
  myEndpoint.prototype = {
    supportedMethods: ['GET'],
    supportedDataTypes: 'application/json',

    /**
     * @param {postData.extension} string: the file extension to filter by; no filter if empty
     */
    async init(postData)  {

      Zotero.debug(JSON.stringify(postData.query));

      const {extension}: {extension: string} = postData.query;

      try {
        const paths = getSelectedAttachments(extension)
        return ResponseSuccessPayloadOnly(paths);
      }
      catch (e: any) {
        return ResponseError(e.message as string);
      }
    },
  }
}

export const loadSelectAnyItem = (rootPath: string, path: string): void => {
  const myEndpoint = Zotero.Server.Endpoints[`/${ADDON_ROOT_PATH}/${rootPath}/${path}`] = function() {
  };
  myEndpoint.prototype = {
    supportedMethods: ['GET'],
    supportedDataTypes: 'application/json',

    async init()  {

      try {
        if (selectAnItemInCurrentCollection()) {

          return ResponseSuccessPayloadOnly();
        }
        else {
          return ResponseError('No item selected');
        }
      }
      catch (e: any) {
        return ResponseError(e.message as string);
      }
    },
  }
}
