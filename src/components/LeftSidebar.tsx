'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { FolderExplorer } from './FolderExplorer'
import { ModelExplorer } from './ModelExplorer'
import { Stencil } from './Stencil'

export function LeftSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('explorer')

  if (isCollapsed) {
    return (
      <div className="w-12 border-r border-border bg-background flex flex-col">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(false)}
          className="m-2"
        >
          <Icons.panelLeft className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="w-80 border-r border-border bg-background flex flex-col">
      {/* Header */}
      <div className="h-12 border-b border-border flex items-center justify-between px-4">
        <h2 className="font-semibold text-sm">Explorer</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(true)}
        >
          <Icons.panelLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 m-2">
          <TabsTrigger value="explorer" className="text-xs">
            <Icons.folder className="h-3 w-3 mr-1" />
            Folders
          </TabsTrigger>
          <TabsTrigger value="model" className="text-xs">
            <Icons.layers className="h-3 w-3 mr-1" />
            Model
          </TabsTrigger>
          <TabsTrigger value="stencil" className="text-xs">
            <Icons.square className="h-3 w-3 mr-1" />
            Stencil
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="explorer" className="h-full m-0 p-0">
            <FolderExplorer />
          </TabsContent>

          <TabsContent value="model" className="h-full m-0 p-0">
            <ModelExplorer />
          </TabsContent>

          <TabsContent value="stencil" className="h-full m-0 p-0">
            <Stencil />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}