import {CiteOptions} from '../types/cite-options';

declare let Zotero: any;

export const getCitationEngine = (citeOptions?: CiteOptions): any => {

  // set it to false to use cite-proc-js not Zotero's wasm version. The two implementations of cite-proc have different methods.
  Zotero.Prefs.set('cite.useCiteprocRs', false);

  if (!citeOptions) {
    citeOptions = new CiteOptions();
  }

  const styleLink = `http://www.zotero.org/styles/${citeOptions.styleId}`

  Zotero.debug(`Using style ${citeOptions.styleId} from ${styleLink}`);


  const style = Zotero.Styles.get(styleLink);
  return style.getCiteProc('en-US', citeOptions.format);

}
