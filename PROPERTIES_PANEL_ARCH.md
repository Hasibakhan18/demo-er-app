# Properties Panel Architecture

## Overview

The Properties Panel will be a React component that displays and allows editing of:

1. Diagram-level properties when no element is selected
2. Element-specific properties when a JointJS element is selected

## Component Structure

```tsx
interface PropertiesPanelProps {
  graph: joint.dia.Graph;
  paper: joint.dia.Paper;
  selectedElement?: joint.dia.Element;
  onElementUpdate?: (element: joint.dia.Element) => void;
}
```

## State Management

- `viewMode`: 'diagram' | 'element'
- `inspector`: Reference to joint.ui.Inspector instance
- Local state for diagram properties (name, description, etc.)

## Key Functionality

### 1. Element Selection Handling

- Subscribe to paper events:
  - `element:pointerclick`: Switch to element view
  - `blank:pointerclick`: Switch to diagram view
- Store selected element reference

### 2. Inspector Integration

- Initialize joint.ui.Inspector in useEffect
- Destroy previous inspector when element changes
- Configuration will be stored in `src/config/inspector.ts`

### 3. Property Synchronization

- For diagram properties: Update through component state
- For element properties: Use inspector's built-in change detection
- Emit changes via `onElementUpdate` callback

## Configuration

Example inspector configuration (to be placed in `src/config/inspector.ts`):

```ts
export const elementInspectorConfig = {
  "attrs/label/text": {
    type: "text",
    label: "Text Content",
    group: "Text",
  },
  "attrs/body/fill": {
    type: "color",
    label: "Fill Color",
    group: "Appearance",
  },
  // Additional properties...
};
```

## Implementation Steps

1. Refactor current PropertiesPanel to support dual views
2. Add element selection handling
3. Implement inspector initialization/cleanup
4. Connect property changes to JointJS model
5. Add styling for seamless view transitions
