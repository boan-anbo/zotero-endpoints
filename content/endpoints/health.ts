import {ADDON_ROOT_PATH} from '../consts';

declare const Zotero: any

export const loadHealth = (rootPath: string, path: string): void => {
  const myEndpoint = Zotero.Server.Endpoints[`/${ADDON_ROOT_PATH}/${rootPath}/${path}`] = function() {
  };
  myEndpoint.prototype = {
    supportedMethods: ['GET'],

    init: async (postData, sendResponseCallback) => {

      const pane = Zotero.getActiveZoteroPane()
      const selectedItems = pane.getSelectedItems()
      const item = selectedItems[0]
      const value = item

      await sendResponseCallback(200, 'application/json',
        JSON.stringify(value))
    },
  }
}
