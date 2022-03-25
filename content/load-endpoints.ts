// import {loadHelloWorld} from './health';

// eslint-disable-next-line @typescript-eslint/require-await
import {loadHelloWorld} from './endpoints/health';
import {loadGetSelectedItemAttachments, loadSelectNextItemsEndpoint} from './endpoints/select';
import {loadAddItemToCurrentCollectionByCiteKey} from './endpoints/collection';
import {loadSearchItems} from './endpoints/search';

export const loadAllEndpoints = async (): Promise<void> => {

  loadHelloWorld('hello', 'world');
  // selections
  loadSelectNextItemsEndpoint('select', 'nextItems');
  loadGetSelectedItemAttachments('select', 'attachmentPaths');
  // collections
  loadAddItemToCurrentCollectionByCiteKey('collection', 'addToCurrent');
  // search
  loadSearchItems('search', 'items');
}

