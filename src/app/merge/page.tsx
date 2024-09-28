import MaxWidthWrapper from '~/components/max-width-wrapper'
import PdfMerger from './pdf-merger'

const Page = () => {
  return (
    <div>
      <MaxWidthWrapper>
        <div className="flex flex-col items-center justify-center gap-4 py-32 text-accent-foreground">
          <h1 className="text-center text-5xl">Merge PDFs</h1>
          <p className="text-center text-xl">
            Merge PDF files with a single click.
          </p>
        </div>
      </MaxWidthWrapper>
      <PdfMerger />
    </div>
  )
}

export default Page
