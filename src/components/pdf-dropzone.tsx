'use client'

import { Cloud } from 'lucide-react'
import { type FileRejection, useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import FileUploadRejection from './file-upload-rejection'

type PdfDropzoneProps = {
  handleUploadFiles: (files: File[]) => void
}

const PdfDropzone = ({ handleUploadFiles }: PdfDropzoneProps) => {
  const handleOnDrop = (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[],
  ) => {
    if (rejectedFiles.length > 0) {
      toast.error(
        <FileUploadRejection
          rejectedFiles={rejectedFiles.map((f) => ({
            name: f.file.name,
            reason: f.errors[0]?.message ?? 'Something went wrong',
          }))}
        />,
      )
    }
    handleUploadFiles(acceptedFiles)
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 16 * 1024 * 1024,
    onDrop: handleOnDrop,
  })

  return (
    <div
      className="flex h-full w-full items-center justify-center rounded-lg bg-gray-50 p-3 hover:bg-gray-100"
      {...getRootProps({
        onClick: (e) => e.preventDefault(),
      })}
    >
      <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-muted-foreground">
        <label
          htmlFor="dropzone-file"
          className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          <div className="flex flex-col items-center justify-center py-40">
            <Cloud className="mb-2 h-6 w-6 text-zinc-500" />
            <p className="mb-2 text-sm text-zinc-700">
              <span className="font-semibold">Click to upload</span> or drap and
              drop files
            </p>
            <p className="text-xs text-zinc-500">PDF (up to 16 MB)</p>
          </div>

          <input
            type="file"
            id="dropzone-file"
            className="hidden"
            {...getInputProps()}
          />
        </label>
      </div>
    </div>
  )
}

export default PdfDropzone
