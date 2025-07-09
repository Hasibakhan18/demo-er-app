'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { DiagramModel, ProjectState, CanvasState, Stereotype } from '../types'
import { StorageService } from '../lib/storage'

interface DiagramContextType {
  state: ProjectState
  dispatch: React.Dispatch<DiagramAction>
  graph: any
  paper: any
  setGraph: (graph: any) => void
  setPaper: (paper: any) => void
}

type DiagramAction =
  | { type: 'SET_CURRENT_MODEL'; payload: DiagramModel }
  | { type: 'ADD_MODEL'; payload: DiagramModel }
  | { type: 'UPDATE_MODEL'; payload: DiagramModel }
  | { type: 'DELETE_MODEL'; payload: string }
  | { type: 'SET_MODELS'; payload: DiagramModel[] }
  | { type: 'SET_STEREOTYPES'; payload: Stereotype[] }
  | { type: 'UPDATE_CANVAS_STATE'; payload: Partial<CanvasState> }
  | { type: 'SET_SAVE_STATUS'; payload: 'saved' | 'saving' | 'unsaved' | 'error' }
  | { type: 'SET_SELECTION'; payload: string[] }
  | { type: 'CLEAR_SELECTION' }

const initialCanvasState: CanvasState = {
  zoom: 1,
  pan: { x: 0, y: 0 },
  selection: [],
  grid: true,
  snapToGrid: true
}

const initialState: ProjectState = {
  models: [],
  stereotypes: [],
  canvasState: initialCanvasState,
  saveStatus: 'saved'
}

function diagramReducer(state: ProjectState, action: DiagramAction): ProjectState {
  switch (action.type) {
    case 'SET_CURRENT_MODEL':
      return {
        ...state,
        currentModel: action.payload,
        saveStatus: 'saved'
      }

    case 'ADD_MODEL':
      return {
        ...state,
        models: [...state.models, action.payload],
        currentModel: action.payload,
        saveStatus: 'unsaved'
      }

    case 'UPDATE_MODEL':
      return {
        ...state,
        models: state.models.map(model =>
          model.id === action.payload.id ? action.payload : model
        ),
        currentModel: state.currentModel?.id === action.payload.id ? action.payload : state.currentModel,
        saveStatus: 'unsaved'
      }

    case 'DELETE_MODEL':
      const filteredModels = state.models.filter(model => model.id !== action.payload)
      return {
        ...state,
        models: filteredModels,
        currentModel: state.currentModel?.id === action.payload ? undefined : state.currentModel,
        saveStatus: 'saved'
      }

    case 'SET_MODELS':
      return {
        ...state,
        models: action.payload
      }

    case 'SET_STEREOTYPES':
      return {
        ...state,
        stereotypes: action.payload
      }

    case 'UPDATE_CANVAS_STATE':
      return {
        ...state,
        canvasState: {
          ...state.canvasState,
          ...action.payload
        }
      }

    case 'SET_SAVE_STATUS':
      return {
        ...state,
        saveStatus: action.payload
      }

    case 'SET_SELECTION':
      return {
        ...state,
        canvasState: {
          ...state.canvasState,
          selection: action.payload
        }
      }

    case 'CLEAR_SELECTION':
      return {
        ...state,
        canvasState: {
          ...state.canvasState,
          selection: []
        }
      }

    default:
      return state
  }
}

const DiagramContext = createContext<DiagramContextType | undefined>(undefined)

interface DiagramProviderProps {
  children: ReactNode
}

