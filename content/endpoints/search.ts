import {ADDON_ROOT_PATH} from '../consts';
// import {searchItems} from '../utils/search';
import {ResponseError, ResponseSuccessPayloadOnly} from '../responses/success';
import {searchItems} from '../utils/search';
import {SearchCondition, SearchRequest} from '../types/search-condition';
import {getGetItemOptionFromRequest} from '../utils/get-item-option-from-request';
// import {SearchCondition} from '../types/SearchCondition';

declare const Zotero;

export const loadSearchItems = (rootPath: string, path: string): void => {
  const myEndpoint = Zotero.Server.Endpoints[`/${ADDON_ROOT_PATH}/${rootPath}/${path}`] = function() {
  };
  myEndpoint.prototype = {
    supportedMethods: ['POST'],
    supportedDataTypes: 'application/json',

    /**
         * the structure of the json request
         * */
    async init(postData: any): Promise<any> {

      Zotero.debug(JSON.stringify(postData));


      try {
        const request = postData.data as SearchRequest;
        const opt = getGetItemOptionFromRequest(postData);
        const conditions = SearchCondition.fromJSON(request);
        const items = await searchItems(conditions, request.joinMode, opt);
        return ResponseSuccessPayloadOnly(items);
      }
      catch (e: any) {
        return ResponseError(e.message as string);
      }
    },
  }
}
