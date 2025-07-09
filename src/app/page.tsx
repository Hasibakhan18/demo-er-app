'use client'

import { Toolbar } from '@/components/Toolbar'
import { LeftSidebar } from '@/components/LeftSidebar'
import { RightSidebar } from '@/components/RightSidebar'
import { Canvas } from '@/components/Canvas'
import { StatusBar } from '@/components/StatusBar'

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Toolbar */}
      <Toolbar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar />
        
        {/* Center Canvas */}
        <div className="flex-1 flex flex-col">
          <Canvas />
        </div>
        
        {/* Right Sidebar */}
        <RightSidebar />
      </div>
      
      {/* Bottom Status Bar */}
      <StatusBar />
    </div>
  )
}