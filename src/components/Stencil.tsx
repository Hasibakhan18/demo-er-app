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
      <path d="M0,0 L8,3 L0,6 Z" fill="black" />
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
          const newSvg = `<svg width="150" height="80" viewBox="0 0 150 80" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="75" cy="40" rx="70" ry="35" stroke="black" stroke-width="1" fill="white"/><text x="75" y="45" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle" fill="black">Use Case Name</text></svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(150, 80);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Requirement") {
          const newSvg = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 10 L80 10 L80 90 L10 90 Z" stroke="black" stroke-width="1" fill="white"/><polyline points="80,10 80,25 65,25 65,10 80,10" fill="#E0E0E0" stroke="black" stroke-width="1"/><line x1="20" y1="30" x2="70" y2="30" stroke="gray" stroke-width="1"/><line x1="20" y1="45" x2="60" y2="45" stroke="gray" stroke-width="1"/><line x1="20" y1="60" x2="70" y2="60" stroke="gray" stroke-width="1"/><line x1="20" y1="75" x2="50" y2="75" stroke="gray" stroke-width="1"/><text x="15" y="20" font-family="Arial" font-size="14" font-weight="bold" fill="black">R</text></svg>`;
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
          const newSvg = `<svg width="150" height="80" viewBox="0 0 150 80" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="75" cy="40" rx="70" ry="35" stroke="black" stroke-width="1" fill="white"/><text x="75" y="45" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle" fill="black">Use Case Name</text></svg>`;
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
    <rect x="0.5" y="0.5" width="99" height="59" rx="8" fill="transparent" stroke="#007B8C" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="transparent" stroke="#007B8C" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="69" height="39" rx="3" fill="transparent" stroke="#007B8C" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="59" height="29" rx="2" fill="transparent" stroke="#007B8C" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="119" height="79" rx="10" fill="transparent" stroke="#6C757D" stroke-width="1" stroke-dasharray="5 5"/>
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
    <rect x="0.5" y="0.5" width="99" height="59" rx="8" fill="transparent" stroke="#28A745" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="transparent" stroke="#28A745" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="69" height="39" rx="3" fill="transparent" stroke="#28A745" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="59" height="29" rx="2" fill="transparent" stroke="#28A745" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="69" height="39" rx="5" fill="transparent" stroke="#28A745" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="transparent" stroke="#007BFF" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="transparent" stroke="#007BFF" stroke-width="1"/>
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
    <path d="M10 25 C60 10 140 40 190 25" stroke="#007BFF" stroke-width="1" fill="transparent"/>
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
    <rect x="0.5" y="0.5" width="69" height="39" rx="3" fill="transparent" stroke="#007BFF" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="transparent" stroke="#6F42C1" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="69" height="39" rx="3" fill="transparent" stroke="#6F42C1" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="transparent" stroke="#6F42C1" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="transparent" stroke="#DC3545" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="transparent" stroke="#DC3545" stroke-width="1"/>
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
    <polygon points="40 10 65 35 15 35 40 10" fill="transparent" stroke="#DC3545" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="79" height="49" rx="5" fill="transparent" stroke="#28A745" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="119" height="79" rx="5" fill="transparent" stroke="#34495E" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="69" height="39" rx="3" fill="transparent" stroke="#34495E" stroke-width="1"/>
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
    <rect x="0.5" y="0.5" width="69" height="39" rx="3" fill="transparent" stroke="#34495E" stroke-width="1"/>
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
          const newSvg = `<svg width="80" height="40" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="100" height="40" rx="8" ry="8" stroke="black" stroke-width="1" fill="transparent"/></svg>`;
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
          const newSvg = `<svg width="70" height="20" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="10" x2="90" y2="10" stroke="black" stroke-width="1"/><polygon points="90,5 98,10 90,15" fill="black"/></svg>`;
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

    const topicSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="#535965ff"><ellipse rx="24" ry="16" cx="25" cy="25"/></svg>`;
    const topicShape = createBoundedIcon("Topic", topicSvg);
    const subtopicSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="#9198a5ff"><ellipse rx="24" ry="16" cx="25" cy="25"/></svg>`;
    const subtopicShape = createBoundedIcon("Subtopic", subtopicSvg);
    const linkSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Tail marker -->
    
    <!-- Head marker -->
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 Z" fill="#535965ff" />
    </marker>
  </defs>
  
  <line x1="10" y1="35" x2="50" y2="35"
        stroke="#535965ff" stroke-width="1"
        marker-start="url(#tail)"
        marker-end="url(#arrowhead)" />
</svg>
`;
    const linkShape = createBoundedIcon("Link", linkSvg);
    const relationshapeSvg = `<svg width="60" height="40" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Tail marker -->
    
    <!-- Head marker -->
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 Z" fill="black" />
    </marker>
  </defs>
  
  <line x1="10" y1="20" x2="50" y2="20"
        stroke="black" stroke-width="1"
        marker-start="url(#tail)"
        marker-end="url(#arrowhead)" />
</svg>`;
    const relationShape = createBoundedIcon("Relationship", relationshapeSvg);
    const noteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 23">
  <g transform="translate(0,1)">
    <path d="M5 2 A 2 2 0 0 0 3 4 L 3 20 A 2 2 0 0 0 5 22 L 19 22 A 2 2 0 0 0 21 20 L 21 8 L 15 2 Z" fill="#cfccc5ff"/>
    <path d="M5 2 L 15 8 L 21 8 Z" fill="#a9a497ff"/>
  </g>
</svg>
`;
    const noteShape = createBoundedIcon("Note", noteSvg);

    const startEventSvg = `<svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="13" stroke="#535965ff" stroke-width="1"/></svg>`;
    const startEventShape = createBoundedIcon("Start Event", startEventSvg);

    const taskActivitySvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="13" width="46" height="24" rx="8" ry="8" stroke="#535965ff" stroke-width="1" fill="transparent"/></svg>`;
    const taskActivityShape = createBoundedIcon(
      "Task/Activity",
      taskActivitySvg
    );

    const gatewaySvg = `<svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polygon points="30,8 55,33 30,58 5,33" stroke="#535965ff" stroke-width="1" fill="white"/>
</svg>
`;
    const gatewayShape = createBoundedIcon("Gateway", gatewaySvg);

    const endEventSvg = `<svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="13" stroke="#535965ff" stroke-width="1"/></svg>`;
    const endEventShape = createBoundedIcon("End Event", endEventSvg);

    const sequenceFlowSvg = `<svg width="70" height="20" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="10" x2="90" y2="10" stroke="#535965ff" stroke-width="1"/><polygon points="90,5 98,10 90,15" fill="black"/></svg>`;
    const sequenceFlowShape = createBoundedIcon(
      "Sequence Flow",
      sequenceFlowSvg
    );

    const requirementSvg = `<svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 10 L80 10 L80 90 L10 90 Z" stroke="#535965ff" stroke-width="1" fill="white"/><polyline points="80,10 80,25 65,25 65,10 80,10" fill="#E0E0E0" stroke="black" stroke-width="1"/><line x1="20" y1="30" x2="70" y2="30" stroke="gray" stroke-width="1"/><line x1="20" y1="45" x2="60" y2="45" stroke="gray" stroke-width="1"/><line x1="20" y1="60" x2="70" y2="60" stroke="gray" stroke-width="1"/><line x1="20" y1="75" x2="50" y2="75" stroke="gray" stroke-width="1"/><text x="15" y="20" font-family="Arial" font-size="14" font-weight="bold" fill="black">R</text></svg>`;
    const requirementShape = createBoundedIcon("Requirement", requirementSvg);

    const usecaseSvg = `<svg width="150" height="80" viewBox="0 0 150 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="70" cy="40" rx="70" ry="35" stroke="#535965ff" stroke-width="1" fill="white"/>
  <text x="75" y="45" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="black">Use Case Name</text>
</svg>`;
    const usecaseShape = createBoundedIcon("Use Case", usecaseSvg);

    const TraceabilityLinkSvg = `<svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="10" y1="20" x2="140" y2="20" stroke="#535965ff" stroke-width="1" stroke-dasharray="5 5"/>
  <polygon points="135,15 145,20 135,25" fill="black"/>
  <text x="75" y="15" font-family="Arial" font-size="10" font-style="italic" text-anchor="middle" fill="gray">&lt;&lt;derives&gt;&gt;</text>
</svg>`;
    const TraceabilityLinkShape = createBoundedIcon(
      "Traceability Link",
      TraceabilityLinkSvg
    );

    const EntitySvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <rect x="1.56" y="1.56" width="46.88" height="34.38" rx="4.69" ry="4.69" fill="#F8FAFC" stroke="#535965ff" stroke-width="1"/>
  <line x1="1.56" y1="12.5" x2="48.44" y2="12.5" stroke="#535965ff" stroke-width="1"/>
</svg>

`;
    const EntityShape = createBoundedIcon("Entity", EntitySvg);

    const AttributeSvg = `<svg width="32" height="16" viewBox="0 0 32 16" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="30" height="14" rx="2" ry="2" fill="#FFFFFF" stroke="##535965ff" stroke-width="1"/>
