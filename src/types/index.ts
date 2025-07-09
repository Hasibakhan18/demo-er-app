export interface ElementMeta {
  id: string;
  name: string;
  code?: string;
  description?: string;
  type: string;
  stereotype?: Stereotype;
  origin: 'native' | 'referenced' | 'cloned';
  sourceElementId?: string;
  sourceTenantId?: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface Stereotype {
  id: string;
  name: string;
  code: string;
  description?: string;
  foregroundColor: string;
  backgroundColor: string;
}

export interface DiagramModel {
  id: string;
  name: string;
  type: 'CDM' | 'LDM' | 'PDM' | 'OOM';
  graphData: any; // JointJS graph JSON
  metadata: {
    createdAt: Date;
    modifiedAt: Date;
    version: string;
    description?: string;
  };
}

export interface Entity {
  id: string;
  name: string;
  code?: string;
  description?: string;
  attributes: Attribute[];
  stereotype?: Stereotype;
  position: { x: number; y: number };
  size: { width: number; height: number };
  origin: 'native' | 'referenced' | 'cloned';
}

export interface Attribute {
  id: string;
  name: string;
  code?: string;
  dataType: string;
  nullable: boolean;
  primaryKey: boolean;
  foreignKey: boolean;
  unique: boolean;
  description?: string;
  displayOrder: number;
}

export interface Relationship {
  id: string;
  name?: string;
  sourceEntityId: string;
  targetEntityId: string;
  cardinality: {
    source: '1' | '0..1' | '1..*' | '0..*';
    target: '1' | '0..1' | '1..*' | '0..*';
  };
  type: 'identifying' | 'non-identifying';
}

export interface StencilGroup {
  name: string;
  index: number;
  closed?: boolean;
}

export interface StencilElement {
  type: string;
  label: string;
  group: string;
  icon?: string;
}

export interface CanvasState {
  zoom: number;
  pan: { x: number; y: number };
  selection: string[];
  grid: boolean;
  snapToGrid: boolean;
}

export interface ProjectState {
  currentModel?: DiagramModel;
  models: DiagramModel[];
  stereotypes: Stereotype[];
  canvasState: CanvasState;
  saveStatus: 'saved' | 'saving' | 'unsaved' | 'error';
}

export interface ExportOptions {
  format: 'json' | 'png' | 'svg';
  filename?: string;
  quality?: number; // for PNG
  scale?: number;
}

export interface LayoutOptions {
  algorithm: 'DirectedGraph' | 'Hierarchical' | 'Circular';
  direction?: 'TB' | 'BT' | 'LR' | 'RL';
  spacing?: {
    node: number;
    rank: number;
  };
}

export interface FolderItem {
  id: string
  name: string
  type: 'folder' | 'model' | 'dictionary'
  children?: FolderItem[]
  expanded?: boolean
}