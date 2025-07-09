'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCanvas, useDiagram, useStereotypes } from '@/context/DiagramContext'

interface ElementProperties {
  id: string
  name: string
  code?: string
  description?: string
  type: string
  stereotype?: string
  attributes?: any[]
  [key: string]: any
}

export function PropertiesPanel() {
  const { canvasState } = useCanvas()
  const { graph } = useDiagram()
  const { stereotypes } = useStereotypes()
  const [selectedElement, setSelectedElement] = useState<ElementProperties | null>(null)
  const [activeTab, setActiveTab] = useState('general')

  // Update selected element when selection changes
  useEffect(() => {
    if (canvasState.selection.length === 1 && graph) {
      const elementId = canvasState.selection[0]
      const element = graph.getCell(elementId)
      
      if (element) {
        const properties: ElementProperties = {
          id: element.id,
          name: element.get('name') || 'Unnamed',
          code: element.get('code') || '',
          description: element.get('description') || '',
          type: element.get('type') || 'Unknown',
          stereotype: element.get('stereotype') || '',
          attributes: element.get('attributes') || []
        }
        setSelectedElement(properties)
      }
    } else {
      setSelectedElement(null)
    }
  }, [canvasState.selection, graph])

  const handlePropertyChange = (property: string, value: any) => {
    if (!selectedElement || !graph) return

    const element = graph.getCell(selectedElement.id)
    if (element) {
      element.set(property, value)
      setSelectedElement({ ...selectedElement, [property]: value })
    }
  }

  const handleAddAttribute = () => {
    if (!selectedElement) return

    const newAttribute = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'NewAttribute',
      dataType: 'VARCHAR(50)',
      nullable: true,
      primaryKey: false,
      foreignKey: false,
      unique: false,
      description: '',
      displayOrder: (selectedElement.attributes?.length || 0) + 1
    }

    const updatedAttributes = [...(selectedElement.attributes || []), newAttribute]
    handlePropertyChange('attributes', updatedAttributes)
  }

  const handleRemoveAttribute = (attributeId: string) => {
    if (!selectedElement) return

    const updatedAttributes = (selectedElement.attributes || []).filter(
      attr => attr.id !== attributeId
    )
    handlePropertyChange('attributes', updatedAttributes)
  }

  const handleAttributeChange = (attributeId: string, property: string, value: any) => {
    if (!selectedElement) return

    const updatedAttributes = (selectedElement.attributes || []).map(attr =>
      attr.id === attributeId ? { ...attr, [property]: value } : attr
    )
    handlePropertyChange('attributes', updatedAttributes)
  }

  if (!selectedElement) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 text-center text-muted-foreground">
          <Icons.settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Select an element to view its properties</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Element header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icons.database className="h-4 w-4" />
          <span className="font-medium text-sm truncate">{selectedElement.name}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {selectedElement.type} • ID: {selectedElement.id.substring(0, 8)}...
        </div>
      </div>

      {/* Property tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 m-2">
          <TabsTrigger value="general" className="text-xs">General</TabsTrigger>
          <TabsTrigger value="attributes" className="text-xs">Attributes</TabsTrigger>
          <TabsTrigger value="styling" className="text-xs">Style</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-auto">
          {/* General Tab */}
          <TabsContent value="general" className="p-3 space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Name</label>
              <input
                type="text"
                value={selectedElement.name}
                onChange={(e) => handlePropertyChange('name', e.target.value)}
                className="w-full mt-1 px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">Code</label>
              <input
                type="text"
                value={selectedElement.code || ''}
                onChange={(e) => handlePropertyChange('code', e.target.value)}
                className="w-full mt-1 px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <textarea
                value={selectedElement.description || ''}
                onChange={(e) => handlePropertyChange('description', e.target.value)}
                rows={3}
                className="w-full mt-1 px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-ring resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">Stereotype</label>
              <select
                value={selectedElement.stereotype || ''}
                onChange={(e) => handlePropertyChange('stereotype', e.target.value)}
                className="w-full mt-1 px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="">None</option>
                {stereotypes.map(stereotype => (
                  <option key={stereotype.id} value={stereotype.id}>
                    {stereotype.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 border-t border-border">
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Type: {selectedElement.type}</div>
                <div>ID: {selectedElement.id}</div>
              </div>
            </div>
          </TabsContent>

          {/* Attributes Tab */}
          <TabsContent value="attributes" className="p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Attributes</span>
            </div>

            <div className="space-y-2">
              {(selectedElement.attributes || []).map((attribute: any) => (
                <div key={attribute.id} className="p-2 border border-border rounded">
                  <div className="flex items-center justify-between mb-2">
                    <input
                      type="text"
                      value={attribute.name}
                      onChange={(e) => handleAttributeChange(attribute.id, 'name', e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border border-border rounded mr-2"
                      placeholder="Attribute name"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveAttribute(attribute.id)}
                      className="h-6 w-6"
                    >
                      <Icons.x className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <input
                      type="text"
                      value={attribute.dataType}
                      onChange={(e) => handleAttributeChange(attribute.id, 'dataType', e.target.value)}
                      className="px-2 py-1 border border-border rounded"
                      placeholder="Data type"
                    />
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={attribute.primaryKey}
                          onChange={(e) => handleAttributeChange(attribute.id, 'primaryKey', e.target.checked)}
                          className="mr-1"
                        />
                        PK
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={attribute.nullable}
                          onChange={(e) => handleAttributeChange(attribute.id, 'nullable', e.target.checked)}
                          className="mr-1"
                        />
                        NULL
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {(selectedElement.attributes || []).length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                No attributes defined
              </div>
            )}
          </TabsContent>

          {/* Styling Tab */}
          <TabsContent value="styling" className="p-3">
            <div className="text-sm text-muted-foreground">
              Styling options will be available here
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}