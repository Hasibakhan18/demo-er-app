import {
  Save,
  FolderOpen,
  Download,
  Upload,
  Image,
  FileText,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Grid,
  Move,
  Square,
  Circle,
  Database,
  Link,
  Settings,
  Eye,
  EyeOff,
  Plus,
  Minus,
  X,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  MoreHorizontal,
  Search,
  Filter,
  Layers,
  Copy,
  Trash2,
  Edit,
  Lock,
  Unlock,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  MousePointer,
  Hand,
  Type,
  Palette,
  Layout,
  GitBranch,
  MessageSquare,
  Bell,
  User,
  Folder,
  File,
  Home,
  Menu,
  Sidebar,
  Clock,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react'

export const Icons = {
  // File operations
  save: Save,
  open: FolderOpen,
  download: Download,
  upload: Upload,
  image: Image,
  file: FileText,
  
  // Edit operations
  undo: Undo,
  redo: Redo,
  copy: Copy,
  paste: Copy, // Using Copy as fallback for Paste
  delete: Trash2,
  edit: Edit,
  
  // View operations
  zoomIn: ZoomIn,
  zoomOut: ZoomOut,
  grid: Grid,
  eye: Eye,
  eyeOff: EyeOff,
  maximize: Maximize,
  minimize: Minimize,
  
  // Tools
  move: Move,
  hand: Hand,
  pointer: MousePointer,
  type: Type,
  
  // Shapes
  square: Square,
  circle: Circle,
  database: Database,
  link: Link,
  
  // UI elements
  minus: Minus,
  x: X,
  check: Check,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  moreHorizontal: MoreHorizontal,
  search: Search,
  filter: Filter,
  menu: Menu,
  
  // Layout
  layers: Layers,
  layout: Layout,
  sidebar: Sidebar,
  panelLeft: Sidebar,
  panelRight: Sidebar,
  panelTop: Sidebar,
  panelBottom: Sidebar,
  
  // Alignment
  alignLeft: AlignLeft,
  alignCenter: AlignCenter,
  alignRight: AlignRight,
  alignJustify: AlignJustify,
  rotateCcw: RotateCcw,
  rotateCw: RotateCw,
  
  // Security
  lock: Lock,
  unlock: Unlock,
  
  // Styling
  palette: Palette,
  settings: Settings,
  
  // Collaboration
  gitBranch: GitBranch,
  messageSquare: MessageSquare,
  bell: Bell,
  user: User,
  
  // Navigation
  folder: Folder,
  home: Home,
  
  // Status
  clock: Clock,
  checkCircle: CheckCircle,
  xCircle: XCircle,
  mousePointer: MousePointer,
  spinner: Loader2
}

export type IconName = keyof typeof Icons