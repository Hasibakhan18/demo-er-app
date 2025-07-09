'use client'

import { useEffect, useRef, useState } from 'react'

export function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize JointJS+ components
  useEffect(() => {
    if (!canvasRef.current || isInitialized) return

    const initializeCanvas = async () => {
      try {
        console.log('Starting canvas initialization...')
        
        // Dynamically import JointJS+ to avoid SSR issues
        const { dia, shapes } = await import('@joint/plus')
        console.log('JointJS+ imported successfully')

        // Create graph
        const graph = new dia.Graph({}, { cellNamespace: shapes })
        console.log('Graph created')

        // Create paper with minimal configuration
        const paper = new dia.Paper({
          el: canvasRef.current,
          model: graph,
          width: 800,
          height: 600,
          gridSize: 20,
          drawGrid: true,
          background: {
            color: '#1e293b'
          },
          interactive: true
        })
        console.log('Paper created successfully')

        // Add a test rectangle to verify it's working
        const rect = new shapes.standard.Rectangle({
          position: { x: 100, y: 100 },
          size: { width: 120, height: 80 },
          attrs: {
            label: { 
              text: 'Test Entity',
              fill: '#333333'
            },
            body: { 
              fill: '#ffffff',
              stroke: '#333333',
              strokeWidth: 2
            }
          }
        })
        graph.addCell(rect)
        console.log('Test rectangle added')

        // Add another test shape
        const circle = new shapes.standard.Circle({
          position: { x: 300, y: 150 },
          size: { width: 80, height: 80 },
          attrs: {
            label: { 
              text: 'Test Attr',
              fill: '#333333'
            },
            body: { 
              fill: '#e0f2fe',
              stroke: '#0277bd',
              strokeWidth: 2
            }
          }
        })
        graph.addCell(circle)
        console.log('Test circle added')

        // Add a link between them
        const link = new shapes.standard.Link({
          source: { id: rect.id },
          target: { id: circle.id },
          attrs: {
            line: {
              stroke: '#333333',
              strokeWidth: 2
            }
          }
        })
        graph.addCell(link)
        console.log('Test link added')

        setIsInitialized(true)
        console.log('Canvas initialization completed successfully')

      } catch (error) {
        console.error('Failed to initialize canvas:', error)
        setError(error instanceof Error ? error.message : 'Unknown error')
      }
    }

    initializeCanvas()
  }, [isInitialized])

  return (
    <div className="flex-1 relative bg-slate-800 overflow-hidden">
      <div 
        ref={canvasRef} 
        className="w-full h-full canvas-container"
        style={{ 
          backgroundImage: 'radial-gradient(circle, #374151 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Loading indicator */}
      {!isInitialized && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50">
          <div className="text-white">Initializing canvas...</div>
        </div>
      )}
      
      {/* Error indicator */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50">
          <div className="text-red-400">Error: {error}</div>
        </div>
      )}
      
      {/* Status indicator */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
        {isInitialized ? 'Ready' : error ? 'Error' : 'Loading...'}
      </div>
    </div>
  )
}