</svg>

`;
    const AttributeShape = createBoundedIcon("Attribute", AttributeSvg);

    const RelationshipSvg = `<svg width="32" height="16" viewBox="0 0 32 16" xmlns="http://www.w3.org/2000/svg">
  <line x1="2" y1="10" x2="30" y2="10" stroke="#535965ff" stroke-width="1"/>
  <polygon points="14,4 18,8 14,12" fill="#000000ff"/>
</svg>

`;
    const RelationshipShape = createBoundedIcon(
      "Relationship",
      RelationshipSvg
    );

    const IdentifierSvg = `<svg width="32" height="16" viewBox="0 0 32 16" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="16" cy="8" rx="14" ry="6" fill="#FDF2F8" stroke="#000000ff" stroke-width="1"/>
</svg>`;
    const IdentifierShape = createBoundedIcon("Identifier", IdentifierSvg);

    const TableSvg = `<svg width="150" height="100" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Table Header -->
  <rect x="5" y="5" width="140" height="30" stroke="#535965ff" stroke-width="1" fill="#E0E0E0"/>
  <!-- Table Body -->
  <rect x="5" y="35" width="140" height="60" stroke="#535965ff" stroke-width="1" fill="white"/>
  <!-- Lines for rows/columns (indicative) -->
  <line x1="5" y1="50" x2="145" y2="50" stroke="#535965ff" stroke-width="1"/>
  <line x1="5" y1="65" x2="145" y2="65" stroke="#535965ff" stroke-width="1"/>
  <line x1="5" y1="80" x2="145" y2="80" stroke="#535965ff" stroke-width="1"/>
  <line x1="50" y1="35" x2="50" y2="95" stroke="#535965ff" stroke-width="1"/>
  <line x1="90" y1="35" x2="90" y2="95" stroke="#535965ff" stroke-width="1"/>

  <!-- Placeholder for Table Name -->
  <text x="75" y="25" font-family="Arial" font-size="16"  text-anchor="middle" fill="black">Table Name</text>
</svg>
`;
    const TableShape = createBoundedIcon("Table", TableSvg);
    const Tablesvg = `<svg width="150" height="100" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Table Header -->
  <rect x="5" y="5" width="140" height="30" stroke="#535965ff" stroke-width="1" fill="#E0E0E0"/>
  <!-- Table Body -->
  <rect x="5" y="35" width="140" height="60" stroke="#535965ff" stroke-width="1" fill="white"/>
  <!-- Lines for rows/columns (indicative) -->
  <line x1="5" y1="50" x2="145" y2="50" stroke="#535965ff" stroke-width="1"/>
  <line x1="5" y1="65" x2="145" y2="65" stroke="#535965ff" stroke-width="1"/>
  <line x1="5" y1="80" x2="145" y2="80" stroke="#535965ff" stroke-width="1"/>
  <line x1="50" y1="35" x2="50" y2="95" stroke="#535965ff" stroke-width="1"/>
  <line x1="90" y1="35" x2="90" y2="95" stroke="#535965ff" stroke-width="1"/>

  <!-- Placeholder for Table Name -->
  <text x="75" y="25" font-family="Arial" font-size="16"  text-anchor="middle" fill="black">Table Name</text>
</svg>
`;
    const Tableshape = createBoundedIcon("Table", Tablesvg);
    const tableSvg = `<svg width="150" height="100" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Table Header -->
  <rect x="5" y="5" width="140" height="30" stroke="#535965ff" stroke-width="1" fill="#E0E0E0"/>
  <!-- Table Body -->
  <rect x="5" y="35" width="140" height="60" stroke="#535965ff" stroke-width="1" fill="white"/>
  <!-- Lines for rows/columns (indicative) -->
  <line x1="5" y1="50" x2="145" y2="50" stroke="#535965ff" stroke-width="1"/>
  <line x1="5" y1="65" x2="145" y2="65" stroke="#535965ff" stroke-width="1"/>
  <line x1="5" y1="80" x2="145" y2="80" stroke="#535965ff" stroke-width="1"/>
  <line x1="50" y1="35" x2="50" y2="95" stroke="#535965ff" stroke-width="1"/>
  <line x1="90" y1="35" x2="90" y2="95" stroke="#535965ff" stroke-width="1"/>

  <!-- Placeholder for Table Name -->
  <text x="75" y="25" font-family="Arial" font-size="16"  text-anchor="middle" fill="black">Table Name</text>
</svg>
`;
    const tableShape = createBoundedIcon("Table", tableSvg);
    const ActorSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 20)">
    <!-- Head -->
    <path d="M12 2C9.79 2 8 3.79 8 6C8 8.21 9.79 10 12 10C14.21 10 16 8.21 16 6C16 3.79 14.21 2 12 2Z" 
      stroke="#535965ff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
    
    <!-- Body arc -->
    <path d="M4 22C4 18.13 7.58 15 12 15C16.42 15 20 18.13 20 22" 
      stroke="#535965ff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>



`;
    const ActorShape = createBoundedIcon("Actor", ActorSvg);

    const stakeholderSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Left person -->
  <circle cx="14" cy="20" r="5" fill="none" stroke="#535965ff" stroke-width="1"/>
  <path d="M9 28 C9 25 11.5 23 14 23 C16.5 23 19 25 19 28" stroke="#535965ff" stroke-width="1" fill="none"/>

  <!-- Middle person -->
  <circle cx="25" cy="15" r="5" fill="none" stroke="#535965ff" stroke-width="1"/>
  <path d="M20 23 C20 20 22.5 18 25 18 C27.5 18 30 20 30 23" stroke="#535965ff" stroke-width="1" fill="none"/>

  <!-- Right person -->
  <circle cx="36" cy="20" r="5" fill="none" stroke="#535965ff" stroke-width="1"/>
  <path d="M31 28 C31 25 33.5 23 36 23 C38.5 23 41 25 41 28" stroke="#535965ff" stroke-width="1" fill="none"/>
</svg>

`;
    const stakeholderShape = createBoundedIcon("Stakeholder", stakeholderSvg);

    const InheritanceSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Top node -->
  <rect x="18.75" y="6.25" width="12.5" height="9.375" fill="#ffffff" stroke="#535965ff" stroke-width="1"/>

  <!-- Connecting vertical line -->
  <line x1="25" y1="15.625" x2="25" y2="25" stroke="#535965ff" stroke-width="1"/>

  <!-- Horizontal line -->
  <line x1="12.5" y1="25" x2="37.5" y2="25" stroke="#535965ff" stroke-width="1"/>

  <!-- Bottom left node -->
  <rect x="9.375" y="25" width="9.375" height="9.375" fill="#ffffff" stroke="#535965ff" stroke-width="1"/>

  <!-- Bottom right node -->
  <rect x="31.25" y="25" width="9.375" height="9.375" fill="#ffffff" stroke="#535965ff" stroke-width="1"/>
</svg>

`;
    const InheritanceShape = createBoundedIcon("Inheritance", InheritanceSvg);

    const InheritanceLDMSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Top node -->
  <rect x="18.75" y="6.25" width="12.5" height="9.375" fill="#ffffff" stroke="#535965ff" stroke-width="1"/>

  <!-- Connecting vertical line -->
  <line x1="25" y1="15.625" x2="25" y2="25" stroke="#535965ff" stroke-width="1"/>

  <!-- Horizontal line -->
  <line x1="12.5" y1="25" x2="37.5" y2="25" stroke="#535965ff" stroke-width="1"/>

  <!-- Bottom left node -->
  <rect x="9.375" y="25" width="9.375" height="9.375" fill="#ffffff" stroke="#535965ff" stroke-width="1"/>

  <!-- Bottom right node -->
  <rect x="31.25" y="25" width="9.375" height="9.375" fill="#ffffff" stroke="#535965ff" stroke-width="1"/>
</svg>

`;
    const InheritanceLDMShape = createBoundedIcon(
      "Inheritance",
      InheritanceLDMSvg
    );

    const onetoNSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Left Entity Rectangle -->
  <rect x="6" y="18" width="12" height="18" fill="#F8FAFC" stroke="#535965ff" stroke-width="1"/>

  <!-- Connector Line from Entity to Crow's Foot -->
  <line x1="18" y1="27" x2="38" y2="27" stroke="#535965ff" stroke-width="1"/>

  <!-- Crow's Foot: Three prongs representing many -->
  <line x1="38" y1="27" x2="44" y2="21" stroke="#535965ff" stroke-width="1"/>
  <line x1="38" y1="27" x2="44" y2="27" stroke="#535965ff" stroke-width="1"/>
  <line x1="38" y1="27" x2="44" y2="33" stroke="#535965ff" stroke-width="1"/>
</svg>


`;
    const onetoNShape = createBoundedIcon("1:N Relationship", onetoNSvg);

    const OneToNSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Left Entity Rectangle -->
  <rect x="6" y="18" width="12" height="18" fill="#F8FAFC" stroke="#535965ff" stroke-width="1"/>

  <!-- Connector Line from Entity to Crow's Foot -->
  <line x1="18" y1="27" x2="38" y2="27" stroke="#535965ff" stroke-width="1"/>

  <!-- Crow's Foot: Three prongs representing many -->
  <line x1="38" y1="27" x2="44" y2="21" stroke="#535965ff" stroke-width="1"/>
  <line x1="38" y1="27" x2="44" y2="27" stroke="#535965ff" stroke-width="1"/>
  <line x1="38" y1="27" x2="44" y2="33" stroke="#535965ff" stroke-width="1"/>
