import {ADDON_ROOT_PATH} from '../consts';
import {ResponseError, ResponseSuccessPayload} from '../responses/success';
import {GetCitationRequest} from '../types/get-citation-request-response';
import {getCitationsFromRequest} from '../utils/get-citations-from-citekeys';

declare const Zotero;

export const loadCiteItems = (rootPath: string, path: string): void => {
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

      const request = GetCitationRequest.fromJsonRequest(postData.data as Partial<GetCitationRequest>);

      try {
        const result = await getCitationsFromRequest(request);
        return ResponseSuccessPayload(result);
      }
      catch (e: any) {
        return ResponseError(e.message as string);
      }
    },
  }
}
