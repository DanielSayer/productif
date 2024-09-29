'use client'

import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import SortablePdfPreview from '~/components/sortable-pdf-preview'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import type { UploadedFile } from './page'
import { useMutation } from '@tanstack/react-query'
import { mergePdf } from '~/server/merge-pdf'
import { toast } from 'sonner'
import { Icons } from '~/components/icons'

type PdfManagerProps = {
  files: UploadedFile[]
  activeId: string | null
  handleDragStart: (event: DragStartEvent) => void
  handleDragEnd: (event: DragEndEvent) => void
  handleDeleteFile: (id: string) => void
  updateResult: (result: Blob) => void
}

const PdfManager = ({
  files,
  activeId,
  updateResult,
  handleDragEnd,
  handleDragStart,
  handleDeleteFile,
}: PdfManagerProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const { isPending, mutateAsync } = useMutation({
    mutationFn: mergePdf,
    onError: (e) => {
      toast.error('Error merging PDFs', { description: e.message })
    },
    onSuccess: (result) => {
      updateResult(result)
    },
  })

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Card className="grid min-h-60 w-full grid-cols-2 flex-wrap gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <SortableContext items={files} strategy={rectSortingStrategy}>
            {files.length === 0 && (
              <div className="col-span-4 flex h-full w-full items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-accent-foreground">
                  <Icons.empty className="text-muted-foreground" />
                  <div>No PDFs added yet</div>
                </div>
              </div>
            )}
            {files.map((file, i) => (
              <SortablePdfPreview
                key={file.id}
                file={file}
                index={`${i + 1}`}
                handleDeleteFile={handleDeleteFile}
              />
            ))}
            <DragOverlay>
              {activeId ? (
                <SortablePdfPreview
                  file={files.find((f) => f.id === activeId)!}
                  index={'x'}
                />
              ) : null}
            </DragOverlay>
          </SortableContext>
        </DndContext>
      </Card>
      <Button
        onClick={() => mutateAsync(files.map((x) => x.file))}
        disabled={files.length < 2}
        isLoading={isPending}
        loadingText="Merging PDFs..."
      >
        Merge PDFs
      </Button>
    </div>
  )
}

export default PdfManager
