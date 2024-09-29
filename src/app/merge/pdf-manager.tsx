'use client'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import type { UploadedFile } from './page'
import { Button } from '~/components/ui/button'
import PdfPreview from '~/components/pdf-preview'
import { useLayoutEffect, useRef, useState } from 'react'

type PdfManagerProps = {
  files: UploadedFile[]
}

const PdfManager = ({ files }: PdfManagerProps) => {
  const pdfPreviewRef = useRef<HTMLDivElement>(null)
  const [previewWidth, setPreviewWidth] = useState<number | null>(null)

  useLayoutEffect(() => {
    if (pdfPreviewRef.current) {
      setPreviewWidth(pdfPreviewRef.current.clientWidth)
    }
  }, [files])

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Card className="flex w-full flex-wrap gap-4 p-4">
        {files.map((file) => (
          <Card key={file.file.name} className="w-[calc(25%-0.75rem)]">
            <CardHeader>
              <CardTitle className="truncate">{file.file.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div ref={pdfPreviewRef}>
                {previewWidth && (
                  <PdfPreview src={file.data} width={previewWidth} />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </Card>
      <Button>Merge PDFs</Button>
    </div>
  )
}

export default PdfManager
