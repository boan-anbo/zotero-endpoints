// import {loadHelloWorld} from './health';

// eslint-disable-next-line @typescript-eslint/require-await
import {loadHealth} from './endpoints/health';
import {loadGetSelectedItemAttachments, loadSelectAnyItem, loadSelectNextItemsEndpoint} from './endpoints/select';
import {loadAddItemToCurrentCollection} from './endpoints/collection';
import {loadSearchItems} from './endpoints/search';
import {loadGetItems, loadSelectedItems} from './endpoints/items';
import {loadCiteItems} from './endpoints/cite';

export const loadAllEndpoints = async (): Promise<void> => {

  loadHealth('hello', 'world');
  // selections
  loadSelectNextItemsEndpoint('select', 'nextItems');
  loadGetSelectedItemAttachments('select', 'attachmentPaths');
  loadSelectAnyItem('select', 'any');
  // collections
  loadAddItemToCurrentCollection('collection', 'addToCurrent');
  // search
  loadSearchItems('search', 'items');
  // items
  loadSelectedItems('items', 'selected');
  loadGetItems('items', '');
  // cite
  loadCiteItems('cite', 'items');
}

