import {loadAllEndpoints} from './load-endpoints';
import {showPopup} from './utils/notifications';
import {EndpointAttachments} from './attachments';

declare const Zotero: any
// declare const Components: any

const monkey_patch_marker = 'EndpointsMonkeyPatched'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function patch(object, method, patcher) {
  if (object[method][monkey_patch_marker]) return
  object[method] = patcher(object[method])
  object[method][monkey_patch_marker] = true
}

class Endpoints { // tslint:disable-line:variable-name
  private initialized = false
  private globals: Record<string, any>
  private strings: any
  public Attachments = new EndpointAttachments();

  // eslint-disable-next-line @typescript-eslint/require-await
  public async load(globals: Record<string, any>) {
    this.globals = globals

    if (this.initialized) return
    this.initialized = true

    this.strings = globals.document.getElementById('zotero-endpoints-strings')


    await loadAllEndpoints();

  }

  public test() {
    showPopup('test popup', 1239)
  }

}

if (!Zotero.Endpoints) Zotero.Endpoints = new Endpoints
