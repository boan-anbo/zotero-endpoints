declare let Zotero: any;

export const getRandomId = (): string => Zotero.Utilities.randomString(10);
