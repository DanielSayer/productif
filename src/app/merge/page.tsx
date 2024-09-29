'use client'

import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'
import { toast } from 'sonner'
import { Icons } from '~/components/icons'
import MaxWidthWrapper from '~/components/max-width-wrapper'
import { PdfDropzone, SmallPdfDropzone } from '~/components/pdf-dropzone'
import PdfRenderer from '~/components/pdf-renderer'
import { Button } from '~/components/ui/button'
import { downloadPdf } from '~/lib/download-pdf'
import PdfDownloadForm from './pdf-download-form'
import PdfManager from './pdf-manager'

export type UploadedFile = {
  id: string
  file: File
  data: string
}

const PdfMerger = () => {
  const [isFirstFile, setIsFirstFile] = useState(true)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)

  const handleUploadFiles = (acceptedFiles: File[]) => {
    let sanitizedFiles = [...acceptedFiles]
    if (files.length + acceptedFiles.length > 16) {
      toast.error('You can only merge up to 16 PDFs at a time')
      const numberOfFilesRemaining = 16 - files.length
      sanitizedFiles = acceptedFiles.slice(0, numberOfFilesRemaining)
    }

    sanitizedFiles.forEach((file) => {
      const reader = new FileReader()
      const id = crypto.randomUUID()
      reader.onload = () => {
        setFiles((prev) => [
          ...prev,
          { id, file, data: reader.result as string },
        ])
      }
      reader.readAsDataURL(file)
    })
    setIsFirstFile(false)
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(`${event.active.id}`)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = event
    if (!active || !over) return

    if (active.id !== over.id) {
      setFiles((prev) => {
        const oldIndex = prev.findIndex((f) => f.id === active.id)
        const newIndex = prev.findIndex((f) => f.id === over.id)

        return arrayMove(prev, oldIndex, newIndex)
      })
    }
  }

  const handleDeleteFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const updateResult = (result: Blob) => {
    setResult(URL.createObjectURL(result))
  }

  const handleDownloadResult = (name: string | undefined) => {
    if (!result) {
      toast.error('No result to download')
      return
    }

    downloadPdf(result, name)
    toast.success('Thank you for using ProDuctiF!')
  }

  const reset = () => {
    setFiles([])
    setResult(null)
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

  if (result) {
    return (
      <MaxWidthWrapper className="pb-16">
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-accent-foreground">
          <h1 className="text-center text-3xl">Merge PDFs</h1>
          <p className="text-center text-lg">
            Your PDFs have been merged successfully!
          </p>
          <p className="text-center text-lg">Preview your merged PDF below.</p>
          <PdfDownloadForm onSubmit={handleDownloadResult} />
          <Button variant="outline" aria-label="Start over" onClick={reset}>
            <Icons.rotate className="me-2 h-4 w-4" />
            Start Over
          </Button>
        </div>
        <PdfRenderer src={result} />
      </MaxWidthWrapper>
    )
  }

  return (
    <MaxWidthWrapper>
      <div className="relative">
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-accent-foreground">
          <h1 className="text-center text-3xl">Merge PDFs</h1>
          <p className="text-center text-lg">
            Manage the order of your PDF merge below.
          </p>
        </div>
        <div className="absolute right-0 top-1/3">
          <SmallPdfDropzone handleUploadFiles={handleUploadFiles} />
        </div>
      </div>
      <PdfManager
        files={files}
        activeId={activeId}
        handleDragEnd={handleDragEnd}
        handleDragStart={handleDragStart}
        handleDeleteFile={handleDeleteFile}
        updateResult={updateResult}
      />
    </MaxWidthWrapper>
  )
}

export default PdfMerger