</svg>

`;
    const OneToNShape = createBoundedIcon("1:N Relationship", OneToNSvg);

    const onetooneSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Main relationship line -->
  <line x1="12" y1="25" x2="38" y2="25" stroke="#535965ff" stroke-width="1"/>

  <!-- Square at start -->
  <rect x="2" y="20" width="10" height="10" fill="white" stroke="#535965ff" stroke-width="1"/>

  <!-- Square at end -->
  <rect x="38" y="20" width="10" height="10" fill="white" stroke="#535965ff" stroke-width="1"/>
</svg>


`;
    const onetooneShape = createBoundedIcon("1:1 Relationship", onetooneSvg);

    const OneToOneSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Main relationship line -->
  <line x1="12" y1="25" x2="38" y2="25" stroke="#535965ff" stroke-width="1"/>

  <!-- Square at start -->
  <rect x="2" y="20" width="10" height="10" fill="white" stroke="#535965ff" stroke-width="1"/>

  <!-- Square at end -->
  <rect x="38" y="20" width="10" height="10" fill="white" stroke="#535965ff" stroke-width="1"/>
</svg>



`;
    const OneToOneShape = createBoundedIcon("1:N Relationship", OneToOneSvg);

    const OnetoOneSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Main relationship line -->
  <line x1="12" y1="25" x2="38" y2="25" stroke="#535965ff" stroke-width="1"/>

  <!-- Square at start -->
  <rect x="2" y="20" width="10" height="10" fill="white" stroke="#535965ff" stroke-width="1"/>

  <!-- Square at end -->
  <rect x="38" y="20" width="10" height="10" fill="white" stroke="#535965ff" stroke-width="1"/>
</svg>

`;
    const OnetoOneShape = createBoundedIcon("1:1 Relationship", OnetoOneSvg);

    const NtoNSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Main line -->
  <line x1="15" y1="25" x2="35" y2="25" stroke="#535965ff" stroke-width="1"/>

  <!-- Left crow's foot (n) -->
  <line x1="15" y1="25" x2="5" y2="15" stroke="#535965ff" stroke-width="1"/>
  <line x1="15" y1="25" x2="5" y2="35" stroke="#535965ff" stroke-width="1"/>
  <line x1="15" y1="25" x2="3" y2="25" stroke="#535965ff" stroke-width="1"/>

  <!-- Right crow's foot (n) -->
  <line x1="35" y1="25" x2="45" y2="15" stroke="#535965ff" stroke-width="1"/>
  <line x1="35" y1="25" x2="45" y2="35" stroke="#535965ff" stroke-width="1"/>
  <line x1="35" y1="25" x2="47" y2="25" stroke="#535965ff" stroke-width="1"/>
</svg>



`;
    const NtoNShape = createBoundedIcon("N:N Relationship", NtoNSvg);

    const ntonSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Main line -->
  <line x1="15" y1="25" x2="35" y2="25" stroke="#535965ff" stroke-width="1"/>

  <!-- Left crow's foot (n) -->
  <line x1="15" y1="25" x2="5" y2="15" stroke="#535965ff" stroke-width="1"/>
  <line x1="15" y1="25" x2="5" y2="35" stroke="#535965ff" stroke-width="1"/>
  <line x1="15" y1="25" x2="3" y2="25" stroke="#535965ff" stroke-width="1"/>

  <!-- Right crow's foot (n) -->
  <line x1="35" y1="25" x2="45" y2="15" stroke="#535965ff" stroke-width="1"/>
  <line x1="35" y1="25" x2="45" y2="35" stroke="#535965ff" stroke-width="1"/>
  <line x1="35" y1="25" x2="47" y2="25" stroke="#535965ff" stroke-width="1"/>
</svg>

`;
    const ntonShape = createBoundedIcon("N:N Relationship", ntonSvg);
    const goalSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#535965ff" stroke-width="1">
  <g transform="scale(0.8) translate(6.25, 6.25)">
    <!-- Outer circle -->
    <circle cx="25" cy="25" r="22" />
    <!-- Middle circle -->
    <circle cx="25" cy="25" r="12" />
    <!-- Inner circle -->
    <circle cx="25" cy="25" r="4" fill="#535965ff" />
  </g>
</svg>

`;
    const goalShape = createBoundedIcon("Goal", goalSvg);
    const SubProcessSvg = `<svg width="50" height="50" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#535965ff" stroke-width="1" stroke-dasharray="4 2">
  <rect x="2" y="2" width="56" height="36" rx="4"/>
</svg>

`;
    const SubProcessShape = createBoundedIcon("Sub Process", SubProcessSvg);
    const TransactionSvg = `<svg width="50" height="50" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#535965ff" stroke-width="1">
  <rect x="2" y="2" width="56" height="36" rx="4"/>
  <rect x="6" y="6" width="48" height="28" rx="3"/>
</svg>

`;
    const TransactionShape = createBoundedIcon("Transaction", TransactionSvg);
    const CallActivitySvg = `<svg width="50" height="50" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#535965ff" stroke-width="1">
  <rect x="2" y="2" width="56" height="36" rx="8"/>
</svg>

`;
    const CallActivityShape = createBoundedIcon(
      "Call Activity",
      CallActivitySvg
    );

    const ExclusiveGatewaySvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#535965ff" stroke-width="1">
  <polygon points="25,2.5 47.5,25 25,47.5 2.5,25"/>
  <line x1="12.5" y1="12.5" x2="37.5" y2="37.5"/>
  <line x1="37.5" y1="12.5" x2="12.5" y2="37.5"/>
</svg>

`;
    const ExclusiveGatewayShape = createBoundedIcon(
      "Exclusive Gateway",
      ExclusiveGatewaySvg
    );
    const EventGatewaySvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#535965ff" stroke-width="1">
  <polygon points="25,2.5 47.5,25 25,47.5 2.5,25"/>
  <circle cx="25" cy="25" r="7.5"/>
</svg>


`;
    const EventGatewayShape = createBoundedIcon(
      "Event Gateway",
      EventGatewaySvg
    );
    const ParallelGatewaySvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#535965ff" stroke-width="1">
  <polygon points="25,2.5 47.5,25 25,47.5 2.5,25"/>
  <line x1="25" y1="12.5" x2="25" y2="37.5"/>
  <line x1="12.5" y1="25" x2="37.5" y2="25"/>
</svg>

`;
    const ParallelGatewayShape = createBoundedIcon(
      "Parallel Gateway",
      ParallelGatewaySvg
    );

    const MessageFlowSvg = `<svg width="60" height="10" viewBox="0 0 60 10" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" stroke-width="1" stroke-dasharray="4 2">
  <line x1="0" y1="5" x2="55" y2="5"/>
  <polyline points="55,2 60,5 55,8"/>
</svg>

`;
    const MessageFlowShape = createBoundedIcon("Message Flow", MessageFlowSvg);

    const AssociationSvg = `<svg width="60" height="10" viewBox="0 0 60 10" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" stroke-width="1" stroke-dasharray="2 2">
  <line x1="0" y1="5" x2="60" y2="5"/>
</svg>

`;
    const AssociationShape = createBoundedIcon("Association", AssociationSvg);
    const associationSvg = `<svg width="60" height="10" viewBox="0 0 60 10" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" stroke-width="1" stroke-dasharray="2 2">
  <line x1="0" y1="5" x2="60" y2="5"/>
</svg>

`;
    const associationShape = createBoundedIcon("Association", associationSvg);

    const anchorlinkSvg = `<svg width="80" height="30" viewBox="0 0 80 30" xmlns="http://www.w3.org/2000/svg" fill="none">
  <!-- Left circle -->
  <circle cx="15" cy="15" r="6" stroke="#000" stroke-width="1" fill="white"/>
  <!-- Right circle -->
  <circle cx="65" cy="15" r="6" stroke="#000" stroke-width="1" fill="white"/>
  <!-- Connecting line -->
  <line x1="21" y1="15" x2="59" y2="15" stroke="#000" stroke-width="1" />
</svg>

`;
    const anchorlinkShape = createBoundedIcon("Anchor Link", anchorlinkSvg);

    const IndexSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="15" width="30" height="25" stroke="black" stroke-width="1" fill="white"/>
  <rect x="12" y="12" width="30" height="25" stroke="black" stroke-width="1" fill="white"/>
  <rect x="14" y="9" width="30" height="25" stroke="black" stroke-width="1" fill="white"/>
  <path d="M29 35 L25 40 L21 35 M25 40 L25 25" stroke="black" stroke-width="1" fill="none" stroke-linecap="round"/>
