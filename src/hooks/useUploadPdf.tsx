import { useDropzone } from 'react-dropzone'
import type { FileRejection } from 'react-dropzone'
import { toast } from 'sonner'
import FileUploadRejection from '~/components/file-upload-rejection'

const defaultMaxSize = 32 * 1024 * 1024

type UseUploadPdfProps = {
  maxSize?: number
  handleUploadFiles: (files: File[]) => void
}

const useUploadPdf = ({
  maxSize = defaultMaxSize,
  handleUploadFiles,
}: UseUploadPdfProps) => {
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
    maxSize,
    onDrop: handleOnDrop,
    maxFiles: 16,
  })

  return {
    getRootProps,
    getInputProps,
  }
}

export default useUploadPdf
