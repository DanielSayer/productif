'use client'

import { Cloud } from 'lucide-react'
import useUploadPdf from '~/hooks/useUploadPdf'
import { Icons } from './icons'
import { cn } from '~/lib/utils'
import { buttonVariants } from './ui/button'

type PdfDropzoneProps = {
  handleUploadFiles: (files: File[]) => void
}

export const PdfDropzone = ({ handleUploadFiles }: PdfDropzoneProps) => {
  const { getRootProps, getInputProps } = useUploadPdf({
    handleUploadFiles,
  })

  return (
    <div
      className="flex h-full w-full items-center justify-center rounded-lg bg-accent p-3 hover:bg-accent-foreground/10"
      {...getRootProps({
        onClick: (e) => e.preventDefault(),
      })}
    >
      <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-muted-foreground">
        <label
          htmlFor="dropzone-file"
          className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-accent hover:bg-accent-foreground/5"
        >
          <div className="flex flex-col items-center justify-center py-40">
            <Cloud className="mb-2 h-6 w-6 text-muted-foreground" />
            <p className="mb-2 text-sm text-accent-foreground">
              <span className="font-semibold">Click to upload</span> or drap and
              drop files
            </p>
            <p className="text-xs text-muted-foreground">PDF (up to 32 MB)</p>
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
        className={cn(buttonVariants(), 'cursor-pointer')}
      >
        <Icons.add className="h-4 w-4 md:me-2" />
        <span className="hidden md:inline-block">Add more !</span>
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
