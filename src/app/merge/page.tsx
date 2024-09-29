'use client'

import { useState } from 'react'
import MaxWidthWrapper from '~/components/max-width-wrapper'
import { PdfDropzone, SmallPdfDropzone } from '~/components/pdf-dropzone'
import PdfManager from './pdf-manager'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

export type UploadedFile = {
  id: string
  file: File
  data: string
}

const PdfMerger = () => {
  const [isFirstFile, setIsFirstFile] = useState(true)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleUploadFiles = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
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
        <span className="flex items-center gap-1.5">
          Or add more
          <SmallPdfDropzone handleUploadFiles={handleUploadFiles} />
        </span>
      </div>
      <PdfManager
        files={files}
        activeId={activeId}
        handleDragEnd={handleDragEnd}
        handleDragStart={handleDragStart}
        handleDeleteFile={handleDeleteFile}
      />
    </MaxWidthWrapper>
  )
}

export default PdfMerger
