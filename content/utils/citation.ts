import {Item, ItemCitation} from '../types/complete-zotero-item';
import {getCitationEngine} from './get-citation-engine';
import {CiteOptions} from '../types/cite-options';

declare let Zotero: any;
export const getItemCitation = (items: Item[], opt?: CiteOptions): ItemCitation => {
  const cslEngine = getCitationEngine(opt);
  const html = Zotero.Cite.makeFormattedBibliographyOrCitationList(cslEngine, items, 'html')
  const text = Zotero.Cite.makeFormattedBibliographyOrCitationList(cslEngine, items, 'text')
  const rtf = Zotero.Cite.makeFormattedBibliographyOrCitationList(cslEngine, items, 'rtf')
  return {
    html,
    text,
    rtf,
  }

}
