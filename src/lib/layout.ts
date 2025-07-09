import { LayoutOptions } from '../types'

export class LayoutService {
  static applyAutoLayout(graph: any, options: LayoutOptions): void {
    try {
      const { algorithm, direction = 'TB', spacing = { node: 50, rank: 100 } } = options

      switch (algorithm) {
        case 'DirectedGraph':
          this.applyDirectedGraphLayout(graph, direction, spacing)
          break
        case 'Hierarchical':
          this.applyHierarchicalLayout(graph, direction, spacing)
          break
        case 'Circular':
          this.applyCircularLayout(graph, spacing)
          break
        default:
          throw new Error(`Unsupported layout algorithm: ${algorithm}`)
      }
    } catch (error) {
      console.error('Failed to apply layout:', error)
      throw new Error('Failed to apply auto-layout')
    }
  }

  private static applyDirectedGraphLayout(graph: any, direction: string, spacing: any): void {
    // Import layout from JointJS
    const { layout } = require('@joint/plus')
    
    layout.DirectedGraph.layout(graph, {
      rankDir: direction,
      nodeSep: spacing.node,
      rankSep: spacing.rank,
      marginX: 20,
      marginY: 20,
      setLinkVertices: true,
      setLabels: true
    })
  }

  private static applyHierarchicalLayout(graph: any, direction: string, spacing: any): void {
    const elements = graph.getElements()
    const links = graph.getLinks()

    // Simple hierarchical layout implementation
    const levels: any[][] = []
    const visited = new Set()
    const roots = elements.filter((el: any) => 
      !links.some((link: any) => link.getTargetElement() === el)
    )

    // Build levels using BFS
    let currentLevel = [...roots]
    let levelIndex = 0

    while (currentLevel.length > 0) {
      levels[levelIndex] = currentLevel.filter(el => !visited.has(el.id))
      levels[levelIndex].forEach(el => visited.add(el.id))

      const nextLevel: any[] = []
      currentLevel.forEach((el: any) => {
        const outgoingLinks = links.filter((link: any) => link.getSourceElement() === el)
        outgoingLinks.forEach((link: any) => {
          const target = link.getTargetElement()
          if (!visited.has(target.id)) {
            nextLevel.push(target)
          }
        })
      })

      currentLevel = nextLevel
      levelIndex++
    }

    // Position elements
    this.positionElementsInLevels(levels, direction, spacing)
  }

  private static applyCircularLayout(graph: any, spacing: any): void {
    const elements = graph.getElements()
    const centerX = 400
    const centerY = 300
    const radius = Math.max(150, elements.length * 20)

    elements.forEach((element: any, index: number) => {
      const angle = (2 * Math.PI * index) / elements.length
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      
      element.position(x, y)
    })
  }

  private static positionElementsInLevels(levels: any[][], direction: string, spacing: any): void {
    const isVertical = direction === 'TB' || direction === 'BT'
    const isReversed = direction === 'BT' || direction === 'RL'

    levels.forEach((level, levelIndex) => {
      level.forEach((element, elementIndex) => {
        let x, y

        if (isVertical) {
          x = elementIndex * (200 + spacing.node) + 100
          y = levelIndex * (100 + spacing.rank) + 100
          if (isReversed) {
            y = (levels.length - 1 - levelIndex) * (100 + spacing.rank) + 100
          }
        } else {
          x = levelIndex * (200 + spacing.rank) + 100
          y = elementIndex * (100 + spacing.node) + 100
          if (isReversed) {
            x = (levels.length - 1 - levelIndex) * (200 + spacing.rank) + 100
          }
        }

        element.position(x, y)
      })
    })
  }

  static getLayoutOptions(): LayoutOptions[] {
    return [
      {
        algorithm: 'DirectedGraph',
        direction: 'TB',
        spacing: { node: 50, rank: 100 }
      },
      {
        algorithm: 'DirectedGraph',
        direction: 'LR',
        spacing: { node: 50, rank: 150 }
      },
      {
        algorithm: 'Hierarchical',
        direction: 'TB',
        spacing: { node: 60, rank: 120 }
      },
      {
        algorithm: 'Circular',
        spacing: { node: 80, rank: 0 }
      }
    ]
  }

  static validateLayoutOptions(options: LayoutOptions): { valid: boolean; error?: string } {
    if (!options.algorithm) {
      return { valid: false, error: 'Layout algorithm is required' }
    }

    const validAlgorithms = ['DirectedGraph', 'Hierarchical', 'Circular']
    if (!validAlgorithms.includes(options.algorithm)) {
      return { valid: false, error: 'Invalid layout algorithm' }
    }

    if (options.direction && !['TB', 'BT', 'LR', 'RL'].includes(options.direction)) {
      return { valid: false, error: 'Invalid layout direction' }
    }

    return { valid: true }
  }

  static optimizeLayout(graph: any): void {
    // Remove overlapping elements
    const elements = graph.getElements()
    const occupied: Set<string> = new Set()

    elements.forEach((element: any) => {
      const bbox = element.getBBox()
      const key = `${Math.floor(bbox.x / 50)},${Math.floor(bbox.y / 50)}`
      
      if (occupied.has(key)) {
        // Find nearest free position
        let offset = 50
        let newX = bbox.x
        let newY = bbox.y
        
        while (occupied.has(`${Math.floor(newX / 50)},${Math.floor(newY / 50)}`)) {
          newX += offset
          if (newX > 1000) {
            newX = bbox.x
            newY += offset
          }
        }
        
        element.position(newX, newY)
        occupied.add(`${Math.floor(newX / 50)},${Math.floor(newY / 50)}`)
      } else {
        occupied.add(key)
      }
    })
  }
}