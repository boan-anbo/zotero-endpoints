declare const Zotero

export const showPopup = (message: string, duration: number): void => {

  const newPopup = new Zotero.ProgressWindow({closeOnClick: true})

  newPopup.changeHeadline(message)
  newPopup.show()
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  newPopup.startCloseTimer(duration)
}
