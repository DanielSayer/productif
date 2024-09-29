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

type PdfManagerProps = {
  files: UploadedFile[]
  activeId: string | null
  handleDragStart: (event: DragStartEvent) => void
  handleDragEnd: (event: DragEndEvent) => void
}

const PdfManager = ({
  files,
  activeId,
  handleDragStart,
  handleDragEnd,
}: PdfManagerProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

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
            {files.map((file) => (
              <SortablePdfPreview key={file.id} file={file} />
            ))}
            <DragOverlay>
              {activeId ? (
                <SortablePdfPreview
                  file={files.find((f) => f.id === activeId)!}
                />
              ) : null}
            </DragOverlay>
          </SortableContext>
        </DndContext>
      </Card>
      <Button>Merge PDFs</Button>
    </div>
  )
}

export default PdfManager
