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

type PdfManagerProps = {
  files: UploadedFile[]
  activeId: string | null
  handleDragStart: (event: DragStartEvent) => void
  handleDragEnd: (event: DragEndEvent) => void
  handleDeleteFile: (id: string) => void
}

const PdfManager = ({
  files,
  activeId,
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

  const { mutateAsync } = useMutation({
    mutationFn: mergePdf,
    onError: (e) => {
      toast.error('Error merging PDFs', { description: e.message })
    },
  })

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Card className="grid grid-cols-4 flex-wrap gap-4 p-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <SortableContext items={files} strategy={rectSortingStrategy}>
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
      <Button onClick={() => mutateAsync(files.map((x) => x.file))}>
        Merge PDFs
      </Button>
    </div>
  )
}

export default PdfManager
