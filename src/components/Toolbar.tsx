'use client'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { useDiagram, useModels, useCanvas } from '@/context/DiagramContext'
import { StorageService } from '@/lib/storage'
import { ExportService } from '@/lib/export'
import { LayoutService } from '@/lib/layout'
import { useState } from 'react'

export function Toolbar() {
  const { graph, paper } = useDiagram()
  const { currentModel, createModel } = useModels()
  const { canvasState, updateCanvasState } = useCanvas()
  const [isExporting, setIsExporting] = useState(false)

  const handleSave = async () => {
    if (!currentModel || !graph) return
    
    try {
      const updatedModel = {
        ...currentModel,
        graphData: graph.toJSON(),
        metadata: {
          ...currentModel.metadata,
          modifiedAt: new Date()
        }
      }
      StorageService.saveModel(updatedModel)
    } catch (error) {
      console.error('Save failed:', error)
    }
  }

  const handleLoad = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file || !graph) return

      try {
        const jsonData = await ExportService.importFromJSON(file)
        graph.fromJSON(jsonData)
      } catch (error) {
        console.error('Load failed:', error)
      }
    }
    input.click()
  }

  const handleExportJSON = () => {
    if (!graph) return
    ExportService.exportToJSON(graph, `${currentModel?.name || 'model'}.json`)
  }

  const handleExportPNG = async () => {
    if (!paper) return
    setIsExporting(true)
    try {
      ExportService.exportToPNG(paper, {
        filename: `${currentModel?.name || 'model'}.png`,
        format: 'png'
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleUndo = () => {
    // Will be implemented with CommandManager
    console.log('Undo')
  }

  const handleRedo = () => {
    // Will be implemented with CommandManager
    console.log('Redo')
  }

  const handleZoomIn = () => {
    const newZoom = Math.min(canvasState.zoom * 1.2, 3)
    updateCanvasState({ zoom: newZoom })
  }

  const handleZoomOut = () => {
    const newZoom = Math.max(canvasState.zoom / 1.2, 0.1)
    updateCanvasState({ zoom: newZoom })
  }

  const handleAutoLayout = () => {
    if (!graph) return
    
    try {
      LayoutService.applyAutoLayout(graph, {
        algorithm: 'DirectedGraph',
        direction: 'TB',
        spacing: { node: 50, rank: 100 }
      })
    } catch (error) {
      console.error('Auto-layout failed:', error)
    }
  }

  const handleNewModel = () => {
    const newModel = createModel({
      name: `Model ${Date.now()}`,
      type: 'CDM',
      graphData: { cells: [] }
    })
    
    if (graph) {
      graph.clear()
    }
  }

  return (
    <div className="h-12 border-b border-border bg-background px-4 flex items-center justify-between">
      {/* Left section - File operations */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={handleSave}>
          <Icons.save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button variant="ghost" size="sm" onClick={handleLoad}>
          <Icons.open className="h-4 w-4 mr-2" />
          Load
        </Button>
        
        <div className="h-6 w-px bg-border mx-2" />
        
        <Button variant="ghost" size="sm" onClick={handleExportJSON}>
          <Icons.download className="h-4 w-4 mr-2" />
          Export JSON
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleExportPNG}
          disabled={isExporting}
        >
          <Icons.image className="h-4 w-4 mr-2" />
          Export PNG
        </Button>
      </div>

      {/* Center section - Model info */}
      <div className="flex items-center space-x-4">
        <div className="text-sm text-muted-foreground">
          {currentModel ? (
            <>
              <span className="font-medium">{currentModel.name}</span>
              <span className="mx-2">•</span>
              <span>{currentModel.type}</span>
            </>
          ) : (
            'No model selected'
          )}
        </div>
      </div>

      {/* Right section - Edit and view operations */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={handleUndo}>
          <Icons.undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleRedo}>
          <Icons.redo className="h-4 w-4" />
        </Button>
        
        <div className="h-6 w-px bg-border mx-2" />
        
        <Button variant="ghost" size="sm" onClick={handleZoomOut}>
          <Icons.zoomOut className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground min-w-[60px] text-center">
          {Math.round(canvasState.zoom * 100)}%
        </span>
        <Button variant="ghost" size="sm" onClick={handleZoomIn}>
          <Icons.zoomIn className="h-4 w-4" />
        </Button>
        
        <div className="h-6 w-px bg-border mx-2" />
        
        <Button variant="ghost" size="sm" onClick={handleAutoLayout}>
          <Icons.layout className="h-4 w-4 mr-2" />
          Auto Layout
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => updateCanvasState({ grid: !canvasState.grid })}
        >
          <Icons.grid className={`h-4 w-4 ${canvasState.grid ? 'text-primary' : ''}`} />
        </Button>
      </div>
    </div>
  )
}