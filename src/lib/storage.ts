import { DiagramModel, ProjectState, Stereotype, FolderItem } from '@/types'

const STORAGE_KEYS = {
  MODELS: 'erdmodeler_models',
  CURRENT_MODEL: 'erdmodeler_current_model',
  STEREOTYPES: 'erdmodeler_stereotypes',
  CANVAS_STATE: 'erdmodeler_canvas_state',
  PROJECT_STATE: 'erdmodeler_project_state',
  FOLDER_STRUCTURE: 'erdmodeler_folder_structure'
}

// Default stereotypes
const DEFAULT_STEREOTYPES: Stereotype[] = [
  {
    id: 'transactional',
    name: 'Transactional',
    code: 'TXN',
    description: 'Transactional data entity',
    foregroundColor: '#ffffff',
    backgroundColor: '#3b82f6'
  },
  {
    id: 'master',
    name: 'Master Data',
    code: 'MST',
    description: 'Master data entity',
    foregroundColor: '#ffffff',
    backgroundColor: '#10b981'
  },
  {
    id: 'reference',
    name: 'Reference',
    code: 'REF',
    description: 'Reference data entity',
    foregroundColor: '#000000',
    backgroundColor: '#f59e0b'
  },
  {
    id: 'lookup',
    name: 'Lookup',
    code: 'LKP',
    description: 'Lookup table',
    foregroundColor: '#ffffff',
    backgroundColor: '#8b5cf6'
  }
]

export class StorageService {
  // Original model methods
  static saveModel(model: DiagramModel): void {
    try {
      const models = this.getModels()
      const existingIndex = models.findIndex(m => m.id === model.id)
      
      if (existingIndex >= 0) {
        models[existingIndex] = model
      } else {
        models.push(model)
      }
      
      localStorage.setItem(STORAGE_KEYS.MODELS, JSON.stringify(models))
      localStorage.setItem(STORAGE_KEYS.CURRENT_MODEL, model.id)
    } catch (error) {
      console.error('Failed to save model:', error)
      throw new Error('Failed to save model to localStorage')
    }
  }

  static getModels(): DiagramModel[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MODELS)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to load models:', error)
      return []
    }
  }

  static getModel(id: string): DiagramModel | null {
    const models = this.getModels()
    return models.find(m => m.id === id) || null
  }

  static deleteModel(id: string): void {
    try {
      const models = this.getModels().filter(m => m.id !== id)
      localStorage.setItem(STORAGE_KEYS.MODELS, JSON.stringify(models))
      
      const currentModelId = localStorage.getItem(STORAGE_KEYS.CURRENT_MODEL)
      if (currentModelId === id) {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_MODEL)
      }
    } catch (error) {
      console.error('Failed to delete model:', error)
      throw new Error('Failed to delete model from localStorage')
    }
  }

  static getCurrentModelId(): string | null {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_MODEL)
  }

  static setCurrentModelId(id: string): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_MODEL, id)
  }

  static getStereotypes(): Stereotype[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STEREOTYPES)
      return stored ? JSON.parse(stored) : DEFAULT_STEREOTYPES
    } catch (error) {
      console.error('Failed to load stereotypes:', error)
      return DEFAULT_STEREOTYPES
    }
  }

  static saveStereotypes(stereotypes: Stereotype[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.STEREOTYPES, JSON.stringify(stereotypes))
    } catch (error) {
      console.error('Failed to save stereotypes:', error)
      throw new Error('Failed to save stereotypes to localStorage')
    }
  }

  static getProjectState(): Partial<ProjectState> | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROJECT_STATE)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Failed to load project state:', error)
      return null
    }
  }

  static saveProjectState(state: Partial<ProjectState>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECT_STATE, JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save project state:', error)
    }
  }

  // New folder structure methods
  static getFolderStructure(): FolderItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FOLDER_STRUCTURE)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to load folder structure:', error)
      return []
    }
  }

  static saveFolderStructure(folders: FolderItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.FOLDER_STRUCTURE, JSON.stringify(folders))
    } catch (error) {
      console.error('Failed to save folder structure:', error)
      throw new Error('Failed to save folder structure to localStorage')
    }
  }

  static addFolderItem(parentId: string | null, item: Omit<FolderItem, 'id'>): FolderItem[] {
    const folders = this.getFolderStructure()
    const newItem = { ...item, id: `item_${Date.now()}` }

    if (!parentId) {
      const updatedFolders = [...folders, newItem]
      this.saveFolderStructure(updatedFolders)
      return updatedFolders
    }

    const updateFolders = (items: FolderItem[]): FolderItem[] => {
      return items.map(folder => {
        if (folder.id === parentId) {
          return {
            ...folder,
            children: [...(folder.children || []), newItem]
          }
        }
        if (folder.children) {
          return {
            ...folder,
            children: updateFolders(folder.children)
          }
        }
        return folder
      })
    }

    const updatedFolders = updateFolders(folders)
    this.saveFolderStructure(updatedFolders)
    return updatedFolders
  }

  static updateFolderItem(id: string, updates: Partial<FolderItem>): FolderItem[] {
    const folders = this.getFolderStructure()

    const updateFolders = (items: FolderItem[]): FolderItem[] => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, ...updates }
        }
        if (item.children) {
          return {
            ...item,
            children: updateFolders(item.children)
          }
        }
        return item
      })
    }

    const updatedFolders = updateFolders(folders)
    this.saveFolderStructure(updatedFolders)
    return updatedFolders
  }

  static deleteFolderItem(id: string): FolderItem[] {
    const folders = this.getFolderStructure()

    const filterFolders = (items: FolderItem[]): FolderItem[] => {
      return items
        .filter(item => item.id !== id)
        .map(item => {
          if (item.children) {
            return {
              ...item,
              children: filterFolders(item.children)
            }
          }
          return item
        })
    }

    const updatedFolders = filterFolders(folders)
    this.saveFolderStructure(updatedFolders)
    return updatedFolders
  }

  // Other existing methods (exportData, importData, clearAll, getStorageUsage)...
}