</svg>

`;
    const IndexShape = new shapes.standard.Image({
      size: { width: 80, height: 80 },
      attrs: {
        root: {
          title: "Index",
        },
        image: {
          "xlink:href": `data:image/svg+xml;utf8,${encodeURIComponent(
            IndexSvg
          )}`,
        },
        label: {
          text: "Index",
        },
      },
    });
    const classStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer rounded rectangle -->
  <rect x="5" y="5" width="40" height="40" rx="2" ry="2" stroke="#535965ff" stroke-width="1" fill="none"/>
  <!-- Horizontal line 1 -->
  <line x1="5" y1="20" x2="45" y2="20" stroke="#535965ff" stroke-width="1"/>
  <!-- Horizontal line 2 -->
  <line x1="5" y1="35" x2="45" y2="35" stroke="#535965ff" stroke-width="1"/>
</svg>
`;
    const classShape = createBoundedIcon("Class", classStencilSvg);

    const interfaceStencilSvg = `<svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="80" height="80" rx="4" stroke="#535965ff" stroke-width="1" fill="none"/>
  <text x="50" y="55" font-family="Arial, sans-serif" font-size="20" font-style="italic" fill="#535965ff" text-anchor="middle">&lt;&lt; I &gt;&gt;</text>
</svg>`;
    const interfaceShape = createBoundedIcon("Interface", interfaceStencilSvg);

    const enumStencilSvg = `<svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="80" height="80" rx="4" stroke="#535965ff" stroke-width="1" fill="none"/>
  <text x="50" y="55" font-family="Arial, sans-serif" font-size="20" font-style="italic" fill="#535965ff" text-anchor="middle">&lt;&lt; E &gt;&gt;</text>
</svg>`;
    const enumShape = createBoundedIcon("Enum", enumStencilSvg);

    const packageStencilSvg = `<svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M 50 15 h -30 a 5 5 0 0 0 -5 5 v 60 a 5 5 0 0 0 5 5 h 60 a 5 5 0 0 0 5 -5 v -50 a 5 5 0 0 0 -5 -5 h -20 v -10 a 5 5 0 0 0 -5 -5 Z"
        stroke="#000000ff" stroke-width="1" fill="none"/>
</svg>`;
    const packageShape = createBoundedIcon("Package", packageStencilSvg);

    const cubeStencilSvg = `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="scale(0.95) translate(0.63, 0.63)">
    <path d="M12 4L20 8L12 12L4 8L12 4Z" stroke="#535965ff" stroke-width="0.5" stroke-linejoin="round"/>
    <path d="M4 8V16L12 20V12L4 8Z" stroke="#535965ff" stroke-width="0.5" stroke-linejoin="round"/>
    <path d="M20 8V16L12 20V12L20 8Z" stroke="#535965ff" stroke-width="0.5" stroke-linejoin="round"/>
  </g>
</svg>

`;
    const cubeShape = createBoundedIcon("Cube", cubeStencilSvg);

    const dimensionStencilSvg = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 100 L100 75 L150 100 L150 150 L100 175 L50 150 L50 100 Z" stroke="#535965" stroke-width="1" stroke-linejoin="round"/>
    <path d="M100 75 L100 175" stroke="#535965" stroke-width="1" stroke-linejoin="round"/>
    <path d="M50 100 L150 150" stroke="#535965" stroke-width="1" stroke-linejoin="round"/>
    <path d="M150 100 L50 150" stroke="#535965" stroke-width="1" stroke-linejoin="round"/>

    <path d="M100 75 L100 25" stroke="#535965" stroke-width="1" stroke-linecap="round"/>
    <path d="M90 35 L100 25 L110 35" stroke="#535965" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>

    <path d="M50 150 L0 200" stroke="#535965" stroke-widt  h="1" stroke-linecap="round"/>
    <path d="M10 190 L0 200 L20 190" stroke="#535965" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>

    <path d="M150 150 L200 200" stroke="#535965" stroke-width="1" stroke-linecap="round"/>
    <path d="M190 190 L200 200 L180 190" stroke="#535965" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
    const dimensionShape = createBoundedIcon("Dimension", dimensionStencilSvg);

    const measureStencilSvg = `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="scale(0.95) translate(0.63, 0.63)">
    <line x1="5" y1="19" x2="19" y2="19" stroke="#535965ff" stroke-width="0.5" stroke-linecap="round"/>
    <rect x="7" y="10" width="3" height="9" stroke="#535965ff" stroke-width="0.5" fill="#535965ff"/>
    <rect x="11" y="6" width="3" height="13" stroke="#535965ff" stroke-width="0.5" fill="#535965ff"/>
    <rect x="15" y="14" width="3" height="5" stroke="#535965ff" stroke-width="0.5" fill="#535965ff"/>
  </g>
</svg>
`;
    const measureShape = createBoundedIcon("Measure", measureStencilSvg);

    const freeNodeStencilSvg = `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="scale(0.95) translate(0.63, 0.63)">
    <circle cx="12" cy="12" r="8" stroke="#535965ff" stroke-width="1"/>
  </g>
</svg>
`;
    const freeNodeShape = createBoundedIcon("Free Node", freeNodeStencilSvg);

    const freeGroupStencilSvg = `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="scale(0.95) translate(0.63, 0.63)">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#535965ff" stroke-width="1" stroke-dasharray="4 2"/>
  </g>
</svg>
`;
    const freeGroupShape = createBoundedIcon("Free Group", freeGroupStencilSvg);

    const connectorLineStencilSvg = `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <line x1="6" y1="20" x2="34" y2="20" stroke="#000" stroke-width="1"/>
  <polygon points="34,20 28,16 28,24" fill="#000"/>
</svg>`;
    const connectorLineShape = createBoundedIcon(
      "Connector Line",
      connectorLineStencilSvg
    );

    const annotationStencilSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3H19V21H5V3Z" fill="#F3F4F6" />
    <path d="M19 8L14 3V8H19Z" fill="#E5E7EB" />
</svg>`;
    const annotationShape = createBoundedIcon(
      "Annotation",
      annotationStencilSvg
    );

    const titleboxSvg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <title>Title Box</title>
  <rect x="15" y="30" width="70" height="40" rx="4" ry="4" fill="none" stroke="#475569" stroke-width="1" />
  <line x1="25" y1="45" x2="75" y2="45" stroke="#475569" stroke-width="1" stroke-linecap="round"/>
  <line x1="25" y1="58" x2="55" y2="58" stroke="#94A3B8" stroke-width="1" stroke-linecap="round"/>
</svg>`;
    const titleboxShape = createBoundedIcon("Title Box", titleboxSvg);

    const processNodeStencilSvg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <title>Process Node</title>
  <rect x="10" y="25" width="80" height="50" rx="10" ry="10" fill="none" stroke="#050505ff" stroke-width="1"/>
  <path d="M 45 65 H 55 M 50 60 V 70" fill="none" stroke="#020202ff" stroke-width="1" stroke-linecap="round"/>
</svg>`;
    const processNodeShape = createBoundedIcon(
      "Process Node",
      processNodeStencilSvg
    );

    const subprocessNodeStencilSvg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <title>Subprocess Node</title>
  <rect x="10" y="25" width="80" height="50" rx="10" ry="10" fill="none" stroke="#334155" stroke-width="1"/>
  <path d="M 45 65 H 55 M 50 60 V 70" fill="none" stroke="#334155" stroke-width="1" stroke-linecap="round"/>
</svg>`;
    const subprocessNodeShape = createBoundedIcon(
      "Subprocess Node",
      subprocessNodeStencilSvg
    );

    const activityNodeStencilSvg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <title>Activity Node</title>
  <rect x="10" y="30" width="80" height="40" rx="20" ry="20" fill="none" stroke="#070707ff" stroke-width="1"/>
</svg>`;
    const activityNodeShape = createBoundedIcon(
      "Activity Node",
      activityNodeStencilSvg
    );

    const organizationStencilSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#535965ff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
  <g transform="scale(0.65) translate(4.5, 5.2)">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
    <path d="M10 6h4"/>
    <path d="M10 10h4"/>
    <path d="M10 14h4"/>
    <path d="M10 18h4"/>
  </g>
</svg>

`;
    const organizationShape = createBoundedIcon(
      "Organization",
      organizationStencilSvg
    );

    const departmentStencilSvg = `<svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" stroke="#000" fill="none" stroke-width="1">
  <!-- Top rectangle -->
  <rect x="85" y="10" width="30" height="20" />

  <!-- Vertical line -->
  <line x1="100" y1="30" x2="100" y2="60" />

  <!-- Left curve -->
  <path d="M100 60 C60 60, 60 90, 60 90" />

  <!-- Right curve -->
  <path d="M100 60 C140 60, 140 90, 140 90" />

  <!-- Left rectangle -->
  <rect x="45" y="90" width="30" height="20" />

  <!-- Right rectangle -->
  <rect x="125" y="90" width="30" height="20" />
</svg>


`;
    const departmentShape = createBoundedIcon(
      "Department",
      departmentStencilSvg
    );

    const roleStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#535965ff" stroke-width="1">
  <!-- Shield -->
  <path d="M25 5 L40 12 V24 C40 33 33 42 25 45 C17 42 10 33 10 24 V12 L25 5 Z" fill="none" stroke="#535965ff" stroke-width="1"/>

  <!-- Person inside shield -->
  <circle cx="25" cy="20" r="4" stroke ="#535965ff"/>
  <path d="M20 30 C20 26, 30 26, 30 30 Z" stroke="#535965ff"/>
