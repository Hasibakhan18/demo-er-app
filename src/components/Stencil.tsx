import { useEffect, useRef, useState } from "react";
import iconCollapse from "../assets/inspector/icon-collapse.svg";
import iconExpand from "../assets/inspector/icon-expand.svg";
import iconSlide from "../assets/navigator/right-arrows.png";
import { paletteGroups, stencilElements } from "../config/stencil";
import { dia, ui, shapes } from "@joint/plus";
import * as joint from "@joint/core";
import { createEREntity } from "../config/customShapes";

// Merge types from @joint/core into dia namespace for this component
declare module "@joint/plus" {
  interface Paper extends joint.dia.Paper {}
  interface Graph extends joint.dia.Graph {}
  interface Cell extends joint.dia.Cell {}
  interface Element extends joint.dia.Element {}
  interface Link extends joint.dia.Link {}
  interface CellView extends joint.dia.CellView {}
  interface ElementView extends joint.dia.ElementView {}
  interface LinkView extends joint.dia.LinkView {}
  interface Event extends joint.dia.Event {}
}

interface StencilProps {
  paper: dia.Paper;
  graph: dia.Graph;
}

const Stencil = ({ paper, graph }: StencilProps) => {
  const [openSection, setOpenSection] = useState<string | null>("stencil");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set([
      "basic",
      "advanced",
      "entities",
      "mindMap",
      "businessProcess",
      "requirementsModel",
      "conceptualDataModel",
      "logicalDataModel",
      "physicalDataModel",
      "objectOrientedModel",
      "multidimensionalModel",

      "processHierarchyModel",
      "freeModel",
      "organizationalChartModel",
      "enterpriseArchitectureModel",
      "dataMovementModel",
      "informationLifecycleManagement",
      "impactAnalysisModel",
      "dependencyPropagationModel",
    ])
  );
  const [folderNames, setFolderNames] = useState<string[]>([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [isPanelHidden, setIsPanelHidden] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const stencilContainerRef = useRef<HTMLDivElement | null>(null);
  const stencilInstanceRef = useRef<any | null>(null);

  const toggleCollapse = () => {
    const newState = !isPanelCollapsed;
    setIsPanelCollapsed(newState);
    if (contentRef.current) {
      contentRef.current.style.height = newState ? "0" : "calc(100% - 92px)";
    }
  };

  const toggleSlide = () => setIsPanelHidden((prev) => !prev);

  const addFolder = () => {
    const name = newFolderName.trim();
    if (!name || folderNames.includes(name)) return;

    setFolderNames([...folderNames, name]);

    const folderElement = new shapes.standard.Rectangle({
      size: { width: 180, height: 40 },
      attrs: {
        body: {
          fill: "#f0f4ff",
          stroke: "#2563eb",
          rx: 6,
          ry: 6,
        },
        label: {
          text: `📁 ${name}`,
          fill: "#1e40af",
          fontSize: 14,
          fontWeight: "bold",
        },
      },
    });

    stencilInstanceRef.current?.load(
      { entities: [folderElement] },
      { addToExisting: true }
    );

    setNewFolderName("");
  };

  const handleSectionClick = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    if (!paper || !graph || !stencilContainerRef.current) return;

    const EREntity = createEREntity(false);

    const stencil = new ui.Stencil({
      paper,
      width: "100%",
      height: 400,
      layout: {
        columns: 2,
        columnWidth: 110,
        rowHeight: 80,
        gap: 10,
      },
      dropAnimation: { duration: 200, easing: "ease-out" },
      scaleClones: true,
      groups: {
        entities: {
          label: "Project Folders",
          index: 1,
          closed: !expandedGroups.has("entities"),
        },
        basic: {
          label: "Model Types",
          index: 2,
          closed: !expandedGroups.has("basic"),
        },
        complex: {
          label: "Stencil Tools",
          index: 3,
          closed: !expandedGroups.has("complex"),
        },
        mindMap: {
          label: "Mind Map Stencil",
          index: 4,
          closed: !expandedGroups.has("mindMap"),
        },
        businessProcess: {
          label: "Business Process Model",
          index: 5,
          closed: !expandedGroups.has("businessProcess"),
        },
        requirementsModel: {
          label: "Requirements Model Stencil",
          index: 7,
          closed: !expandedGroups.has("requirementsModel"),
        },
        conceptualDataModel: {
          label: "Conceptual Data Model",
          index: 6,
          closed: !expandedGroups.has("conceptualDataModel"),
        },
        logicalDataModel: {
          label: "Logical Data Model Stencil",
          index: 19,
          closed: !expandedGroups.has("logicalDataModel"),
        },

        physicalDataModel: {
          label: "Physical Data Model",
          index: 8,
          closed: !expandedGroups.has("physicalDataModel"),
        },
        objectOrientedModel: {
          label: "Object-Oriented Model",
          index: 9,
          closed: !expandedGroups.has("objectOrientedModel"),
        },
        multidimensionalModel: {
          label: "Multidimensional Model",
          index: 10,
          closed: !expandedGroups.has("multidimensionalModel"),
        },
        processHierarchyModel: {
          label: "Process Hierarchy Model",
          index: 11,
          closed: !expandedGroups.has("processHierarchyModel"),
        },
        freeModel: {
          label: "Free Model/Common Tool Stencil",
          index: 12,
          closed: !expandedGroups.has("freeModel"),
        },
        organizationalChartModel: {
          label: "Organizational Chart Model Stencil",
          index: 13,
          closed: !expandedGroups.has("organizationalChartModel"),
        },
        enterpriseArchitectureModel: {
          label: "Enterprise Architecture Model Stencil",
          index: 14,
          closed: !expandedGroups.has("enterpriseArchitectureModel"),
        },
        dataMovementModel: {
          label: "Data Movement Model Stencil",
          index: 15,
          closed: !expandedGroups.has("dataMovementModel"),
        },
        informationLifecycleManagement: {
          label: "Information Lifecycle Management Stencil",
          index: 16,
          closed: !expandedGroups.has("informationLifecycleManagement"),
        },
        impactAnalysisModel: {
          label: "Impact Analysis Model Stencil",
          index: 17,
          closed: !expandedGroups.has("impactAnalysisModel"),
        },
        dependencyPropagationModel: {
          label: "Dependency Propagation Model",
          index: 18,
          closed: !expandedGroups.has("dependencyPropagationModel"),
        },
      },
      search: {
        "*": ["attrs/headerText/text", "attrs/label/text"],
        "erd.Entity": ["attrs/headerText/text"],
      },
      dragStartClone: (cell: dia.Element) => cell.clone(),
      dragEndClone: (cell: dia.Element) => {
        const finalElement = cell.clone();
        finalElement.set("id", undefined);
        if (finalElement.get("type") === "erd.Entity") {
          finalElement.attr("headerText/text", "New Entity");
          finalElement.attr(
            "attributesText/text",
            "id: INTEGER\nname: VARCHAR"
          );
        } else if (finalElement.attr("root/title") === "Topic") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60">
  <rect width="118" height="58" x="1" y="1" rx="20" ry="20" fill="#E9ECFF" stroke="#4072D4" stroke-width="1"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#3D3D3D">Topic</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(120, 60);
          finalElement.attr("label/text", ""); // remove the old label
        } else if (finalElement.attr("root/title") === "Subtopic") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 50">
  <rect width="109" height="49" x="0.5" y="0.5" rx="15" ry="15" fill="#F5F7FF" stroke="#88AAEF" stroke-width="1"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#535353">Subtopic</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(110, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Note") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="noteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFFFB2; stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FFFD80; stop-opacity:1" />
    </linearGradient>
  </defs>
  <path d="M0 0 L 75 0 L 100 25 L 100 100 L 0 100 Z" fill="url(#noteGradient)" stroke="#DDBA00" stroke-width="1"/>
  <path d="M75 0 L 75 25 L 100 25 Z" fill="#FFBD00" fill-opacity="0.5"/>

  <text x="10" y="30" font-family="sans-serif" font-size="12" fill="#7F7F7F">Note...</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(100, 100);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Start Event") {
          const newSvg = `<svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="12" stroke="black" stroke-width="1"/></svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(100, 100);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Process Node") {
          const newSvg = `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <title>Process: Order Fulfillment</title>
  <rect x="2" y="2" width="196" height="116" rx="15" ry="15" fill="#E3F2FD" stroke="#1E88E5" stroke-width="1"/>
  <text x="100" y="40" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#102A43" text-anchor="middle">Process Name</text>
  <text x="100" y="65" font-family="Arial, sans-serif" font-size="12" fill="#475569" text-anchor="middle">Level: 1</text>
  <text x="100" y="85" font-family="Arial, sans-serif" font-size="12" fill="#475569" text-anchor="middle">Owner: Logistics</text>
  <path d="M 95 108 H 105 M 100 103 V 113" fill="none" stroke="#1E88E5" stroke-width="1" stroke-linecap="round"/>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(200, 120);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Subprocess Node") {
          const newSvg = `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <title>Subprocess: Pack Items</title>
  <rect x="4" y="4" width="192" height="112" rx="15" ry="15" fill="#F1F5F9" stroke="#334155" stroke-width="1"/>
  <text x="100" y="40" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#102A43" text-anchor="middle">Subprocess Name</text>
  <text x="100" y="65" font-family="Arial, sans-serif" font-size="12" fill="#475569" text-anchor="middle">Parent: Order Fulfillment</text>
  <path d="M 95 108 H 105 M 100 103 V 113" fill="none" stroke="#334155" stroke-width="1" stroke-linecap="round"/>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(200, 120);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Link") {
          const newSvg = `<svg width="60" height="40" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Tail marker -->
    
    <!-- Head marker -->
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 Z" fill="currentColor" />
    </marker>
  </defs>
  
  <line x1="10" y1="20" x2="50" y2="20"
        stroke="black" stroke-width="1"
        marker-start="url(#tail)"
        marker-end="url(#arrowhead)" />
</svg>
`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(200, 120);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Activity Node") {
          const newSvg = `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
  <title>Activity: Scan Barcode</title>
  <rect x="2" y="2" width="196" height="76" rx="38" ry="38" fill="#E0F2F1" stroke="#00796B" stroke-width="1"/>
  <text x="100" y="45" font-family="Arial, sans-serif" font-size="16" fill="#004D40" text-anchor="middle">Activity Name</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(200, 80);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Requirement") {
          const newSvg = `<svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer rectangle -->
  <rect x="5" y="5" width="190" height="90" rx="5" ry="5" fill="#FAFFF5" stroke="#2F855A" stroke-width="1"/>

  <!-- Horizontal line -->
  <line x1="5" y1="35" x2="195" y2="35" stroke="#2F855A" stroke-width="1"/>

  <!-- Header text -->
  <text x="10" y="25" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#2F855A">
    RED-001
  </text>

  <!-- Description text -->
  <text x="10" y="60" font-family="Arial, sans-serif" font-size="16" fill="#4A5568">
    Describe requirement he
  </text>
</svg>
`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(100, 100);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Actor") {
          const newSvg = `<svg width="120" height="180" viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="30" r="15" stroke="#2F855A" stroke-width="1" fill="none" /><line x1="60" y1="45" x2="60" y2="100" stroke="#2F855A" stroke-width="1" /><line x1="30" y1="65" x2="90" y2="65" stroke="#2F855A" stroke-width="1" /><line x1="60" y1="100" x2="40" y2="140" stroke="#2F855A" stroke-width="1" /><line x1="60" y1="100" x2="80" y2="140" stroke="#2F855A" stroke-width="1" /><g id="gear" transform="translate(85,10) scale(0.4)"><circle cx="20" cy="20" r="8" stroke="#2F855A" stroke-width="1" fill="none"/><line x1="20" y1="10" x2="20" y2="30" stroke="#2F855A" stroke-width="1"/><line x1="10" y1="20" x2="30" y2="20" stroke="#2F855A" stroke-width="1"/></g><text x="60" y="170" font-family="Arial, sans-serif" font-size="16" fill="#2F855A" text-anchor="middle">Actor Name</text><text x="60" y="155" font-family="Arial, sans-serif" font-size="12" fill="#4A5568" text-anchor="middle">Human User</text></svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(120, 180);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Use Case") {
          const newSvg = `<svg width="150" height="80" viewBox="0 0 150 80" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="75" cy="40" rx="70" ry="35" stroke="black" stroke-width="1" fill="white"/></svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(150, 80);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Requirement") {
          const newSvg = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 10 L80 10 L80 90 L10 90 Z" stroke="black" stroke-width="1" fill="white"/><polyline points="80,10 80,25 65,25 65,10 80,10" fill="#E0E0E0" stroke="black" stroke-width="1"/><line x1="20" y1="30" x2="70" y2="30" stroke="gray" stroke-width="1"/><line x1="20" y1="45" x2="60" y2="45" stroke="gray" stroke-width="1"/><line x1="20" y1="60" x2="70" y2="60" stroke="gray" stroke-width="1"/><line x1="20" y1="75" x2="50" y2="75" stroke="gray" stroke-width="1"/><text x="15" y="20" font-family="Arial" font-size="14" font-weight="bold" fill="currentColor">R</text></svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(100, 100);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Actor") {
          const newSvg = `<svg width="120" height="180" viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="30" r="15" stroke="#2F855A" stroke-width="1" fill="none" /><line x1="60" y1="45" x2="60" y2="100" stroke="#2F855A" stroke-width="1" /><line x1="30" y1="65" x2="90" y2="65" stroke="#2F855A" stroke-width="1" /><line x1="60" y1="100" x2="40" y2="140" stroke="#2F855A" stroke-width="1" /><line x1="60" y1="100" x2="80" y2="140" stroke="#2F855A" stroke-width="1" /><g id="gear" transform="translate(85,10) scale(0.4)"><circle cx="20" cy="20" r="8" stroke="#2F855A" stroke-width="1" fill="none"/><line x1="20" y1="10" x2="20" y2="30" stroke="#2F855A" stroke-width="1"/><line x1="10" y1="20" x2="30" y2="20" stroke="#2F855A" stroke-width="1"/></g><text x="60" y="170" font-family="Arial, sans-serif" font-size="16" fill="#2F855A" text-anchor="middle">Actor Name</text><text x="60" y="155" font-family="Arial, sans-serif" font-size="12" fill="#4A5568" text-anchor="middle">Human User</text></svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(120, 180);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Use Case") {
          const newSvg = `<svg width="150" height="80" viewBox="0 0 150 80" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="75" cy="40" rx="70" ry="35" stroke="black" stroke-width="1" fill="white"/><text x="75" y="45" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle" fill="currentColor">Use Case Name</text></svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(150, 80);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Entity") {
          const newSvg = `<svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="5" width="190" height="90" rx="5" ry="5" fill="#F8FAFC" stroke="#1E40AF" stroke-width="1"/>
  <text x="100" y="30" font-family="Arial" font-size="16" font-weight="bold" fill="#1E40AF" text-anchor="middle">
    Entity Name
  </text>
  <line x1="5" y1="40" x2="195" y2="40" stroke="#1E40AF" stroke-width="1"/>
  <text x="10" y="65" font-family="Arial" font-size="14" fill="#374151">
    Description, Subject Area
  </text>
</svg>
`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(150, 80);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Attribute") {
          const newSvg = `<svg width="200" height="70" viewBox="0 0 200 70" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="5" width="190" height="60" rx="5" ry="5" fill="#FFFFFF" stroke="#059669" stroke-width="1"/>
  <text x="100" y="25" font-family="Arial" font-size="14" font-weight="bold" fill="#059669" text-anchor="middle">
    Attribute Name
  </text>
  <line x1="5" y1="35" x2="195" y2="35" stroke="#059669" stroke-width="1.5"/>
  <text x="10" y="55" font-family="Arial" font-size="12" fill="#374151">
    Domain | Optionality
  </text>
</svg>

`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(150, 80);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Identifier") {
          const newSvg = `<svg width="180" height="50" viewBox="0 0 180 50" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="90" cy="25" rx="80" ry="20" fill="#FDF2F8" stroke="#BE185D" stroke-width="1"/>
  <text x="90" y="30" font-family="Arial" font-size="14" font-weight="bold" fill="#BE185D" text-anchor="middle">
    Identifier Name
  </text>
</svg>

`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(150, 80);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Class") {
          const newSvg = `<svg width="180" height="120" viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="178" height="118" rx="4" fill="white" stroke="#566573" stroke-width="1"/>
  
  <line x1="1" y1="30" x2="179" y2="30" stroke="#566573" stroke-width="1.5"/>
  <line x1="1" y1="70" x2="179" y2="70" stroke="#566573" stroke-width="1.5"/>

  <text x="90" y="20" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">[ClassName]</text>
  
  <text x="10" y="45" font-family="monospace" font-size="12"># attribute: Type</text>
  <text x="10" y="60" font-family="monospace" font-size="12">- id: int</text>
  
  <text x="10" y="85" font-family="monospace" font-size="12">+ method(arg): bool</text>
  <text x="10" y="100" font-family="monospace" font-size="12">~ getValue(): Type</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(180, 120);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Interface") {
          const newSvg = `<svg width="180" height="100" viewBox="0 0 180 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="178" height="98" rx="4" fill="white" stroke="#566573" stroke-width="1"/>
  
  <line x1="1" y1="50" x2="179" y2="50" stroke="#566573" stroke-width="1.5"/>

  <text x="90" y="20" font-family="Arial, sans-serif" font-size="12" font-style="italic" text-anchor="middle">&lt;&lt;interface&gt;&gt;</text>
  <text x="90" y="40" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">[InterfaceName]</text>
  
  <text x="10" y="65" font-family="monospace" font-size="12">+ methodOne(arg): void</text>
  <text x="10" y="80" font-family="monospace" font-size="12">+ methodTwo(): String</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(180, 100);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Enum") {
          const newSvg = `<svg width="180" height="100" viewBox="0 0 180 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="178" height="98" rx="4" fill="white" stroke="#566573" stroke-width="1"/>

  <line x1="1" y1="50" x2="179" y2="50" stroke="#566573" stroke-width="1.5"/>

  <text x="90" y="20" font-family="Arial, sans-serif" font-size="12" font-style="italic" text-anchor="middle">&lt;&lt;enumeration&gt;&gt;</text>
  <text x="90" y="40" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">[EnumName]</text>
  
  <text x="10" y="65" font-family="monospace" font-size="12">VALUE_ONE</text>
  <text x="10" y="80" font-family="monospace" font-size="12">VALUE_TWO</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(180, 100);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Enum") {
          const newSvg = `<svg width="180" height="100" viewBox="0 0 180 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="178" height="98" rx="4" fill="white" stroke="#566573" stroke-width="1"/>

  <line x1="1" y1="50" x2="179" y2="50" stroke="#566573" stroke-width="1.5"/>

  <text x="90" y="20" font-family="Arial, sans-serif" font-size="12" font-style="italic" text-anchor="middle"><<enumeration>></text>
  <text x="90" y="40" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">[EnumName]</text>
  
  <text x="10" y="65" font-family="monospace" font-size="12">VALUE_ONE</text>
  <text x="10" y="80" font-family="monospace" font-size="12">VALUE_TWO</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(180, 100);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Package") {
          const newSvg = `<svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="30" width="198" height="119" fill="#F8F9F9" stroke="#566573" stroke-width="1"/>
  
  <path d="M 1 30 H 90 V 5 H 5 A 4 4 0 0 0 1 9 Z" fill="#F8F9F9" stroke="#566573" stroke-width="1"/>
  
  <text x="10" y="20" font-family="Arial, sans-serif" font-size="12" font-weight="bold">[PackageName]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(200, 150);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Package") {
          const newSvg = `<svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="30" width="198" height="119" fill="#F8F9F9" stroke="#566573" stroke-width="1"/>
  
  <path d="M 1 30 H 90 V 5 H 5 A 4 4 0 0 0 1 9 Z" fill="#F8F9F9" stroke="#566573" stroke-width="1"/>
  
  <text x="10" y="20" font-family="Arial, sans-serif" font-size="12" font-weight="bold">[PackageName]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(200, 150);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Package") {
          const newSvg = `<svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="30" width="198" height="119" fill="#F8F9F9" stroke="#566573" stroke-width="1"/>
  
  <path d="M 1 30 H 90 V 5 H 5 A 4 4 0 0 0 1 9 Z" fill="#F8F9F9" stroke="#566573" stroke-width="1"/>
  
  <text x="10" y="20" font-family="Arial, sans-serif" font-size="12" font-weight="bold">[PackageName]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(200, 150);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Cube") {
          const newSvg = `<svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L20 8L12 12L4 8L12 4Z" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>
    <path d="M4 8V16L12 20V12L4 8Z" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>
    <path d="M20 8V16L12 20V12L20 8Z" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(60, 60);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Dimension") {
          const newSvg = `<svg width="100" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="7" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1"/>
    <path d="M4 9V15L7 12L4 9Z" fill="currentColor"/>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(100, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Measure") {
          const newSvg = `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="5" y1="19" x2="19" y2="19" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
    <rect x="7" y="10" width="3" height="9" stroke="currentColor" stroke-width="1" fill="currentColor"/>
    <rect x="11" y="6" width="3" height="13" stroke="currentColor" stroke-width="1" fill="currentColor"/>
    <rect x="15" y="14" width="3" height="5" stroke="currentColor" stroke-width="1" fill="currentColor"/>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(50, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Free Node") {
          const newSvg = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1"/>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(48, 48);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Free Group") {
          const newSvg = `<svg width="200" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1" stroke-dasharray="4 2"/>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(200, 150);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Connector Line") {
          const newSvg = `<svg width="80" height="60" xmlns="http://www.w3.org/2000/svg">
  <line x1="10" y1="30" x2="70" y2="30" stroke="#333" stroke-width="1"/>
  <polygon points="70,30 60,24 60,36" fill="#333"/>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(80, 60);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Annotation") {
          const newSvg = `<svg width="150" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3H19V21H5V3Z" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>
    <path d="M19 8L14 3V8H19Z" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(150, 100);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Annotation") {
          const newSvg = `<svg width="150" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3H19V21H5V3Z" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>
    <path d="M19 8L14 3V8H19Z" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(150, 100);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Title Box") {
          const newSvg = `<svg viewBox="0 0 250 50" xmlns="http://www.w3.org/2000/svg">
  <title>Title Box Placeholder</title>
  <rect x="1" y="1" width="248" height="48" rx="5" ry="5" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1" />
  
  <text x="125" y="31" font-family="Arial, sans-serif" font-size="18" fill="#64748B" text-anchor="middle">
    Enter Title
  </text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(150, 100);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Organization") {
          const newSvg = `<svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="99" height="59" rx="8" fill="none" stroke="#007B8C" stroke-width="1"/>
    <text x="50" y="30" font-family="Arial, sans-serif" font-size="10" fill="#333333" text-anchor="middle" dominant-baseline="middle">Organization Name</text>
    <text x="50" y="48" font-family="Arial, sans-serif" font-size="5" fill="#666666" text-anchor="middle" dominant-baseline="middle">Head: [Name], Depts: [Count]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(100, 60);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Department") {
          const newSvg = `<svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="none" stroke="#007B8C" stroke-width="1"/>
    <text x="40" y="25" font-family="Arial, sans-serif" font-size="14" fill="#333333" text-anchor="middle" dominant-baseline="middle">Department Name</text>
    <text x="40" y="40" font-family="Arial, sans-serif" font-size="9" fill="#666666" text-anchor="middle" dominant-baseline="middle">Head: [Name]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(80, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Role") {
          const newSvg = `<svg width="70" height="40" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="69" height="39" rx="3" fill="none" stroke="#007B8C" stroke-width="1"/>
    <text x="35" y="20" font-family="Arial, sans-serif" font-size="12" fill="#333333" text-anchor="middle" dominant-baseline="middle">Role Name</text>
    <text x="35" y="32" font-family="Arial, sans-serif" font-size="8" fill="#666666" text-anchor="middle" dominant-baseline="middle">Level: [Level]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Position") {
          const newSvg = `<svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="59" height="29" rx="2" fill="none" stroke="#007B8C" stroke-width="1"/>
    <text x="30" y="15" font-family="Arial, sans-serif" font-size="10" fill="#333333" text-anchor="middle" dominant-baseline="middle">Position Name</text>
    <text x="30" y="25" font-family="Arial, sans-serif" font-size="7" fill="#666666" text-anchor="middle" dominant-baseline="middle">Assigned To: [Name]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(60, 30);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Reporting Line") {
          const newSvg = `<svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="25" x2="190" y2="25" stroke="#6C757D" stroke-width="1"/>
    <path d="M186 22 L190 25 L186 28 Z" fill="#6C757D" stroke="transparent"/>
    </svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(200, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Group") {
          const newSvg = `<svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="119" height="79" rx="10" fill="none" stroke="#6C757D" stroke-width="1" stroke-dasharray="5 5"/>
    <text x="60" y="25" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle" dominant-baseline="middle">Group Name</text>
    <text x="110" y="15" font-family="Arial, sans-serif" font-size="12" fill="#666666" text-anchor="middle" dominant-baseline="middle">[+]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(120, 80);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Business") {
          const newSvg = `<svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="99" height="59" rx="8" fill="none" stroke="#28A745" stroke-width="1"/>
    <text x="50" y="30" font-family="Arial, sans-serif" font-size="10" fill="#333333" text-anchor="middle" dominant-baseline="middle">Business Capability</text>
    <text x="50" y="48" font-family="Arial, sans-serif" font-size="10" fill="#666666" text-anchor="middle" dominant-baseline="middle">Owner: [Name], Maturity: [Level]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(100, 60);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Application") {
          const newSvg = `<svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="none" stroke="#28A745" stroke-width="1"/>
    <text x="40" y="25" font-family="Arial, sans-serif" font-size="14" fill="#333333" text-anchor="middle" dominant-baseline="middle">Application Name</text>
    <text x="40" y="40" font-family="Arial, sans-serif" font-size="9" fill="#666666" text-anchor="middle" dominant-baseline="middle">Tech: [Stack], Ver: [Version]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(80, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Technology") {
          const newSvg = `<svg width="70" height="40" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="69" height="39" rx="3" fill="none" stroke="#28A745" stroke-width="1"/>
    <text x="35" y="20" font-family="Arial, sans-serif" font-size="12" fill="#333333" text-anchor="middle" dominant-baseline="middle">Tech Component</text>
    <text x="35" y="32" font-family="Arial, sans-serif" font-size="8" fill="#666666" text-anchor="middle" dominant-baseline="middle">Type: [Type], Vendor: [Vendor]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Data Object") {
          const newSvg = `<svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="59" height="29" rx="2" fill="none" stroke="#28A745" stroke-width="1"/>
    <text x="30" y="15" font-family="Arial, sans-serif" font-size="10" fill="#333333" text-anchor="middle" dominant-baseline="middle">Data Object Name</text>
    <text x="30" y="25" font-family="Arial, sans-serif" font-size="7" fill="#666666" text-anchor="middle" dominant-baseline="middle">Format: [Format]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(60, 30);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Process") {
          const newSvg = `<svg width="70" height="40" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="69" height="39" rx="5" fill="none" stroke="#28A745" stroke-width="1"/>
    <text x="35" y="20" font-family="Arial, sans-serif" font-size="12" fill="#333333" text-anchor="middle" dominant-baseline="middle">Process Name</text>
    <text x="35" y="32" font-family="Arial, sans-serif" font-size="8" fill="#666666" text-anchor="middle" dominant-baseline="middle">Priority: [P], Owner: [Name]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Source") {
          const newSvg = `<svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="none" stroke="#007BFF" stroke-width="1"/>
    <text x="40" y="25" font-family="Arial, sans-serif" font-size="14" fill="#333333" text-anchor="middle" dominant-baseline="middle">Source Name</text>
    <text x="40" y="40" font-family="Arial, sans-serif" font-size="9" fill="#666666" text-anchor="middle" dominant-baseline="middle">Type: [Type], Loc: [Location]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(80, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Target") {
          const newSvg = `<svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="none" stroke="#007BFF" stroke-width="1"/>
    <text x="40" y="25" font-family="Arial, sans-serif" font-size="14" fill="#333333" text-anchor="middle" dominant-baseline="middle">Target Name</text>
    <text x="40" y="40" font-family="Arial, sans-serif" font-size="9" fill="#666666" text-anchor="middle" dominant-baseline="middle">Type: [Type], Loc: [Location]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(80, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Data Flow") {
          const newSvg = `<svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 25 C60 10 140 40 190 25" stroke="#007BFF" stroke-width="1" fill="none"/>
    <path d="M186 22 L190 25 L186 28 Z" fill="#007BFF" stroke="transparent"/>
    <text x="100" y="15" font-family="Arial, sans-serif" font-size="10" fill="#333333" text-anchor="middle" dominant-baseline="middle">Protocol: [Proto], Vol: [Vol]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(80, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Transformation") {
          const newSvg = `<svg width="70" height="40" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="69" height="39" rx="3" fill="none" stroke="#007BFF" stroke-width="1"/>
    <text x="35" y="20" font-family="Arial, sans-serif" font-size="12" fill="#333333" text-anchor="middle" dominant-baseline="middle">Transformation Name</text>
    <text x="35" y="32" font-family="Arial, sans-serif" font-size="8" fill="#666666" text-anchor="middle" dominant-baseline="middle">Logic: [Logic], Tool: [Tool]</text>
</svg>
`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(80, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Information") {
          const newSvg = `<svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="none" stroke="#6F42C1" stroke-width="1"/>
    <text x="40" y="25" font-family="Arial, sans-serif" font-size="14" fill="#333333" text-anchor="middle" dominant-baseline="middle">Information Name</text>
    <text x="40" y="40" font-family="Arial, sans-serif" font-size="9" fill="#666666" text-anchor="middle" dominant-baseline="middle">Format: [Format], Sens: [Level]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(80, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Flow") {
          const newSvg = `<svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="25" x2="190" y2="25" stroke="#6C757D" stroke-width="1"/>
    <path d="M186 22 L190 25 L186 28 Z" fill="#6C757D" stroke="transparent"/>
    <text x="100" y="15" font-family="Arial, sans-serif" font-size="10" fill="#333333" text-anchor="middle" dominant-baseline="middle">Type: [Type], Protocol: [Proto]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(200, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Access Point") {
          const newSvg = `<svg width="70" height="40" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="69" height="39" rx="3" fill="none" stroke="#6F42C1" stroke-width="1"/>
    <text x="35" y="20" font-family="Arial, sans-serif" font-size="12" fill="#333333" text-anchor="middle" dominant-baseline="middle">User Role</text>
    <text x="35" y="32" font-family="Arial, sans-serif" font-size="8" fill="#666666" text-anchor="middle" dominant-baseline="middle">Level: [Access Level]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(200, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Repository") {
          const newSvg = `<svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="none" stroke="#6F42C1" stroke-width="1"/>
    <text x="40" y="25" font-family="Arial, sans-serif" font-size="14" fill="#333333" text-anchor="middle" dominant-baseline="middle">Repository Name</text>
    <text x="40" y="40" font-family="Arial, sans-serif" font-size="9" fill="#666666" text-anchor="middle" dominant-baseline="middle">Type: [Type], Policy: [Policy]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(200, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Impact") {
          const newSvg = `<svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="none" stroke="#DC3545" stroke-width="1"/>
    <text x="40" y="25" font-family="Arial, sans-serif" font-size="14" fill="#333333" text-anchor="middle" dominant-baseline="middle">Impact Name</text>
    <text x="40" y="40" font-family="Arial, sans-serif" font-size="9" fill="#666666" text-anchor="middle" dominant-baseline="middle">Sev: [Severity], Pri: [Priority]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(80, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Change Event") {
          const newSvg = `<svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="none" stroke="#DC3545" stroke-width="1"/>
    <text x="40" y="25" font-family="Arial, sans-serif" font-size="14" fill="#333333" text-anchor="middle" dominant-baseline="middle">Change Event</text>
    <text x="40" y="40" font-family="Arial, sans-serif" font-size="9" fill="#666666" text-anchor="middle" dominant-baseline="middle">Type: [Change Type]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(80, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Risk/Effect") {
          const newSvg = `<svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="40 10 65 35 15 35 40 10" fill="none" stroke="#DC3545" stroke-width="1"/>
    <text x="40" y="25" font-family="Arial, sans-serif" font-size="14" fill="#333333" text-anchor="middle" dominant-baseline="middle">Risk/Effect</text>
    <text x="40" y="40" font-family="Arial, sans-serif" font-size="9" fill="#666666" text-anchor="middle" dominant-baseline="middle">Level: [Level], Prob: [Prob]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(80, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Cause-Effect Link") {
          const newSvg = `<svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="25" x2="190" y2="25" stroke="#6C757D" stroke-width="1"/>
    <path d="M186 22 L190 25 L186 28 Z" fill="#6C757D" stroke="transparent"/>
    <text x="100" y="15" font-family="Arial, sans-serif" font-size="10" fill="#333333" text-anchor="middle" dominant-baseline="middle">Type: [Type], Conf: [Level]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(200, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Mitigation Strategy") {
          const newSvg = `<svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="none" stroke="#28A745" stroke-width="1"/>
    <text x="40" y="25" font-family="Arial, sans-serif" font-size="14" fill="#333333" text-anchor="middle" dominant-baseline="middle">Mitigation Strategy</text>
    <text x="40" y="40" font-family="Arial, sans-serif" font-size="9" fill="#666666" text-anchor="middle" dominant-baseline="middle">Owner: [Name]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(80, 50);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Matrix") {
          const newSvg = `<svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="119" height="79" rx="5" fill="none" stroke="#34495E" stroke-width="1"/>
    <line x1="0.5" y1="40" x2="119.5" y2="40" stroke="#34495E" stroke-width="1"/>
    <line x1="60" y1="0.5" x2="60" y2="79.5" stroke="#34495E" stroke-width="1"/>
    <text x="60" y="25" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle" dominant-baseline="middle">Dependency Matrix</text>
    <text x="60" y="55" font-family="Arial, sans-serif" font-size="10" fill="#666666" text-anchor="middle" dominant-baseline="middle">Rows: [Count], Cols: [Count]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(120, 80);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Entity") {
          const newSvg = `<svg width="70" height="40" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="69" height="39" rx="3" fill="none" stroke="#34495E" stroke-width="1"/>
    <text x="35" y="20" font-family="Arial, sans-serif" font-size="12" fill="#333333" text-anchor="middle" dominant-baseline="middle">Entity Name</text>
    <text x="35" y="32" font-family="Arial, sans-serif" font-size="8" fill="#666666" text-anchor="middle" dominant-baseline="middle">Type: [Type], Crit: [Level]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Dependency Link") {
          const newSvg = `<svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="25" x2="190" y2="25" stroke="#6C757D" stroke-width="1"/>
    <path d="M186 22 L190 25 L186 28 Z" fill="#6C757D" stroke="transparent"/>
    <text x="100" y="15" font-family="Arial, sans-serif" font-size="10" fill="#333333" text-anchor="middle" dominant-baseline="middle">Type: [Type], Str: [Strength]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Entity") {
          const newSvg = `<svg width="70" height="40" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="69" height="39" rx="3" fill="none" stroke="#34495E" stroke-width="1"/>
    <text x="35" y="20" font-family="Arial, sans-serif" font-size="12" fill="#333333" text-anchor="middle" dominant-baseline="middle">Entity Name</text>
    <text x="35" y="32" font-family="Arial, sans-serif" font-size="8" fill="#666666" text-anchor="middle" dominant-baseline="middle">Type: [Type], Crit: [Level]</text>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Task/Activity") {
          const newSvg = `<svg width="80" height="40" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="100" height="40" rx="8" ry="8" stroke="black" stroke-width="1" fill="none"/></svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Gateway") {
          const newSvg = `<svg width="30" height="30" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="30,5 55,30 30,55 5,30" stroke="black" stroke-width="1" fill="white"/></svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "End Event") {
          const newSvg = `<svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="12" stroke="black" stroke-width="1"/></svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Sequence Flow") {
          const newSvg = `<svg width="70" height="20" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="10" x2="90" y2="10" stroke="black" stroke-width="1"/><polygon points="90,5 98,10 90,15" fill="currentColor"/></svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Sub Process") {
          const newSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="3 2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="12" width="42" height="26" rx="3"/>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Transaction") {
          const newSvg = `<svg width="50" height="50" viewBox="0 0 50 50" 
     xmlns="http://www.w3.org/2000/svg" 
     fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12a2 2 0 0 1 2-2h38a2 2 0 0 1 2 2v26a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V12z"/>
  <path d="M8 16a2 2 0 0 1 2-2h30a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V16z"/>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Call Activity") {
          const newSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5">
  <rect x="5" y="15" width="40" height="20" rx="6" />
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Exclusive Gateway") {
          const newSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5">
  <!-- Diamond outline -->
  <polygon points="25,2.5 47.5,25 25,47.5 2.5,25" />

  <!-- Diagonal cross perfectly touching inside of diamond -->
  <line x1="13.75" y1="13.75" x2="36.25" y2="36.25" />
  <line x1="36.25" y1="13.75" x2="13.75" y2="36.25" />
</svg>
`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Event Gateway") {
          const newSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5">
  <!-- Diamond shape -->
  <polygon points="25,2.5 47.5,25 25,47.5 2.5,25" />

  <!-- Inner circle -->
  <circle cx="25" cy="25" r="7.5" />
</svg>
`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Parallel Gateway") {
          const newSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5">
  <!-- Diamond shape -->
  <polygon points="25,2.5 47.5,25 25,47.5 2.5,25" />

  <!-- Vertical line (centered) -->
  <line x1="25" y1="12.5" x2="25" y2="37.5" />

  <!-- Horizontal line (centered) -->
  <line x1="12.5" y1="25" x2="37.5" y2="25" />
</svg>

`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Relationship") {
          const newSvg = `<svg width="60" height="20" viewBox="0 0 60 20" xmlns="http://www.w3.org/2000/svg">
  <!-- Main horizontal line (longer) -->
  <line x1="0" y1="10" x2="35" y2="10" stroke="black" stroke-width="1" />
  
  <!-- Crow's foot (3 lines) -->
  <line x1="35" y1="10" x2="60" y2="0" stroke="black" stroke-width="1" />
  <line x1="35" y1="10" x2="60" y2="10" stroke="black" stroke-width="1" />
  <line x1="35" y1="10" x2="60" y2="20" stroke="black" stroke-width="1" />
</svg>

`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        }
        return finalElement;
      },
    });

    stencil.on(
      "element:drop",
      (view: { model: { get: (arg0: string) => any } }) => {
        console.log("Dropped:", view.model.get("type"));
      }
    );

    stencil.on(
      "element:drag",
      (
        view: { vel: { attr: (arg0: string, arg1: number) => void } },
        _: any,
        __: any,
        valid: any
      ) => {
        view.vel.attr("opacity", valid ? 1 : 0.6);
      }
    );

    stencil.on("drop:invalid", () => {
      console.log("Invalid drop detected");
    });

    stencil.render();
    // Utility to create a styled [+] button
    const createAddButton = (
      title: string,
      onClick: () => void
    ): HTMLButtonElement => {
      const btn = document.createElement("button");
      btn.textContent = "+";
      btn.title = title;
      Object.assign(btn.style, {
        marginLeft: "8px",
        padding: "2px 6px",
        fontSize: "12px",
        borderRadius: "4px",
        border: "1px solid #2563eb",
        backgroundColor: "white",
        color: "#2563eb",
        cursor: "pointer",
      });
      btn.onclick = onClick;
      return btn;
    };

    // Add custom [+] button next to "Project Folders" group
    const entitiesGroupLabel = stencil.el.querySelector(
      '[data-name="entities"] .group-label'
    );

    if (entitiesGroupLabel) {
      const addBtn = document.createElement("button");
      addBtn.textContent = "+";
      addBtn.title = "Add Folder";
      Object.assign(addBtn.style, {
        marginLeft: "8px",
        padding: "2px 6px",
        fontSize: "12px",
        borderRadius: "4px",
        border: "1px solid #2563eb",
        backgroundColor: "white",
        color: "#2563eb",
        cursor: "pointer",
      });

      addBtn.onclick = () => {
        const name = prompt("Enter folder name:");
        if (name && !folderNames.includes(name)) {
          setFolderNames((prev) => [...prev, name]);

          const folderElement = new shapes.standard.Rectangle({
            size: { width: 180, height: 40 },
            attrs: {
              body: {
                fill: "#f0f4ff",
                stroke: "#2563eb",
                rx: 6,
                ry: 6,
              },
              label: {
                text: `📁 ${name}`,
                fill: "#1e40af",
                fontSize: 14,
                fontWeight: "bold",
              },
            },
          });

          stencil.load({ entities: [folderElement] }, { addToExisting: true });
        }
      };

      entitiesGroupLabel.appendChild(addBtn);
    }

    // ========== Add [+] to "MODEL TYPES" (basic group) ==========
    const basicLabel = stencil.el.querySelector(
      '[data-name="basic"] .group-label'
    );
    if (basicLabel) {
      const addModelTypeBtn = createAddButton("Add Model Type", () => {
        const name = prompt("Enter model type name:");
        if (name) {
          const modelElement = new shapes.standard.Rectangle({
            size: { width: 160, height: 50 },
            attrs: {
              body: {
                fill: "#ecfdf5",
                stroke: "#10b981",
                rx: 6,
                ry: 6,
              },
              label: {
                text: `🧩 ${name}`,
                fill: "#065f46",
                fontSize: 14,
                fontWeight: "bold",
              },
            },
          });

          stencil.load({ basic: [modelElement] }, { addToExisting: true });
        }
      });
      basicLabel.appendChild(addModelTypeBtn);
    }

    stencilContainerRef.current.innerHTML = "";
    stencilContainerRef.current.appendChild(stencil.el);

    const allElements: dia.Element[] = [];

    paletteGroups.forEach((group) => {
      group.elements.forEach((cfg) => {
        if (cfg.type === "erd.Entity") {
          allElements.push(new EREntity(cfg));
        } else {
          const shapeName = cfg.type.split(
            "."
          )[1] as keyof typeof shapes.standard;
          const ShapeClass = shapes.standard[shapeName];
          if (ShapeClass && typeof ShapeClass === "function") {
            const Ctor = ShapeClass as new (args: any) => dia.Element;
            allElements.push(new Ctor(cfg));
          } else {
            allElements.push(new shapes.standard.Rectangle(cfg));
          }
        }
      });
    });

    const createBoundedIcon = (title: string, svg: string) => {
      return new shapes.standard.Image({
        size: { width: 60, height: 60 },
        attrs: {
          root: {
            title,
            stroke: "#535965ff",
            strokeWidth: 1,
            rx: 4,
            ry: 4,
            fill: "transparent",
          },
          image: {
            "xlink:href": `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
            width: 50,
            height: 50,
            x: 5,
            y: 5,
          },
          label: {
            text: title,
            fontSize: 11,
            textAnchor: "middle", // center horizontally
            x: 30, // horizontally center in 60×60 box
            y: 58, // place just below the icon
          },
        },
      });
    };

    const topicSvg = `<svg width="50" height="50" viewBox="0 0 50 50" stroke="currentColor" stroke-width="0.5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="25" cy="25" rx="24" ry="16" fill="currentColor" fill-opacity="0.4" />

</svg>
`;
    const topicShape = createBoundedIcon("Topic", topicSvg);
    const subtopicSvg = `<svg width="50" height="50" viewBox="0 0 50 50" stroke="currentColor" stroke-width="0.5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="25" cy="25" rx="24" ry="16" fill="currentColor" fill-opacity="0.2"  />
  

</svg>
`;
    const subtopicShape = createBoundedIcon("Subtopic", subtopicSvg);
    const linkSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Bigger and sharper arrowhead -->
    <marker id="arrowhead" markerWidth="12" markerHeight="12" 
            refX="10" refY="6" orient="auto" markerUnits="strokeWidth">
      <polygon points="0 0, 12 6, 0 12" fill="currentColor" />
    </marker>
  </defs>

  <!-- Line with improved arrowhead -->
  <line x1="10" y1="35" x2="50" y2="35" stroke="currentColor" stroke-width="0.5" marker-end="url(#arrowhead)" />
</svg>


`;
    const linkShape = createBoundedIcon("Link", linkSvg);

    const noteSvg = `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="0.5">
  <!-- Document outline with folded corner -->
  <path d="M10 5.5 H30 L39.5 15 V44.5 H10 Z M30 5.5 V15 H39.5" />

  <!-- Text lines -->
  <line x1="15" y1="20" x2="35" y2="20" />
  <line x1="15" y1="25" x2="35" y2="25" />
  <line x1="15" y1="30" x2="35" y2="30" />
  <line x1="15" y1="35" x2="32" y2="35" />
  <line x1="15" y1="40" x2="28" y2="40" />
</svg>


`;
    const noteShape = createBoundedIcon("Note", noteSvg);

    const startEventSvg = `<svg width="50" height="50" viewBox="0 0 50 50" stroke="currentColor" stroke-width="0.5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="25" cy="25" r="13" />
</svg>


`;
    const startEventShape = createBoundedIcon("Start Event", startEventSvg);

    const taskActivitySvg = `<svg width="50" height="50" viewBox="0 0 50 50" stroke="currentColor" stroke-width="0.5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="13" width="46" height="24" rx="8" ry="8" />
</svg>

`;
    const taskActivityShape = createBoundedIcon(
      "Task/Activity",
      taskActivitySvg
    );

    const gatewaySvg = `<svg width="50" height="50" viewBox="0 0 50 50" stroke="currentColor" stroke-width="0.5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polygon points="25,8 44,27 25,46 6,27" />
</svg>


`;
    const gatewayShape = createBoundedIcon("Gateway", gatewaySvg);

    const endEventSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5">
  <!-- Centered circle -->
   <circle cx="25" cy="25" r="13" />
</svg>


`;
    const endEventShape = createBoundedIcon("End Event", endEventSvg);

    const sequenceFlowSvg = `<svg width="50" height="50" viewBox="0 0 50 50" stroke="currentColor" stroke-width="0.5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="5" y1="10" x2="40" y2="10" />
  <polygon points="40,5 48,10 40,15" fill="currentColor" fill-opacity="0.4"  />
 
</svg>

`;
    const sequenceFlowShape = createBoundedIcon(
      "Sequence Flow",
      sequenceFlowSvg
    );

    const requirementSvg = `<svg width="50" height="50" viewBox="0 0 50 50" stroke="currentColor" stroke-width="0.5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 5 L40 5 L40 45 L5 45 Z" />
  <polyline points="40,5 40,12.5 32.5,12.5 32.5,5 40,5" />
  <line x1="10" y1="15" x2="35" y2="15" />
  <line x1="10" y1="22.5" x2="30" y2="22.5" />
  <line x1="10" y1="30" x2="35" y2="30" />
  <line x1="10" y1="37.5" x2="25" y2="37.5" />
  <text x="7.5" y="10" font-family="Arial" font-size="7" font-weight="normal" fill="currentColor">R</text>
</svg>

`;
    const requirementShape = createBoundedIcon("Requirement", requirementSvg);

    const usecaseSvg = `<svg width="50" height="50" viewBox="0 0 50 50" stroke="currentColor" stroke-width="0.5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Ellipse representing the use case -->
  <ellipse cx="25" cy="25" rx="20" ry="12" />

  
  
</svg>


`;
    const usecaseShape = createBoundedIcon("Use Case", usecaseSvg);

    const EntitySvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer rounded rectangle (table frame) -->
  <rect x="7" y="10" width="36" height="30" rx="3" />
  <!-- Horizontal divider for header -->
  <line x1="7" y1="18" x2="43" y2="18" />
</svg>





`;
    const EntityShape = createBoundedIcon("Entity", EntitySvg);

    const TableSvg = `<svg width="50" height="50" viewBox="0 0 50 50" stroke="currentColor" stroke-width="0.5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Table Header -->
  <rect x="1.6665" y="2.7775" width="46.666" height="10" />
  <!-- Table Body -->
  <rect x="1.6665" y="11.665" width="46.666" height="20" />
  <!-- Lines for rows -->
  <line x1="1.6665" y1="16.665" x2="48.3325" y2="16.665" />
  <line x1="1.6665" y1="21.665" x2="48.3325" y2="21.665" />
  <line x1="1.6665" y1="26.665" x2="48.3325" y2="26.665" />
  <!-- Lines for columns -->
  <line x1="16.665" y1="11.665" x2="16.665" y2="31.665" />
 
  <!-- Centered Table Label -->
  <text
    x="25"
    y="7.7775"
    font-family="Arial"
    font-size="4"
    font-weight="normal"
    text-anchor="middle"
    dominant-baseline="middle"
    fill="currentColor"
    opacity="0.5"
  >
    Table 
  </text>
</svg>



`;
    const TableShape = createBoundedIcon("Table", TableSvg);
    const Tablesvg = `<svg width="50" height="50" viewBox="0 0 50 50" stroke="currentColor" stroke-width="0.5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Table Header -->
  <rect x="1.6665" y="2.7775" width="46.666" height="10" />
  <!-- Table Body -->
  <rect x="1.6665" y="11.665" width="46.666" height="20" />
  <!-- Lines for rows -->
  <line x1="1.6665" y1="16.665" x2="48.3325" y2="16.665" />
  <line x1="1.6665" y1="21.665" x2="48.3325" y2="21.665" />
  <line x1="1.6665" y1="26.665" x2="48.3325" y2="26.665" />
  <!-- Lines for columns -->
  <line x1="16.665" y1="11.665" x2="16.665" y2="31.665" />
  <line x1="30.0005" y1="11.665" x2="30.0005" y2="31.665" />
  <!-- Centered Table Label -->
  <text
    x="25"
    y="7.7775"
    font-family="Arial"
    font-size="4"
    text-anchor="middle"
    font-weight="normal"
    dominant-baseline="middle"
    fill="currentColor"
    opacity="0.5"
  >
    Table
  </text>
</svg>



`;
    const Tableshape = createBoundedIcon("Table", Tablesvg);
    const EntitystencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" stroke="currentColor" stroke-width="0.5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Table Header -->
  <rect x="1.6665" y="2.7775" width="46.666" height="10" />
  <!-- Table Body -->
  <rect x="1.6665" y="11.665" width="46.666" height="20" />
  <!-- Lines for rows -->
  <line x1="1.6665" y1="16.665" x2="48.3325" y2="16.665" />
  <line x1="1.6665" y1="21.665" x2="48.3325" y2="21.665" />
  <line x1="1.6665" y1="26.665" x2="48.3325" y2="26.665" />
  <!-- Lines for columns -->
  <line x1="16.665" y1="11.665" x2="16.665" y2="31.665" />
  <line x1="30.0005" y1="11.665" x2="30.0005" y2="31.665" />
  <!-- Centered Table Label -->
  <text
    x="25"
    y="7.7775"
    font-family="Arial"
    font-size="4"
    font-weight="normal"
    text-anchor="middle"
    dominant-baseline="middle"
    fill="currentColor"
    opacity="0.5"
  >
  >
    Entity
  </text>
</svg>



`;
    const EntitystencilShape = createBoundedIcon("Entity", EntitystencilSvg);
    const ActorSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M25 22C29.142 22 32.5 18.642 32.5 14.5C32.5 10.358 29.142 7 25 7C20.858 7 17.5 10.358 17.5 14.5C17.5 18.642 20.858 22 25 22Z"/>
  <path d="M25 22C15.58 22 7.5 26.158 7.5 31.5V39H42.5V31.5C42.5 26.158 34.42 22 25 22Z"/>
</svg>


`;
    const ActorShape = createBoundedIcon("Actor", ActorSvg);

    const stakeholderSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none"
     xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.5">
  <!-- Middle person -->
  <circle cx="25" cy="15" r="4"/>
  <path d="M21 22 C21 20 23 19 25 19 C27 19 29 20 29 22 V25 H21 V22 Z"/>

  <!-- Left person -->
  <circle cx="12" cy="17" r="3"/>
  <path d="M8 23 C8 21.5 10 20.5 12 20.5 C14 20.5 16 21.5 16 23 V25 H8 V23 Z"/>

  <!-- Right person -->
  <circle cx="38" cy="17" r="3"/>
  <path d="M34 23 C34 21.5 36 20.5 38 20.5 C40 20.5 42 21.5 42 23 V25 H34 V23 Z"/>
</svg>


`;
    const stakeholderShape = createBoundedIcon("Stakeholder", stakeholderSvg);

    const InheritanceSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5">
  <!-- Top square node -->
  <rect x="18.75" y="6.25" width="12.5" height="9.375"/>

  <!-- Connecting vertical line -->
  <line x1="25" y1="15.625" x2="25" y2="25"/>

  <!-- Horizontal line connecting bottom nodes -->
  <line x1="12.5" y1="25" x2="37.5" y2="25"/>

  <!-- Bottom left square node -->
  <rect x="9.375" y="25" width="9.375" height="9.375"/>

  <!-- Bottom right square node -->
  <rect x="31.25" y="25" width="9.375" height="9.375"/>
</svg>


`;
    const InheritanceShape = createBoundedIcon("Inheritance", InheritanceSvg);

    const InheritanceLDMSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5">
  <!-- Top square node -->
  <rect x="18.75" y="6.25" width="12.5" height="9.375"/>

  <!-- Connecting vertical line -->
  <line x1="25" y1="15.625" x2="25" y2="25"/>

  <!-- Horizontal line connecting bottom nodes -->
  <line x1="12.5" y1="25" x2="37.5" y2="25"/>

  <!-- Bottom left square node -->
  <rect x="9.375" y="25" width="9.375" height="9.375"/>

  <!-- Bottom right square node -->
  <rect x="31.25" y="25" width="9.375" height="9.375"/>
</svg>



`;
    const InheritanceLDMShape = createBoundedIcon(
      "Inheritance",
      InheritanceLDMSvg
    );

    const onetoNSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
  xmlns="http://www.w3.org/2000/svg"
  stroke="currentColor" fill="none" stroke-width="0.5">

  <!-- Left vertical bar (One) -->
  <line x1="8" y1="20" x2="8" y2="30"/>

  <!-- Horizontal connector -->
  <line x1="8" y1="25" x2="42" y2="25"/>

  <!-- Right side Crow’s foot (Many) -->
  <line x1="42" y1="25" x2="48" y2="19"/>
  <line x1="42" y1="25" x2="48" y2="25"/>
  <line x1="42" y1="25" x2="48" y2="31"/>
</svg>


`;
    const onetoNShape = createBoundedIcon("1:N Relationship", onetoNSvg);

    const OneToNSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
  xmlns="http://www.w3.org/2000/svg"
  stroke="currentColor" fill="none" stroke-width="0.5">

  <!-- Left vertical bar (One) -->
  <line x1="8" y1="20" x2="8" y2="30"/>

  <!-- Horizontal connector -->
  <line x1="8" y1="25" x2="42" y2="25"/>

  <!-- Right side Crow’s foot (Many) -->
  <line x1="42" y1="25" x2="48" y2="19"/>
  <line x1="42" y1="25" x2="48" y2="25"/>
  <line x1="42" y1="25" x2="48" y2="31"/>
</svg>



`;
    const OneToNShape = createBoundedIcon("1:N Relationship", OneToNSvg);

    const onetooneSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5">

  <!-- Horizontal connector -->
  <line x1="8" y1="25" x2="42" y2="25"/>

  <!-- Left vertical bar -->
  <line x1="8" y1="20" x2="8" y2="30"/>

  <!-- Right vertical bar -->
  <line x1="42" y1="20" x2="42" y2="30"/>
</svg>




`;
    const onetooneShape = createBoundedIcon("1:1 Relationship", onetooneSvg);

    const OneToOneSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5">

  <!-- Horizontal connector -->
  <line x1="8" y1="25" x2="42" y2="25"/>

  <!-- Left vertical bar -->
  <line x1="8" y1="20" x2="8" y2="30"/>

  <!-- Right vertical bar -->
  <line x1="42" y1="20" x2="42" y2="30"/>
</svg>



`;
    const OneToOneShape = createBoundedIcon("1:1 Relationship", OneToOneSvg);

    const OnetoOneSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5">

  <!-- Horizontal connector -->
  <line x1="8" y1="25" x2="42" y2="25"/>

  <!-- Left vertical bar -->
  <line x1="8" y1="20" x2="8" y2="30"/>

  <!-- Right vertical bar -->
  <line x1="42" y1="20" x2="42" y2="30"/>
</svg>




`;
    const OnetoOneShape = createBoundedIcon("1:1 Relationship", OnetoOneSvg);

    const NtoNSvg = `<svg viewBox="0 0 50 50" width="50" height="50"
     fill="none" stroke="currentColor" stroke-width="0.5"
     xmlns="http://www.w3.org/2000/svg">
  <!-- Horizontal connector -->
  <line x1="8" y1="25" x2="42" y2="25"/>

  <!-- Left Crow’s foot (Many) -->
  <line x1="8" y1="25" x2="2" y2="19"/>
  <line x1="8" y1="25" x2="2" y2="25"/>
  <line x1="8" y1="25" x2="2" y2="31"/>

  <!-- Right Crow’s foot (Many) -->
  <line x1="42" y1="25" x2="48" y2="19"/>
  <line x1="42" y1="25" x2="48" y2="25"/>
  <line x1="42" y1="25" x2="48" y2="31"/>
</svg>



`;
    const NtoNShape = createBoundedIcon("N:N Relationship", NtoNSvg);

    const ntonSvg = `<svg viewBox="0 0 50 50" width="50" height="50"
     fill="none" stroke="currentColor" stroke-width="0.5"
     xmlns="http://www.w3.org/2000/svg">
  <!-- Horizontal connector -->
  <line x1="8" y1="25" x2="42" y2="25"/>

  <!-- Left Crow’s foot (Many) -->
  <line x1="8" y1="25" x2="2" y2="19"/>
  <line x1="8" y1="25" x2="2" y2="25"/>
  <line x1="8" y1="25" x2="2" y2="31"/>

  <!-- Right Crow’s foot (Many) -->
  <line x1="42" y1="25" x2="48" y2="19"/>
  <line x1="42" y1="25" x2="48" y2="25"/>
  <line x1="42" y1="25" x2="48" y2="31"/>
</svg>



`;
    const ntonShape = createBoundedIcon("N:N Relationship", ntonSvg);
    const goalSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5">
  <circle cx="25" cy="25" r="22" />
  <circle cx="25" cy="25" r="12" />
  <circle cx="25" cy="25" r="4"  />
</svg>


`;
    const goalShape = createBoundedIcon("Goal", goalSvg);
    const SubProcessSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="3 2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="12" width="42" height="26" rx="3"/>
</svg>


`;
    const SubProcessShape = createBoundedIcon("Sub Process", SubProcessSvg);
    const TransactionSvg = `<svg width="50" height="50" viewBox="0 0 50 50" 
     xmlns="http://www.w3.org/2000/svg" 
     fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12a2 2 0 0 1 2-2h38a2 2 0 0 1 2 2v26a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V12z"/>
  <path d="M8 16a2 2 0 0 1 2-2h30a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V16z"/>
</svg>


`;
    const TransactionShape = createBoundedIcon("Transaction", TransactionSvg);
    const CallActivitySvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5">
  <rect x="5" y="15" width="40" height="20" rx="6" />
</svg>


`;
    const CallActivityShape = createBoundedIcon(
      "Call Activity",
      CallActivitySvg
    );

    const ExclusiveGatewaySvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5">
  <!-- Diamond outline -->
  <polygon points="25,2.5 47.5,25 25,47.5 2.5,25" />

  <!-- Diagonal cross perfectly touching inside of diamond -->
  <line x1="13.75" y1="13.75" x2="36.25" y2="36.25" />
  <line x1="36.25" y1="13.75" x2="13.75" y2="36.25" />
</svg>



`;
    const ExclusiveGatewayShape = createBoundedIcon(
      "Exclusive Gateway",
      ExclusiveGatewaySvg
    );
    const EventGatewaySvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5">
  <!-- Diamond shape -->
  <polygon points="25,2.5 47.5,25 25,47.5 2.5,25" />

  <!-- Inner circle -->
  <circle cx="25" cy="25" r="7.5" />
</svg>



`;
    const EventGatewayShape = createBoundedIcon(
      "Event Gateway",
      EventGatewaySvg
    );
    const ParallelGatewaySvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5">
  <!-- Diamond shape -->
  <polygon points="25,2.5 47.5,25 25,47.5 2.5,25" />

  <!-- Vertical line (centered) -->
  <line x1="25" y1="12.5" x2="25" y2="37.5" />

  <!-- Horizontal line (centered) -->
  <line x1="12.5" y1="25" x2="37.5" y2="25" />
</svg>

`;
    const ParallelGatewayShape = createBoundedIcon(
      "Parallel Gateway",
      ParallelGatewaySvg
    );

    const MessageFlowSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5"
     stroke-dasharray="4 2">
  <!-- Dashed horizontal line -->
  <line x1="8" y1="25" x2="42" y2="25" />
  
  <!-- Arrowhead pointing right -->
  <polyline points="42,22 46,25 42,28" stroke-dasharray="0" />
</svg>

`;
    const MessageFlowShape = createBoundedIcon("Message Flow", MessageFlowSvg);

    const AssociationSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5"
     stroke-dasharray="2 2">
  <!-- Dashed horizontal line (centered, with padding) -->
  <line x1="10" y1="25" x2="40" y2="25" />
</svg>

`;
    const AssociationShape = createBoundedIcon("Association", AssociationSvg);
    const associationSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5"
     stroke-dasharray="2 2">
  <!-- Dashed horizontal line 60px long, centered at y=25 -->
  <line x1="-5" y1="25" x2="55" y2="25" />
</svg>

`;
    const associationShape = createBoundedIcon("Association", associationSvg);

    const anchorlinkSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5">
  <!-- Left circle (touching line start) -->
  <circle cx="11" cy="25" r="2" />

  <!-- Right circle (touching line end) -->
  <circle cx="39" cy="25" r="2" />

  <!-- Connecting line, offset inward by radius -->
  <line x1="13" y1="25" x2="37" y2="25" />
</svg>


`;
    const anchorlinkShape = createBoundedIcon("Anchor Link", anchorlinkSvg);

    const classStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" stroke-width="0.5" fill="none">
  <!-- Outer rounded rectangle -->
  <rect x="8" y="8" width="34" height="34" rx="2" ry="2"/>
  <!-- Horizontal separator 1 (top third) -->
  <line x1="8" y1="19.33" x2="42" y2="19.33"/>
  <!-- Horizontal separator 2 (middle third) -->
  <line x1="8" y1="30.67" x2="42" y2="30.67"/>
</svg>



`;
    const classShape = createBoundedIcon("Class", classStencilSvg);

    const interfaceStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" 
     xmlns="http://www.w3.org/2000/svg" 
     stroke="currentColor" stroke-width="0.5" fill="none">
  <!-- Outer rounded rectangle -->
  <rect x="8" y="8" width="34" height="34" rx="2" ry="2"/>

  <!-- Abstract '<<I>>' representation -->
  <!-- Chevrons to imply stereotype brackets -->
  <polyline points="16,22 14,25 16,28" />
  <polyline points="34,22 36,25 34,28" />

  <!-- Upright 'I' made of 3 lines -->
  <line x1="24" y1="20" x2="28" y2="20" />
  <line x1="26" y1="20" x2="26" y2="30" />
  <line x1="24" y1="30" x2="28" y2="30" />
</svg>


`;
    const interfaceShape = createBoundedIcon("Interface", interfaceStencilSvg);

    const enumStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" 
     xmlns="http://www.w3.org/2000/svg" 
     stroke="currentColor" stroke-width="0.5" fill="none">
  <!-- Outer rounded rectangle -->
  <rect x="8" y="8" width="34" height="34" rx="2"/>

  <!-- Stylized triple lines to represent enum values -->
  <line x1="16" y1="18" x2="34" y2="18"/>
  <line x1="16" y1="24" x2="34" y2="24"/>
  <line x1="16" y1="30" x2="34" y2="30"/>
</svg>

`;
    const enumShape = createBoundedIcon("Enum", enumStencilSvg);
    //package needs to be fixed.
    const PackagestencilSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg">
  <!-- Main server body -->
  <rect x="4" y="14" width="42" height="30" rx="2" ry="2"/>
  
  <!-- Header / label slot -->
  <rect x="4" y="10" width="15" height="5"/>
  
  <!-- Lights / slots -->
  <rect x="12" y="24" width="4" height="6"/>
  <rect x="22" y="30" width="4" height="6"/>
  <rect x="32" y="24" width="4" height="6"/>
</svg>


`;
    const PackagestencilShape = createBoundedIcon("Package", PackagestencilSvg);

    const cubeStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" stroke-width="0.5" fill="none">
  <!-- Top face -->
  <path d="M25 10L40 18L25 26L10 18L25 10Z" stroke-linejoin="round"/>
  <!-- Left face -->
  <path d="M10 18V34L25 42V26L10 18Z" stroke-linejoin="round"/>
  <!-- Right face -->
  <path d="M40 18V34L25 42V26L40 18Z" stroke-linejoin="round"/>
</svg>




`;
    const cubeShape = createBoundedIcon("Cube", cubeStencilSvg);

    const dimensionStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor" fill-opacity="0.4"  stroke-width="0.5">
  <defs>
    <!-- Arrow marker definition -->
    <marker id="arrowhead" markerWidth="3" markerHeight="3" refX="2.5" refY="1.5" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L3,1.5 L0,3"  />
    </marker>
  </defs>

  <!-- Center point -->
  <circle cx="25" cy="25" r="0.5" />

  <!-- Y-shape arrows -->
  <line x1="25" y1="25" x2="25" y2="10" marker-end="url(#arrowhead)" />
  <line x1="25" y1="25" x2="37.5" y2="32.5" marker-end="url(#arrowhead)" />
  <line x1="25" y1="25" x2="12.5" y2="32.5" marker-end="url(#arrowhead)" />

  <!-- Isometric cube -->
  <!-- Vertical edges -->
  <line x1="25" y1="32.5" x2="25" y2="25" />
  <line x1="25" y1="25" x2="25" y2="17.5" />
  <line x1="18.5" y1="28.75" x2="18.5" y2="21.25" />
  <line x1="31.5" y1="28.75" x2="31.5" y2="21.25" />

  <!-- Diagonal edges -->
  <line x1="25" y1="25" x2="18.5" y2="28.75" />
  <line x1="25" y1="25" x2="31.5" y2="28.75" />
  <line x1="25" y1="25" x2="18.5" y2="21.25" />
  <line x1="25" y1="25" x2="31.5" y2="21.25" />

  <!-- Bottom face diagonals -->
  <line x1="25" y1="32.5" x2="18.5" y2="28.75" />
  <line x1="25" y1="32.5" x2="31.5" y2="28.75" />

  <!-- Top face diagonals -->
  <line x1="25" y1="17.5" x2="18.5" y2="21.25" />
  <line x1="25" y1="17.5" x2="31.5" y2="21.25" />
</svg>


`;
    const dimensionShape = createBoundedIcon("Dimension", dimensionStencilSvg);

    const measureStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none"
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" stroke-width="0.5">
  <line x1="10" y1="40" x2="40" y2="40" stroke-linecap="round"/>
  <rect x="14" y="25" width="4" height="15" rx="0.5" ry="0.5" fill="currentColor" fill-opacity="0.4"  />
  <rect x="22" y="18" width="4" height="22" rx="0.5" ry="0.5" fill="currentColor" fill-opacity="0.4" />
  <rect x="30" y="30" width="4" height="10" rx="0.5" ry="0.5" fill="currentColor" fill-opacity="0.4"  />
</svg>


`;
    const measureShape = createBoundedIcon("Measure", measureStencilSvg);

    const freeNodeStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" stroke-width="0.5"
     fill="none">
  <rect x="10" y="15" width="30" height="20" rx="2" stroke-dasharray="4 2" />
</svg>


`;
    const freeNodeShape = createBoundedIcon("Free Node", freeNodeStencilSvg);

    const freeGroupStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" stroke-width="0.5" fill="none">
  
  <!-- Outer Dashed Rounded Rectangle -->
  <rect x="5" y="10" width="40" height="30" rx="4"
        stroke="currentColor" stroke-dasharray="3 2" />

  <!-- Inner Rectangle -->
  <rect x="12" y="16" width="26" height="18" rx="1"
        stroke="currentColor" />

  <!-- Group of shapes (circle, square, rectangle) centered in inner rectangle -->
  <g transform="translate(25, 25)">
    <!-- Square -->
    <rect x="-6" y="-6" width="4" height="4" />
    <!-- Circle -->
    <circle cx="0" cy="0" r="2" />
    <!-- Rectangle -->
    <rect x="3" y="-2" width="5" height="4" />
  </g>
</svg>


`;
    const freeGroupShape = createBoundedIcon("Group", freeGroupStencilSvg);

    const connectorLineStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" stroke-width="0.5"
     fill="none">
  <!-- Horizontal line -->
  <line x1="10" y1="25" x2="35" y2="25" />

  <!-- Arrowhead (outlined triangle) -->
  <path d="M35 22 L40 25 L35 28 Z" fill="currentColor" fill-opacity="0.4"  />
</svg>


`;
    const connectorLineShape = createBoundedIcon(
      "Connector Line",
      connectorLineStencilSvg
    );

    const annotationStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     fill="none" xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" stroke-width="0.5">
  <path d="M18 15H32L37 20V35H18V15Z" />
  <path d="M32 15V20H37" />
</svg>


`;
    const annotationShape = createBoundedIcon(
      "Annotation",
      annotationStencilSvg
    );

    const titleboxSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" fill="none"
     stroke-width="0.5">
  <!-- Rounded title box -->
  <rect x="10" y="15" width="30" height="20" rx="2" ry="2" />
  <!-- Title line -->
  <line x1="13" y1="20" x2="37" y2="20" stroke-linecap="round" />
  <!-- Subtitle line -->
  <line x1="13" y1="25" x2="27" y2="25" stroke-linecap="round" />
</svg>


`;
    const titleboxShape = createBoundedIcon("Title Box", titleboxSvg);

    const processNodeStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5"
     stroke-linecap="round" stroke-linejoin="round">
  <!-- Rounded rectangle -->
  <rect x="7" y="12" width="36" height="26" rx="6" ry="6" />
  <!-- Fully centered plus symbol -->
  <path d="M22 25 H28 M25 22 V28" />
</svg>


`;
    const processNodeShape = createBoundedIcon(
      "Process Node",
      processNodeStencilSvg
    );

    const subprocessNodeStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" fill="none" stroke-width="0.5"
     stroke-linecap="round" stroke-linejoin="round">
  <!-- Rounded rectangle -->
  <rect x="7" y="12" width="36" height="26" rx="6" ry="6" />
  
  <!-- Plus symbol moved upward -->
  <path d="M22 29h6M25 26v6" />
</svg>

`;
    const subprocessNodeShape = createBoundedIcon(
      "Subprocess Node",
      subprocessNodeStencilSvg
    );

    const activityNodeStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" fill="none" stroke-width="0.5"
     stroke-linecap="round" stroke-linejoin="round">
  <rect x="10" y="20" width="30" height="20" rx="10" ry="10" />
</svg>

`;
    const activityNodeShape = createBoundedIcon(
      "Activity Node",
      activityNodeStencilSvg
    );

    const organizationStencilSvg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 50 50"
  stroke="currentColor"
  fill="none"
  stroke-width="0.5"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <!-- Tall building -->
  <path d="M 10 5 V 45 H 30 V 5 Z" />
  
  <!-- Windows for the tall building -->
  <path d="M 14 9 H 18 V 13 H 14 Z M 22 9 H 26 V 13 H 22 Z M 14 17 H 18 V 21 H 14 Z M 22 17 H 26 V 21 H 22 Z M 14 25 H 18 V 29 H 14 Z M 22 25 H 26 V 29 H 22 Z" />
  
  <!-- Entrance for the tall building -->
  <path d="M 14 45 V 39 A 3 3 0 0 1 16 39 H 24 A 3 3 0 0 1 26 39 V 45" />

  <!-- Shorter building -->
  <path d="M 30 25 V 45 H 45 V 25 Z" />

  <!-- Windows for the shorter building, now centered -->
  <path d="M 32 29 H 36 V 33 H 32 Z M 39 29 H 43 V 33 H 39 Z" />

  <!-- Entrance for the shorter building, now centered -->
  <path d="M 34 45 V 39 A 3 3 0 0 1 37 39 H 38 A 3 3 0 0 1 41 39 V 45" />

</svg>


`;
    const organizationShape = createBoundedIcon(
      "Organization",
      organizationStencilSvg
    );

    const departmentStencilSvg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 50 50"
  width="50"
  height="50"
  stroke="currentColor"
  fill="none"
  stroke-width="0.5"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <!-- Parent node (top square) -->
  <path d="M15 5 H35 V20 H15 Z" />

  <!-- Connectors -->
  <path d="M25 20 V26 M8 26 H42 M8 26 V33 M25 26 V33 M42 26 V33" />

  <!-- Child nodes (bottom circles) -->
  <path d="M4 38 A5 5 0 1 0 14 38 A5 5 0 1 0 4 38 Z" />
  <path d="M20 38 A5 5 0 1 0 30 38 A5 5 0 1 0 20 38 Z" />
  <path d="M36 38 A5 5 0 1 0 46 38 A5 5 0 1 0 36 38 Z" />
</svg>


`;
    const departmentShape = createBoundedIcon(
      "Department",
      departmentStencilSvg
    );

    const roleStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" stroke-width="0.5" fill="none">
  <!-- Shield -->
  <path d="M25 5 L40 12 V24 C40 33 33 42 25 45 C17 42 10 33 10 24 V12 L25 5 Z" />

  <!-- Person inside shield -->
  <circle cx="25" cy="20" r="4" />
  <!-- Further enlarged body -->
  <path d="M16 34 C16 26, 34 26, 34 34 Z" />
</svg>



`;
    const roleShape = createBoundedIcon("Role", roleStencilSvg);

    const positionStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" fill="none" stroke-width="0.5"
     stroke-linecap="round" stroke-linejoin="round">
  
  <!-- Head -->
  <circle cx="25" cy="12" r="5" />

  <!-- Shoulders -->
  <path d="M20.2 16.6 Q17 20 17 25" />
  <path d="M29.8 16.6 Q33 20 33 25" />

  <!-- Tie -->
  <path d="M24 17 L23.5 22 L25 23 L26.5 22 L26 17" />

  <!-- Central vertical line -->
  <line x1="25" y1="25" x2="25" y2="32" />

  <!-- Horizontal connector -->
  <path d="M17 32 Q17 30 19 30 H31 Q33 30 33 32" />

  <!-- Bottom three circles -->
  <circle cx="25" cy="37" r="3" />
  <circle cx="17" cy="37" r="3" />
  <circle cx="33" cy="37" r="3" />
</svg>

`;
    const positionShape = createBoundedIcon("Position", positionStencilSvg);

    const reportingLineStencilSvg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 50 50"
  stroke="currentColor"
  fill="none"
  stroke-width="0.5"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <!-- Document outline with rounded corners -->
  <path d="M 12 5 A 5 5 0 0 0 7 10 V 40 A 5 5 0 0 0 12 45 H 38 A 5 5 0 0 0 43 40 V 10 A 5 5 0 0 0 38 5 Z" />
  
  <!-- New text lines at the top -->
  <path d="M 10 10 H 40" />
  <path d="M 10 15 H 40" />
  
  <!-- Pie chart icon inside the document, now vertically centered -->
  <circle cx="20" cy="22.5" r="5" />
  <path d="M 20 22.5 L 25 22.5 A 5 5 0 0 0 20 17.5 Z" />
  
  <!-- Text lines, positions adjusted to fit the new lines -->
  <path d="M 30 22.5 H 40" />
  <path d="M 10 30 H 40" />
  <path d="M 10 35 H 40" />
  <path d="M 10 40 H 35" />
</svg>


`;
    const reportingLineShape = createBoundedIcon(
      "Reporting Line",
      reportingLineStencilSvg
    );

    const groupStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" stroke-width="0.5" fill="none">
  
  <!-- Outer Dashed Rounded Rectangle -->
  <rect x="5" y="10" width="40" height="30" rx="4"
        stroke="currentColor" stroke-dasharray="3 2" />

  <!-- Inner Rectangle -->
  <rect x="12" y="16" width="26" height="18" rx="1"
        stroke="currentColor" />

  <!-- Group of shapes (circle, square, rectangle) centered in inner rectangle -->
  <g transform="translate(25, 25)">
    <!-- Square -->
    <rect x="-6" y="-6" width="4" height="4" />
    <!-- Circle -->
    <circle cx="0" cy="0" r="2" />
    <!-- Rectangle -->
    <rect x="3" y="-2" width="5" height="4" />
  </g>
</svg>

`;
    const groupShape = createBoundedIcon("Group", groupStencilSvg);

    const businessCapabilityStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="0.5">
  <!-- Bars -->
  <rect x="10" y="32" width="5" height="8" rx="0.5" ry="0.5"/>
  <rect x="17" y="28" width="5" height="12" rx="0.5" ry="0.5"/>
  <rect x="24" y="24" width="5" height="16" rx="0.5" ry="0.5"/>
  <rect x="31" y="20" width="5" height="20" rx="0.5" ry="0.5"/>

  <!-- Diagonal Line -->
  <line x1="10" y1="20" x2="36" y2="8"/>

  <!-- Exaggerated Arrowhead Rotation -->
  <path d="M36 8 L33 12 L30 7 Z" fill="currentColor" opacity = "0.5"/>
  
   <path d="M36 8 L33 12 L30 7 Z" />
</svg>



`;
    const businessCapabilityShape = createBoundedIcon(
      "Business",
      businessCapabilityStencilSvg
    );

    const applicationStencilSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
  <path fill="none" stroke="currentColor" stroke-width="0.5" d="M12.5 13.5h22.5c.828 0 1.5.672 1.5 1.5v20c0 .828-.672 1.5-1.5 1.5H12.5c-.828 0-1.5-.672-1.5-1.5v-20c0-.828.672-1.5 1.5-1.5z"/>
  <path fill="currentColor" d="M16 16.5h1.5v1.5H16zm3.5 0h1.5v1.5h-1.5zm3.5 0h1.5v1.5h-1.5z"/>
  <path fill="none" stroke="currentColor" stroke-width="0.5" d="M16 20h18M16 22h18M16 24h18M16 26h18"/>
</svg>

`;
    const applicationShape = createBoundedIcon(
      "Application",
      applicationStencilSvg
    );

    const technologyComponentStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="12" width="30" height="6" />
  <rect x="10" y="22" width="30" height="6" />
  <rect x="10" y="32" width="30" height="6" />
</svg>


`;
    const technologyComponentShape = createBoundedIcon(
      "Technology",
      technologyComponentStencilSvg
    );

    const dataObjecttStencilSvg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 50 50"
  stroke="currentColor"
  fill="none"
  stroke-width="0.5"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <!-- Top oval of the database cylinder -->
  <ellipse cx="25" cy="15" rx="15" ry="5" />
  
  <!-- Side lines of the database cylinder -->
  <path d="M 10 15 V 40" />
  <path d="M 40 15 V 40" />
  
  <!-- First middle oval section, creating the top section -->
  <path d="M 10 25 A 15 5 0 0 0 40 25" />
  
  <!-- Second middle oval section, creating the middle section -->
  <path d="M 10 32 A 15 5 0 0 0 40 32" />
  
  <!-- Bottom oval section, creating the bottom section -->
  <path d="M 10 40 A 15 5 0 0 0 40 40 A 15 5 0 0 1 10 40 Z" />
</svg>

`;
    const dataObjecttShape = createBoundedIcon(
      "Database",
      dataObjecttStencilSvg
    );

    const processStencilSvg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 50 50"
  stroke="currentColor"
  fill="none"
  stroke-width="0.5"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <!-- Top line connecting two nodes -->
  <path d="M 15 15 H 35" />
  
  <!-- Left top circle (node) -->
  <circle cx="15" cy="15" r="5" fill="currentColor" fill-opacity="0.4"  />
  
  <!-- Right top circle (node) -->
  <circle cx="35" cy="15" r="5" fill="currentColor" fill-opacity="0.4"  />

  <!-- Curved line from the top left node to the bottom left node -->
  <path d="M 15 15 A 10 10 0 0 0 15 35" />
  
  <!-- Bottom line connecting the left node to the right arrow -->
  <path d="M 15 35 H 35" />
  
  <!-- Left bottom circle (node) -->
  <circle cx="15" cy="35" r="5"  fill="currentColor" fill-opacity="0.4" />
  
  <!-- Right arrow (head) at the bottom, now properly aligned and pointing straight right -->
  <path d="M 35 32 L 40 35 L 35 38" />
</svg>

`;
    const processShape = createBoundedIcon("Process", processStencilSvg);

    const sourceStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="#535965" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Database (cylinder) - back top-left -->
  <ellipse cx="17" cy="9" rx="12" ry="4" fill="currentColor" fill-opacity="0.2"  />

  <path d="M5 9 V25 A12 4 0 0 0 29 25 V9 A12 4 0 0 1 5 9 Z"  fill="currentColor" fill-opacity="0.2" />
   
  <ellipse cx="17" cy="25" rx="12" ry="4" fill="currentColor" fill-opacity="0.2" />
 

  <!-- Document (file) - front bottom-right -->
  <rect x="20" y="20" width="15" height="20" fill="currentColor" fill-opacity="0.4" />
  
  <path d="M30 20 L35 25 L30 25 Z" fill="currentColor" fill-opacity="0.4" />

  <path d="M30 20 L35 25" fill="currentColor" fill-opacity="0.4" />
   
  <path d="M30 25 H35" fill="currentColor" fill-opacity="0.4" />
   
</svg>

`;
    const sourceShape = createBoundedIcon("Source", sourceStencilSvg);

    const targetStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="#535965" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg">
  <!-- Cylinder (database) at the back, bottom-right -->
  <ellipse cx="30" cy="25" rx="12" ry="4" fill="currentColor" fill-opacity="0.4"/>
  
  <path d="M18 25 L18 41 A12 4 0 0 0 42 41 L42 25 A12 4 0 0 1 18 25 Z"  fill="currentColor" fill-opacity="0.4" />
  
  <ellipse cx="30" cy="41" rx="12" ry="4"  fill="currentColor" fill-opacity="0.4"/>
  


  <!-- File (document with folded corner) in front, top-left overlapping cylinder -->
  <path d="M10 10 H25 V30 H10 Z" fill="currentColor" fill-opacity="0.2" />
   
  <path d="M20 10 L25 15 L20 15 Z" fill="currentColor" fill-opacity="0.2" />
  
  <path d="M20 10 L25 15" fill="currentColor" fill-opacity="0.2"  />

  <path d="M20 15 L25 15" fill="currentColor" fill-opacity="0.2"  />

  </svg>

`;
    const targetShape = createBoundedIcon("Target", targetStencilSvg);

    const DataFlowStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5"
     stroke-linecap="round" stroke-linejoin="round">

  <!-- Line segments -->
  <line x1="5" y1="25" x2="18" y2="25" />
  <line x1="20" y1="25" x2="33" y2="25" />
  <line x1="35" y1="25" x2="39" y2="25" />

  <!-- Arrowhead as an outlined triangle -->
  <path d="M39 21 L45 25 L39 29 L39 21 Z" fill="currentColor" fill-opacity="0.4"  />
</svg>

`;
    const DataFlowShape = createBoundedIcon("Data Flow", DataFlowStencilSvg);

    const TransformationStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Square box -->
  <rect x="6" y="19" width="12" height="12" />

  <!-- Arrow shaft -->
  <line x1="18" y1="25" x2="38" y2="25" />

  <!-- Arrowhead -->
  <path d="M32 21 L38 25 L32 29 Z" fill="currentColor" fill-opacity="0.4" />

  <!-- Circle -->
  <circle cx="44" cy="25" r="6" />
</svg>


`;
    const TransformationShape = createBoundedIcon(
      "Transformation",
      TransformationStencilSvg
    );

    const ServerSvg = `<svg width="50" height="50" viewBox="0 0 50 50" 
     xmlns="http://www.w3.org/2000/svg" 
     stroke="currentColor" stroke-width="0.5" 
     fill="none" stroke-linecap="round" stroke-linejoin="round">
  
  <!-- Outer container -->
  <rect x="14" y="10" width="22" height="30" rx="2" ry="2" />

  <!-- Tier dividers -->
  <line x1="16" y1="18" x2="34" y2="18" />
  <line x1="16" y1="26" x2="34" y2="26" />

  <!-- Small port circles on each tier -->
  <circle cx="18" cy="14" r="0.75" />
  <circle cx="18" cy="22" r="0.75" />
  <circle cx="18" cy="30" r="0.75" />

  <!-- Power button / activity light -->
  <circle cx="25" cy="36" r="1.25" />
</svg>


`;
    const ServerShape = createBoundedIcon("Server", ServerSvg);

    const DatabaseSvg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 50 50"
  stroke="currentColor"
  fill="none"
  stroke-width="0.5"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <!-- Top oval of the database cylinder -->
  <ellipse cx="25" cy="15" rx="15" ry="5" />
  
  <!-- Side lines of the database cylinder -->
  <path d="M 10 15 V 40" />
  <path d="M 40 15 V 40" />
  
  <!-- First middle oval section, creating the top section -->
  <path d="M 10 25 A 15 5 0 0 0 40 25" />
  
  <!-- Second middle oval section, creating the middle section -->
  <path d="M 10 32 A 15 5 0 0 0 40 32" />
  
  <!-- Bottom oval section, creating the bottom section -->
  <path d="M 10 40 A 15 5 0 0 0 40 40 A 15 5 0 0 1 10 40 Z" />
</svg>
`;
    const DatabaseShape = createBoundedIcon("Database", DatabaseSvg);

    const informationNodeStencilSvg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 50 50"
  stroke="currentColor"
  fill="none"
  stroke-width="0.5"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <!-- Main document body -->
  <path d="M 10 5 H 30 L 40 15 V 45 H 10 Z" />
  
  <!-- Folded corner of the document -->
  <path d="M 30 5 L 40 15" />
  
  <!-- Lines inside the document -->
  <path d="M 15 20 H 35" />
  <path d="M 15 25 H 35" />
  <path d="M 15 30 H 35" />

  <!-- "i" icon circle -->
  <circle cx="35" cy="35" r="10" fill="currentColor" fill-opacity="0.4"  />

  <!-- "i" icon dot -->
  <circle cx="35" cy="30" r="1.5"/>
  
  <!-- "i" icon line -->
  <path d="M 35 34 V 40" />
</svg>

`;
    const XMLShape = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5"
     stroke-linecap="round" stroke-linejoin="round">
  <!-- Document with folded corner -->
  <path d="M15 10 H30 L35 15 V40 H15 Z" />
  <path d="M30 10 V15 H35" />
  <path d="M30 10 L35 15 L30 15" />

  <text x="25" y="32" font-family="Arial, sans-serif" font-size="6" text-anchor="middle" fill="currentColor">XML</text>
</svg>


`;
    const xmlShape = createBoundedIcon("XML", XMLShape);

    const BusinessProcessSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="0.5">
  <!-- Bars -->
  <rect x="10" y="32" width="5" height="8" rx="0.5" ry="0.5"/>
  <rect x="17" y="28" width="5" height="12" rx="0.5" ry="0.5"/>
  <rect x="24" y="24" width="5" height="16" rx="0.5" ry="0.5"/>
  <rect x="31" y="20" width="5" height="20" rx="0.5" ry="0.5"/>

  <!-- Diagonal Line -->
  <line x1="10" y1="20" x2="36" y2="8"/>

  <!-- Exaggerated Arrowhead Rotation -->
  <path d="M36 8 L33 12 L30 7 Z" fill="currentColor" fill-opacity="0.4" />
  

</svg>
`;
    const businessProcessShape = createBoundedIcon(
      "Business Process",
      BusinessProcessSvg
    );

    const replicationSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.5">
  <!-- Dotted Grid -->
  <g transform="translate(7, 12)">
    <circle cx="2" cy="2" r="0.6" />
    <circle cx="6" cy="2" r="0.6" />
    <circle cx="10" cy="2" r="0.6" />
    <circle cx="14" cy="2" r="0.6" />

    <circle cx="2" cy="6" r="0.6" />
    <circle cx="6" cy="6" r="0.6" />
    <circle cx="10" cy="6" r="0.6" />
    <circle cx="14" cy="6" r="0.6" />

    <circle cx="2" cy="10" r="0.6" />
    <circle cx="6" cy="10" r="0.6" />
    <circle cx="10" cy="10" r="0.6" />
    <circle cx="14" cy="10" r="0.6" />
  </g>

  <!-- Outer square with folded corner -->
  <path d="M7 7 H28 L33 12 V30 H7 V7 Z" />
  <path d="M28 7 V12 H33" />

  <!-- Circles and connecting lines -->
  <circle cx="28" cy="28" r="2.5" />
  <circle cx="37" cy="20" r="2.5" />
  <circle cx="37" cy="36" r="2.5" />

  <line x1="28" y1="28" x2="37" y2="20" />
  <line x1="28" y1="28" x2="37" y2="36" />
</svg>


`;
    const replicationShape = createBoundedIcon("Replication", replicationSvg);

    const ReplicationServerSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     fill="none" xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" stroke-width="0.5"
     stroke-linecap="round" stroke-linejoin="round">
  
  <!-- Top server rectangle -->
  <rect x="10" y="6" width="30" height="12" rx="2"/>

  <!-- Top server indicators -->
  <line x1="17" y1="11" x2="17" y2="13"/>
  <line x1="23" y1="11" x2="23" y2="13"/>
  <line x1="29" y1="11" x2="29" y2="13"/>

  <!-- Bottom server rectangle -->
  <rect x="10" y="32" width="30" height="12" rx="2"/>

  <!-- Bottom server indicators -->
  <line x1="17" y1="37" x2="17" y2="39"/>
  <line x1="23" y1="37" x2="23" y2="39"/>
  <line x1="29" y1="37" x2="29" y2="39"/>

  <!-- Downward arrow from top server -->
  <path d="M25 18 V23 H15 V28"/>
  <path d="M13 26 L15 28 L17 26"/>

  <!-- Upward arrow from bottom server -->
  <path d="M25 32 V27 H35 V22"/>
  <path d="M33 24 L35 22 L37 24"/>

</svg>

`;
    const ReplicationServerShape = createBoundedIcon(
      "Replication Server",
      ReplicationServerSvg
    );
    const TransformationProcessSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1">
  <!-- Gear circle -->
  <circle cx="25" cy="25" r="8" />
  <!-- Teeth -->
  <line x1="25" y1="15" x2="25" y2="12" />
  <line x1="25" y1="35" x2="25" y2="38" />
  <line x1="15" y1="25" x2="12" y2="25" />
  <line x1="35" y1="25" x2="38" y2="25" />
  
  <!-- Incoming arrow left -->
  <line x1="5" y1="25" x2="12" y2="25" />
  <polygon points="12,25 9.5,23.5 9.5,26.5" fill="currentColor" fill-opacity="0.4"  />
  
  <!-- Outgoing arrow right -->
  <line x1="38" y1="25" x2="45" y2="25" />
  <polygon points="45,25 42.5,23.5 42.5,26.5" fill="currentColor" fill-opacity="0.4"  />
</svg>
`;
    const TransformationProcessShape = createBoundedIcon(
      "Transformation Process",
      TransformationProcessSvg
    );

    const ConnectionSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5"
     stroke-linecap="round" stroke-linejoin="round">
  <!-- Left Node (outlined circle) -->
  <circle cx="15" cy="25" r="4" fill="currentColor" fill-opacity="0.4" />
  

  <!-- Right Node (outlined circle) -->
  <circle cx="35" cy="25" r="4" fill="currentColor" fill-opacity="0.4" />
   

  <!-- Connecting Line -->
  <line x1="19" y1="25" x2="31" y2="25" />
</svg>

`;
    const ConnectionShape = createBoundedIcon("Connection", ConnectionSvg);

    const informationNodeShape = createBoundedIcon(
      "Information",
      informationNodeStencilSvg
    );
    const inputStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" 
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" stroke-width="0.5" fill="none" 
     stroke-linecap="round" stroke-linejoin="round">
  <!-- Horizontal base line -->
  <path d="M5 25 L25 25" />
  
  <!-- Diagonal connector / arrow -->
  <path d="M20 20 L25 25 L20 30" />

  <!-- Box shape (like a node or data object) -->
  <path d="M15 15 H35 V35 H15 Z M15 15 V35" />
</svg>

`;
    const inputShape = createBoundedIcon("Input", inputStencilSvg);

    const printSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Printer body -->
  <rect x="10" y="20" width="30" height="15" rx="2" ry="2"
        stroke="currentColor" fill="none" stroke-width="0.5"/>

  <!-- Paper tray -->
  <rect x="15" y="10" width="20" height="8" rx="1" ry="1"
        stroke="currentColor" fill="none" stroke-width="0.5"/>

  <!-- Printed paper -->
  <rect x="15" y="35" width="20" height="8" rx="1" ry="1"
        stroke="currentColor" fill="none" stroke-width="0.5"/>

  <!-- Lines on printed paper -->
  <line x1="17" y1="37" x2="33" y2="37"
        stroke="currentColor" stroke-width="0.5" stroke-linecap="round"/>
  <line x1="17" y1="39" x2="33" y2="39"
        stroke="currentColor" stroke-width="0.5" stroke-linecap="round"/>
  <line x1="17" y1="41" x2="30" y2="41"
        stroke="currentColor" stroke-width="0.5" stroke-linecap="round"/>

  <!-- Small circle on printer body (indicator light) -->
  <circle cx="37" cy="23" r="1"
          stroke="currentColor" fill="currentColor" stroke-width="0.5"/>
</svg>


`;
    const printShape = createBoundedIcon("Print", printSvg);

    const StoreSvg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 50 50"
  stroke="currentColor"
  fill="none"
  stroke-width="0.5"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <!-- Top oval of the database cylinder -->
  <ellipse cx="25" cy="15" rx="15" ry="5" />
  
  <!-- Side lines of the database cylinder -->
  <path d="M 10 15 V 40" />
  <path d="M 40 15 V 40" />
  
  <!-- First middle oval section, creating the top section -->
  <path d="M 10 25 A 15 5 0 0 0 40 25" />
  
  <!-- Second middle oval section, creating the middle section -->
  <path d="M 10 32 A 15 5 0 0 0 40 32" />
  
  <!-- Bottom oval section, creating the bottom section -->
  <path d="M 10 40 A 15 5 0 0 0 40 40 A 15 5 0 0 1 10 40 Z" />
</svg>


`;
    const StoreShape = createBoundedIcon("Store", StoreSvg);

    const ManageSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     stroke="#535965" stroke-width="1" fill="none">

  <!-- Folder (Manage icon) in front -->
  <path d="M12 20 H34 L38 24 H44 V38 H12 Z" fill="currentColor" fill-opacity="0.4" />

  <!-- File inside the folder, moved up -->
  <path d="M16 13 H30 L34 17 V29 H16 Z M30 13 V17 H34" />
</svg>



`;
    const ManageShape = createBoundedIcon("Manage", ManageSvg);

    const secureSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     fill="none" xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" stroke-width="0.5"
     stroke-linecap="round" stroke-linejoin="round">

  <!-- Proper shield outline with a pointed bottom -->
  <path d="M25 5 L40 12 V24 C40 33 33 42 25 45 C17 42 10 33 10 24 V12 L25 5 Z" />

  <!-- Lock body -->
  <rect x="19" y="22" width="12" height="10" rx="2" />

  <!-- Lock shackle -->
  <path d="M21 22 V20 A4 4 0 0 1 29 20 V22" />

  <!-- Lock keyhole -->
  <circle cx="25" cy="27" r="0.5" />
  <line x1="25" y1="27.5" x2="25" y2="29" />

</svg>


`;

    const secureShape = createBoundedIcon("Secure", secureSvg);

    const paperdestroySvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" stroke-width="0.5" fill="none">

  <!-- Shredder body -->
  <rect x="5" y="15" width="40" height="5" rx="1" ry="1"/>
  <path d="M10 15 C10 12, 13 10, 16 10 H34 C37 10, 40 12, 40 15 Z" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M18 2 L18 10 A2 2 0 0 0 20 12 H30 A2 2 0 0 0 32 10 L32 2 Z" stroke-linejoin="round"/>
  <path d="M20 5 H30" stroke-linecap="round"/>
  <path d="M20 8 H30" stroke-linecap="round"/>

  <!-- Shred lines -->
  <line x1="7" y1="20" x2="7" y2="25" />
  <line x1="10" y1="20" x2="10" y2="26" />
  <line x1="13" y1="20" x2="13" y2="27" />
  <line x1="16" y1="20" x2="16" y2="25" />
  <line x1="19" y1="20" x2="19" y2="26" />
  <line x1="22" y1="20" x2="22" y2="27" />
  <line x1="25" y1="20" x2="25" y2="25" />
  <line x1="28" y1="20" x2="28" y2="26" />
  <line x1="31" y1="20" x2="31" y2="27" />
  <line x1="34" y1="20" x2="34" y2="25" />
  <line x1="37" y1="20" x2="37" y2="26" />
  <line x1="40" y1="20" x2="40" y2="27" />
</svg>


`;
    const shredShape = createBoundedIcon("Shred", paperdestroySvg);

    const flowStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" stroke-width="0.5" fill="none">

  <!-- Horizontal line -->
  <line x1="12.5" y1="25" x2="43.75" y2="25"/>

  <!-- Arrowhead -->
  <path d="M38.75 22 L43.75 25 L38.75 28 Z" fill="currentColor" fill-opacity="0.4" />
</svg>


`;
    const flowShape = createBoundedIcon("Flow", flowStencilSvg);

    const AccessPointSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" stroke-width="0.5" fill="none">

  <!-- Outer rectangle (scaled) -->
  <rect x="14.29" y="10.71" width="21.43" height="10.71"/>

  <!-- Central circle -->
 
   <circle cx="25" cy="25" r="3.21" fill="currentColor" fill-opacity="0.4" />

  <!-- Downward line -->
  <line x1="25" y1="28.21" x2="25" y2="35" stroke-linecap="round"/>
</svg>

`;
    const AccessPoint = createBoundedIcon("Access Point", AccessPointSvg);

    const RepositorySvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Database Cylinder -->
  <!-- Top ellipse of the database -->
  <ellipse cx="15" cy="12" rx="8" ry="3" stroke="currentColor" fill="none" stroke-width="0.5"/>
  <!-- Middle ellipse of the database -->
  <ellipse cx="15" cy="22" rx="8" ry="3" stroke="currentColor" fill="none" stroke-width="0.5"/>
  <!-- Bottom ellipse of the database -->
  <ellipse cx="15" cy="32" rx="8" ry="3" stroke="currentColor" fill="none" stroke-width="0.5"/>
  <!-- Left vertical line of the database -->
  <line x1="7" y1="12" x2="7" y2="32" stroke="currentColor" stroke-width="0.5"/>
  <!-- Right vertical line of the database -->
  <line x1="23" y1="12" x2="23" y2="32" stroke="currentColor" stroke-width="0.5"/>

  <!-- Folder 1 -->
  <path d="M28 10 H32 L33 12 H43 V18 H28 Z"
        stroke="currentColor" fill="none" stroke-width="0.5"/>

  <!-- Folder 2 -->
  <path d="M28 20 H32 L33 22 H43 V28 H28 Z"
        stroke="currentColor" fill="none" stroke-width="0.5"/>

  <!-- Folder 3 -->
  <path d="M28 30 H32 L33 32 H43 V38 H28 Z"
        stroke="currentColor" fill="none" stroke-width="0.5"/>

  <!-- Connecting dotted lines -->
  <line x1="23" y1="12" x2="28" y2="14" stroke="currentColor" stroke-width="0.5" stroke-dasharray="1 1"/>
  <line x1="23" y1="22" x2="28" y2="24" stroke="currentColor" stroke-width="0.5" stroke-dasharray="1 1"/>
  <line x1="23" y1="32" x2="28" y2="34" stroke="currentColor" stroke-width="0.5" stroke-dasharray="1 1"/>
</svg>


`;
    const Repository = createBoundedIcon("Repository", RepositorySvg);

    const impactNodeStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" 
     xmlns="http://www.w3.org/2000/svg" 
     fill="none" stroke="currentColor" stroke-width="0.5">
  <path d="M32.5 10 L25 27.5 L35 22.5 L27.5 37.5 
           C22.5 47.5 10 45 7.5 32.5 
           C5 20 17.5 15 17.5 15 Z"/>
</svg>



`;
    const impactNodeShape = createBoundedIcon("Impact", impactNodeStencilSvg);

    const changeEventStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Calendar body -->
  <rect x="10" y="15" width="30" height="25" rx="3" ry="3"
        stroke="currentColor" fill="none" stroke-width="0.5"/>

  <!-- Top bar of the calendar -->
  <line x1="10" y1="20" x2="40" y2="20"
        stroke="currentColor" stroke-width="0.5"/>

  <!-- Top left peg -->
  <line x1="17" y1="10" x2="17" y2="15"
        stroke="currentColor" stroke-width="0.5" stroke-linecap="round"/>
  <line x1="14" y1="10" x2="20" y2="10"
        stroke="currentColor" stroke-width="0.5" stroke-linecap="round"/>

  <!-- Top right peg -->
  <line x1="33" y1="10" x2="33" y2="15"
        stroke="currentColor" stroke-width="0.5" stroke-linecap="round"/>
  <line x1="30" y1="10" x2="36" y2="10"
        stroke="currentColor" stroke-width="0.5" stroke-linecap="round"/>
</svg>
`;
    const changeEventShape = createBoundedIcon(
      "Change Event",
      changeEventStencilSvg
    );

    const riskEffectStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer triangle shape -->
  <path d="M25 5 L45 45 L5 45 Z"
        stroke="currentColor" fill="none" stroke-width="0.5"/>

  <!-- Exclamation mark body -->
  <line x1="25" y1="18" x2="25" y2="30"
        stroke="currentColor" stroke-width="0.5" stroke-linecap="round"/>

  <!-- Exclamation mark dot -->
  <circle cx="25" cy="35" r="1.5"
          stroke="currentColor" fill="currentColor" stroke-width="0.5"/>
</svg>

`;
    const riskEffectShape = createBoundedIcon(
      "Risk/Effect",
      riskEffectStencilSvg
    );

    const causeEffectLinkStencilSvg = `<svg width="200" height="200" viewBox="0 0 200 200"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="black" stroke-width="2">
  
  <!-- Triangle -->
  <polygon points="30,30 45,60 15,60" fill="currentColor" fill-opacity="0.4"/>
  <!-- Square -->
  <rect x="15" y="85" width="30" height="30" fill="currentColor" fill-opacity="0.4"/>
  <!-- Circle -->
  <circle cx="30" cy="150" r="15" fill="currentColor" fill-opacity="0.4"/>
  
  <!-- Arrows -->
  <line x1="60" y1="50" x2="120" y2="50" stroke="black" stroke-width="4"/>
  <polygon points="120,45 130,50 120,55" fill="currentColor" fill-opacity="0.4"/>
  
  <line x1="60" y1="100" x2="120" y2="100" stroke="black" stroke-width="4"/>
  <polygon points="120,95 130,100 120,105" fill="currentColor" fill-opacity="0.4"/>
  
  <line x1="60" y1="150" x2="120" y2="150" stroke="black" stroke-width="4"/>
  <polygon points="120,145 130,150 120,155" fill="currentColor" fill-opacity="0.4"/>

  <!-- Question Marks -->
  <text x="140" y="55" font-size="28" font-family="Arial" fill="currentColor" fill-opacity="0.4">?</text>
  <text x="140" y="105" font-size="28" font-family="Arial" fill="currentColor" fill-opacity="0.4">?</text>
  <text x="140" y="155" font-size="28" font-family="Arial" fill="currentColor" fill-opacity="0.4">?</text>
</svg>


`;
    const causeEffectLinkShape = createBoundedIcon(
      "Cause-Effect Link",
      causeEffectLinkStencilSvg
    );

    const mitigationStrategyStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Warning triangle -->
  <path d="M25 5 L40 30 L10 30 Z"
        stroke="currentColor" fill="none" stroke-width="0.5"/>
  <line x1="25" y1="12" x2="25" y2="22"
        stroke="currentColor" stroke-width="0.5" stroke-linecap="round"/>
  <circle cx="25" cy="26" r="1.5"
          stroke="currentColor" fill="currentColor" stroke-width="0.5"/>

  <!-- Top connecting line -->
  <line x1="25" y1="30" x2="25" y2="35"
        stroke="currentColor" stroke-width="0.5"/>

  <!-- Horizontal connecting line -->
  <line x1="10" y1="35" x2="40" y2="35"
        stroke="currentColor" stroke-width="0.5"/>

  <!-- Left square node -->
  <rect x="8" y="38" width="8" height="8" rx="2" ry="2"
        stroke="currentColor" fill="none" stroke-width="0.5"/>
  <line x1="12" y1="35" x2="12" y2="38"
        stroke="currentColor" stroke-width="0.5"/>

  <!-- Middle square node -->
  <rect x="21" y="38" width="8" height="8" rx="2" ry="2"
        stroke="currentColor" fill="none" stroke-width="0.5"/>
  <line x1="25" y1="35" x2="25" y2="38"
        stroke="currentColor" stroke-width="0.5"/>

  <!-- Right square node -->
  <rect x="34" y="38" width="8" height="8" rx="2" ry="2"
        stroke="currentColor" fill="none" stroke-width="0.5"/>
  <line x1="38" y1="35" x2="38" y2="38"
        stroke="currentColor" stroke-width="0.5"/>
</svg>

`;
    const mitigationStrategyShape = createBoundedIcon(
      "Mitigation",
      mitigationStrategyStencilSvg
    );

    const matrixStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer square border -->
  <rect x="12" y="12" width="26" height="26" rx="3" ry="3"
        stroke="currentColor" fill="none" stroke-width="0.5"/>
  
  <!-- Inner dividing lines -->
  <line x1="25" y1="12" x2="25" y2="38"
        stroke="currentColor" stroke-width="0.5"/>
  <line x1="12" y1="25" x2="38" y2="25"
        stroke="currentColor" stroke-width="0.5"/>

  <!-- Top-left circle -->
  <circle cx="18.5" cy="18.5" r="2.5"
          stroke="currentColor" fill="currentColor" fill-opacity="0.4" />
  
  <!-- Bottom-left circle -->
  <circle cx="18.5" cy="31.5" r="2.5"
          stroke="currentColor" fill="currentColor" fill-opacity="0.4" />
  
  <!-- Bottom-right circle -->
  <circle cx="31.5" cy="31.5" r="2.5"
          stroke="currentColor" fill="currentColor" fill-opacity="0.4" />
</svg>
`;
    const matrixShape = createBoundedIcon("Matrix", matrixStencilSvg);

    const entitySvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer rounded rectangle (table frame) -->
  <rect x="7" y="10" width="36" height="30" rx="3" />
  <!-- Horizontal divider for header -->
  <line x1="7" y1="18" x2="43" y2="18" />
</svg>



`;
    const entityShape = createBoundedIcon("Entity", entitySvg);

    const DependencyLinkSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg">
  <line x1="5" y1="25" x2="45" y2="25"/>
  <path d="M40 20 L45 25 L40 30 Z" fill="currentColor" fill-opacity="0.4" />

</svg>

`;
    const DependencyLinkShape = createBoundedIcon(
      "Dependency Link",
      DependencyLinkSvg
    );
    const packageSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg">
  <!-- Main server body -->
  <rect x="4" y="14" width="42" height="30" rx="2" ry="2"/>
  
  <!-- Header / label slot -->
  <rect x="4" y="10" width="15" height="5"/>
  
  <!-- Lights / slots -->
  <rect x="12" y="24" width="4" height="6"/>
  <rect x="22" y="30" width="4" height="6"/>
  <rect x="32" y="24" width="4" height="6"/>
</svg>
`;
    const packagelinkShape = createBoundedIcon("Package", packageSvg);

    const PackageSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg">
  <!-- Main server body -->
  <rect x="4" y="14" width="42" height="30" rx="2" ry="2"/>
  
  <!-- Header / label slot -->
  <rect x="4" y="10" width="15" height="5"/>
  
  <!-- Lights / slots -->
  <rect x="12" y="24" width="4" height="6"/>
  <rect x="22" y="30" width="4" height="6"/>
  <rect x="32" y="24" width="4" height="6"/>
</svg>

`;
    const PackagelinkShape = createBoundedIcon("Package", PackageSvg);

    const ViewSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer square -->
  <rect x="6" y="6" width="38" height="38"/>

  <!-- Horizontal grid lines -->
  <line x1="6" y1="16" x2="44" y2="16"/>
  <line x1="6" y1="25" x2="44" y2="25"/>
  <line x1="6" y1="34" x2="44" y2="34"/>

  <!-- Vertical grid lines -->
  <line x1="16" y1="6" x2="16" y2="44"/>
  <line x1="25" y1="6" x2="25" y2="44"/>
  <line x1="34" y1="6" x2="34" y2="44"/>

  <!-- Tab-like top shape -->
  <path d="M6 6 H44 L40 3 H10 Z"/>
</svg>

`;
    const ViewShape = createBoundedIcon("View", ViewSvg);

    const ReferenceSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg">
  <!-- Left square -->
  <rect x="8" y="8" width="10" height="10" rx="1"/>

  <!-- Right square -->
  <rect x="32" y="32" width="10" height="10" rx="1"/>

  <!-- Curved connector ending just before the square -->
  <path d="M13 18 C13 30, 37 20, 37 31.5"/>

  <!-- Arrowhead pointing exactly at top center of the square -->
  <path d="M36 30 L38 30 L37 31.5 Z" fill="currentColor" fill-opacity="0.4" />
  <path d="M36 30 L38 30 L37 31.5 Z"/>
</svg>

`;
    const ReferenceShape = createBoundedIcon("Reference", ReferenceSvg);

    //need fix this Procedure
    const ProcedureSvg = `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Gear outer path -->
  <path d="M34.39 20.68l-3.064-.614a15.1 15.1 0 0 0-.537-1.289l1.736-2.604a1.778 1.778 0 0 0-.25-2.523l-1.924-1.924a1.778 1.778 0 0 0-2.523-.25l-2.604 1.735a15.1 15.1 0 0 0-1.291-.536L23.32 9.61a1.778 1.778 0 0 0-1.961-1.608h-2.72a1.778 1.778 0 0 0-1.961 1.608l-.614 3.065a15.1 15.1 0 0 0-1.289.536L12.17 11.476a1.778 1.778 0 0 0-2.11-.336l-1.924 1.924a1.778 1.778 0 0 0-.25 2.523l1.735 2.604a15.1 15.1 0 0 0-.536 1.29L5.608 20.68A1.778 1.778 0 0 0 4 22.641v2.72c0 .953.673 1.775 1.608 1.961l3.065.615a15.1 15.1 0 0 0 .536 1.289L7.475 31.83a1.778 1.778 0 0 0 .25 2.523l1.924 1.924a1.778 1.778 0 0 0 2.523.25l2.604-1.736a15.1 15.1 0 0 0 1.29.537l.613 3.064a1.778 1.778 0 0 0 1.961 1.609h2.72a1.778 1.778 0 0 0 1.961-1.609l.615-3.064a15.1 15.1 0 0 0 1.289-.537l2.604 1.736a1.778 1.778 0 0 0 2.523-.25l1.924-1.924a1.778 1.778 0 0 0 .25-2.523l-1.736-2.604a15.1 15.1 0 0 0 .537-1.291l3.064-.613A1.778 1.778 0 0 0 36 25.361v-2.72a1.778 1.778 0 0 0-1.61-1.961z"/>
  
  <!-- Mid ring -->
  <path d="M20 17c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm0 13.13c-3.38 0-6.13-2.75-6.13-6.13s2.75-6.13 6.13-6.13 6.13 2.75 6.13 6.13-2.75 6.13-6.13 6.13z"/>

  <!-- Inner ring -->
  <path d="M20 20a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
</svg>

`;
    const ProcedureShape = createBoundedIcon("Procedure", ProcedureSvg);
    const FileIconSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5">
  <!-- Folder body -->
  <rect x="10" y="15" width="30" height="25" rx="2" ry="2" />
  
  <!-- Folder tab -->
  <path d="M10 15 V12 C10 10.9 10.9 10 12 10 H20 C20.6 10 21.1 10.3 21.5 10.8 L24 14 H38 C39.1 14 40 14.9 40 16 V15" />
  <line x1="10" y1="15" x2="40" y2="15" />
</svg>


`;
    const FileIconShape = createBoundedIcon("File", FileIconSvg);

    const portSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg">
  <!-- Center cube -->
  <rect x="20" y="20" width="10" height="10" />
  
  <!-- Left line -->
  <line x1="5" y1="25" x2="20" y2="25" />
  
  <!-- Right line -->
  <line x1="30" y1="25" x2="45" y2="25" />
</svg>

`;
    const portShape = createBoundedIcon("Port", portSvg);
    //Important
    const generalizationSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg">
  <polygon points="25,10 17,28 33,28"/>
  <line x1="25" y1="28" x2="25" y2="40"/>
</svg>

`;
    const generalizationShape = createBoundedIcon(
      "Generalization",
      generalizationSvg
    );
    const aggregationSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Resized, centered diamond -->
 
  <path d="M12 25L20 17L28 25L20 33Z" />
  <!-- Extended line -->
  <line x1="28" y1="25" x2="48" y2="25" />
</svg>

`;
    const aggregationShape = createBoundedIcon("Aggregation", aggregationSvg);

    const compositionSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Resized, centered diamond -->
  <path d="M12 25L20 17L28 25L20 33Z" fill="currentColor" fill-opacity="0.4" />
  
  <!-- Extended line -->
  <line x1="28" y1="25" x2="48" y2="25" />
</svg>


`;
    const compositionShape = createBoundedIcon("Composition", compositionSvg);
    const dependencySvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 25h34" stroke-dasharray="2 1"/>
  <path d="M38 21l4 4-4 4"/>
</svg>



`;
    const dependencyShape = createBoundedIcon("Dependency", dependencySvg);

    stencil.load({
      mindMap: [topicShape, subtopicShape, noteShape, linkShape],
      businessProcess: [
        startEventShape,
        taskActivityShape,
        gatewayShape,
        endEventShape,
        sequenceFlowShape,
        SubProcessShape,
        TransactionShape,
        CallActivityShape,
        ExclusiveGatewayShape,
        EventGatewayShape,
        ParallelGatewayShape,
        MessageFlowShape,
        AssociationShape,
      ],
      requirementsModel: [
        requirementShape,
        usecaseShape,
        linkShape,
        ActorShape,
        stakeholderShape,
        goalShape,
      ],
      conceptualDataModel: [
        EntityShape,
        InheritanceShape,
        onetoNShape,
        NtoNShape,
        onetooneShape,
        anchorlinkShape,
      ],
      physicalDataModel: [
        TableShape,
        packagelinkShape,
        ViewShape,
        ReferenceShape,
        ProcedureShape,
        FileIconShape,
      ],
      logicalDataModel: [
        EntitystencilShape,
        InheritanceLDMShape,
        OneToOneShape,
        OneToNShape,
        ntonShape,
      ],
      objectOrientedModel: [
        classShape,
        interfaceShape,
        enumShape,
        PackagestencilShape,
        portShape,
        generalizationShape,
        associationShape,
        aggregationShape,
        compositionShape,
        dependencyShape,
        // RelationshipShape,
      ],
      multidimensionalModel: [cubeShape, dimensionShape, measureShape],
      processHierarchyModel: [
        processNodeShape,
        subprocessNodeShape,
        activityNodeShape,
      ],
      freeModel: [
        freeNodeShape,
        freeGroupShape,
        linkShape,
        noteShape,
        titleboxShape,
      ],

      organizationalChartModel: [
        organizationShape,
        departmentShape,
        roleShape,
        positionShape,
        reportingLineShape,
        groupShape,
      ],
      enterpriseArchitectureModel: [
        businessCapabilityShape,
        applicationShape,
        technologyComponentShape,
        dataObjecttShape,
        processShape,
        connectorLineShape,
      ],
      dataMovementModel: [
        sourceShape,
        targetShape,
        DataFlowShape,
        ServerShape,
        DatabaseShape,
        xmlShape,
        businessProcessShape,
        replicationShape,
        ReplicationServerShape,

        ConnectionShape,
        PackagelinkShape,
        TransformationShape,
      ],
      informationLifecycleManagement: [
        informationNodeShape,
        inputShape,
        printShape,
        StoreShape,
        ManageShape,
        secureShape,
        shredShape,
        flowShape,
        AccessPoint,
        Repository,
        annotationShape,
      ],
      impactAnalysisModel: [
        impactNodeShape,
        changeEventShape,
        riskEffectShape,
        causeEffectLinkShape,
        mitigationStrategyShape,
      ],
      dependencyPropagationModel: [
        matrixShape,
        entityShape,
        DependencyLinkShape,
      ],
    });
    stencil.load({ complex: allElements });
    stencilInstanceRef.current = stencil;

    return () => {
      stencilInstanceRef.current?.remove();
      stencilInstanceRef.current = null;
    };
  }, [paper, graph, expandedGroups]);

  return (
    <div
      style={{
        position: "absolute",
        top: "50px",
        left: 0,
        height: "calc(100% - 50px)",
        display: "flex",
        alignItems: "flex-start",
        zIndex: 10,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "240px",
          height: "100%",
          transition: "transform 0.3s ease-in-out",
          transform: isPanelHidden ? "translateX(-100%)" : "translateX(0)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: "240px",
            height: "100%",
            borderRight: "1px solid var(--stencil-border)",
            backgroundColor: "var(--stencil-bg)",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              padding: "10px",
              borderBottom: "1px solid var(--stencil-border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "bold" }}>
              Explorer
            </h3>
            <button
              onClick={toggleCollapse}
              style={{
                background: "none",
                border: "1px solid var(--toolbar-border)",
                borderRadius: "4px",
                cursor: "pointer",
                padding: "2px",
                width: "30px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={isPanelCollapsed ? iconExpand : iconCollapse}
                alt={isPanelCollapsed ? "Expand" : "Collapse"}
                width="18"
                height="18"
              />
            </button>
          </div>

          <div
            ref={contentRef}
            style={{
              height: isPanelCollapsed ? 0 : "calc(100% - 92px)",
              overflow: "hidden",
              transition: "height 0.3s ease-in-out",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flex: 1, overflowY: "auto" }}>
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                {/* Project Folders */}
                <div>
                  <button
                    onClick={() => handleSectionClick("folders")}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: "var(--stencil-bg)",
                      border: "1px solid var(--stencil-border)",
                      borderRadius: "4px",
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>📁 Project Folders</span>
                    <span>{openSection === "folders" ? "▲" : "▼"}</span>
                  </button>
                  {openSection === "folders" && (
                    <div
                      style={{
                        padding: "10px",
                        fontSize: "14px",
                        border: "1px solid var(--stencil-border)",
                        borderTop: "none",
                        borderRadius: "0 0 4px 4px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "8px" }}>
                        <input
                          type="text"
                          value={newFolderName}
                          onChange={(e) => setNewFolderName(e.target.value)}
                          placeholder="New folder name"
                          style={{
                            flex: 1,
                            padding: "6px 10px",
                            fontSize: "14px",
                            borderRadius: "4px",
                            border: "1px solid var(--stencil-border)",
                          }}
                        />
                        <button
                          onClick={addFolder}
                          style={{
                            backgroundColor: "#2563eb",
                            color: "#fff",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                          }}
                        >
                          Add
                        </button>
                      </div>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {folderNames.map((name, i) => (
                          <li
                            key={i}
                            style={{
                              backgroundColor: "#f0f4ff",
                              padding: "6px 10px",
                              borderRadius: "4px",
                              fontSize: "14px",
                              color: "#1e40af",
                            }}
                          >
                            📁 {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Stencil Section */}
                <div>
                  <button
                    onClick={() => handleSectionClick("stencil")}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: "var(--stencil-bg)",
                      border: "1px solid var(--stencil-border)",
                      borderRadius: "4px",
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>🛠️ Tools Stencil</span>
                    <span>{openSection === "stencil" ? "▲" : "▼"}</span>
                  </button>
                  {openSection === "stencil" && (
                    <div
                      style={{
                        border: "1px solid var(--stencil-border)",
                        borderTop: "none",
                        borderRadius: "0 0 4px 4px",
                        padding: "10px",
                      }}
                    >
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <h2 className="text-lg font-semibold mb-3 text-blue-800">
                          Element Palette
                        </h2>
                        <p className="text-sm text-blue-600 mb-3">
                          Drag elements from the palette to the canvas
                        </p>
                        <div
                          ref={stencilContainerRef}
                          className="stencil-container"
                          style={{
                            minHeight: "400px",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            backgroundColor: "#ffffff",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={toggleSlide}
        style={{
          marginLeft: isPanelHidden ? "-250px" : "-16px",
          width: "32px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 20,
        }}
      >
        <img
          src={iconSlide}
          alt="Toggle Panel"
          width="16"
          height="16"
          style={{
            transform: isPanelHidden ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease-in-out",
          }}
        />
      </div>
    </div>
  );
};

export default Stencil;
