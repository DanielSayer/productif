type RejectedFile = {
  name: string
  reason: string
}

type FileUploadRejectionProps = {
  rejectedFiles: RejectedFile[]
}

const FileUploadRejection = ({ rejectedFiles }: FileUploadRejectionProps) => {
  return (
    <div>
      <p className="text-lg font-semibold">
        The following files were rejected:
      </p>
      <ul>
        {rejectedFiles.map((rejectedFile) => (
          <li key={rejectedFile.name}>
            <span className="font-semibold">{rejectedFile.name}</span>
            <span className="text-sm text-zinc-500">
              {' '}
              - {rejectedFile.reason}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FileUploadRejection
