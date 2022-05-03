export class CiteOptions {
  styleId?: string = 'chicago-note-bibliography';
  format?: 'text' | 'html' | 'rtf' = 'text'

  static fromJson(citeOptions: Partial<CiteOptions>): CiteOptions {
    const result = new CiteOptions();
    Object.assign(result, citeOptions);
    return result;
  }
}
