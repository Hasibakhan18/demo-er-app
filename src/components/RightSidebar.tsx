'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { PropertiesPanel } from './PropertiesPanel'
import { CommentsPanel } from './CommentsPanel'

export function RightSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('properties')

  if (isCollapsed) {
    return (
      <div className="w-12 border-l border-border bg-background flex flex-col">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(false)}
          className="m-2"
        >
          <Icons.panelRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="w-80 border-l border-border bg-background flex flex-col">
      {/* Header */}
      <div className="h-12 border-b border-border flex items-center justify-between px-4">
        <h2 className="font-semibold text-sm">Inspector</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(true)}
        >
          <Icons.panelRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 m-2">
          <TabsTrigger value="properties" className="text-xs">
            <Icons.settings className="h-3 w-3 mr-1" />
            Properties
          </TabsTrigger>
          <TabsTrigger value="comments" className="text-xs">
            <Icons.messageSquare className="h-3 w-3 mr-1" />
            Comments
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="properties" className="h-full m-0 p-0">
            <PropertiesPanel />
          </TabsContent>

          <TabsContent value="comments" className="h-full m-0 p-0">
            <CommentsPanel />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}