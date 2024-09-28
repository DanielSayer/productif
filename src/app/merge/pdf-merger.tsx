'use client'

import { useState } from 'react'
import MaxWidthWrapper from '~/components/max-width-wrapper'
import PdfDropzone from '~/components/pdf-dropzone'

const PdfMerger = () => {
  const [isFirstFile, setIsFirstFile] = useState(true)
  const [files, setFiles] = useState<File[]>([])

  const handleUploadFiles = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    setIsFirstFile(false)
  }

  if (isFirstFile) {
    return (
      <MaxWidthWrapper>
        <PdfDropzone handleUploadFiles={handleUploadFiles} />
      </MaxWidthWrapper>
    )
  }

  return <div></div>
}

export default PdfMerger
