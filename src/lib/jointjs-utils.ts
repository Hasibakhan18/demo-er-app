import { dia, ui } from '@joint/plus'
import { extendedShapes } from './shapes'

export class JointJSUtils {
  static createERDLink(source: dia.Element, target: dia.Element, graph: dia.Graph) {
    const link = new extendedShapes.erd.Link({
      source: { id: source.id },
      target: { id: target.id }
    })
    
    graph.addCell(link)
    return link
  }

  static setupLinkingBehavior(paper: dia.Paper, graph: dia.Graph) {
    // Enable linking between elements
    paper.on('element:magnet:pointerdown', (elementView: any, evt: any, magnet: any) => {
      evt.stopPropagation()
      
      const link = new extendedShapes.erd.Link({
        source: { id: elementView.model.id },
        target: { x: evt.clientX, y: evt.clientY }
      })
      
      graph.addCell(link)
      
      const linkView = paper.findViewByModel(link)
      ;(linkView as any).startArrowheadMove('target')
    })

    // Validate connections
    paper.on('link:connect', (linkView: any) => {
      const link = linkView.model
      const sourceElement = graph.getCell(link.get('source').id)
      const targetElement = graph.getCell(link.get('target').id)
      
      if (sourceElement && targetElement) {
        // Add cardinality labels based on element types
        this.addCardinalityLabels(link, sourceElement as dia.Element, targetElement as dia.Element)
      }
    })
  }

  static addCardinalityLabels(link: dia.Link, source: dia.Element, target: dia.Element) {
    const sourceType = source.get('type')
    const targetType = target.get('type')
    
    let sourceCardinality = '1'
    let targetCardinality = '1'
    
    // Determine cardinality based on element types
    if (sourceType === 'erd.Entity' && targetType === 'erd.Relationship') {
      sourceCardinality = '1'
      targetCardinality = 'M'
    } else if (sourceType === 'erd.Relationship' && targetType === 'erd.Entity') {
      sourceCardinality = 'M'
      targetCardinality = '1'
    }
    
    // Add cardinality labels
    ;(link as any).setCardinality(sourceCardinality, targetCardinality)
  }

  static setupSelectionBehavior(paper: dia.Paper, selection: ui.Selection) {
    // Multi-selection with Ctrl key
    paper.on('element:pointerclick', (elementView: any, evt: any) => {
      if (evt.ctrlKey || evt.metaKey) {
        if (selection.collection.get(elementView.model.id)) {
          selection.collection.remove(elementView.model)
        } else {
          selection.collection.add(elementView.model)
        }
      } else {
        selection.collection.reset([elementView.model])
      }
    })

    paper.on('link:pointerclick', (linkView: any, evt: any) => {
      if (evt.ctrlKey || evt.metaKey) {
        if (selection.collection.get(linkView.model.id)) {
          selection.collection.remove(linkView.model)
        } else {
          selection.collection.add(linkView.model)
        }
      } else {
        selection.collection.reset([linkView.model])
      }
    })

    // Selection rectangle
    paper.on('blank:pointerdown', (evt: any) => {
      if (!evt.ctrlKey && !evt.metaKey) {
        selection.collection.reset()
      }
    })
  }

  static setupKeyboardShortcuts(paper: dia.Paper, graph: dia.Graph, commandManager: dia.CommandManager, clipboard: ui.Clipboard) {
    document.addEventListener('keydown', (evt) => {
      // Only handle shortcuts when canvas is focused
      if (!paper.el.contains(document.activeElement)) return

      switch (evt.key) {
        case 'Delete':
        case 'Backspace':
          evt.preventDefault()
          this.deleteSelected(graph, paper)
          break
        
        case 'z':
          if (evt.ctrlKey && !evt.shiftKey) {
            evt.preventDefault()
            commandManager.undo()
          } else if (evt.ctrlKey && evt.shiftKey) {
            evt.preventDefault()
            commandManager.redo()
          }
          break
        
        case 'y':
          if (evt.ctrlKey) {
            evt.preventDefault()
            commandManager.redo()
          }
          break
        
        case 'c':
          if (evt.ctrlKey) {
            evt.preventDefault()
            this.copySelected(graph, paper, clipboard)
          }
          break
        
        case 'v':
          if (evt.ctrlKey) {
            evt.preventDefault()
            this.pasteFromClipboard(graph, clipboard)
          }
          break
        
        case 'a':
          if (evt.ctrlKey) {
            evt.preventDefault()
            this.selectAll(graph, paper)
          }
          break
      }
    })
  }

