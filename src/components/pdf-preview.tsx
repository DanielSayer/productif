'use client'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import '~/lib/promise-polyfill'

import { Document, Page, pdfjs } from 'react-pdf'
import { toast } from 'sonner'
import PdfLoader from './pdf-loader'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

type PdfPreviewProps = {
  src: string
  width: number
}

const PdfPreview = ({ src, width }: PdfPreviewProps) => {
  return (
    <div className="max-w-full overflow-hidden">
      <Document
        loading={<PdfLoader />}
        onLoadError={() => {
          toast.error('Error loading PDF')
        }}
        file={src}
      >
        <Page pageNumber={1} loading={<PdfLoader />} width={width} />
      </Document>
    </div>
  )
}

export default PdfPreview
