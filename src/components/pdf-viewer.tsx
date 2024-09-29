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
        <Button variant="ghost" size="icon">
          <Icons.view className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[70rem]">
        <DialogHeader>
          <DialogTitle className="sr-only">Preview PDF</DialogTitle>
        </DialogHeader>
        <PdfRenderer src={src} />
      </DialogContent>
    </Dialog>
  )
}

export default PdfViewer
