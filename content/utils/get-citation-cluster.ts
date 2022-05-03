import {CiteOptions} from '../types/cite-options';

declare let Zotero: any;
import {Item} from '../types/complete-zotero-item';
import {getRandomId} from './get-random-id';
import {getCitationEngine} from './get-citation-engine';
import {GetCitationResponse} from '../types/get-citation-request-response';

export interface CitationNote {
  index: number
  citation: string
  citation_id: string
}

export interface LocatorInfo {
  label?: LocatorLabel
  locator?: string
  prefix?: string
  suffix?: string
}

export type LocatorLabel = 'page' | 'book' | 'chapter' | 'column' | 'figure' | 'folio' | 'issue' | 'line' | 'note' | 'opus' | 'paragraph' | 'part' | 'section' | 'sub verbo' | 'volume' | 'verse'

export class CitationInputItem {
  id: string
  uris: string
  itemData: Item
  locator?: string
  label: LocatorLabel = 'page'
  prefix?: string
  suffix?: string

  constructor(item: Item, locator?: LocatorInfo) {
    this.id = item.id;
    Zotero.debug(item)
    // this.itemData =  Zotero.Cite.System.prototype.retrieveItem(item.id);
    this.itemData = item;
    this.uris = getRandomId();
    if (locator) {
      this.locator = locator.locator ?? undefined;
      this.label = locator.label ?? 'page';
      this.prefix = locator.prefix ?? undefined;
      this.suffix = locator.suffix ?? undefined;
    }
  }
}

export class CitationProcessItem {
  citationID = getRandomId();
  citationItems: CitationInputItem[] = [];
  properties: {
    noteIndex: number
  }

  constructor(citationItems: CitationInputItem[], properties: {
    noteIndex: number
  }) {
    this.citationItems = citationItems;
    this.properties = properties;
  }
}

export interface CitationProcessInfo {
  bibchange: boolean
  citation_errors: string[]
}

// the citations are in two dimensions because each entry, i.e. lines, could have multiple input items.
export const getCitationCluster = (citationItemLines: CitationInputItem[][], citeOptions?: CiteOptions): GetCitationResponse => {
  const result: CitationNote [] = [];
  const cslEngine = getCitationEngine(citeOptions);
  const bibliographyEntries = new Set<string>();
  let citationLineIndex = 1;
  // const addedCitationLines: CitationProcessItem[] = [];
  const addedCitationLineInfo: [string, number][] = [];
  for (const citationLine of citationItemLines) {
    const citationProcessItem = new CitationProcessItem(citationLine, {
      noteIndex: citationLineIndex,
    });
    // Zotero.debug({
    //   citationLine,
    //   addedCitationLines,
    //   citationProcessItem,
    // })
    // this returns two entities, Citation Info, and the Citation Entry
    const citationEntry = (cslEngine.processCitationCluster(
      citationProcessItem,
      [],
      []
    ) as [CitationProcessInfo, CitationNote[]])[1];
    // Zotero.debug({lineInfo, citationInfo});
    // addedCitationLines.push(citationProcessItem);
    addedCitationLineInfo.push([citationProcessItem.citationID, (citationProcessItem.properties.noteIndex + 1)]);
    // check if it's the last citation item
    // const isLast = i === citationItemLines.length - 1;
    // if (isLast) {
    //   result = citationEntry
    // }
    result.push(...citationEntry);
    const bibliographyString = Zotero.Cite.makeFormattedBibliography(cslEngine, citeOptions.format) as string;
    bibliographyEntries.add(bibliographyString);
    Zotero.debug({
      addedCitaionLines: addedCitationLineInfo,
    })
    citationLineIndex++;
  }
  // joining bibliography entries set
  const bibliography = Array.from(bibliographyEntries).sort().map(entry => entry.replace(',\n','\n')).join('').trim();

  return {
    notes: result,
    citeOptions,
    bibliography,
  };
}


