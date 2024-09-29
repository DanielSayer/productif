import type { UploadedFile } from '~/app/merge/page'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import PdfPreview from './pdf-preview'
import PdfViewer from './pdf-viewer'
import { useLayoutEffect, useRef, useState } from 'react'
import Sortable, { Handle } from './sortable'
import { Button } from './ui/button'
import { Icons } from './icons'

type SortablePdfPreviewProps = {
  index: string
  file: UploadedFile
  handleDeleteFile?: (id: string) => void
}

const SortablePdfPreview = ({
  index,
  file,
  handleDeleteFile,
}: SortablePdfPreviewProps) => {
  const pdfPreviewRef = useRef<HTMLDivElement>(null)
  const [previewWidth, setPreviewWidth] = useState<number | null>(null)

  useLayoutEffect(() => {
    if (pdfPreviewRef.current) {
      setPreviewWidth(pdfPreviewRef.current.clientWidth)
    }
  }, [file])

  return (
    <Sortable id={file.id}>
      <Card key={file.id}>
        <Handle id={file.id}>
          <CardHeader>
            <CardTitle className="truncate">
              {index}. {file.file.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div ref={pdfPreviewRef}>
              {previewWidth && (
                <PdfPreview src={file.data} width={previewWidth} />
              )}
            </div>
          </CardContent>
        </Handle>
        <CardFooter>
          <div className="mt-2 flex w-full flex-wrap justify-between gap-2">
            <Button
              variant="outline"
              aria-label="delete"
              onClick={() => handleDeleteFile?.(file.id)}
            >
              <Icons.remove className="h-4 w-4 md:me-2" />
              <span className="hidden md:inline">Delete</span>
            </Button>
            <PdfViewer src={file.data} />
          </div>
        </CardFooter>
      </Card>
    </Sortable>
  )
}

export default SortablePdfPreview
