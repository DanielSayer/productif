'use client'

import { useState } from 'react'
import MaxWidthWrapper from '~/components/max-width-wrapper'
import PdfDropzone from '~/components/pdf-dropzone'
import PdfRenderer from '~/components/pdf-renderer'
import { Button } from '~/components/ui/button'

type UploadedFile = {
  file: File
  data: string
}

const PdfMerger = () => {
  const [isFirstFile, setIsFirstFile] = useState(true)
  const [files, setFiles] = useState<UploadedFile[]>([])

  const handleUploadFiles = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        setFiles((prev) => [...prev, { file, data: reader.result as string }])
      }
      reader.readAsDataURL(file)
    })
    setIsFirstFile(false)
  }

  if (isFirstFile) {
    return (
      <MaxWidthWrapper>
        <PdfDropzone handleUploadFiles={handleUploadFiles} />
      </MaxWidthWrapper>
    )
  }

  return (
    <MaxWidthWrapper>
      <div>
        <h3>Your PDFs</h3>
        {files.map((file, i) => (
          <div key={i}>
            <h4>{file.file.name}</h4>
            <PdfRenderer src={file.data} />
          </div>
        ))}
      </div>
      <Button>Merge PDFs</Button>
    </MaxWidthWrapper>
  )
}

export default PdfMerger
