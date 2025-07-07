import { ui, linkTools } from "@joint/plus";
import { dia } from "@joint/core";

// Add type declaration for Inspector
declare module "@joint/plus" {
  namespace ui {
    namespace Inspector {
      interface Inputs {}
    }
    namespace ContextToolbar {
      interface Options {
        target?: Element | string;
        padding?: number;
        autoClose?: boolean;
        vertical?: boolean;
        type?: string;
        tools?: Array<{
          action?: string;
          content?: string;
          attrs?: {
            [key: string]: any;
          };
        }>;
      }
    }
  }
}

export function showLinkTools(
  linkView: dia.LinkView<dia.Link<dia.Link.Attributes, dia.ModelSetOptions>>
) {
  const tools = new dia.ToolsView({
    tools: [
      new linkTools.Remove({
        distance: "50%",
        markup: [
          {
            tagName: "circle",
            selector: "button",
            attributes: {
              r: 7,
              fill: "#f6f6f6",
              stroke: "#ff5148",
              "stroke-width": 2,
              cursor: "pointer",
            },
          },
          {
            tagName: "path",
            selector: "icon",
            attributes: {
              d: "M -3 -3 3 3 M -3 3 3 -3",
              fill: "none",
              stroke: "#ff5148",
              "stroke-width": 2,
              "pointer-events": "none",
            },
          },
        ],
      }),
    ],
  });
  linkView.addTools(tools);
}

export function openInspector(
  cell: dia.Cell<dia.Cell.Attributes, dia.ModelSetOptions>,
  getInspectorConfig: (cell: dia.Cell) => any
) {
  closeInspector();

  // Make sure the inspector container exists
  const inspectorEl = document.getElementById("inspector");
  if (!inspectorEl) {
    console.error("[ERROR] Inspector element not found in DOM");
    return;
  }

  try {
    const inspectorConfig = getInspectorConfig(cell);
    // @ts-ignore - Ignore type checking for ui.Inspector
    ui.Inspector.create("#inspector", {
      cell: cell,
      inputs: inspectorConfig.inputs,
      groups: inspectorConfig.groups,
      theme: "material",
      cellAttributes: {
        "data-type": cell.isElement() ? "element" : "link",
        "data-id": cell.id,
      },
    });
    console.log("[INFO] Inspector created successfully for cell:", cell.id);
  } catch (error) {
    console.error("[ERROR] Failed to create inspector:", error);
    // Try a simpler inspector configuration as fallback
    try {
      // @ts-ignore - Ignore type checking for ui.Inspector
      ui.Inspector.create("#inspector", {
        cell: cell,
        theme: "material",
      });
      console.log("[INFO] Fallback inspector created for cell:", cell.id);
    } catch (fallbackError) {
      console.error("[ERROR] Fallback inspector also failed:", fallbackError);
    }
  }
}

export function closeInspector() {
  try {
    // @ts-ignore - Ignore type checking for ui.Inspector
    ui.Inspector.close();
    console.log("[INFO] Inspector closed");
  } catch (error) {
    console.error("[ERROR] Failed to close inspector:", error);
  }
}

export function showDiagramContextMenu(
  paper: dia.Paper,
  x: number,
  y: number,
  onSelectOption: (option: string) => void
) {
  try {
    const contextToolbar = new ui.ContextToolbar({
      target: document.body,
      padding: 5,
      autoClose: true,
      vertical: true,
      type: "contextmenu",
      tools: [
        {
          action: "properties",
          content: "Properties",
          attrs: {
            "data-tooltip": "Edit diagram properties",
            "data-tooltip-position": "right",
          },
        },
        {
          action: "settings",
          content: "Settings",
          attrs: {
            "data-tooltip": "Configure canvas settings",
            "data-tooltip-position": "right",
          },
        },
      ],
    });

    // Position the context menu at the clicked location
    contextToolbar.render();
    console.log("contextToolbar.el", contextToolbar.el);
    document.body.appendChild(contextToolbar.el);

    // Optional: force styles (helpful in some cases)
    Object.assign(contextToolbar.el.style, {
      position: "absolute",
      zIndex: "9999",
      display: "block",
    });
    contextToolbar.position(x, y);

    // Handle tool selection
    contextToolbar.on("action:properties", () => {
      onSelectOption("properties");
    });

    contextToolbar.on("action:settings", () => {
      onSelectOption("settings");
    });

    // Close the context menu when clicking outside
    const handleDocumentClick = (event: MouseEvent) => {
      if (!contextToolbar.el.contains(event.target as Node)) {
        contextToolbar.remove();
        document.removeEventListener("click", handleDocumentClick);
      }
    };

    // Add a small delay to prevent immediate closing
    setTimeout(() => {
      document.addEventListener("click", handleDocumentClick);
    }, 100);

    console.log("[INFO] Context menu shown at", x, y);
  } catch (error) {
    console.error("[ERROR] Failed to show context menu:", error);
  }
}