  static deleteSelected(graph: dia.Graph, paper: dia.Paper) {
    const selection = (paper as any).selection
    if (selection && selection.collection.length > 0) {
      const cellsToRemove = selection.collection.toArray()
      graph.removeCells(cellsToRemove)
      selection.collection.reset()
    }
  }

  static copySelected(graph: dia.Graph, paper: dia.Paper, clipboard: ui.Clipboard) {
    const selection = (paper as any).selection
    if (selection && selection.collection.length > 0) {
      const cellsToCopy = selection.collection.toArray()
      clipboard.copyElements(cellsToCopy, graph)
    }
  }

  static pasteFromClipboard(graph: dia.Graph, clipboard: ui.Clipboard) {
    const pastedCells = clipboard.pasteCells(graph, { dx: 20, dy: 20 })
    return pastedCells
  }

  static selectAll(graph: dia.Graph, paper: dia.Paper) {
    const selection = (paper as any).selection
    if (selection) {
      const allCells = graph.getCells()
      selection.collection.reset(allCells)
    }
  }

  static setupAutoLayout(graph: dia.Graph) {
    // Auto-arrange entities and relationships
    const entities = graph.getElements().filter(el => 
      el.get('type') === 'erd.Entity' || el.get('type') === 'erd.WeakEntity'
    )
    
    const relationships = graph.getElements().filter(el => 
      el.get('type') === 'erd.Relationship' || el.get('type') === 'erd.IdentifyingRelationship'
    )

    // Simple grid layout for entities
    entities.forEach((entity, index) => {
      const col = index % 3
      const row = Math.floor(index / 3)
      entity.position(50 + col * 200, 50 + row * 150)
    })

    // Position relationships between connected entities
    relationships.forEach(relationship => {
      const connectedLinks = graph.getConnectedLinks(relationship)
      if (connectedLinks.length >= 2) {
        const connectedEntities = connectedLinks.map(link => {
          const sourceId = link.get('source').id
          const targetId = link.get('target').id
          return sourceId === relationship.id ? graph.getCell(targetId) : graph.getCell(sourceId)
        }).filter(Boolean)

        if (connectedEntities.length >= 2) {
          const avgX = connectedEntities.reduce((sum, entity) => sum + entity.get('position').x, 0) / connectedEntities.length
          const avgY = connectedEntities.reduce((sum, entity) => sum + entity.get('position').y, 0) / connectedEntities.length
          relationship.position(avgX, avgY + 100)
        }
      }
    })
  }

  static validateERDModel(graph: dia.Graph): string[] {
    const errors: string[] = []
    const entities = graph.getElements().filter(el => 
      el.get('type') === 'erd.Entity' || el.get('type') === 'erd.WeakEntity'
    )
    
    const relationships = graph.getElements().filter(el => 
      el.get('type') === 'erd.Relationship' || el.get('type') === 'erd.IdentifyingRelationship'
    )

    // Check for entities without names
    entities.forEach(entity => {
      const label = entity.attr('label/text')
      if (!label || label.trim() === '' || label === 'Entity' || label === 'Weak Entity') {
        const position = entity.get('position')
        if (position) {
          errors.push(`Entity at position (${position.x}, ${position.y}) needs a name`)
        }
      }
    })

    // Check for relationships without connections
    relationships.forEach(relationship => {
      const connectedLinks = graph.getConnectedLinks(relationship)
      if (connectedLinks.length < 2) {
        errors.push(`Relationship "${relationship.attr('label/text')}" must connect at least two entities`)
      }
    })

    // Check for isolated entities
    entities.forEach(entity => {
      const connectedLinks = graph.getConnectedLinks(entity)
      if (connectedLinks.length === 0) {
        errors.push(`Entity "${entity.attr('label/text')}" is not connected to any relationships`)
      }
    })

    return errors
  }

  static exportToJSON(graph: dia.Graph) {
    return graph.toJSON()
  }

  static importFromJSON(graph: dia.Graph, jsonData: any) {
    graph.fromJSON(jsonData)
  }

  static setupGridSnapping(paper: dia.Paper, gridSize: number = 20) {
    paper.on('cell:pointerup', (cellView: any) => {
      const cell = cellView.model
      const position = cell.get('position')
      
      const snappedX = Math.round(position.x / gridSize) * gridSize
      const snappedY = Math.round(position.y / gridSize) * gridSize
      
      cell.position(snappedX, snappedY)
    })
  }
}