export function DiagramProvider({ children }: DiagramProviderProps) {
  const [state, dispatch] = useReducer(diagramReducer, initialState)
  const [graph, setGraph] = React.useState<any>(null)
  const [paper, setPaper] = React.useState<any>(null)

  // Load initial data from localStorage
  useEffect(() => {
    const loadInitialData = () => {
      try {
        const models = StorageService.getModels()
        const stereotypes = StorageService.getStereotypes()
        const currentModelId = StorageService.getCurrentModelId()
        
        dispatch({ type: 'SET_MODELS', payload: models })
        dispatch({ type: 'SET_STEREOTYPES', payload: stereotypes })
        
        if (currentModelId) {
          const currentModel = models.find(m => m.id === currentModelId)
          if (currentModel) {
            dispatch({ type: 'SET_CURRENT_MODEL', payload: currentModel })
          }
        }
      } catch (error) {
        console.error('Failed to load initial data:', error)
      }
    }

    loadInitialData()
  }, [])

  // Auto-save functionality
  useEffect(() => {
    if (state.currentModel && state.saveStatus === 'unsaved') {
      const timeoutId = setTimeout(() => {
        try {
          dispatch({ type: 'SET_SAVE_STATUS', payload: 'saving' })
          StorageService.saveModel(state.currentModel)
          dispatch({ type: 'SET_SAVE_STATUS', payload: 'saved' })
        } catch (error) {
          console.error('Auto-save failed:', error)
          dispatch({ type: 'SET_SAVE_STATUS', payload: 'error' })
        }
      }, 2000) // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timeoutId)
    }
  }, [state.currentModel, state.saveStatus])

  const contextValue: DiagramContextType = {
    state,
    dispatch,
    graph,
    paper,
    setGraph,
    setPaper
  }

  return (
    <DiagramContext.Provider value={contextValue}>
      {children}
    </DiagramContext.Provider>
  )
}

export function useDiagram() {
  const context = useContext(DiagramContext)
  if (context === undefined) {
    throw new Error('useDiagram must be used within a DiagramProvider')
  }
  return context
}

// Custom hooks for specific functionality
export function useModels() {
  const { state, dispatch } = useDiagram()
  
  const createModel = (model: Omit<DiagramModel, 'id' | 'metadata'>) => {
    const newModel: DiagramModel = {
      ...model,
      id: Math.random().toString(36).substr(2, 9),
      metadata: {
        createdAt: new Date(),
        modifiedAt: new Date(),
        version: '1.0.0'
      }
    }
    dispatch({ type: 'ADD_MODEL', payload: newModel })
    return newModel
  }

  const updateModel = (model: DiagramModel) => {
    const updatedModel = {
      ...model,
      metadata: {
        ...model.metadata,
        modifiedAt: new Date()
      }
    }
    dispatch({ type: 'UPDATE_MODEL', payload: updatedModel })
  }

  const deleteModel = (id: string) => {
    StorageService.deleteModel(id)
    dispatch({ type: 'DELETE_MODEL', payload: id })
  }

  const setCurrentModel = (model: DiagramModel) => {
    StorageService.setCurrentModelId(model.id)
    dispatch({ type: 'SET_CURRENT_MODEL', payload: model })
  }

  return {
    models: state.models,
    currentModel: state.currentModel,
    createModel,
    updateModel,
    deleteModel,
    setCurrentModel
  }
}

export function useCanvas() {
  const { state, dispatch } = useDiagram()
  
  const updateCanvasState = (updates: Partial<CanvasState>) => {
    dispatch({ type: 'UPDATE_CANVAS_STATE', payload: updates })
  }

  const setSelection = (selection: string[]) => {
    dispatch({ type: 'SET_SELECTION', payload: selection })
  }

  const clearSelection = () => {
    dispatch({ type: 'CLEAR_SELECTION' })
  }

  return {
    canvasState: state.canvasState,
    updateCanvasState,
    setSelection,
    clearSelection
  }
}

export function useStereotypes() {
  const { state, dispatch } = useDiagram()
  
  const updateStereotypes = (stereotypes: Stereotype[]) => {
    StorageService.saveStereotypes(stereotypes)
    dispatch({ type: 'SET_STEREOTYPES', payload: stereotypes })
  }

  return {
    stereotypes: state.stereotypes,
    updateStereotypes
  }
}