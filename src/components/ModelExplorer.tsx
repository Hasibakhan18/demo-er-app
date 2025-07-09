'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { useModels, useDiagram } from '@/context/DiagramContext'

interface ModelItem {
  id: string
  name: string
  type: 'diagram' | 'entity' | 'attribute' | 'relationship' | 'table' | 'column' | 'index' | 'constraint'
  children?: ModelItem[]
  expanded?: boolean
  parentId?: string
}

export function ModelExplorer() {
  const { currentModel } = useModels()
  const { graph } = useDiagram()
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['diagrams', 'entities']))

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const getModelStructure = (): ModelItem[] => {
    if (!currentModel || !graph) {
      return []
    }

    const elements = graph.getElements()
    const links = graph.getLinks()

    const structure: ModelItem[] = [
      {
        id: 'diagrams',
        name: 'Diagrams',
        type: 'diagram',
        expanded: expandedItems.has('diagrams'),
        children: [
          {
            id: 'main-diagram',
            name: 'Main Diagram',
            type: 'diagram'
          }
        ]
      }
    ]

    if (currentModel.type === 'CDM' || currentModel.type === 'LDM') {
      // Entities structure
      const entitiesItem: ModelItem = {
        id: 'entities',
        name: 'Entities',
        type: 'entity',
        expanded: expandedItems.has('entities'),
        children: elements.map(element => ({
          id: element.id,
          name: element.get('name') || 'Unnamed Entity',
          type: 'entity' as const,
          expanded: expandedItems.has(element.id),
          children: [
            {
              id: `${element.id}-attributes`,
              name: 'Attributes',
              type: 'attribute' as const,
              children: (element.get('attributes') || []).map((attr: any, index: number) => ({
                id: `${element.id}-attr-${index}`,
                name: attr.name || `Attribute ${index + 1}`,
                type: 'attribute' as const
              }))
            }
          ]
        }))
      }
      structure.push(entitiesItem)

      // Relationships
      if (links.length > 0) {
        structure.push({
          id: 'relationships',
          name: 'Relationships',
          type: 'relationship',
          expanded: expandedItems.has('relationships'),
          children: links.map(link => ({
            id: link.id,
            name: link.get('name') || 'Unnamed Relationship',
            type: 'relationship' as const
          }))
        })
      }
    } else if (currentModel.type === 'PDM') {
      // Tables structure for Physical Data Model
      const tablesItem: ModelItem = {
        id: 'tables',
        name: 'Tables',
        type: 'table',
        expanded: expandedItems.has('tables'),
        children: elements.map(element => ({
          id: element.id,
          name: element.get('name') || 'Unnamed Table',
          type: 'table' as const,
          expanded: expandedItems.has(element.id),
          children: [
            {
              id: `${element.id}-columns`,
              name: 'Columns',
              type: 'column' as const,
              children: (element.get('columns') || []).map((col: any, index: number) => ({
                id: `${element.id}-col-${index}`,
                name: col.name || `Column ${index + 1}`,
                type: 'column' as const
              }))
            }
          ]
        }))
      }
      structure.push(tablesItem)
    }

    return structure
  }

  const handleItemClick = (item: ModelItem) => {
    if (item.children && item.children.length > 0) {
      toggleExpanded(item.id)
    } else if (item.type === 'entity' || item.type === 'table') {
      // Select the element on the canvas
      if (graph) {
        const element = graph.getCell(item.id)
        if (element) {
          // Trigger selection (this would integrate with the selection system)
          console.log('Selected element:', item.name)
        }
      }
    }
  }

  const renderModelItem = (item: ModelItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.id)
    
    const getIcon = () => {
      switch (item.type) {
        case 'diagram': return Icons.layers
        case 'entity': return Icons.database
        case 'table': return Icons.database
        case 'attribute': return Icons.circle
        case 'column': return Icons.circle
        case 'relationship': return Icons.link
        case 'index': return Icons.search
        case 'constraint': return Icons.lock
        default: return Icons.file
      }
    }

    const Icon = getIcon()
    const ChevronIcon = hasChildren ? (isExpanded ? Icons.chevronDown : Icons.chevronRight) : null

    return (
      <div key={item.id}>
        <div
          className={`flex items-center py-1 px-2 hover:bg-accent cursor-pointer text-sm`}
          style={{ paddingLeft: `${8 + level * 16}px` }}
          onClick={() => handleItemClick(item)}
        >
          {ChevronIcon && <ChevronIcon className="h-3 w-3 mr-1 flex-shrink-0" />}
          {!ChevronIcon && <div className="w-4 mr-1" />}
          <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">{item.name}</span>
        </div>
        
        {isExpanded && hasChildren && (
          <div>
            {item.children!.map(child => renderModelItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const modelStructure = getModelStructure()

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-2 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">MODEL EXPLORER</span>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Icons.search className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Model structure */}
      <div className="flex-1 overflow-auto p-1">
        {currentModel ? (
          <>
            <div className="px-2 py-1 text-sm font-medium border-b border-border mb-2">
              {currentModel.name} ({currentModel.type})
            </div>
            {modelStructure.map(item => renderModelItem(item))}
          </>
        ) : (
          <div className="p-4 text-center text-muted-foreground text-sm">
            No model selected
          </div>
        )}
      </div>

      {/* Footer */}
      {currentModel && (
        <div className="p-2 border-t border-border">
          <div className="text-xs text-muted-foreground">
            {modelStructure.reduce((count, item) => 
              count + (item.children?.length || 0), 0
            )} items
          </div>
        </div>
      )}
    </div>
  )
}