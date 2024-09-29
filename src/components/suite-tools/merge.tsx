import { FileStack } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'

const Merge = () => {
  return (
    <Link href="/merge">
      <Card className="relative h-40 hover:bg-card-foreground/5">
        <FileStack className="absolute left-1/4 top-1/4 h-16 w-16 -translate-x-3/4 -translate-y-1/2 text-primary/30" />
        <div className="flex h-full w-full flex-col items-center justify-center">
          <CardHeader>
            <CardTitle className="text-center">Merge PDFs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">
              Merge PDFs together with a single click.
            </p>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}

export default Merge
