import {CiteOptions} from './cite-options';
import {CitationNote, LocatorInfo} from '../utils/get-citation-cluster';

export class GetCitationRequest {
  lines: GetCitationRequestEntry[][]
  options: CiteOptions

  static fromJsonRequest(json: Partial<GetCitationRequest>): GetCitationRequest {
    const request = new GetCitationRequest();
    request.lines = json.lines.map(line => line.map(entry => GetCitationRequestEntry.fromJson(entry)));
    request.options = CiteOptions.fromJson(json.options);

    if (request.lines.length === 0) {
      throw new Error('No citation lines');
    }
    return request;
  }
}

export class GetCitationResponse {
  notes: CitationNote[]
  citeOptions: CiteOptions
  bibliography: string


}

export class GetCitationRequestEntry {
  citeKey: string
  locatorInfo?: LocatorInfo

  static fromJson(json: Partial<GetCitationRequestEntry>): GetCitationRequestEntry {
    const entry = new GetCitationRequestEntry();
    entry.citeKey = json.citeKey;
    entry.locatorInfo = json.locatorInfo;
    return entry;
  }
}
