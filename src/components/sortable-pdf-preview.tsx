import type { UploadedFile } from '~/app/merge/page'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import PdfPreview from './pdf-preview'
import PdfViewer from './pdf-viewer'
import { useLayoutEffect, useRef, useState } from 'react'
import Sortable from './sortable'

type SortablePdfPreviewProps = {
  file: UploadedFile
}

const SortablePdfPreview = ({ file }: SortablePdfPreviewProps) => {
  const pdfPreviewRef = useRef<HTMLDivElement>(null)
  const [previewWidth, setPreviewWidth] = useState<number | null>(null)

  useLayoutEffect(() => {
    if (pdfPreviewRef.current) {
      setPreviewWidth(pdfPreviewRef.current.clientWidth)
    }
  }, [file])

  return (
    <Sortable id={file.id}>
      <Card key={file.file.name}>
        <CardHeader>
          <CardTitle className="truncate">{file.file.name}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <div ref={pdfPreviewRef}>
            {previewWidth && (
              <PdfPreview src={file.data} width={previewWidth} />
            )}
          </div>
          <div className="mt-2 flex w-full justify-center">
            <PdfViewer src={file.data} />
          </div>
        </CardContent>
      </Card>
    </Sortable>
  )
}

export default SortablePdfPreview