</svg>

`;
    const roleShape = createBoundedIcon("Role", roleStencilSvg);

    const positionStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" stroke="#535965ff" stroke-width="1" fill="none">
  <!-- Large chair back (partially shown behind person) -->
  <path d="M15 34 V14 A10 10 0 0 1 35 14 V34" stroke="#535965ff" stroke-width="1.2" fill="none"/>

  <!-- Chair seat (optional, subtle) -->
  <line x1="18" y1="34" x2="32" y2="34" stroke="#535965ff" stroke-width="1"/>

  <!-- Person head -->
  <circle cx="25" cy="20" r="4" stroke="#535965ff"/>

  <!-- Person body -->
  <path d="M20 32 C20 26, 30 26, 30 32 Z" stroke="#535965ff"/>
</svg>
`;
    const positionShape = createBoundedIcon("Position", positionStencilSvg);

    const reportingLineStencilSvg = `<svg width="50" height="50" viewBox="0 0 24 24" fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <g transform="scale(0.8) translate(3,3)">
    <path d="M7 9L17 9" stroke="#535965ff" stroke-width="0.4" stroke-linecap="round"/>
    <path d="M7 12L13 12" stroke="#535965ff" stroke-width="0.4" stroke-linecap="round"/>
    <path d="M21 13V7C21 5.11438 21 4.17157 20.4142 3.58579C19.8284 3 18.8856 3 17 3H7C5.11438 3 4.17157 3 3.58579 3.58579C3 4.17157 3 5.11438 3 7V13C3 14.8856 3 15.8284 3.58579 16.4142C4.17157 17 5.11438 17 7 17H9H9.02322C9.31982 17 9.5955 17.1528 9.75269 17.4043L11.864 20.7824C11.9268 20.8829 12.0732 20.8829 12.136 20.7824L14.2945 17.3288C14.4223 17.1242 14.6465 17 14.8877 17H15H17C18.8856 17 19.8284 17 20.4142 16.4142C21 15.8284 21 14.8856 21 13Z"
      stroke="#535965ff" stroke-width="0.4" stroke-linejoin="round"/>
  </g>
</svg>



`;
    const reportingLineShape = createBoundedIcon(
      "Reporting Line",
      reportingLineStencilSvg
    );

    const groupStencilSvg = `<svg width="50" height="50" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="119" height="79" rx="10" fill="transparent" stroke="#0c0c0dff" stroke-width="1" stroke-dasharray="5 5"/>
    <path d="M30 20 L30 60 L90 60 L90 20 L30 20 Z M35 25 L35 55 L85 55 L85 25 L35 25 Z" fill="#25282cff" opacity="0.3" stroke="transparent"/>
</svg>`;
    const groupShape = createBoundedIcon("Group", groupStencilSvg);

    const businessCapabilityStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 24 L18 15 L24 15 L24 24 L33 24 L33 30 L24 30 L24 39 L18 39 L18 30 L9 30 L9 24 Z" fill="none" stroke-width="1" stroke="#535965ff"/>
  
</svg>


`;
    const businessCapabilityShape = createBoundedIcon(
      "Business",
      businessCapabilityStencilSvg
    );

    const applicationStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="15" width="30" height="20" fill="transparent" stroke="#535965ff" stroke-width="1"/>
  <circle cx="14" cy="20" r="2" fill="#535965ff"/>
  <rect x="18" y="19" width="16" height="2" fill="#535965ff"/>
  <rect x="18" y="25" width="14" height="2" fill="#535965ff"/>
</svg>




`;
    const applicationShape = createBoundedIcon(
      "Application",
      applicationStencilSvg
    );

    const technologyComponentStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="12" width="30" height="6" fill="none" stroke-width="1" stroke="#535965ff"/>
  <rect x="10" y="22" width="30" height="6" fill="none" stroke-width="1" stroke="#535965ff"/>
  <rect x="10" y="32" width="30" height="6" fill="none" stroke-width="1" stroke="#535965ff"/>
</svg>

`;
    const technologyComponentShape = createBoundedIcon(
      "Technology",
      technologyComponentStencilSvg
    );

    const dataObjecttStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="25" cy="15" rx="15" ry="5" fill="none" opacity="0.5" stroke-width="1" stroke="#535965ff"/>
  <path d="M10 15 L10 30 A15 5 0 0 0 40 30 L40 15 A15 5 0 0 1 10 15 Z" fill="none" opacity="0.5" stroke-width="1" stroke="#535965ff"/>
  <ellipse cx="25" cy="30" rx="15" ry="5" fill="none" opacity="0.5" stroke-width="1" stroke="#535965ff"/>
</svg>
`;
    const dataObjecttShape = createBoundedIcon(
      "Data Object",
      dataObjecttStencilSvg
    );

    const processStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 25 H25 V20 L35 30 L25 40 V35 H15 V25 Z" fill="none" stroke-width="1" stroke="#535965ff"/>
</svg>
`;
    const processShape = createBoundedIcon("Process", processStencilSvg);

    const sourceStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Cylinder (database) in the back top-left -->
  <g transform="translate(2, 2)" opacity="0.3">
    <ellipse cx="15" cy="7" rx="12" ry="4" fill="#535965ff"/>
    <path d="M3 7 L3 23 A12 4 0 0 0 27 23 L27 7 A12 4 0 0 1 3 7 Z" fill="#535965ff"/>
    <ellipse cx="15" cy="23" rx="12" ry="4" fill="#535965ff"/>
  </g>

  <!-- File (document with fold) in front bottom-right -->
  <g transform="translate(20, 20)">
    <!-- Main rectangle -->
    <path d="M0 0 H15 V20 H0 Z" fill="#535965ff" opacity="0.6"/>
    <!-- Folded corner -->
    <path d="M10 0 L15 5 L10 5 Z" fill="white" opacity="0.8"/>
    <path d="M10 0 L15 5" stroke="#535965ff" stroke-width="1"/>
    <path d="M10 5 L15 5" stroke="#535965ff" stroke-width="1"/>
  </g>
</svg>

`;
    const sourceShape = createBoundedIcon("Source", sourceStencilSvg);

    const targetStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Cylinder (database) at the back, bottom-right -->
  <g transform="translate(15, 18)" opacity="0.3">
    <ellipse cx="15" cy="7" rx="12" ry="4" fill="#535965ff"/>
    <path d="M3 7 L3 23 A12 4 0 0 0 27 23 L27 7 A12 4 0 0 1 3 7 Z" fill="#535965ff"/>
    <ellipse cx="15" cy="23" rx="12" ry="4" fill="#535965ff"/>
  </g>

  <!-- File (document with folded corner) in front, top-left overlapping cylinder -->
  <g transform="translate(10, 10)">
    <!-- File body -->
    <path d="M0 0 H15 V20 H0 Z" fill="#535965ff" opacity="0.8"/>
    <!-- Folded corner -->
    <path d="M10 0 L15 5 L10 5 Z" fill="white" opacity="0.8"/>
    <path d="M10 0 L15 5" stroke="#535965ff" stroke-width="1"/>
    <path d="M10 5 L15 5" stroke="#535965ff" stroke-width="1"/>
  </g>
</svg>

`;
    const targetShape = createBoundedIcon("Target", targetStencilSvg);

    const DataFlowStencilSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="5" y1="25" x2="18" y2="25" stroke="#535965ff" stroke-width="1" stroke-linecap="round"/>
  <line x1="20" y1="25" x2="33" y2="25" stroke="#535965ff" stroke-width="1" stroke-linecap="round"/>
  <line x1="35" y1="25" x2="45" y2="25" stroke="#535965ff" stroke-width="1" stroke-linecap="round"/>
  <path d="M39 21 L45 25 L39 29 Z" fill="#535965ff" stroke="transparent"/>
</svg>
`;
    const DataFlowShape = createBoundedIcon("Data Flow", DataFlowStencilSvg);

    const TransformationStencilSvg = `<svg width="50" height="50" viewBox="0 0 70 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="15" y="20" width="12" height="12" fill="#535965ff" stroke="transparent"/>
  <line x1="27" y1="26" x2="42" y2="26" stroke="#535965ff" stroke-width="1" stroke-linecap="round"/>
  <path d="M36 22 L42 26 L36 30 Z" fill="#535965ff" stroke="transparent"/>
  <circle cx="55" cy="26" r="6" fill="#535965ff" stroke="transparent"/>
</svg>
`;
    const TransformationShape = createBoundedIcon(
      "Transformation",
      TransformationStencilSvg
    );

    const ServerSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" stroke="#535965ff" stroke-width="1" fill="none">
  <!-- Server base rectangle -->
  <rect x="15" y="10" width="20" height="30" rx="2" ry="2" fill="none" stroke="#535965ff" stroke-width="1" />
  
  <!-- Horizontal lines for server bays -->
  <line x1="17" y1="17" x2="33" y2="17" />
  <line x1="17" y1="22" x2="33" y2="22" />
  <line x1="17" y1="27" x2="33" y2="27" />
  
  <!-- Circle power button -->
  <circle cx="25" cy="35" r="1.5" fill="#535965ff" />
