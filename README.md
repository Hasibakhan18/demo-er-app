# ERDModeler - Interactive Visual Modeling Tool

A professional-grade frontend application for Entity Relationship Diagram (ERD) modeling, built with modern web technologies and designed to rival enterprise tools like ERModeler or PowerDesigner.

## 🚀 Features

### 🎨 Modern UI/UX
- **Clean, professional interface** with panel-based layout
- **Responsive design** with collapsible sidebars
- **Dark theme** with modern styling using Tailwind CSS + ShadCN UI
- **Intuitive navigation** with tabbed panels and organized toolbars

### 🖼️ Layout Structure
- **Left Sidebar**: 
  - Folder Explorer (Organization/Marketplace structure)
  - Model Explorer (Current model structure)
  - Stencil (Draggable shapes palette)
- **Center Canvas**: Interactive diagramming area with grid and zoom
- **Right Sidebar**: 
  - Properties Panel (Element configuration)
  - Comments Panel (Collaborative annotations)
- **Top Toolbar**: File operations, export, undo/redo, zoom, auto-layout
- **Status Bar**: Model info, selection status, save status, zoom level

### 📐 Diagramming Capabilities
- **JointJS+ Integration** (ready for commercial license)
- **Multiple Model Types**: CDM, LDM, PDM, OOM support
- **Entity Management**: Add entities with attributes, data types, constraints
- **Relationship Modeling**: Various relationship types with cardinality
- **Visual Styling**: Stereotypes with custom colors, element origins (native/referenced/cloned)

### 💾 Data Management
- **localStorage Persistence**: Client-side save/load functionality
- **Export Options**: JSON, PNG, SVG export capabilities
- **Import/Export**: Full project data import/export
- **Auto-save**: Debounced automatic saving
- **Version Control**: Ready for model versioning

### 🎯 Professional Features
- **Stencil Library**: Draggable entity, relationship, and annotation shapes
- **Properties Inspector**: Comprehensive element property editing
- **Comments System**: Collaborative review with status tracking
- **Auto-Layout**: Multiple layout algorithms (DirectedGraph, Hierarchical, Circular)
- **Keyboard Shortcuts**: Efficient workflow with hotkeys
- **Context Menus**: Right-click actions for elements

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN UI
- **Icons**: Lucide React
- **Diagramming**: JointJS+ (commercial license required)
- **State Management**: React Context + useReducer
- **Storage**: localStorage API

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   └── globals.css        # Global styles and CSS variables
├── components/            # React components
│   ├── ui/               # Reusable UI components (ShadCN)
│   ├── Canvas.tsx        # Main diagramming canvas
│   ├── Toolbar.tsx       # Top toolbar with actions
│   ├── LeftSidebar.tsx   # Left panel container
│   ├── RightSidebar.tsx  # Right panel container
│   ├── FolderExplorer.tsx # Project folder tree
│   ├── ModelExplorer.tsx  # Model structure tree
│   ├── Stencil.tsx       # Shape palette
│   ├── PropertiesPanel.tsx # Element properties editor
│   ├── CommentsPanel.tsx  # Collaborative comments
│   └── StatusBar.tsx     # Bottom status information
├── context/              # React context providers
│   └── DiagramContext.tsx # Global state management
├── lib/                  # Utility libraries
│   ├── storage.ts        # localStorage operations
│   ├── export.ts         # Export functionality
│   ├── layout.ts         # Auto-layout algorithms
│   └── utils.ts          # Common utilities
└── types/                # TypeScript type definitions
    └── index.ts          # Application types
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- JointJS+ license (for full diagramming functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ERDModeler
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure JointJS+** (Optional)
   - Obtain a JointJS+ license
   - Replace the placeholder import in `Canvas.tsx`
   - Configure authentication as per JointJS+ documentation

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🎯 Usage

### Creating Models
1. Click "New" in the toolbar to create a new model
2. Select model type (CDM, LDM, PDM, OOM)
3. Use the Stencil panel to drag shapes onto the canvas
4. Configure properties in the Properties panel
5. Save your work (auto-saves every 2 seconds)

### Working with Elements
- **Add Entities**: Drag from Stencil or use context menu
- **Edit Properties**: Select element and use Properties panel
- **Add Attributes**: Use the Attributes tab in Properties panel
- **Create Relationships**: Draw connections between entities
- **Apply Stereotypes**: Use dropdown in Properties panel

### Collaboration
- **Add Comments**: Right-click elements and select "Add Comment"
- **Review Comments**: Use Comments panel to manage feedback
- **Track Changes**: Visual indicators for element origins

### Export Options
- **JSON**: Full model data for backup/sharing
- **PNG**: High-quality image export
- **SVG**: Vector graphics for documentation

## 🔧 Configuration

### Customizing Stereotypes
Edit `src/lib/storage.ts` to modify default stereotypes:
```typescript
const DEFAULT_STEREOTYPES: Stereotype[] = [
  {
    id: 'custom',
    name: 'Custom Type',
    code: 'CUS',
    description: 'Custom entity type',
    foregroundColor: '#ffffff',
    backgroundColor: '#ff6b6b'
  }
]
```

### Adding Stencil Shapes
Modify `src/components/Stencil.tsx` to add new shape types:
```typescript
const stencilGroups: StencilGroup[] = [
  {
    name: 'Custom Shapes',
    expanded: true,
    items: [
      {
        id: 'custom-shape',
        name: 'Custom Shape',
        type: 'standard.Rectangle',
        icon: '⬛',
        description: 'Custom shape description'
      }
    ]
  }
]
```

## 🎨 Styling

The application uses a modern design system with:
- **CSS Variables**: Defined in `globals.css` for easy theming
- **Tailwind Classes**: Utility-first styling approach
- **ShadCN Components**: Consistent, accessible UI components
- **Custom Classes**: Specialized styles for diagramming elements

## 🚧 Development Status

### ✅ Completed Features
- Complete UI layout and navigation
- Component architecture and state management
- localStorage persistence
- Export functionality
- Properties and comments systems
- Responsive design
- TypeScript type safety

### 🔄 In Progress
- JointJS+ integration (requires commercial license)
- Advanced auto-layout algorithms
- Real-time collaboration features

### 📋 Roadmap
- Database reverse engineering
- Model transformation (CDM → LDM → PDM)
- Advanced validation rules
- Plugin system for extensions
- Cloud storage integration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments for implementation details

---

**ERDModeler** - Professional data modeling made simple and beautiful.