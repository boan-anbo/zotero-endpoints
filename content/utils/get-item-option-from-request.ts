import {GetZoteroItemOptions} from '../types/get-zotero-item-options';

export const getGetItemOptionFromRequest = (post: any): GetZoteroItemOptions => {
  const styleId = post?.query?.styleId ?? 'chicago-note-bibliography';
  /**
   * Contrived in order to avoid JS converting any value to boolean true.
   */
  const includeCitation = typeof post?.query?.includeCitation === 'string' ? JSON.parse(post?.query.includeCitation as string) : false

  return {
    styleId,
    includeCitation,
  }
}
