import { Icons } from './icons'
import PdfRenderer from './pdf-renderer'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

type PdfViewerProps = {
  src: string
}

const PdfViewer = ({ src }: PdfViewerProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" aria-label="view">
          <Icons.view className="h-4 w-4 md:me-2" />
          <span className="hidden md:inline">View</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-60 lg:max-w-[70rem]">
        <DialogHeader>
          <DialogTitle className="sr-only">Preview PDF</DialogTitle>
        </DialogHeader>
        <PdfRenderer src={src} />
      </DialogContent>
    </Dialog>
  )
}

export default PdfViewer
