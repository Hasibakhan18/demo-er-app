'use client'

import { Icons } from '@/components/ui/icons'
import { useModels, useCanvas, useDiagram } from '@/context/DiagramContext'

export function StatusBar() {
  const { currentModel, models } = useModels()
  const { canvasState } = useCanvas()
  const { state } = useDiagram()

  const getSaveStatusIcon = () => {
    switch (state.saveStatus) {
      case 'saved':
        return <Icons.check className="h-3 w-3 text-green-500" />
      case 'saving':
        return <Icons.clock className="h-3 w-3 text-yellow-500" />
      case 'unsaved':
        return <Icons.circle className="h-3 w-3 text-orange-500" />
      case 'error':
        return <Icons.x className="h-3 w-3 text-red-500" />
      default:
        return <Icons.circle className="h-3 w-3 text-gray-500" />
    }
  }

  const getSaveStatusText = () => {
    switch (state.saveStatus) {
      case 'saved':
        return 'Saved'
      case 'saving':
        return 'Saving...'
      case 'unsaved':
        return 'Unsaved changes'
      case 'error':
        return 'Save failed'
      default:
        return 'Unknown'
    }
  }

  const getSelectionText = () => {
    const count = canvasState.selection.length
    if (count === 0) return 'No selection'
    if (count === 1) return '1 item selected'
    return `${count} items selected`
  }

  return (
    <div className="h-6 bg-muted/30 border-t border-border px-4 flex items-center justify-between text-xs text-muted-foreground">
      {/* Left section - Model info */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <Icons.database className="h-3 w-3" />
          <span>
            {currentModel ? `${currentModel.name} (${currentModel.type})` : 'No model'}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Icons.layers className="h-3 w-3" />
          <span>{models.length} model{models.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Center section - Selection info */}
      <div className="flex items-center space-x-1">
        <Icons.mousePointer className="h-3 w-3" />
        <span>{getSelectionText()}</span>
      </div>

      {/* Right section - Save status and zoom */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <Icons.search className="h-3 w-3" />
          <span>{Math.round(canvasState.zoom * 100)}%</span>
        </div>
        
        <div className="flex items-center space-x-1">
          {getSaveStatusIcon()}
          <span>{getSaveStatusText()}</span>
        </div>
        
        {currentModel && (
          <div className="flex items-center space-x-1">
            <Icons.clock className="h-3 w-3" />
            <span>
              Modified {new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }).format(new Date(currentModel.metadata.modifiedAt))}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}