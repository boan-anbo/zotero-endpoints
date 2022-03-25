declare const Zotero;

export const getSelectedCollection = () => {
  const panel = Zotero.getActiveZoteroPane()
  const currentCol = panel.getSelectedCollection();

  return currentCol;
}
