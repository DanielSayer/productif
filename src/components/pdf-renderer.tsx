'use client'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import '~/lib/promise-polyfill'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Document, Page, pdfjs } from 'react-pdf'
import { useResizeDetector } from 'react-resize-detector'
import SimpleBar from 'simplebar-react'
import { toast } from 'sonner'
import { z } from 'zod'
import { cn } from '~/lib/utils'
import { Icons } from './icons'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Input } from './ui/input'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

const pdfScales = [25, 50, 100, 150, 200, 250]

type PdfRendererProps = {
  src: string
}

const PdfRenderer = ({ src }: PdfRendererProps) => {
  const { width, ref } = useResizeDetector()

  const CustomPageValidator = z.object({
    page: z.number().refine((num) => num > 0 && num <= numPages!),
  })
  type TCustomPageValidator = z.infer<typeof CustomPageValidator>

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: { page: 1 },
    resolver: zodResolver(CustomPageValidator),
  })

  const [numPages, setNumPages] = useState<number | undefined>(undefined)
  const [currPage, setCurrPage] = useState<number>(1)
  const [pdfScale, setPdfScale] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [renderedScale, setRenderedScale] = useState<number | null>(null)

  const isLoading = renderedScale !== pdfScale

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrPage(Number(page))
    setValue('page', page)
  }

  const incrementPage = () => {
    setCurrPage((prev) => (prev + 1 > numPages! ? numPages! : prev + 1))
    setValue('page', currPage + 1)
  }

  const decrementPage = () => {
    setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1))
    setValue('page', currPage - 1)
  }

  return (
    <div className="flex w-full flex-col items-center rounded-md bg-white shadow">
      <div className="flex h-14 w-full items-center justify-between border-b border-zinc-200 px-2">
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            aria-label="previous page"
            onClick={decrementPage}
            disabled={currPage <= 1}
          >
            <Icons.chevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1.5">
            <Input
              {...register('page')}
              className={cn(
                'h-8 w-12',
                errors.page && 'focus-visible:ring-destructive-500',
              )}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  await handleSubmit(handlePageSubmit)()
                }
              }}
            />
            <p className="space-x-1 text-sm text-zinc-700">
              <span>/</span>
              <span>{numPages ?? 'x'}</span>
            </p>
          </div>

          <Button
            variant="ghost"
            aria-label="next page"
            onClick={incrementPage}
            disabled={numPages === undefined || currPage === numPages}
          >
            <Icons.chevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-1.5" aria-label="zoom" variant="ghost">
                <Search className="h-4 w-4" />
                <span>{pdfScale * 100} %</span>
                <Icons.chevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {pdfScales.map((scale, i) => (
                <DropdownMenuItem
                  key={i}
                  onSelect={() => setPdfScale(scale / 100)}
                >
                  {scale}%
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            aria-label="rotate 90 degress"
            variant="ghost"
            onClick={() => setRotation((prev) => prev + 90)}
          >
            <Icons.rotate className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="max-h-screen w-full flex-1">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
          <div ref={ref}>
            <Document
              loading={<PdfLoader />}
              onLoadError={() => {
                toast.error('Error loading PDF')
              }}
              file={src}
              className="max-h-full"
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages)
              }}
            >
              {isLoading && renderedScale ? (
                <Page
                  pageNumber={currPage}
                  width={width ? width : 1}
                  scale={pdfScale}
                  rotate={rotation}
                  key={'@' + renderedScale}
                />
              ) : null}

              <Page
                className={cn(isLoading ? 'hidden' : '')}
                pageNumber={currPage}
                width={width ? width : 1}
                scale={pdfScale}
                rotate={rotation}
                key={'@' + pdfScale}
                loading={<PdfLoader />}
                onRenderSuccess={() => setRenderedScale(pdfScale)}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

const PdfLoader = () => {
  return (
    <div className="flex justify-center">
      <Icons.loader className="my-24 h-6 w-6 animate-spin" />
    </div>
  )
}

export default PdfRenderer
