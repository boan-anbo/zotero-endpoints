declare let Zotero: any;
export const Log = (message: string, payload?: any): void => {
  // pretty print the payload
  Zotero.debug(`[ZoteroEndpoints] ${message}: ${JSON.stringify(payload, null, 2)}`);
}
