import { useEffect, useRef } from "react";
import { debug } from "../utils/logger";
import { dia } from "@joint/plus";
import * as joint from "@joint/core";
import { showDiagramContextMenu } from "../utils/helpers";
import requestFullscreenSvg from "../assets/navigator/request-fullscreen.svg";
import zoomInSvg from "../assets/navigator/zoom-in (1).png";
import zoomOutSvg from "../assets/navigator/Zoom-out.png";
import zoomFitSvg from "../assets/navigator/fit-to-screen.svg";
import undoSvg from "../assets/navigator/undo-svgrepo-com.png";
import redoSvg from "../assets/navigator/redo-svgrepo-com (1).png";
import shareSvg from "../assets/toolbar/icon-share.svg";

// Merge types from @joint/core into dia namespace
declare module "@joint/plus" {
  interface CellView extends joint.dia.CellView {}
  interface ElementView extends joint.dia.ElementView {}
  interface LinkView extends joint.dia.LinkView {}
  interface Event extends joint.dia.Event {}
}

debug("useJointJS hook initialized");

import { shapes, ui, format, util } from "@joint/plus";
import { getInspectorConfig } from "../config/inspector";
import { portsIn, portsOut } from "../config/ports";
// import { stencilElements } from "../config/stencil";
import { showLinkTools, openInspector, closeInspector } from "../utils/helpers";

// Create a custom event for diagram settings
export const DIAGRAM_SETTINGS_EVENT = "diagram:settings";

