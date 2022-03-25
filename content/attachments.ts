import {pick} from './utils/file-picker';

declare const Zotero: any
declare const OS: any

export class EndpointAttachments {

  async copyAttachmentsToFolder() {
    const folderPath = await pick(
      'Select folder to copy attachments to',
      'folder'
    );

    const pane = Zotero.getActiveZoteroPane()
    const selectedItems = pane.getSelectedItems()
    const attachments = [];
    selectedItems.forEach(item => {
      if (item.isRegularItem()) {
        item.getAttachments().forEach(attachmentId => attachments.push(Zotero.Items.get(attachmentId)))
      }
    })
    attachments.forEach(attachment => {
      const oldFileName = attachment.attachmentFilename;
      const newFileName = OS.Path.join(folderPath, oldFileName);
      const path = attachment.getFilePath();
      Zotero.debug(`Copying ${path} to ${newFileName}`);
      OS.File.copy(path, newFileName);
    })
    Zotero.debug(folderPath)
  }
}
