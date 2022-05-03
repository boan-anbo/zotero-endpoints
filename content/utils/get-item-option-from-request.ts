import {GetZoteroItemOptions} from '../types/get-zotero-item-options';

export const getGetItemOptionFromRequest = (post: any): GetZoteroItemOptions => {
  const styleId = post?.query?.styleId ?? 'chicago-note-bibliography';

  return {
    styleId,
  }
}
