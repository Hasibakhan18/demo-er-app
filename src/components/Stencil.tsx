'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { useDiagram } from '@/context/DiagramContext'

interface StencilGroup {
  name: string
  items: StencilItem[]
  expanded: boolean
}

interface StencilItem {
  id: string
  name: string
  type: string
  icon: string
  description: string
}

const stencilGroups: StencilGroup[] = [
  {
    name: 'Entities',
    expanded: true,
    items: [
      {
        id: 'entity',
        name: 'Entity',
        type: 'erd.Entity',
        icon: '□',
        description: 'Basic entity with attributes'
      },
      {
        id: 'weak-entity',
        name: 'Weak Entity',
        type: 'erd.WeakEntity',
        icon: '⬜',
        description: 'Weak entity with double border'
      }
    ]
  },
  {
    name: 'Relationships',
    expanded: true,
    items: [
      {
        id: 'relationship',
        name: 'Relationship',
        type: 'erd.Relationship',
        icon: '◊',
        description: 'Basic relationship'
      },
      {
        id: 'identifying-relationship',
        name: 'Identifying',
        type: 'erd.IdentifyingRelationship',
        icon: '◆',
        description: 'Identifying relationship'
      }
    ]
  },
  {
    name: 'Attributes',
    expanded: true,
    items: [
      {
        id: 'attribute',
        name: 'Attribute',
        type: 'erd.Attribute',
        icon: '○',
        description: 'Basic attribute'
      },
      {
        id: 'key-attribute',
        name: 'Key Attribute',
        type: 'erd.KeyAttribute',
        icon: '●',
        description: 'Primary key attribute'
      },
      {
        id: 'multivalued-attribute',
        name: 'Multivalued',
        type: 'erd.MultivaluedAttribute',
        icon: '◎',
        description: 'Multivalued attribute'
      }
    ]
  },
  {
    name: 'Annotations',
    expanded: false,
    items: [
      {
        id: 'note',
        name: 'Note',
        type: 'standard.TextBlock',
        icon: '📝',
        description: 'Text note'
      },
      {
        id: 'comment',
        name: 'Comment',
        type: 'standard.TextBlock',
        icon: '💬',
        description: 'Comment bubble'
      }
    ]
  }
]

export function Stencil() {
  const [groups, setGroups] = useState<StencilGroup[]>(stencilGroups)
  const { graph, paper } = useDiagram()
  const stencilRef = useRef<HTMLDivElement>(null)

  const toggleGroup = (groupName: string) => {
    setGroups(groups.map(group => 
      group.name === groupName 
        ? { ...group, expanded: !group.expanded }
        : group
    ))
  }

  const handleDragStart = (e: React.DragEvent, item: StencilItem) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item))
    e.dataTransfer.effectAllowed = 'copy'
  }

  const createElementFromStencil = async (item: StencilItem, x: number, y: number) => {
    if (!graph) return

    try {
      // Dynamically import our custom ERD shapes
      const { extendedShapes } = await import('@/lib/shapes')
      
      let element
      
      switch (item.id) {
        case 'entity':
          element = new extendedShapes.erd.Entity({
            position: { x, y },
            attrs: {
              label: { text: 'Entity' },
              attributes: { text: 'id: int\nname: varchar(50)' }
            }
          })
          break
          
        case 'weak-entity':
          element = new extendedShapes.erd.WeakEntity({
            position: { x, y },
            attrs: {
              label: { text: 'Weak Entity' },
              attributes: { text: 'id: int\nname: varchar(50)' }
            }
          })
          break
          
        case 'relationship':
          element = new extendedShapes.erd.Relationship({
            position: { x, y },
            attrs: {
              label: { text: 'Relationship' }
            }
          })
          break
          
        case 'identifying-relationship':
          element = new extendedShapes.erd.IdentifyingRelationship({
            position: { x, y },
            attrs: {
              label: { text: 'Identifying' }
            }
          })
          break
          
        case 'attribute':
          element = new extendedShapes.erd.Attribute({
            position: { x, y },
            attrs: {
              label: { text: 'Attribute' }
            }
          })
          break
          
        case 'key-attribute':
          element = new extendedShapes.erd.KeyAttribute({
            position: { x, y },
            attrs: {
              label: { text: 'Key Attr' }
            }
          })
          break
          
        case 'multivalued-attribute':
          element = new extendedShapes.erd.MultivaluedAttribute({
            position: { x, y },
            attrs: {
              label: { text: 'Multi Attr' }
            }
          })
          break
          
        case 'note':
        case 'comment':
          const { shapes } = await import('@joint/plus')
          element = new shapes.standard.TextBlock({
            position: { x, y },
            size: { width: 100, height: 60 },
            attrs: {
              body: {
                fill: '#ffffcc',
                stroke: '#cccccc'
              },
              label: { text: 'Note text...' }
            }
          })
          break
          
        default:
          const { shapes: defaultShapes } = await import('@joint/plus')
          element = new defaultShapes.standard.Rectangle({
            position: { x, y },
            size: { width: 100, height: 60 },
            attrs: {
              label: { text: item.name },
              body: { fill: '#ffffff', stroke: '#000000' }
            }
          })
      }
      
      if (element) {
        graph.addCell(element)
      }
    } catch (error) {
      console.error('Failed to create element:', error)
    }
  }

  const handleItemClick = (item: StencilItem) => {
    // Add to center of canvas
    createElementFromStencil(item, 200, 150)
  }

  // Set up drop zone for the canvas
  useEffect(() => {
    if (!paper) return

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      const data = e.dataTransfer?.getData('application/json')
      if (!data) return

      try {
        const item: StencilItem = JSON.parse(data)
        const rect = (e.target as Element).getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        createElementFromStencil(item, x, y)
      } catch (error) {
        console.error('Failed to handle drop:', error)
      }
    }

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      e.dataTransfer!.dropEffect = 'copy'
    }

    const paperEl = paper.el
    paperEl.addEventListener('drop', handleDrop)
    paperEl.addEventListener('dragover', handleDragOver)

    return () => {
      paperEl.removeEventListener('drop', handleDrop)
      paperEl.removeEventListener('dragover', handleDragOver)
    }
  }, [paper, graph])

  return (
    <div className="h-full flex flex-col" ref={stencilRef}>
      {/* Header */}
      <div className="p-2 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">STENCIL</span>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Icons.search className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Stencil groups */}
      <div className="flex-1 overflow-auto">
        {groups.map((group) => (
          <div key={group.name} className="border-b border-border">
            {/* Group header */}
            <div
              className="flex items-center justify-between p-2 hover:bg-accent cursor-pointer"
              onClick={() => toggleGroup(group.name)}
            >
              <div className="flex items-center">
                {group.expanded ? (
                  <Icons.chevronDown className="h-3 w-3 mr-2" />
                ) : (
                  <Icons.chevronRight className="h-3 w-3 mr-2" />
                )}
                <span className="text-sm font-medium">{group.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {group.items.length}
              </span>
            </div>

            {/* Group items */}
            {group.expanded && (
              <div className="pb-2">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-2 mx-2 hover:bg-accent cursor-pointer rounded"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onClick={() => handleItemClick(item)}
                    title={item.description}
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-muted rounded mr-3 text-sm">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Drag items to canvas or click to add
        </div>
      </div>
    </div>
  )
}