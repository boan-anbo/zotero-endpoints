import {Item, ZoteroItemWithMetadata} from '../types/complete-zotero-item';
import {GetZoteroItemOptions} from '../types/get-zotero-item-options';
import {getItemCitation} from './citation';

declare const Zotero: any;

export const getCompleteZoteroItems = (items: Item[], opt?: GetZoteroItemOptions): ZoteroItemWithMetadata[] => items.map(item => {
  const citationKey = item.getField('citationKey')
  const attachments = [];
  if (item.isRegularItem()) {
    item.getAttachments().forEach(attachmentId => attachments.push(Zotero.Items.get(attachmentId)))
  }
  const citation = opt?.includeCitation ? getItemCitation([item], opt) : undefined;
  const key = item.key;
  const id = item.id;
  const uri = Zotero.URI.getItemURI(item)
  return {
    id,
    key,
    uri,
    citationKey,
    item,
    attachments,
    citation,
  }

})
