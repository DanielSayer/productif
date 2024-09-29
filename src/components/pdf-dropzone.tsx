'use client'

import { Cloud } from 'lucide-react'
import useUploadPdf from '~/hooks/useUploadPdf'
import { Icons } from './icons'

type PdfDropzoneProps = {
  handleUploadFiles: (files: File[]) => void
}

export const PdfDropzone = ({ handleUploadFiles }: PdfDropzoneProps) => {
  const { getRootProps, getInputProps } = useUploadPdf({
    handleUploadFiles,
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

export const SmallPdfDropzone = ({ handleUploadFiles }: PdfDropzoneProps) => {
  const { getRootProps, getInputProps } = useUploadPdf({
    handleUploadFiles,
  })

  return (
    <div {...getRootProps({ onClick: (e) => e.preventDefault() })}>
      <label
        htmlFor="dropzone-file"
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 p-2 hover:bg-gray-300"
      >
        <Icons.add className="h-4 w-4" />
        <input
          type="file"
          id="dropzone-file"
          className="hidden"
          {...getInputProps()}
        />
      </label>
    </div>
  )
}