</svg>
`;
    const ServerShape = createBoundedIcon("Server", ServerSvg);

    const DatabaseSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" stroke="#535965ff" stroke-width="1" fill="none">
  <!-- Top ellipse -->
  <ellipse cx="25" cy="12" rx="12" ry="5" fill="#e0e0e0" stroke="#535965ff" />
  
  <!-- Side walls -->
  <path d="M13 12 V32 C13 35 37 35 37 32 V12" fill="#e0e0e0" stroke="#535965ff" />
  
  <!-- Bottom ellipse -->
  <ellipse cx="25" cy="32" rx="12" ry="5" fill="#e0e0e0" stroke="#535965ff" />
</svg>
`;
    const DatabaseShape = createBoundedIcon("Database", DatabaseSvg);

    const informationNodeStencilSvg = `<svg width="320" height="200" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Main rectangle (body) -->
  <rect x="120" y="80" width="160" height="100" fill="#100f10ff" opacity="0.3"/>

  <!-- Top cap and outer path -->
  <path d="M280 80 L260 80 L260 60 L120 60 L120 80 L100 80 L100 200 L280 200 Z" fill="#645e6fff" opacity="0.3"/>

  <!-- Inner lines -->
  <line x1="140" y1="130" x2="240" y2="130" stroke="#100f10ff" stroke-width="4"/>
  <line x1="140" y1="150" x2="200" y2="150" stroke="#100f10ff" stroke-width="4"/>
</svg>


`;
    const XMLShape = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" stroke="#535965ff" stroke-width="1" fill="none">
  <!-- Document outline -->
  <path d="M15 10 H30 L35 15 V40 H15 Z" fill="#ffffff" stroke="#535965ff" />
  <path d="M30 10 V15 H35" fill="none" stroke="#535965ff" />

  <!-- Folded corner -->
  <polyline points="30,10 35,15 30,15" fill="#dfe6f3" stroke="#535965ff" />

  <!-- XML text -->
  <text x="18" y="30" font-size="8" fill="#535965ff" font-family="Arial, sans-serif">XML</text>
</svg>
`;
    const xmlShape = createBoundedIcon("XML", XMLShape);

    const BusinessProcessSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#535965ff" stroke-width="1">
  <!-- Border square -->
  <rect x="8" y="8" width="34" height="34" rx="4" fill="none" />

  <!-- Top-left to bottom-right curve -->
  <path d="M18 22 C18 16, 32 16, 32 22" fill="none" />
  <!-- Top arrowhead -->
  <polygon points="32,23 30.5,21.5 33.5,21.5" fill="#535965ff" />

  <!-- Bottom-right to top-left curve -->
  <path d="M32 28 C32 34, 18 34, 18 28" fill="none" />
  <!-- Bottom arrowhead moved more up -->
  <polygon points="18,27.2 19.5,28.7 16.5,28.7" fill="#535965ff" />
</svg>
`;
    const businessProcessShape = createBoundedIcon(
      "Business Process",
      BusinessProcessSvg
    );

    const replicationSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#535965ff" stroke-width="1">
  <!-- Circle -->
  <circle cx="25" cy="25" r="12" />

  <!-- Centered right-pointing arrowhead inside the circle -->
  <path d="M28 25 L24 23 L24 27 Z" fill="#535965ff" />
</svg>
`;
    const replicationShape = createBoundedIcon("Replication", replicationSvg);

    const ReplicationServerSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#535965ff" stroke-width="1">
  <!-- Server Box -->
  <rect x="12" y="12" width="26" height="26" rx="2" stroke="#535965ff" stroke-width="1" />

  <!-- Divider Lines -->
  <line x1="12" y1="22" x2="38" y2="22" stroke="#535965ff" stroke-width="1" />
  <line x1="12" y1="32" x2="38" y2="32" stroke="#535965ff" stroke-width="1" />

  <!-- Looping Arrow over Server -->
  <path d="M20 10 C20 5, 30 5, 30 10" stroke="#535965ff" fill="none" stroke-width="1" />
  <polygon points="30,10 28.5,8.5 31.5,8.5" fill="#535965ff" />
</svg>
`;
    const ReplicationServerShape = createBoundedIcon(
      "Replication Server",
      ReplicationServerSvg
    );
    const TransformationProcessSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#535965ff" stroke-width="1">
  <!-- Gear circle -->
  <circle cx="25" cy="25" r="8" />
  <!-- Teeth -->
  <line x1="25" y1="15" x2="25" y2="12" />
  <line x1="25" y1="35" x2="25" y2="38" />
  <line x1="15" y1="25" x2="12" y2="25" />
  <line x1="35" y1="25" x2="38" y2="25" />
  
  <!-- Incoming arrow left -->
  <line x1="5" y1="25" x2="12" y2="25" />
  <polygon points="12,25 9.5,23.5 9.5,26.5" fill="#535965ff" />
  
  <!-- Outgoing arrow right -->
  <line x1="38" y1="25" x2="45" y2="25" />
  <polygon points="45,25 42.5,23.5 42.5,26.5" fill="#535965ff" />
</svg>
`;
    const TransformationProcessShape = createBoundedIcon(
      "Transformation Process",
      TransformationProcessSvg
    );

    const ConnectionSvg = `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#535965ff" stroke-width="1">
  <!-- Left Node -->
  <circle cx="15" cy="25" r="4" fill="#535965ff" />

  <!-- Right Node -->
  <circle cx="35" cy="25" r="4" fill="#535965ff" />

  <!-- Connecting Line -->
  <line x1="19" y1="25" x2="31" y2="25" stroke="#535965ff" stroke-width="1" />
</svg>
`;
    const ConnectionShape = createBoundedIcon("Connection", ConnectionSvg);

    const informationNodeShape = createBoundedIcon(
      "Information",
      informationNodeStencilSvg
    );
    const inputStencilSvg = `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M 10 50 L 50 50 M 40 40 L 50 50 L 40 60 M 30 30 L 70 30 L 70 70 L 30 70 Z M 30 30 L 30 70" stroke="#535965ff" stroke-width="1" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
</svg>


`;
    const inputShape = createBoundedIcon("Input", inputStencilSvg);

    const printSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Printer Body -->
  <rect x="12" y="18" width="26" height="20" rx="2" stroke="#535965FF" stroke-width="1" fill="none"/>
  
  <!-- Paper Coming Out -->
  <rect x="16" y="30" width="18" height="12" fill="#535965FF"/>
  
  <!-- Top Section of Printer -->
  <rect x="14" y="10" width="22" height="10" rx="1" stroke="#535965FF" stroke-width="1" fill="none"/>
  
  <!-- Buttons -->
  <circle cx="34" cy="22" r="1" fill="#535965FF"/>
  <circle cx="30" cy="22" r="1" fill="#535965FF"/>
</svg>
`;
    const StoreShape = createBoundedIcon("Print", printSvg);

    const StoreSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Top Ellipse -->
  <ellipse cx="25" cy="14" rx="12" ry="4" stroke="#535965FF" stroke-width="1" fill="none"/>
  
  <!-- Vertical Sides -->
  <path d="M13 14V36C13 38.2 18.4 40 25 40C31.6 40 37 38.2 37 36V14" stroke="#535965FF" stroke-width="1" fill="none"/>

  <!-- Bottom Ellipse (Dashed for depth illusion) -->
  <path d="M13 36C13 38.2 18.4 40 25 40C31.6 40 37 38.2 37 36" stroke="#535965FF" stroke-width="1" fill="none" stroke-dasharray="2 2"/>
</svg>

`;
    const printShape = createBoundedIcon("Store", StoreSvg);

    const ManageSvg = `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Half File Icon in background -->
  <g transform="translate(10, 10)">
    <path d="M 10 10 H 40 L 50 20 V 45 H 10 Z M 40 10 V 20 H 50" fill="none" stroke="#535965ff" stroke-width="1"/>
  </g>

  <!-- Manage Icon on top -->
  <path d="M 20 35 H 45 L 55 45 H 80 V 70 H 20 Z" fill="#858688ff" stroke="#535965ff" stroke-width="1"/>
