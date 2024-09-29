import { PDFDocument } from 'pdf-lib'

export async function mergePdf(pdfs: File[]) {
  if (pdfs.length < 2) {
    throw new Error('You need to provide at least 2 PDFs to merge')
  }

  const mergedPdf = await PDFDocument.create()
  for (const pdf of pdfs) {
    const fileArrayBuffer = await pdf.arrayBuffer()
    const pdfDoc = await PDFDocument.load(fileArrayBuffer)
    const copiedPages = await mergedPdf.copyPages(
      pdfDoc,
      pdfDoc.getPageIndices(),
    )

    copiedPages.forEach((page) => {
      mergedPdf.addPage(page)
    })
  }

  const mergedPdfBytes = await mergedPdf.save()
  return new Blob([mergedPdfBytes], { type: 'application/pdf' })
}
