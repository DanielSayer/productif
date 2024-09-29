import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z
    .string()
    .regex(new RegExp(/^[^<>:;,?"*|/\\]*$/), { message: 'Invalid filename' })
    .optional(),
})
export type PdfName = z.infer<typeof schema>

const usePdfNameForm = () => {
  const form = useForm<PdfName>({
    defaultValues: { name: '' },
    resolver: zodResolver(schema),
  })

  return form
}

export default usePdfNameForm
