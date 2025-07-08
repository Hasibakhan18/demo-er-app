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
    // // Remove any existing context menus first
    // const existingMenus = document.querySelectorAll('.joint-context-toolbar');
    // existingMenus.forEach(menu => menu.remove());

    // const contextToolbar = new ui.ContextToolbar({
    //   target: document.body,
    //   padding: 5,
    //   autoClose: true,
    //   vertical: true,
    //   type: "contextmenu",
    //   tools: [
    //     {
    //       action: "properties",
    //       content: "Properties",
    //       attrs: {
    //         "data-tooltip": "Edit diagram properties",
    //         "data-tooltip-position": "right",
    //         class: "context-menu-item",
    //       },
    //     },
    //     {
    //       action: "settings",
    //       content: "Settings",
    //       attrs: {
    //         "data-tooltip": "Configure canvas settings",
    //         "data-tooltip-position": "right",
    //         class: "context-menu-item",
    //       },
    //     },
    //   ],
    // });

    // chatgptchanges - Remove existing menus
    const existingMenus = document.querySelectorAll('.joint-context-toolbar');
    existingMenus.forEach(menu => menu.remove());

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
            "data-action": "properties",
            class: "context-menu-item",
            // chatgptui - button style for stack layout
            style: {
              padding: "10px 16px",
              background: "transparent",
              color: "#000000",
              fontSize: "14px",
              textAlign: "left",
              width: "100%",
              border: "none",
              cursor: "pointer"
            }
          },
        },
        {
          action: "settings",
          content: "Settings",
          attrs: {
            "data-tooltip": "Configure canvas settings",
            "data-tooltip-position": "right",
            "data-action": "settings",
            class: "context-menu-item",
            // chatgptui - button style for stack layout
            style: {
              padding: "10px 16px",
              background: "transparent",
              color: "#000000",
              fontSize: "14px",
              textAlign: "left",
              width: "100%",
              border: "none",
              cursor: "pointer"
            }
          },
        },
      ],
    });

    // // Position the context menu at the clicked location
    // contextToolbar.render();
    // console.log("contextToolbar.el", contextToolbar.el);

    // chatgptchanges - Calculate position relative to canvas container
    contextToolbar.render();
    contextToolbar.el.classList.add('diagram-context-menu');
    const canvasContainer = paper.el?.parentElement || document.body;
    canvasContainer.appendChild(contextToolbar.el);

    // chatgptui - updated visual styles for stacked layout and color
    Object.assign(contextToolbar.el.style, {
      position: "absolute", // position relative to paper container
      zIndex: "1000",
      display: "block",
      backgroundColor: "#e0e0e0", // gray background
      color: "#000000",           // black text
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      minWidth: "160px",
      padding: "4px 0"
    });

    const containerRect = canvasContainer.getBoundingClientRect();
    const relativeX = x - containerRect.left + canvasContainer.scrollLeft;
    const relativeY = y - containerRect.top + canvasContainer.scrollTop;

    // Optional bounds checking
    const menuRect = contextToolbar.el.getBoundingClientRect();
    const maxX = canvasContainer.clientWidth - menuRect.width - 10;
    const maxY = canvasContainer.clientHeight - menuRect.height - 10;

    const finalX = Math.min(relativeX, maxX);
    const finalY = Math.min(relativeY, maxY);

    contextToolbar.el.style.left = `${finalX}px`;
    contextToolbar.el.style.top = `${finalY}px`;

    // // chatgptchanges - Dispatch diagram:settings event on selection
    // contextToolbar.on("action:properties", () => {
    //   console.log("[INFO] Properties selected from context menu");
    //   contextToolbar.remove();
    //   const event = new CustomEvent("diagram:settings", {
    //     detail: { type: "properties" },
    //   });
    //   document.dispatchEvent(event);
    //   onSelectOption("properties");
    // });

    // contextToolbar.on("action:settings", () => {
    //   console.log("[INFO] Settings selected from context menu");
    //   contextToolbar.remove();
    //   const event = new CustomEvent("diagram:settings", {
    //     detail: { type: "settings" },
    //   });
    //   document.dispatchEvent(event);
    //   onSelectOption("settings");
    // });


    contextToolbar.on("action:properties", () => {
      console.log("[INFO] Properties selected from context menu");
      contextToolbar.remove();
      const inspectorEvent = new CustomEvent("inspector:show", {
        detail: { show: true, type: "properties" },
      });
      document.dispatchEvent(inspectorEvent);
    });

    contextToolbar.on("action:settings", () => {
      console.log("[INFO] Settings selected from context menu");
      contextToolbar.remove();
      const inspectorEvent = new CustomEvent("inspector:show", {
        detail: { show: true, type: "settings" },
      });
      document.dispatchEvent(inspectorEvent);
    });



    // // commented
    // contextToolbar.on("action:properties", () => {
    //   console.log("[INFO] Properties selected from context menu");
    //   contextToolbar.remove();
    //   onSelectOption("properties");
    // });

    // contextToolbar.on("action:settings", () => {
    //   console.log("[INFO] Settings selected from context menu");
    //   contextToolbar.remove();
    //   onSelectOption("settings");
    // });  //COMMENTED

    // // Add CSS class for easier identification
    // contextToolbar.el.classList.add('diagram-context-menu');
    // document.body.appendChild(contextToolbar.el);

    // // Force styles to ensure proper positioning and visibility
    // Object.assign(contextToolbar.el.style, {
    //   position: "fixed", // Use fixed positioning for viewport coordinates
    //   zIndex: "10000",
    //   display: "block",
    //   backgroundColor: "#ffffff",
    //   border: "1px solid #ccc",
    //   borderRadius: "4px",
    //   boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    // });

    // // Position the context menu, ensuring it stays within viewport bounds
    // const menuRect = contextToolbar.el.getBoundingClientRect();
    // const viewportWidth = window.innerWidth;
    // const viewportHeight = window.innerHeight;
    
    // let finalX = x;
    // let finalY = y;
    
    // // Adjust position if menu would go outside viewport
    // if (x + menuRect.width > viewportWidth) {
    //   finalX = viewportWidth - menuRect.width - 10;
    // }
    // if (y + menuRect.height > viewportHeight) {
    //   finalY = viewportHeight - menuRect.height - 10;
    // }
    
    // contextToolbar.position(finalX, finalY);

    // // Handle tool selection
    // contextToolbar.on("action:properties", () => {
    //   console.log("[INFO] Properties selected from context menu");
    //   contextToolbar.remove();
    //   onSelectOption("properties");
    // });

    // contextToolbar.on("action:settings", () => {
    //   console.log("[INFO] Settings selected from context menu");
    //   contextToolbar.remove();
    //   onSelectOption("settings");
    // });

    // Close the context menu when clicking outside or pressing Escape
    const handleDocumentClick = (event: MouseEvent) => {
      if (!contextToolbar.el.contains(event.target as Node)) {
        contextToolbar.remove();
        document.removeEventListener("click", handleDocumentClick);
        document.removeEventListener("keydown", handleKeyDown);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        contextToolbar.remove();
        document.removeEventListener("click", handleDocumentClick);
        document.removeEventListener("keydown", handleKeyDown);
      }
    };

    // Add event listeners with a small delay to prevent immediate closing
    setTimeout(() => {
      document.addEventListener("click", handleDocumentClick);
      document.addEventListener("keydown", handleKeyDown);
    }, 100);

    console.log("[INFO] Context menu shown at", finalX, finalY);
  } catch (error) {
    console.error("[ERROR] Failed to show context menu:", error);
  }
}
