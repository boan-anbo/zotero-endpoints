import {CitationInputItem, getCitationCluster} from './get-citation-cluster';
import {searchItemsByCiteKey} from './search';
import {GetCitationRequest, GetCitationRequestEntry, GetCitationResponse} from '../types/get-citation-request-response';


export const getCitationsFromRequest = async (request: GetCitationRequest): Promise<GetCitationResponse> => {
  const inputItems: CitationInputItem[][] = await getCitationsFromCitekeys(request.lines);
  return getCitationCluster(inputItems, request.options);
}

export const getCitationsFromCitekeys = async (citationLines: GetCitationRequestEntry[][]): Promise<CitationInputItem[][]> => {
  // async looping
  const resultLines: CitationInputItem[][] = [];
  for await (const citationLine of citationLines) {
    const lineCitationItems: CitationInputItem[] = [];
    for await (const citationItem of citationLine) {
      const item = await searchItemsByCiteKey(citationItem.citeKey);
      if (item && item.length > 0) {
        lineCitationItems.push(new CitationInputItem(item[0].item, citationItem.locatorInfo));
      }
    }
    resultLines.push(lineCitationItems);
  }
  return resultLines;
}