</svg>
`;
    const ManageShape = createBoundedIcon("Manage", ManageSvg);

    const secureSvg = `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
 <rect x="30" y="45" width="40" height="30" rx="5" ry="5" fill="none" stroke="#535965ff" stroke-width="1"/>
 <path d="M 40 45 V 35 C 40 25 60 25 60 35 V 45" stroke="#535965ff" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
 <circle cx="50" cy="60" r="5" fill="none" stroke="#535965ff" stroke-width="1"/>
</svg>`;

    const secureShape = createBoundedIcon("Secure", secureSvg);

    const paperdestroySvg = `<svg width="250" height="250" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shredGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#A0A0A0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#707070;stop-opacity:1" />
    </linearGradient>
  </defs>

  <path d="M 30 110 H 220 V 170 H 30 Z" fill="none" stroke="#606060" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>
  <rect x="30" y="110" width="190" height="20" fill="#606060" rx="4" ry="4"/>

  <path d="M 40 110 C 40 100, 50 90, 60 90 H 190 C 200 90, 210 100, 210 110 Z" fill="#787878" stroke="#606060" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>

  <path d="M 80 40 L 80 90 A 10 10 0 0 0 90 100 L 160 100 A 10 10 0 0 0 170 90 L 170 40 Z" fill="#FFFFFF" stroke="#606060" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M 95 60 H 155" stroke="#A0A0A0" stroke-width="4" stroke-linecap="round"/>
  <path d="M 95 75 H 155" stroke="#A0A0A0" stroke-width="4" stroke-linecap="round"/>

  <g fill="#606060">
    <rect x="40" y="180" width="8" height="15" rx="2" ry="2"/>
    <rect x="55" y="185" width="8" height="15" rx="2" ry="2"/>
    <rect x="70" y="190" width="8" height="15" rx="2" ry="2"/>
    <rect x="85" y="180" width="8" height="15" rx="2" ry="2"/>
    <rect x="100" y="185" width="8" height="15" rx="2" ry="2"/>
    <rect x="115" y="190" width="8" height="15" rx="2" ry="2"/>
    <rect x="130" y="180" width="8" height="15" rx="2" ry="2"/>
    <rect x="145" y="185" width="8" height="15" rx="2" ry="2"/>
    <rect x="160" y="190" width="8" height="15" rx="2" ry="2"/>
    <rect x="175" y="180" width="8" height="15" rx="2" ry="2"/>
    <rect x="190" y="185" width="8" height="15" rx="2" ry="2"/>
    <rect x="205" y="190" width="8" height="15" rx="2" ry="2"/>

    <rect x="45" y="200" width="8" height="15" rx="2" ry="2"/>
    <rect x="60" y="205" width="8" height="15" rx="2" ry="2"/>
    <rect x="75" y="210" width="8" height="15" rx="2" ry="2"/>
    <rect x="90" y="200" width="8" height="15" rx="2" ry="2"/>
    <rect x="105" y="205" width="8" height="15" rx="2" ry="2"/>
    <rect x="120" y="210" width="8" height="15" rx="2" ry="2"/>
    <rect x="135" y="200" width="8" height="15" rx="2" ry="2"/>
    <rect x="150" y="205" width="8" height="15" rx="2" ry="2"/>
    <rect x="165" y="210" width="8" height="15" rx="2" ry="2"/>
    <rect x="180" y="200" width="8" height="15" rx="2" ry="2"/>
    <rect x="195" y="205" width="8" height="15" rx="2" ry="2"/>
    <rect x="210" y="210" width="8" height="15" rx="2" ry="2"/>
  </g>
</svg>`;
    const shredShape = createBoundedIcon("Shred", paperdestroySvg);

    const flowStencilSvg = `<svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="2" y1="10" x2="28" y2="10" stroke="#6C757D" stroke-width="1"/>
    <path d="M24 7 L28 10 L24 13 Z" fill="#6C757D" stroke="transparent"/>
</svg>`;
    const flowShape = createBoundedIcon("Flow", flowStencilSvg);

    const AccessPointSvg = `<svg width="280" height="160" viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer rectangle -->
  <rect x="100" y="60" width="80" height="40" fill="transparent" stroke="#000000ff" stroke-width="6"/>

  <!-- Central circle (button/switch) -->
  <circle cx="140" cy="100" r="12" fill="#000000ff" stroke="transparent"/>

  <!-- Downward line -->
  <line x1="140" y1="112" x2="140" y2="140" stroke="#000000ff" stroke-width="4" stroke-linecap="round"/>
</svg>
`;
    const AccessPoint = createBoundedIcon("Access Point", AccessPointSvg);

    const RepositorySvg = `<svg width="25" height="15" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
   
    <rect x="20" y="15" width="40" height="25" fill="#040404ff" opacity="0.3"/>
    <rect x="25" y="10" width="40" height="25" fill="#1b1a1bff" opacity="0.3"/>
</svg>`;
    const Repository = createBoundedIcon("Repository", RepositorySvg);

    const impactNodeStencilSvg = `<svg width="25" height="15" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
   
    <path d="M40 15 L35 40 H45 L40 15 Z M38 43 H42 V47 H38 V43 Z" fill="#030303ff"/>
</svg>`;
    const impactNodeShape = createBoundedIcon("Impact", impactNodeStencilSvg);

    const changeEventStencilSvg = `<svg width="25" height="15" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    
    <circle cx="40" cy="25" r="10" fill="transparent" stroke="#050505ff" stroke-width="1.5"/>
    <path d="M40 15 L40 10 M40 40 L40 35 M50 25 L55 25 M30 25 L25 25 M45 18 L48 15 M35 32 L32 35 M45 32 L48 35 M35 18 L32 15" stroke="#040404ff" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;
    const changeEventShape = createBoundedIcon(
      "Change Event",
      changeEventStencilSvg
    );

    const riskEffectStencilSvg = `<svg width="25" height="15" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="40 10 65 35 15 35 40 10" fill="transparent" stroke="#070707ff" stroke-width="1"/>
    <path d="M40 20 L38 30 H42 L40 20 Z M39 32 H41 V34 H39 V32 Z" fill="#050505ff"/>
</svg>`;
    const riskEffectShape = createBoundedIcon(
      "Risk/Effect",
      riskEffectStencilSvg
    );

    const causeEffectLinkStencilSvg = `<svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="2" y1="10" x2="28" y2="10" stroke="#000000ff" stroke-width="1"/>
    <path d="M24 7 L28 10 L24 13 Z" fill="#0a0a0aff" stroke="transparent"/>
    <text x="15" y="20" font-family="Arial, sans-serif" font-size="8" fill="#000101ff" text-anchor="middle">C-E</text>
</svg>`;
    const causeEffectLinkShape = createBoundedIcon(
      "Cause-Effect Link",
      causeEffectLinkStencilSvg
    );

    const mitigationStrategyStencilSvg = `<svg width="25" height="15" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
   
    <path d="M40 10 L20 20 V35 L40 45 L60 35 V20 L40 10 Z" fill="transparent" stroke="#090909ff" stroke-width="1.5"/>
    <path d="M35 25 L38 28 L45 20" stroke="#000000ff" stroke-width="1" fill="transparent" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    const mitigationStrategyShape = createBoundedIcon(
      "Mitigation",
      mitigationStrategyStencilSvg
    );

    const matrixStencilSvg = `<svg width="30" height="20" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="99" height="59" rx="5" fill="transparent" stroke="#000000ff" stroke-width="1"/>
    <line x1="0.5" y1="30" x2="99.5" y2="30" stroke="#000000ff" stroke-width="1"/>
    <line x1="50" y1="0.5" x2="50" y2="59.5" stroke="#000000ff" stroke-width="1"/>
    <circle cx="25" cy="15" r="3" fill="#000000ff"/>
    <circle cx="75" cy="45" r="3" fill="#000000ff"/>
