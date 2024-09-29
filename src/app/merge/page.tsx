'use client'

import { useState } from 'react'
import MaxWidthWrapper from '~/components/max-width-wrapper'
import PdfDropzone from '~/components/pdf-dropzone'
import PdfManager from './pdf-manager'

export type UploadedFile = {
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
        <div className="flex flex-col items-center justify-center gap-4 py-32 text-accent-foreground">
          <h1 className="text-center text-5xl">Merge PDFs</h1>
          <p className="text-center text-xl">
            Upload your PDFs below and merge them with a single click.
          </p>
        </div>
        <PdfDropzone handleUploadFiles={handleUploadFiles} />
      </MaxWidthWrapper>
    )
  }

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-accent-foreground">
        <h1 className="text-center text-3xl">Merge PDFs</h1>
        <p className="text-center text-lg">Manage your PDF order below.</p>
      </div>
      <PdfManager files={files} />
    </MaxWidthWrapper>
  )
}

export default PdfMerger
