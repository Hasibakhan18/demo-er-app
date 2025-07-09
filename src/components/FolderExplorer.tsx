'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { useModels } from '@/context/DiagramContext'
import { StorageService } from '@/lib/storage'
import { FolderItem } from '@/types'

export function FolderExplorer() {
  const [folders, setFolders] = useState<FolderItem[]>([])
  const [loading, setLoading] = useState(true)
  const { models, setCurrentModel, createModel } = useModels()

  // Load initial folder structure
  useEffect(() => {
    try {
      const storedFolders = StorageService.getFolderStructure()
      setFolders(storedFolders)
    } catch (error) {
      console.error('Failed to load folders:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const toggleFolder = (id: string) => {
    const updateFolder = (items: FolderItem[]): FolderItem[] => {
      return items.map(item => {
        if (item.id === id) {
          const updated = { ...item, expanded: !item.expanded }
          StorageService.updateFolderItem(id, { expanded: updated.expanded })
          return updated
        }
        if (item.children) {
          return { ...item, children: updateFolder(item.children) }
        }
        return item
      })
    }
    setFolders(updateFolder(folders))
  }

  const handleItemClick = (item: FolderItem) => {
    if (item.type === 'folder') {
      toggleFolder(item.id)
    } else if (item.type === 'model') {
      const model = models.find(m => m.id === item.id)
      if (model) {
        setCurrentModel(model)
      }
    }
  }

  const handleNewModel = () => {
    const newModel = createModel({
      name: `New Model ${Date.now()}`,
      type: 'CDM',
      graphData: { cells: [] }
    })

    // Add to root folder
    const updatedFolders = StorageService.addFolderItem(null, {
      name: newModel.name,
      type: 'model',
      id: newModel.id
    })
    setFolders(updatedFolders)
  }

  const handleNewFolder = () => {
    const updatedFolders = StorageService.addFolderItem(null, {
      name: `New Folder ${Date.now()}`,
      type: 'folder',
      expanded: false
    })
    setFolders(updatedFolders)
  }

  const renderFolderItem = (item: FolderItem, level: number = 0) => {
    const Icon = item.type === 'folder' 
      ? (item.expanded ? Icons.chevronDown : Icons.chevronRight)
      : item.type === 'model' 
        ? Icons.database 
        : Icons.file

    return (
      <div key={item.id}>
        <div
          className={`flex items-center py-1 px-2 hover:bg-accent cursor-pointer text-sm`}
          style={{ paddingLeft: `${8 + level * 16}px` }}
          onClick={() => handleItemClick(item)}
        >
          <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">{item.name}</span>
        </div>
        
        {item.expanded && item.children && (
          <div>
            {item.children.map(child => renderFolderItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Icons.spinner className="h-4 w-4 animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header with actions */}
      <div className="p-2 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">FOLDERS</span>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleNewFolder}>
              <Icons.folder className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Folder tree */}
      <div className="flex-1 overflow-auto p-1">
        {folders.length > 0 ? (
          folders.map(folder => renderFolderItem(folder))
        ) : (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No folders yet. Create one to get started.
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-border">
        <div className="text-xs text-muted-foreground">
          {models.length} model{models.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}

interface FolderItem {
  id: string
  name: string
  type: 'folder' | 'model' | 'dictionary'
  children?: FolderItem[]
  expanded?: boolean
}