export const useJointJS = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    debug("useJointJS useEffect triggered");
    if (!containerRef.current) {
      debug("containerRef is null - skipping initialization");
      return;
    }

    const currentContainer = containerRef.current;
    debug("Container element found:", currentContainer);

    const graph = new dia.Graph({}, { cellNamespace: shapes });

    // Get container dimensions
    const containerWidth = currentContainer.clientWidth || 900;
    const containerHeight = currentContainer.clientHeight || 1200;

    debug(
      `Container dimensions for paper: ${containerWidth}x${containerHeight}`
    );

    const paper = new dia.Paper({
      model: graph,
      // Initial dimensions for the paper. These will be adjusted by PaperScroller with autoResizePaper.
      width: containerWidth * 2, // Double the initial width
      height: containerHeight * 2, // Double the initial height

      gridSize: 10,
      drawGrid: true,
      background: { color: "#F5F5F5" },
      cellViewNamespace: shapes,
      interactive: true,
      clickThreshold: 10, // Add this
      moveThreshold: 10, // Add this
      defaultRouter: { name: "orthogonal" },
      defaultConnector: { name: "straight", args: { cornerType: "line" } },
      linkPinning: false,
      // Enable infinite paper
      infinity: true,
      defaultLink: () =>
        new shapes.standard.Link({
          attrs: {
            wrapper: {
              cursor: "default",
            },
          },
        }),
      defaultConnectionPoint: { name: "boundary" },
      validateConnection: function (
        cellViewS: dia.CellView,
        _magnetS: SVGElement,
        cellViewT: dia.CellView,
        magnetT: SVGElement
      ) {
        if (cellViewS === cellViewT) return false;
        return magnetT && magnetT.getAttribute("port-group") === "in";
      },
      validateMagnet: function (cellView: dia.CellView, magnet: SVGElement) {
        return magnet.getAttribute("magnet") !== "passive";
      },
      markAvailable: true,
    });

    // Removed explicit paper.setDimensions call as PaperScroller with autoResizePaper handles this.

    debug(
      "Initial Paper dimensions:",
      paper.options.width,
      paper.options.height
    );
    debug(
      "Initial Container dimensions:",
      currentContainer.clientWidth,
      currentContainer.clientHeight
    );

    // Add resize observer to track dimension changes
    const resizeObserver = new ResizeObserver(() => {
      debug(
        "Resized Container dimensions:",
        currentContainer.clientWidth,
        currentContainer.clientHeight
      );
      debug(
        "Resized Paper dimensions:",
        paper.options.width,
        paper.options.height
      );
    });
    resizeObserver.observe(currentContainer);

    const paperScroller = new ui.PaperScroller({
      paper,
      autoResizePaper: true,
      scrollWhileDragging: true,
      padding: 100, // Increased padding for better visibility
      minVisiblePaperSize: 0, // Allow infinite scrolling in any direction
      maxVisiblePaperSize: Number.MAX_SAFE_INTEGER, // No upper limit on paper size
      contentOptions: {
        allowNewOrigin: "any", // Allow scrolling in any direction
        padding: 50,
      },
    });
    currentContainer.innerHTML = "";
    debug("Mounting paperScroller to container");
    currentContainer.appendChild(paperScroller.el);

    // First render the paper

    paperScroller.render();

    // Define a function to center all content
    const centerAllContent = () => {
      // Get the bounding box of all elements in the graph
      const graphBBox = graph.getBBox();

      if (graphBBox.width && graphBBox.height) {
        // Calculate the center of the paper
        const paperWidth = paper.options.width;
        const paperHeight = paper.options.height;
        const paperCenterX = paperWidth / 2;
        const paperCenterY = paperHeight / 2;

        // Calculate the center of the graph content
        const graphCenterX = graphBBox.x + graphBBox.width / 2;
        const graphCenterY = graphBBox.y + graphBBox.height / 2;

        // Calculate the translation needed to center the graph in the paper
        const tx = paperCenterX - graphCenterX;
        const ty = paperCenterY - graphCenterY;

        // Translate all elements to center them
        graph.translate(tx, ty);

        // Center the viewport on the paper center
        paperScroller.center();

        debug("Content centered in paper");
      } else {
        // If there's no content yet, just center the viewport
        paperScroller.center();
        debug("Paper centered (no content)");
      }
    };

    debug("Paper scroller mounted");

    let commandManager;
    try {
      commandManager = new dia.CommandManager({
        graph: graph,
      });
      debug("CommandManager initialized successfully");
    } catch (error) {
      debug("Failed to initialize CommandManager:", error);
      commandManager = {
        undo: () => {},
        redo: () => {},
        reset: () => {},
      };
    }

    const navigator = new ui.Navigator({
      paperScroller,
      width: 300,
      height: 200,
      padding: 10,
      zoomOptions: { max: 2, min: 0.2 },
      paperOptions: {
        async: true,
        sorting: joint.dia.Paper.sorting.APPROX,
      },
    });
    navigator.render();
    document.getElementById("navigator-container")?.appendChild(navigator.el);

    const miniToolbar = new ui.Toolbar({
      theme: "modern",
      autoToggle: true,
      tools: ["zoomSlider"],
      references: {
        paperScroller: paperScroller,
      },
    });
    miniToolbar.render();
    const buttonBaseStyle = `
 width: 32px;
  height: 32px;
  padding: 4px;
  display: flex;
  
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

    const zoomInBtn = document.createElement("button");
    zoomInBtn.innerHTML = `<img src="${zoomInSvg}" width="24" height="24" alt="Zoom In"/>`;
    zoomInBtn.style.cssText = buttonBaseStyle;
    zoomInBtn.title = "Zoom In";
    zoomInBtn.onclick = () => paperScroller.zoom(0.2, { max: 2 });

    const zoomOutBtn = document.createElement("button");
    zoomOutBtn.innerHTML = `<img src="${zoomOutSvg}" width="20" height="20" alt="Zoom Out"/>`;
    zoomOutBtn.style.cssText = buttonBaseStyle;
    zoomOutBtn.title = "Zoom Out";
    zoomOutBtn.onclick = () => paperScroller.zoom(-0.2, { min: 0.2 });

    const zoomToFitBtn = document.createElement("button");
    zoomToFitBtn.innerHTML = `<img src="${zoomFitSvg}" width="24" height="24" alt="Fit to Screen"/>`;
    zoomToFitBtn.style.cssText = buttonBaseStyle;
    zoomToFitBtn.title = "Zoom to Fit";

    zoomToFitBtn.onclick = () => {
      // 1. Fit the paper size to the diagram content (expand canvas if needed)
      paper.fitToContent({
        allowNewOrigin: "any", // ensures even negative coordinates are handled
        padding: 50,
      });

      // 2. Zoom to fit the content into the visible scroller area
      paperScroller.zoomToFit({ padding: 50 });

      // 3. Center the visible content inside the scroller
      paperScroller.centerContent({ useModelGeometry: true });

      // ✅ Sync the minimap to reflect the changes in the paper
      navigator.updatePaper();
    };

    const fullscreenBtn = document.createElement("button");
    fullscreenBtn.title = "Fullscreen";
    fullscreenBtn.innerHTML = `<img src="${requestFullscreenSvg}" width="20" height="20" alt="Fullscreen" />`;
    fullscreenBtn.style.background = "none";
    fullscreenBtn.style.cssText = buttonBaseStyle;

    // Fullscreen logic
    fullscreenBtn.onclick = () => {
      const canvasContainer = document.getElementById("canvas-container"); // ✅ Replace with your actual ID
      if (!canvasContainer) return;

      if (!document.fullscreenElement) {
        canvasContainer.requestFullscreen().catch((err) => {
          console.error("Fullscreen error:", err);
        });
      } else {
        document.exitFullscreen();
      }
    };

    const toggleButton = document.createElement("button");
    toggleButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="20" height="20" x="0" y="0" viewBox="0 0 512.032 512.032" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M496.016 224c-8.832 0-16 7.168-16 16v181.184l-128 51.2V304c0-8.832-7.168-16-16-16s-16 7.168-16 16v168.352l-128-51.2V167.648l74.144 29.664c8.096 3.264 17.504-.704 20.8-8.928 3.296-8.192-.704-17.504-8.928-20.8l-95.776-38.336h-.032l-.256-.096a15.87 15.87 0 0 0-11.872 0l-.288.096h-.032L10.064 193.152A16.005 16.005 0 0 0 .016 208v288c0 5.312 2.656 10.272 7.04 13.248a15.892 15.892 0 0 0 8.96 2.752c2.016 0 4.032-.384 5.952-1.152l154.048-61.6 153.76 61.504h.032l.288.128a15.87 15.87 0 0 0 11.872 0l.288-.128h.032L502 446.88c6.016-2.464 10.016-8.32 10.016-14.88V240c0-8.832-7.168-16-16-16zm-336 197.152-128 51.2V218.816l128-51.2v253.536zM400.016 64c-26.464 0-48 21.536-48 48s21.536 48 48 48 48-21.536 48-48-21.536-48-48-48zm0 64c-8.832 0-16-7.168-16-16s7.168-16 16-16 16 7.168 16 16-7.168 16-16 16z" fill="#304254" data-original="#000000" opacity="1"></path><path d="M400.016 0c-61.76 0-112 50.24-112 112 0 57.472 89.856 159.264 100.096 170.688 3.04 3.36 7.36 5.312 11.904 5.312s8.864-1.952 11.904-5.312C422.16 271.264 512.016 169.472 512.016 112c0-61.76-50.24-112-112-112zm0 247.584c-34.944-41.44-80-105.056-80-135.584 0-44.096 35.904-80 80-80s80 35.904 80 80c0 30.496-45.056 94.144-80 135.584z" fill="#304254" data-original="#000000" opacity="1"></path></g></svg>`;
    toggleButton.style.cssText = buttonBaseStyle;
    toggleButton.onclick = () => {
      const isHidden = navigator.el.style.display === "none";
      navigator.el.style.display = isHidden ? "block" : "none";
    };
    const minimapEl = document.getElementById("minimap");
    if (minimapEl) {
      minimapEl.innerHTML = "";

      const buttonWrapper = document.createElement("div");
      buttonWrapper.style.cssText = `
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin: 8px;
  `;

      buttonWrapper.appendChild(toggleButton);
      buttonWrapper.appendChild(zoomInBtn);
      buttonWrapper.appendChild(zoomOutBtn);
      buttonWrapper.appendChild(zoomToFitBtn);
      buttonWrapper.appendChild(fullscreenBtn);
      buttonWrapper.appendChild(miniToolbar.el);
      minimapEl.appendChild(navigator.el);
      minimapEl.appendChild(buttonWrapper);
    }

    paper.on(
      "paper:pinch",
      (_evt: any, ox: number, oy: number, scale: number) => {
        const zoom = paperScroller.zoom();
        paperScroller.zoom(zoom * scale, {
          min: 0.2,
          max: 5,
          ox,
          oy,
          absolute: true,
        });
      }
    );

    paper.on(
      "element:pointerdblclick",
      (elementView: dia.ElementView, evt: dia.Event) => {
        ui.TextEditor.edit(evt.target, {
          cellView: elementView,
          textProperty: ["attrs", "label", "text"],
          annotationsProperty: ["attrs", "label", "annotations"],
        });
      }
    );

    paper.on(
      "link:pointerdblclick",
      (linkView: dia.LinkView, evt: dia.Event) => {
        let index = -1;
        if (evt.target && evt.target instanceof Element) {
          index = Number(linkView.findAttribute("label-idx", evt.target));
        }
        ui.TextEditor.edit(evt.target, {
          cellView: linkView,
          textProperty: ["labels", index, "attrs", "text", "text"],
          annotationsProperty: [
            "labels",
            index,
            "attrs",
            "text",
            "annotations",
          ],
        });
      }
    );

    debug("Creating default shapes");

    const rect1 = new shapes.standard.Rectangle();
    rect1.position(
      paper.options.width / 2 - 90,
      paper.options.height / 2 - 100
    ); // Center horizontally, offset vertically
    rect1.resize(180, 50);
    rect1.attr({
      label: { text: "Hello" },
      body: {
        fill: "#8ECAE6",
        stroke: "#023047",
        strokeWidth: 2,
        rx: 5,
        ry: 5,
      },
    });
    rect1.addTo(graph);
    debug("Added rectangle 1 to graph:", rect1);

    const rect2 = new shapes.standard.Rectangle();
    rect2.position(paper.options.width / 2 - 90, paper.options.height / 2 + 50); // Center horizontally, offset vertically
    rect2.resize(180, 50);
    rect2.attr({
      label: { text: "World!" },
      body: {
        fill: "#FFB703",
        stroke: "#023047",
        strokeWidth: 2,
        rx: 5,
        ry: 5,
      },
    });
    rect2.addTo(graph);

    const link = new shapes.standard.Link();
    link.source(rect1);
    link.target(rect2);
    link.router("orthogonal");
    link.connector("rounded");
    link.attr({
      line: {
        stroke: "#023047",
        strokeWidth: 2,
        targetMarker: {
          type: "path",
          d: "M 10 -5 0 0 10 5 z",
        },
      },
    });
    link.labels([
      {
        attrs: {
          text: {
            text: "connects to",
            fill: "#023047",
            fontWeight: "bold",
          },
        },
      },
    ]);
    link.addTo(graph);

    paper.on("cell:pointerdown", function (cellView: dia.CellView) {
      debug("Cell clicked, opening inspector");
      openInspector(cellView.model, getInspectorConfig);
    });

    // Stencil is now handled by the Stencil component
    // We'll expose the paper instance for the Stencil component to use
    // @ts-ignore - Adding a custom property to the paper element
    paper.el.__paper__ = paper;
    const btnUndo = document.getElementById("btn-undo");
    if (btnUndo) {
      btnUndo.addEventListener("click", () => commandManager.undo());
    }
    const btnRedo = document.getElementById("btn-redo");
    if (btnRedo) {
      btnRedo.addEventListener("click", () => commandManager.redo());
    }

    const clipboard = new ui.Clipboard({ useLocalStorage: false });
    const selection = new ui.Selection({ paper: paper });
    const keyboard = new ui.Keyboard();

    keyboard.on("ctrl+c", () =>
      clipboard.copyElements(selection.collection, paper.model)
    );
    keyboard.on("ctrl+x", () =>
      clipboard.cutElements(selection.collection, paper.model)
    );
    keyboard.on("ctrl+v", () => clipboard.pasteCells(paper.model));

    // Create a dropdown menu for export options

    const undoBtn = document.createElement("button");
    undoBtn.innerHTML = `<img src="${undoSvg}" width="20" height="20" alt="Undo"/>`;
    undoBtn.style.cssText = buttonBaseStyle;
    undoBtn.title = "Undo";
    undoBtn.onclick = () => commandManager.undo();

    const redoBtn = document.createElement("button");
    redoBtn.innerHTML = `<img src="${redoSvg}" width="20" height="20" alt="Redo"/>`;
    redoBtn.style.cssText = buttonBaseStyle;
    redoBtn.title = "Redo";
    redoBtn.onclick = () => commandManager.redo();
    const exportDropdownContainer = document.createElement("div");
    exportDropdownContainer.style.cssText = `
      position: relative;
      display: inline-block;
    `;

    // Create the export button with the share icon
    const exportButton = document.createElement("button");
    exportButton.style.cssText = buttonBaseStyle;
    exportButton.title = "Export Options";
    exportButton.innerHTML = `<img src="${shareSvg}" width="20" height="20" alt="Export Options"/>`;

    // Create the dropdown content (initially hidden)
    const dropdownContent = document.createElement("div");
    dropdownContent.style.cssText = `
       display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
  z-index: 1100;
  border-radius: 4px;
  top: 100%;
  right: 0;
      
    `;

    // Create Export JSON option
    const exportJsonOption = document.createElement("a");
    exportJsonOption.textContent = "Export JSON";
    exportJsonOption.href = "#";
    exportJsonOption.style.cssText = `
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      cursor: pointer;
      font-size: 14px;
    `;
    exportJsonOption.addEventListener("click", (e) => {
      e.preventDefault();
      const str = JSON.stringify(graph.toJSON());
      const bytes = new TextEncoder().encode(str);
      const blob = new Blob([bytes], {
        type: "application/json;charset=utf-8",
      });
      util.downloadBlob(blob, "joint-plus.json");
      dropdownContent.style.display = "none";
    });

    // Create Export SVG option
    const exportSvgOption = document.createElement("a");
    exportSvgOption.textContent = "Export SVG";
    exportSvgOption.href = "#";
    exportSvgOption.style.cssText = `
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      cursor: pointer;
      font-size: 14px;
    `;
    exportSvgOption.addEventListener("click", (e) => {
      e.preventDefault();
      format.toSVG(
        paper,
        (svg: string) => {
          util.downloadDataUri(
            `data:image/svg+xml,${encodeURIComponent(svg)}`,
            "joint-plus.svg"
          );
        },
        { useComputedStyles: false }
      );
      dropdownContent.style.display = "none";
    });

    // Add options to dropdown
    dropdownContent.appendChild(exportJsonOption);
    dropdownContent.appendChild(exportSvgOption);

    // Add dropdown content to container
    exportDropdownContainer.appendChild(exportButton);
    exportDropdownContainer.appendChild(dropdownContent);

    // Toggle dropdown when clicking the button
    exportButton.addEventListener("click", () => {
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!exportDropdownContainer.contains(e.target as Node)) {
        dropdownContent.style.display = "none";
      }
    });

    // Delay toolbar button creation to ensure the toolbar component is mounted
    setTimeout(() => {
      const toolbarContainer = document.getElementById("toolbar");
      if (toolbarContainer) {
        toolbarContainer.innerHTML = ""; // Clear previous buttons
      }
      // Create a container for the buttons
      const buttonContainer = document.createElement("div");
      buttonContainer.id = "toolbar-buttons";
      buttonContainer.style.cssText = `
        display: flex;
        gap: 8px;
        align-items: center;
       
      `;

      // Add buttons to the button container

      buttonContainer.appendChild(undoBtn);
      buttonContainer.appendChild(redoBtn);

      // Add the dialog button to the button container
      buttonContainer.appendChild(dialogButton);
      buttonContainer.appendChild(exportDropdownContainer);

      // If we found the toolbar container, add the button container to it
      if (toolbarContainer) {
        debug("Found toolbar container, adding buttons");
        toolbarContainer.appendChild(buttonContainer);
      } else {
        debug("Toolbar container not found in DOM, creating fallback");
        // If we couldn't find the toolbar container, add the button container to the document body
        // This is a fallback and not ideal, but ensures buttons are visible
        document.body.appendChild(buttonContainer);
        buttonContainer.style.position = "fixed";
        buttonContainer.style.top = "10px";
        buttonContainer.style.right = "10px";
        buttonContainer.style.zIndex = "1000";
      }
    }, 100); // Short delay to ensure DOM is ready

    // Create dialog button before the setTimeout
    const dialogButton = document.createElement("button");
    dialogButton.innerText = "Open Dialog";
    dialogButton.style.cssText =
      "color:black; background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 4px; padding: 4px 8px; cursor: pointer;";
    dialogButton.title = "Open Dialog";
    dialogButton.onclick = () => {
      const dialog = new ui.Dialog({
        width: 300,
        title: "JointJS+ Dialog",
        content: "<p>This is a custom dialog using JointJS+ UI.</p>",
        buttons: [
          {
            content: "OK",
            action: "ok",
          },
          {
            content: "Cancel",
            action: "cancel",
          },
        ],
      });

      dialog.open();

      dialog.on("action:ok", () => {
        dialog.close();
        alert("You clicked OK!");
      });

      dialog.on("action:cancel", () => {
        dialog.close();
      });
    };

    // Export functionality is now handled by the dropdown menu

    // Calculate center of paper for positioning elements
    const paperCenterX = paper.options.width / 2;
    const paperCenterY = paper.options.height / 2;

    const model = new shapes.standard.Rectangle({
      position: { x: paperCenterX - 200, y: paperCenterY - 100 },
      size: { width: 90, height: 90 },
      attrs: {
        root: {
          magnet: false,
        },
        body: {
          fill: "#8ECAE6",
        },
        label: {
          text: "Entity 1",
          fontSize: 16,
          y: -10,
        },
      },
      ports: {
        groups: {
          in: portsIn,
          out: portsOut,
        },
      },
    });

    model.addPorts([
      {
        group: "in",
        attrs: { label: { text: "in1" } },
      },
      {
        group: "in",
        attrs: { label: { text: "in2" } },
      },
      {
        group: "out",
        attrs: { label: { text: "out" } },
      },
    ]);

    // Create model2 positioned relative to the center
    const model2 = new shapes.standard.Rectangle({
      position: { x: paperCenterX + 100, y: paperCenterY - 100 },
      size: { width: 90, height: 90 },
      attrs: {
        root: {
          magnet: false,
        },
        body: {
          fill: "#8ECAE6",
        },
        label: {
          text: "Entity 2",
          fontSize: 16,
          y: -10,
        },
      },
      ports: {
        groups: {
          in: portsIn,
          out: portsOut,
        },
      },
    });

    // Add the same ports as model
    model2.addPorts([
      {
        group: "in",
        attrs: { label: { text: "in1" } },
      },
      {
        group: "in",
        attrs: { label: { text: "in2" } },
      },
      {
        group: "out",
        attrs: { label: { text: "out" } },
      },
    ]);

    graph.addCells(model, model2);

    // Center all content after adding all elements
    // Use setTimeout to ensure all elements are properly rendered before centering
    setTimeout(() => {
      centerAllContent();

      navigator.updatePaper();
      // Center the viewport on the paper center
      paperScroller.center();
      debug("Content centered with delay");
    }, 200);

    paper.on("link:mouseenter", (linkView: dia.LinkView) => {
      showLinkTools(linkView);
    });

    paper.on("link:mouseleave", (linkView: dia.LinkView) => {
      linkView.removeTools();
    });

    // Stencil loading is now handled by the Stencil component

    paper.on("cell:pointerup", (cellView: dia.CellView) => {
      const halo = new ui.Halo({ cellView });
      halo.render();
    });

    // Stencil element:drop event is now handled by the Stencil component

    // Handle right-click on blank areas using blank:pointerdown
    paper.on("blank:pointerdown", (evt: dia.Event) => {
      const originalEvent = evt.originalEvent as MouseEvent;

      // Check if it's a right-click (button 2)
      if (originalEvent && originalEvent.button === 2) {
        console.log("Right-click detected on blank area");
        evt.preventDefault(); // Prevent default browser context menu
        closeInspector();

        // Get the position of the click relative to the viewport
        const x = originalEvent.clientX;
        const y = originalEvent.clientY;
        console.log("Showing context menu at", x, y);

        // Show the context menu
        showDiagramContextMenu(paper, x, y, (option) => {
          // Dispatch a custom event with the selected option
          const customEvent = new CustomEvent(DIAGRAM_SETTINGS_EVENT, {
            detail: { type: option },
          });
          document.dispatchEvent(customEvent);
        });
      } else if (originalEvent && originalEvent.button === 0) {
        // Left-click on blank area - close inspector if not clicking on context menu
        if (
          !(originalEvent.target as HTMLElement)?.closest(
            ".joint-context-toolbar"
          )
        ) {
          closeInspector();
        }
      }
    });

    // Handle double-click on blank areas as fallback
    paper.on("blank:pointerdblclick", (evt: dia.Event) => {
      console.log("Double-click detected on blank area");
      evt.preventDefault();
      closeInspector();

      // Get the position of the click
      const x = evt.clientX || 0;
      const y = evt.clientY || 0;

      // Show the context menu
      showDiagramContextMenu(paper, x, y, (option) => {
        // Dispatch a custom event with the selected option
        const customEvent = new CustomEvent(DIAGRAM_SETTINGS_EVENT, {
          detail: { type: option },
        });
        document.dispatchEvent(customEvent);
      });
    });

    // Prevent default context menu on the paper element
    paper.on("blank:contextmenu", (evt: dia.Event) => {
      evt.preventDefault(); // Prevent default browser context menu
    });

    openInspector(rect1, getInspectorConfig);

    return () => {
      debug("Cleaning up JointJS resources");
      paper.remove();
      navigator.remove();
      miniToolbar.remove();
      // No need to remove toolbar as we're not using it anymore
      commandManager.stopListening();
      keyboard.stopListening();
      if (currentContainer) {
        currentContainer.innerHTML = "";
        debug("Container cleared");
      }
    };
  }, [containerRef.current]);

  return containerRef;
};
