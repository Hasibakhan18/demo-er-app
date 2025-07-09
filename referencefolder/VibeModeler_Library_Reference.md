# VibeModeler Library & Feature Reference

---

This document provides a detailed reference for the primary libraries used in the VibeModeler application, with a focus on how their features map to the requirements outlined in the PRD.

## 1.0 UI & Application Framework

### 1.1 Next.js & React

*   **Role**: Core application structure, rendering, and routing.
*   **Usage**: Next.js provides the server-side rendering (SSR) and routing foundation. React is used to build all UI components, from the main layout panels to the smallest buttons.

```javascript
// Example: A React component for a panel
import React from 'react';

export const RightPanel = ({ selectedElement }) => {
  return (
    <div className="panel-container">
      <h3>Properties</h3>
      {selectedElement ? (
        <p>Details for {selectedElement.name}</p>
      ) : (
        <p>Select an element to see its properties.</p>
      )}
    </div>
  );
};
```

### 1.2 Tailwind CSS & ShadCN

*   **Role**: Styling and UI component library.
*   **Usage**: Tailwind provides utility classes for rapid and consistent styling. ShadCN offers pre-built, accessible React components that are styled with Tailwind.

```html
<!-- Example: A button styled with Tailwind/ShadCN -->
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Save Model
</button>
```

### 1.3 Lucide Icons

*   **Role**: Iconography.
*   **Usage**: Provides a clean and consistent set of SVG icons for use in buttons, menus, and status indicators.

```javascript
// Example: Using a Lucide icon in a React component
import { ZoomIn } from 'lucide-react';

const ZoomButton = () => (
  <button>
    <ZoomIn size={24} />
  </button>
);
```

---

## 2.0 Diagramming Engine: JointJS Plus

JointJS+ is the heart of the modeling canvas. It provides a comprehensive suite of tools for diagramming, interaction, and UI components.

### 2.1 Core Canvas

*   **Feature**: The main diagramming surface and data model.
*   **Components**: `dia.Graph`, `dia.Paper`
*   **Usage**: The `Graph` stores all the elements and links as a data model. The `Paper` renders the graph data into an SVG viewport.

```javascript
import { dia, shapes } from '@joint/plus';

const graph = new dia.Graph({}, { cellNamespace: shapes });
const paper = new dia.Paper({
    el: document.getElementById('canvas'),
    model: graph,
    width: '100%',
    height: '100%',
    gridSize: 10
});
```

### 2.2 UI Components

*   **Feature**: Pre-built UI tools for common diagramming interactions.

| Component | PRD Feature | Usage & Example |
| :--- | :--- | :--- |
| **`ui.PaperScroller`** | Pan & Zoom | Wraps the paper to provide scroll bars and a pannable, zoomable viewport. `paperScroller.zoom(1.2, { ox: pointerX, oy: pointerY });` |
| **`ui.Navigator`** | Minimap | Renders a small, interactive preview of the entire diagram for easy navigation. `const navigator = new ui.Navigator({ paperScroller });` |
| **`ui.Stencil`** | Element Palette | Provides a panel with draggable shapes that can be dropped onto the canvas. `stencil.load(['standard.Rectangle', 'standard.Circle']);` |
| **`ui.Halo` / `ui.FreeTransform`** | Node Resizing | Attaches interactive handles to elements for resizing, rotating, and other actions. `const halo = new ui.Halo({ cellView }); halo.render();` |
| **`ui.TextEditor`** | In-Place Editing | Opens a text input directly on an element for name or attribute editing. `ui.TextEditor.edit(evt.target, { cellView, textProperty: 'attrs/label/text' });` |
| **`ui.ContextMenu`** | Context Menus | Creates and displays a right-click menu with context-specific options. `const menu = new ui.ContextMenu({ ... }); menu.open(evt);` |
| **`ui.Inspector`** | Properties Panel | Auto-generates a form in the right-hand panel to edit the properties of a selected element. `const inspector = new ui.Inspector({ cell, ... });` |
| **`ui.Selection`** | Marquee Select | Enables the user to draw a selection box (marquee) to select multiple elements. `const selection = new ui.Selection({ paper });` |

### 2.3 Core Functionality

*   **Feature**: Essential diagramming logic and data management.

| Feature | PRD Feature | Usage & Example |
| :--- | :--- | :--- |
| **`dia.CommandManager`** | Undo / Redo | Tracks all graph transactions (add, remove, change) to create an undo/redo history. `commandManager.undo();` `commandManager.redo();` |
| **`ui.Clipboard`** | Copy / Paste | Manages the copying of a selection of cells and pasting them back onto the canvas. `clipboard.copy(selection, graph); clipboard.paste(graph);` |
| **`layout.DirectedGraph`** | Auto-Layout | Provides algorithms to automatically arrange the diagram in various layouts. `layout.DirectedGraph.layout(graph, { rankDir: 'TB' });` |
| **Link Routing** | Smart Links | Uses routers to ensure links avoid crossing over nodes, making the diagram cleaner. `link.router('manhattan');` |
| **Serialization** | Save / Load | Converts the entire graph model to and from a JSON object for persistence. `const json = graph.toJSON(); graph.fromJSON(json);` |
| **Exporting** | Export to Image | Renders the current paper view to a static format. `paper.toSVG(svg => ...);` `paper.toPNG(dataUrl => ...);` |
| **Validation** | Connection Rules | Enforces rules on which elements can connect to each other. `paper.options.validateConnection = (vS, mS, vT, mT) => vS !== vT;` |

### 2.4 SVG & Styling

*   **Feature**: Controlling the visual appearance of elements.
*   **Usage**: All elements in JointJS are rendered as SVG. The `attr()` method is the primary way to control their appearance by modifying SVG attributes.

```javascript
// Example: Changing border style for a 'Referenced' entity
const entity = new shapes.standard.Rectangle();

// Set a solid border for a 'Native' entity
entity.attr('body/stroke', 'black');
entity.attr('body/strokeWidth', 2);
entity.attr('body/strokeDasharray', 'none');

// Set a dashed border for a 'Referenced' entity
entity.attr('body/strokeDasharray', '5,5');
```
