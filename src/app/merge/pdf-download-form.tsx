import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import usePdfNameForm, { PdfName } from '~/hooks/usePdfNameForm'

type PdfDownloadFormProps = {
  onSubmit: (name: string | undefined) => void
}

const PdfDownloadForm = ({ onSubmit }: PdfDownloadFormProps) => {
  const form = usePdfNameForm()

  const handleSubmit = (pdf: PdfName) => {
    onSubmit(pdf.name)
  }

  return (
    <Form {...form}>
      <form
        className="flex items-baseline gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Name your merged PDF</FormLabel>
              <FormControl>
                <div className="flex items-center gap-1.5">
                  <Input {...field} placeholder="Download name" />
                  <span>.pdf</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Download</Button>
      </form>
    </Form>
  )
}

export default PdfDownloadForm
