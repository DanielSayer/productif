const DEFAULT_FILENAME = 'productif-merged-pdf'

export const downloadPdf = (url: string, filename: string | undefined) => {
  //eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const downloadName = filename || DEFAULT_FILENAME

  const link = document.createElement('a')
  link.href = url
  link.download = downloadName + '.pdf'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
