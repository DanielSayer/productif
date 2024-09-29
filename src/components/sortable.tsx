import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { ReactNode } from 'react'
import { cn } from '~/lib/utils'

type SortableProps = {
  id: string
  children: ReactNode
}

const Sortable = ({ id, children }: SortableProps) => {
  const { isDragging, setNodeRef, transition, transform } = useSortable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      className={cn({ 'opacity-30': isDragging })}
      style={{ transition, transform: CSS.Transform.toString(transform) }}
    >
      {children}
    </div>
  )
}

export const Handle = ({ id, children }: SortableProps) => {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <div {...attributes} {...listeners}>
      {children}
    </div>
  )
}

export default Sortable