</svg>`;
    const matrixShape = createBoundedIcon("Matrix", matrixStencilSvg);

    const entitySvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="14.29" y="10.71" width="21.43" height="14.29" fill="transparent" stroke="#050606ff" stroke-width="1"/>
  <circle cx="14.29" cy="17.86" r="1.43" fill="#080808ff"/>
  <circle cx="35.71" cy="17.86" r="1.43" fill="#080808ff"/>
</svg>
`;
    const entityShape = createBoundedIcon("Entity", entitySvg);

    const DependencyLinkSvg = `<svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="2" y1="10" x2="28" y2="10" stroke="#6C757D" stroke-width="1"/>
    <path d="M24 7 L28 10 L24 13 Z" fill="#6C757D" stroke="transparent"/>
</svg>`;
    const DependencyLinkShape = createBoundedIcon(
      "Dependency Link",
      DependencyLinkSvg
    );
    const packageSvg = `<svg width="50" height="50" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="16" width="56" height="40" rx="4" ry="4" fill="none" stroke="#535965ff" stroke-width="1"/>
  <rect x="4" y="12" width="20" height="8" fill="none" stroke="#535965ff" stroke-width="1"/>
  <rect x="16" y="28" width="6" height="8" fill="none" stroke="#535965ff" stroke-width="1"/>
  <rect x="28" y="28" width="6" height="8" fill="none" stroke="#535965ff" stroke-width="1"/>
  <rect x="40" y="28" width="6" height="8" fill="none" stroke="#535965ff" stroke-width="1"/>
</svg>

`;
    const packagelinkShape = createBoundedIcon("Package", packageSvg);

    const PackageSvg = `<svg width="50" height="50" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="16" width="56" height="40" rx="4" ry="4" fill="none" stroke="#535965ff" stroke-width="1"/>
  <rect x="4" y="12" width="20" height="8" fill="none" stroke="#535965ff" stroke-width="1"/>
  <rect x="16" y="28" width="6" height="8" fill="none" stroke="#535965ff" stroke-width="1"/>
  <rect x="28" y="28" width="6" height="8" fill="none" stroke="#535965ff" stroke-width="1"/>
  <rect x="40" y="28" width="6" height="8" fill="none" stroke="#535965ff" stroke-width="1"/>
</svg>

`;
    const PackagelinkShape = createBoundedIcon("Package", PackageSvg);

    const ViewSvg = `<svg width="50" height="50" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 12 h40 v40 h-40 z" fill="none" stroke="#535965ff" stroke-width="1"/>
  <path d="M12 22 h40" stroke="#535965ff" stroke-width="1"/>
  <path d="M12 32 h40" stroke="#535965ff" stroke-width="1"/>
  <path d="M12 42 h40" stroke="#535965ff" stroke-width="1"/>
  <path d="M22 12 v40" stroke="#535965ff" stroke-width="1"/>
  <path d="M32 12 v40" stroke="#535965ff" stroke-width="1"/>
  <path d="M42 12 v40" stroke="#535965ff" stroke-width="1"/>
  <polygon points="12,12 52,12 48,8 16,8" fill="none" stroke="#535965ff" stroke-width="1"/>
</svg>



`;
    const ViewShape = createBoundedIcon("View", ViewSvg);

    const ReferenceSvg = `<svg width="50" height="50" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect x="16" y="16" width="12" height="12" rx="2" fill="none" stroke="#535965ff" stroke-width="1"/>
  <rect x="36" y="36" width="12" height="12" rx="2" fill="none" stroke="#535965ff" stroke-width="1"/>
  <path d="M22 28 C22 38, 42 28, 42 36" fill="none" stroke="#535965ff" stroke-width="1"/>
  <path d="M40 34 l4 2 -4 2 z" fill="#535965ff"/>
</svg>

`;
    const ReferenceShape = createBoundedIcon("Reference", ReferenceSvg);
    const ProcedureSvg = `<svg width="50" height="50" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <g id="settings" stroke="#535965ff" stroke-width="1" fill="none" transform="scale(0.6) translate(10.5,10.5)">
    <path d="M30.391,12.68l-3.064-0.614c-0.154-0.443-0.336-0.873-0.537-1.289l1.736-2.604
             c0.529-0.793,0.424-1.85-0.25-2.523l-1.924-1.924c-0.387-0.387-0.898-0.586-1.416-0.586
             c-0.383,0-0.77,0.11-1.107,0.336l-2.604,1.735c-0.418-0.202-0.848-0.382-1.291-0.536L19.32,1.61
             c-0.186-0.936-1.008-1.608-1.961-1.608h-2.72c-0.953,0-1.774,0.673-1.961,1.608l-0.614,3.065
             c-0.443,0.154-0.873,0.335-1.289,0.536L8.172,3.476C7.833,3.25,7.447,3.14,7.063,3.14
             c-0.517,0-1.028,0.199-1.415,0.586L3.725,5.65c-0.674,0.674-0.779,1.73-0.25,2.523l1.735,2.604
             c-0.202,0.417-0.382,0.847-0.536,1.29L1.608,12.68C0.673,12.867,0,13.688,0,14.641v2.72
             c0,0.953,0.673,1.775,1.608,1.961l3.065,0.615c0.154,0.443,0.335,0.873,0.536,1.289L3.475,23.83
             c-0.529,0.793-0.424,1.85,0.25,2.523l1.924,1.924c0.387,0.387,0.898,0.586,1.415,0.586
             c0.384,0,0.771-0.111,1.108-0.336l2.604-1.736c0.417,0.203,0.847,0.383,1.29,0.537l0.613,3.064
             c0.187,0.936,1.008,1.609,1.961,1.609h2.72c0.953,0,1.775-0.674,1.961-1.609l0.615-3.064
             c0.443-0.154,0.873-0.336,1.289-0.537l2.604,1.736c0.338,0.225,0.725,0.336,1.107,0.336
             c0.518,0,1.029-0.199,1.416-0.586l1.924-1.924c0.674-0.674,0.779-1.73,0.25-2.523l-1.736-2.604
             c0.203-0.418,0.383-0.848,0.537-1.291l3.064-0.613C31.326,19.137,32,18.314,32,17.361v-2.72
             C32,13.688,31.326,12.867,30.391,12.68z"/>
    <path d="M16,9.001c-3.865,0-7,3.135-7,7c0,3.866,3.135,7,7,7s7-3.135,7-7C23,12.136,19.865,9.001,16,9.001z
             M16,22.127c-3.382,0-6.125-2.744-6.125-6.125c0-3.382,2.743-6.125,6.125-6.125
             c3.381,0,6.125,2.743,6.125,6.125C22.125,19.383,19.381,22.127,16,22.127z"/>
    <path d="M16,12.001c-2.21,0-4,1.79-4,4c0,2.209,1.79,4,4,4c2.209,0,4-1.791,4-4
             C20,13.792,18.209,12.001,16,12.001z M16,19.002c-1.656,0-3-1.344-3-3c0-1.656,1.344-3,3-3s3,1.344,3,3
             C19,17.658,17.656,19.002,16,19.002z"/>
  </g>
</svg>


`;
    const ProcedureShape = createBoundedIcon("Procedure", ProcedureSvg);
    const FileIconSvg = `<svg width="50" height="50" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 8 h24 l12 12 v36 h-36 z" fill="none" stroke="#535965ff" stroke-width="1"/>
  <polyline points="40,8 40,20 52,20" fill="none" stroke="#535965ff" stroke-width="1"/>
  <line x1="20" y1="28" x2="44" y2="28" stroke="#535965ff" stroke-width="1"/>
  <line x1="20" y1="34" x2="44" y2="34" stroke="#535965ff" stroke-width="1"/>
  <line x1="20" y1="40" x2="38" y2="40" stroke="#535965ff" stroke-width="1"/>
</svg>

`;
    const FileIconShape = createBoundedIcon("File", FileIconSvg);

    const portSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Square port (scaled up and centered) -->
  <rect x="20" y="20" width="10" height="10" stroke="#535965ff" stroke-width="1" fill="none"/>
  
  <!-- Horizontal connection lines -->
  <line x1="10" y1="25" x2="20" y2="25" stroke="#535965ff" stroke-width="1"/>
  <line x1="30" y1="25" x2="40" y2="25" stroke="#535965ff" stroke-width="1"/>
</svg>



`;
    const portShape = createBoundedIcon("Port", portSvg);
    //Important
    const generalizationSvg = `<svg width="50" height="50" viewBox="0 0 50 50" stroke="#535965ff" stroke-width="1" fill="transparent" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0, -1.5625) scale(1.5625)">
    <polygon points="16,6 10,18 22,18" />
    <line x1="16" y1="18" x2="16" y2="28"/>
  </g>
</svg>


`;
    const generalizationShape = createBoundedIcon(
      "Generalization",
      generalizationSvg
    );
    const aggregationSvg = `<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
  <polygon points="8,16 12,12 16,16 12,20" fill="transparent" stroke="#535965ff" stroke-width="1"/>
  <line x1="16" y1="16" x2="28" y2="16" stroke="#535965ff" stroke-width="1"/>
</svg>

`;
    const aggregationShape = createBoundedIcon("Aggregation", aggregationSvg);

    const compositionSvg = `<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
  <polygon points="8,16 12,12 16,16 12,20" fill="#535965ff" stroke="#535965ff" stroke-width="1"/>
  <line x1="16" y1="16" x2="28" y2="16" stroke="#535965ff" stroke-width="1"/>
</svg>

`;
    const compositionShape = createBoundedIcon("Composition", compositionSvg);
    const dependencySvg = `<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
  <line x1="4" y1="16" x2="24" y2="16" stroke="#535965ff" stroke-dasharray="4,2" stroke-width="1"/>
  <polygon points="24,12 28,16 24,20" fill="#535965ff" stroke-width="1"/>
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
        tableShape,
        InheritanceLDMShape,
        OneToOneShape,
        OneToNShape,
        ntonShape,
      ],
      objectOrientedModel: [
        classShape,
        interfaceShape,
        enumShape,
        packageShape,
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
        groupShape,
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
        TransformationProcessShape,
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
