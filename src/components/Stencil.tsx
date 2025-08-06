import { useEffect, useRef, useState } from "react";
import iconCollapse from "../assets/inspector/icon-collapse.svg";
import iconExpand from "../assets/inspector/icon-expand.svg";
import iconSlide from "../assets/navigator/right-arrows.png";
import { paletteGroups, stencilElements } from "../config/stencil";
import { dia, ui, shapes } from "@joint/plus";
import * as joint from "@joint/core";
import { createEREntity } from "../config/customShapes";
import topicSvg from "../assets/shapes/topic.svg?raw";
import portSvg from "../assets/shapes/port.svg?raw";
import referenceSvg from "../assets/shapes/reference.svg?raw";
import subtopicSvg from "../assets/shapes/subtopic.svg?raw";
import noteSvg from "../assets/shapes/note.svg?raw";
import startEventSvg from "../assets/shapes/start-event.svg?raw";
import processNodeSvg from "../assets/shapes/process-node.svg?raw";
import subprocessNodeSvg from "../assets/shapes/subprocess-node.svg?raw";
import linkSvg from "../assets/shapes/link.svg?raw";
import activityNodeSvg from "../assets/shapes/activity-node.svg?raw";
import requirementSvg from "../assets/shapes/requirement.svg?raw";
import mitigationSvg from "../assets/shapes/mitigation.svg?raw";
import useCaseSvg from "../assets/shapes/use-case.svg?raw";
import entitySvg from "../assets/shapes/entity.svg?raw";
import classSvg from "../assets/shapes/class.svg?raw";
import interfaceSvg from "../assets/shapes/interface.svg?raw";
import packageSvg from "../assets/shapes/package.svg?raw";
import generalizationSvg from "../assets/shapes/generalization.svg?raw";
import aggregationSvg from "../assets/shapes/aggregation.svg?raw";
import compositionSvg from "../assets/shapes/composition.svg?raw";
import associationSvg from "../assets/shapes/association.svg?raw";
import dependencySvg from "../assets/shapes/dependency.svg?raw";
import tableSvg from "../assets/shapes/table.svg?raw";
import viewSvg from "../assets/shapes/view.svg?raw";
import procedureSvg from "../assets/shapes/procedure.svg?raw";
import onenRelationshipSvg from "../assets/shapes/1-n-relationship.svg?raw";
import onenRealtionshipSvg from "../assets/shapes/1-1-relationship.svg?raw";
import nnRealtionshipSvg from "../assets/shapes/n-n-relationship.svg?raw";
import businessProcessSvg from "../assets/shapes/business-process.svg?raw";
import freeNodeSvg from "../assets/shapes/free-node.svg?raw";
import anchorLinkSvg from "../assets/shapes/anchor-link.svg?raw";
import titleBoxSvg from "../assets/shapes/title-box.svg?raw";
import organizationSvg from "../assets/shapes/organization.svg?raw";
import departmentSvg from "../assets/shapes/department.svg?raw";
import positionSvg from "../assets/shapes/position.svg?raw";
import roleSvg from "../assets/shapes/role.svg?raw";
import reportingLineSvg from "../assets/shapes/reporting-line.svg?raw";
import applicationSvg from "../assets/shapes/application.svg?raw";
import technologySvg from "../assets/shapes/technology.svg?raw";
import businessSvg from "../assets/shapes/business.svg?raw";
import informationSvg from "../assets/shapes/information.svg?raw";
import processSvg from "../assets/shapes/process.svg?raw";
import goalSvg from "../assets/shapes/goal.svg?raw";
import stakeholderSvg from "../assets/shapes/stakeholder.svg?raw";
import dataFlowSvg from "../assets/shapes/data-flow.svg?raw";
import connectionSvg from "../assets/shapes/connection.svg?raw";
import serverSvg from "../assets/shapes/server.svg?raw";
import databaseSvg from "../assets/shapes/database.svg?raw";
import replicationServerSvg from "../assets/shapes/replication-server.svg?raw";
import fileSvg from "../assets/shapes/file.svg?raw";
import xmlSvg from "../assets/shapes/xml.svg?raw";
import sourceSvg from "../assets/shapes/source.svg?raw";
import targetSvg from "../assets/shapes/target.svg?raw";
import transformationSvg from "../assets/shapes/transformation.svg?raw";
import replicationSvg from "../assets/shapes/replication.svg?raw";
import inputSvg from "../assets/shapes/input.svg?raw";
import groupSvg from "../assets/shapes/group.svg?raw";
import matrixSvg from "../assets/shapes/matrix.svg?raw";
import causeeffectSvg from "../assets/shapes/cause-effect.svg?raw";
import riskSvg from "../assets/shapes/riskeffect.svg?raw";
import changeEventSvg from "../assets/shapes/changeevent.svg?raw";
import impactSvg from "../assets/shapes/impact.svg?raw";
import repositorySvg from "../assets/shapes/repository.svg?raw";
import accesspointSvg from "../assets/shapes/accesspoint.svg?raw";
import flowSvg from "../assets/shapes/flow.svg?raw";
import shredSvg from "../assets/shapes/shred.svg?raw";
import secureSvg from "../assets/shapes/secure.svg?raw";
import manageSvg from "../assets/shapes/manage.svg?raw";
import storeSvg from "../assets/shapes/store.svg?raw";
import printSvg from "../assets/shapes/print.svg?raw";
import annotationSvg from "../assets/shapes/annotation.svg?raw";
import connectorlineSvg from "../assets/shapes/connector-line.svg?raw";
import measureSvg from "../assets/shapes/measure.svg?raw";
import dimensionSvg from "../assets/shapes/dimension.svg?raw";
import cubeSvg from "../assets/shapes/cube.svg?raw";
import enumSvg from "../assets/shapes/enum.svg?raw";
import messageflowSvg from "../assets/shapes/message-flow.svg?raw";
import parallelgatewaySvg from "../assets/shapes/parallel-gateway.svg?raw";
import exclusivegatewaySvg from "../assets/shapes/exclusive-gateway.svg?raw";
import eventgatewaySvg from "../assets/shapes/event-gateway.svg?raw";
import callactivitySvg from "../assets/shapes/call-activity.svg?raw";
import transactionSvg from "../assets/shapes/transaction.svg?raw";
import subprocessSvg from "../assets/shapes/subprocess-node.svg?raw";
import inheritanceSvg from "../assets/shapes/inheritance.svg?raw";
import actorSvg from "../assets/shapes/actor.svg?raw";
import sequenceflowSvg from "../assets/shapes/sequence-flow.svg?raw";
import endeventSvg from "../assets/shapes/end-event.svg?raw";
import gatewaySvg from "../assets/shapes/gateway.svg?raw";
import taskactivitySvg from "../assets/shapes/task-activity.svg?raw";

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
// Define model types for the stencil
interface ModelType {
  id: string;
  label: string;
  groupKey: string;
}
// Define the model types with their IDs, labels, and group keys
const MODEL_TYPES: ModelType[] = [
  { id: "mindMap", label: "Mind Map Model", groupKey: "mindMap" },
  {
    id: "businessProcess",
    label: "Business Process Model",
    groupKey: "businessProcess",
  },
  {
    id: "conceptualDataModel",
    label: "Conceptual Data Model",
    groupKey: "conceptualDataModel",
  },
  {
    id: "requirementsModel",
    label: "Requirements Model Stencil",
    groupKey: "requirementsModel",
  },
  {
    id: "physicalDataModel",
    label: "Physical Data Model",
    groupKey: "physicalDataModel",
  },
  {
    id: "logicalDataModel",
    label: "Logical Data Model",
    groupKey: "logicalDataModel",
  },
  {
    id: "objectOrientedModel",
    label: "Object-Oriented Model",
    groupKey: "objectOrientedModel",
  },
  {
    id: "multidimensionalModel",
    label: "Multidimensional Model",
    groupKey: "multidimensionalModel",
  },
  {
    id: "processHierarchyModel",
    label: "Process Hierarchy Model",
    groupKey: "processHierarchyModel",
  },
  { id: "freeModel", label: "Common Tool Stencil", groupKey: "freeModel" },
  {
    id: "organizationalChartModel",
    label: "Organizational Chart Model",
    groupKey: "organizationalChartModel",
  },
  {
    id: "enterpriseArchitectureModel",
    label: "Enterprise Architecture Model",
    groupKey: "enterpriseArchitectureModel",
  },
  {
    id: "dataMovementModel",
    label: "Data Movement Model",
    groupKey: "dataMovementModel",
  },
  {
    id: "informationLifecycleManagement",
    label: "Information Lifecycle Management",
    groupKey: "informationLifecycleManagement",
  },
  {
    id: "impactAnalysisModel",
    label: "Impact Analysis Model",
    groupKey: "impactAnalysisModel",
  },
  {
    id: "dependencyPropagationModel",
    label: "Dependency Propagation Model",
    groupKey: "dependencyPropagationModel",
  },
];

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
  // State to manage selected model types
  const [selectedModelTypes, setSelectedModelTypes] = useState<Set<string>>(
    new Set()
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [folderNames, setFolderNames] = useState<string[]>([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [isPanelHidden, setIsPanelHidden] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const stencilContainerRef = useRef<HTMLDivElement | null>(null);
  const stencilInstanceRef = useRef<any | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  //Handle model type selection
  const handleModelTypeToggle = (modelTypeId: string) => {
    const newSelectedTypes = new Set(selectedModelTypes);
    if (newSelectedTypes.has(modelTypeId)) {
      newSelectedTypes.delete(modelTypeId);
    } else {
      newSelectedTypes.add(modelTypeId);
    }
    setSelectedModelTypes(newSelectedTypes);
  };

  // Get checkbox state for select all
  const getSelectAllState = () => {
    if (selectedModelTypes.size === 0) return "none";
    if (selectedModelTypes.size === MODEL_TYPES.length) return "all";
    return "partial";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
  // Filter groups based on selected model types
  const getFilteredGroups = () => {
    const allGroups = {
      basic: {
        label: "Model Types",
        index: 2,
        closed: !expandedGroups.has("basic"),
      },
      // complex: {
      //   label: "Free Tools",
      //   index: 3,
      //   closed: !expandedGroups.has("freeModel"),
      // },
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
        label: "Common Tool Stencil",
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
    };

    // If no model types selected, show basic and complex groups only
    if (selectedModelTypes.size === 0) {
      return {
        basic: allGroups.basic,
        freeModel: allGroups.freeModel,
      };
    }

    // Filter groups based on selected model types
    const filteredGroups: any = {
      basic: allGroups.basic,
      // freeModel: allGroups.freeModel,
    };

    MODEL_TYPES.forEach((modelType) => {
      if (selectedModelTypes.has(modelType.id)) {
        filteredGroups[modelType.groupKey] =
          allGroups[modelType.groupKey as keyof typeof allGroups];
      }
    });

    return filteredGroups;
  };

  // Get filtered shapes data for loading into stencil
  const getFilteredShapesData = () => {
    const shapesData: any = {};

    // Always include basic and complex
    shapesData.basic = []; // Will be populated with model type buttons
    shapesData.complex = []; // Will be populated with allElements

    // Add selected model types
    MODEL_TYPES.forEach((modelType) => {
      if (selectedModelTypes.has(modelType.id)) {
        shapesData[modelType.groupKey] = [];
      }
    });

    return shapesData;
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
      groups: getFilteredGroups(),
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
          finalElement.attr("image/xlink:href", actorSvg);
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

    // ========== Add Model Type Filter Dropdown to "MODEL TYPES" (basic group) ==========

    const basicLabel = stencil.el.querySelector(
      '[data-name="basic"] .group-label'
    );
    if (basicLabel) {
      // Create dropdown container
      const dropdownContainer = document.createElement("div");
      dropdownContainer.style.cssText = `
        position: relative;
        display: inline-block;
        margin-left: 8px;
        z-index: 3000;
      `;

      // Create dropdown button
      const dropdownBtn = document.createElement("button");
      dropdownBtn.innerHTML = `
        <span class="dropdown-label" style="font-size: 11px;">
    ${
      Array.from(selectedModelTypes)
        .map((id) => MODEL_TYPES.find((type) => type.id === id)?.label)
        .filter(Boolean)
        .join(", ") || "Select Models"
    }
  </span>
      `;
      dropdownBtn.title = "Filter Model Types";
      dropdownBtn.style.cssText = `
        display: flex;
        align-items: center;
        padding: 4px 8px;
        font-size: 11px;
        border-radius: 4px;
        border: 1px solid #2563eb;
        background-color: white;
        color: #2563eb;
        cursor: pointer;
        transition: all 0.2s ease;
      `;

      // Create dropdown menu
      const dropdownMenu = document.createElement("div");
      dropdownMenu.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 220px;
        background: white;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
         z-index: 4000; /* Make sure it's on top of everything */
        display: none;
        max-height: 250px;
        overflow-y: auto;
      `;

      // Create Select All option
      const selectAllOption = document.createElement("div");
      const selectAllState = getSelectAllState();
      selectAllOption.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; cursor: pointer; border-bottom: 1px solid #f3f4f6; font-size: 12px;">
          <div style="width: 14px; height: 14px; border: 1px solid #d1d5db; border-radius: 3px; display: flex; align-items: center; justify-content: center; background: white;">
            ${
              selectAllState === "all"
                ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="3"><polyline points="20,6 9,17 4,12"></polyline></svg>'
                : ""
            }
            ${
              selectAllState === "partial"
                ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="3"><line x1="5" y1="12" x2="19" y2="12"></line></svg>'
                : ""
            }
          </div>
          <span style="font-weight: 500; color: #374151;">Select All</span>
        </div>
      `;
      selectAllOption.addEventListener("mouseover", () => {
        if (selectAllOption.firstElementChild) {
          (
            selectAllOption.firstElementChild as HTMLElement
          ).style.backgroundColor = "#f8fafc";
        }
      });
      selectAllOption.addEventListener("mouseout", () => {
        if (selectAllOption.firstElementChild) {
          (
            selectAllOption.firstElementChild as HTMLElement
          ).style.backgroundColor = "transparent";
        }
      });
      selectAllOption.addEventListener("click", () => {
        // Define handleSelectAll to toggle all model types
        const handleSelectAll = () => {
          if (selectedModelTypes.size === MODEL_TYPES.length) {
            setSelectedModelTypes(new Set());
          } else {
            setSelectedModelTypes(new Set(MODEL_TYPES.map((type) => type.id)));
          }
        };
        handleSelectAll();
        updateDropdownUI();
      });

      // Create individual model type options
      const modelTypeOptions = document.createElement("div");

      const updateDropdownUI = () => {
        // Update button text
        const spanEl = dropdownBtn.querySelector(".dropdown-label");
        if (spanEl) {
          const selectedLabels = Array.from(selectedModelTypes)
            .map((id) => MODEL_TYPES.find((type) => type.id === id)?.label)
            .filter(Boolean);

          spanEl.textContent =
            selectedLabels.length > 0
              ? selectedLabels.join(", ")
              : "Select Models";
        }

        // Update Select All state
        const newSelectAllState = getSelectAllState();
        const selectAllCheckbox = selectAllOption.querySelector("div > div");
        if (selectAllCheckbox) {
          selectAllCheckbox.innerHTML =
            newSelectAllState === "all"
              ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="3"><polyline points="20,6 9,17 4,12"></polyline></svg>'
              : newSelectAllState === "partial"
              ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="3"><line x1="5" y1="12" x2="19" y2="12"></line></svg>'
              : "";
        }

        // Update individual checkboxes
        MODEL_TYPES.forEach((modelType, index) => {
          const option = modelTypeOptions.children[index];
          const checkbox = option.querySelector("div > div");
          if (checkbox) {
            checkbox.innerHTML = selectedModelTypes.has(modelType.id)
              ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="3"><polyline points="20,6 9,17 4,12"></polyline></svg>'
              : "";
          }
        });

        // Re-render stencil with updated selection
        // This will be handled by the existing useEffect
      };

      MODEL_TYPES.forEach((modelType) => {
        const option = document.createElement("div");
        option.innerHTML = `
          <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; cursor: pointer; font-size: 12px;">
            <div style="width: 14px; height: 14px; border: 1px solid #d1d5db; border-radius: 3px; display: flex; align-items: center; justify-content: center; background: white;">
              ${
                selectedModelTypes.has(modelType.id)
                  ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="3"><polyline points="20,6 9,17 4,12"></polyline></svg>'
                  : ""
              }
            </div>
            <span style="color: #374151;">${modelType.label}</span>
          </div>
        `;
        option.addEventListener("mouseover", () => {
          if (option.firstElementChild) {
            (option.firstElementChild as HTMLElement).style.backgroundColor =
              "#f8fafc";
          }
        });
        option.addEventListener("mouseout", () => {
          if (option.firstElementChild) {
            (option.firstElementChild as HTMLElement).style.backgroundColor =
              "transparent";
          }
        });
        option.addEventListener("click", () => {
          handleModelTypeToggle(modelType.id);
          updateDropdownUI();
        });
        modelTypeOptions.appendChild(option);
      });

      // Assemble dropdown
      dropdownMenu.appendChild(selectAllOption);
      dropdownMenu.appendChild(modelTypeOptions);
      dropdownContainer.appendChild(dropdownBtn);
      dropdownContainer.appendChild(dropdownMenu);

      // Toggle dropdown on button click
      dropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        // Fix: normalize current display state (in case it's empty)
        const currentDisplay = dropdownMenu.style.display.trim();
        const isVisible = currentDisplay === "block";

        // Toggle display
        dropdownMenu.style.display = isVisible ? "none" : "block";

        // Optional: scroll to top of dropdown every time it's opened
        if (!isVisible) {
          dropdownMenu.scrollTop = 0;
        }

        // Optional debug
        console.log(`Dropdown is now ${isVisible ? "hidden" : "shown"}`);
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        const target = e.target as Node | null;
        if (dropdownContainer && !dropdownContainer.contains(target)) {
          dropdownMenu.style.display = "none";
        }
      });

      // Hover effects for button
      dropdownBtn.addEventListener("mouseover", () => {
        dropdownBtn.style.backgroundColor = "#eff6ff";
        dropdownBtn.style.borderColor = "#3b82f6";
      });
      dropdownBtn.addEventListener("mouseout", () => {
        dropdownBtn.style.backgroundColor = "white";
        dropdownBtn.style.borderColor = "#2563eb";
      });

      basicLabel.appendChild(dropdownContainer);
      console.log("Dropdown container added to basicLabel");
    }
    stencilContainerRef.current.style.position = "relative";

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

    const createBoundedIcon = (
      title: string,
      svg: string,
      isCollapsed: boolean
    ) => {
      const size = isCollapsed
        ? { width: 36, height: 36 }
        : { width: 60, height: 60 };
      const imageSize = isCollapsed ? 30 : 50;
      const imageOffset = isCollapsed ? 3 : 5;

      const labelAttrs = isCollapsed
        ? { text: "" } // No label
        : {
            text: title,
            fontSize: 11,
            textAnchor: "middle",
            x: 30,
            y: 58,
          };

      return new shapes.standard.Image({
        size,
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
            width: imageSize,
            height: imageSize,
            x: imageOffset,
            y: imageOffset,
          },
          label: labelAttrs,
        },
      });
    };

    const topicShape = createBoundedIcon("Topic", topicSvg, isPanelCollapsed);
    const subtopicShape = createBoundedIcon(
      "Subtopic",
      subtopicSvg,
      isPanelCollapsed
    );
    const linkShape = createBoundedIcon("Link", linkSvg, isPanelCollapsed);

    const noteShape = createBoundedIcon("Note", noteSvg, isPanelCollapsed);

    const startEventShape = createBoundedIcon(
      "Start Event",
      startEventSvg,
      isPanelCollapsed
    );

    const taskActivityShape = createBoundedIcon(
      "Task/Activity",
      taskactivitySvg,
      isPanelCollapsed
    );

    const gatewayShape = createBoundedIcon(
      "Gateway",
      gatewaySvg,
      isPanelCollapsed
    );

    const endEventShape = createBoundedIcon(
      "End Event",
      endeventSvg,
      isPanelCollapsed
    );

    const sequenceFlowShape = createBoundedIcon(
      "Sequence Flow",
      sequenceflowSvg,
      isPanelCollapsed
    );

    const requirementShape = createBoundedIcon(
      "Requirement",
      requirementSvg,
      isPanelCollapsed
    );

    const usecaseShape = createBoundedIcon(
      "Use Case",
      useCaseSvg,
      isPanelCollapsed
    );

    const EntitySvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer rounded rectangle (table frame) -->
  <rect x="7" y="10" width="36" height="30" rx="3" />
  <!-- Horizontal divider for header -->
  <line x1="7" y1="18" x2="43" y2="18" />
</svg>





`;
    const EntityShape = createBoundedIcon(
      "Entity",
      EntitySvg,
      isPanelCollapsed
    );

    const TableSvg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 50 50"
  stroke="currentColor"
  fill="none"
  stroke-width="0.5"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <!-- Main outer rectangle for the table -->
  <rect x="10" y="10" width="30" height="30" rx="3" ry="3" />

  <!-- Top row separator -->
  <path d="M 10 17.5 H 40" />

  <!-- Middle row separator -->
  <path d="M 10 25 H 40" />
  
  <!-- Bottom row separator -->
  <path d="M 10 32.5 H 40" />

  <!-- Added column from the 2nd row to the end -->
  <path d="M 20 17.5 V 40" />
</svg>
`;
    const TableShape = createBoundedIcon("Table", TableSvg, isPanelCollapsed);

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
    const EntitystencilShape = createBoundedIcon(
      "Entity",
      EntitystencilSvg,
      isPanelCollapsed
    );

    const ActorShape = createBoundedIcon("Actor", actorSvg, isPanelCollapsed);

    const stakeholderShape = createBoundedIcon(
      "Stakeholder",
      stakeholderSvg,
      isPanelCollapsed
    );

    const InheritanceShape = createBoundedIcon(
      "Inheritance",
      inheritanceSvg,
      isPanelCollapsed
    );

    const InheritanceLDMShape = createBoundedIcon(
      "Inheritance",
      inheritanceSvg,
      isPanelCollapsed
    );

    const onetoNSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
  xmlns="http://www.w3.org/2000/svg"
  stroke="currentColor" fill="none" stroke-width="0.5">

  <!-- Left vertical bar (One) -->
<line x1="2" y1="21" x2="2" y2="29"/>

  <!-- Horizontal connector -->
  <line x1="2" y1="25" x2="42" y2="25"/>

  <!-- Right side Crow’s foot (Many) with reduced angle -->
  <line x1="42" y1="25" x2="48" y2="21"/>
  <line x1="42" y1="25" x2="48" y2="25"/>
  <line x1="42" y1="25" x2="48" y2="29"/>
</svg>



`;
    const onetoNShape = createBoundedIcon(
      "1:N Relationship",
      onetoNSvg,
      isPanelCollapsed
    );

    const OneToNSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
  xmlns="http://www.w3.org/2000/svg"
  stroke="currentColor" fill="none" stroke-width="0.5">

  <!-- Left vertical bar (One) -->
<line x1="2" y1="21" x2="2" y2="29"/>

  <!-- Horizontal connector -->
  <line x1="2" y1="25" x2="42" y2="25"/>

  <!-- Right side Crow’s foot (Many) with reduced angle -->
  <line x1="42" y1="25" x2="48" y2="21"/>
  <line x1="42" y1="25" x2="48" y2="25"/>
  <line x1="42" y1="25" x2="48" y2="29"/>
</svg>


`;
    const OneToNShape = createBoundedIcon(
      "1:N Relationship",
      OneToNSvg,
      isPanelCollapsed
    );

    const onetooneSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5">

  <!-- Horizontal connector -->
  <line x1="2" y1="25" x2="48" y2="25"/>

  <!-- Left vertical bar -->
 <line x1="2" y1="21" x2="2" y2="29"/>

  <!-- Right vertical bar -->
 <line x1="48" y1="21" x2="48" y2="29"/>
</svg>




`;
    const onetooneShape = createBoundedIcon(
      "1:1 Relationship",
      onetooneSvg,
      isPanelCollapsed
    );

    const OneToOneSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5">

  <!-- Horizontal connector -->
  <line x1="2" y1="25" x2="48" y2="25"/>

  <!-- Left vertical bar -->
 <line x1="2" y1="21" x2="2" y2="29"/>

  <!-- Right vertical bar -->
 <line x1="48" y1="21" x2="48" y2="29"/>
</svg>



`;
    const OneToOneShape = createBoundedIcon(
      "1:1 Relationship",
      OneToOneSvg,
      isPanelCollapsed
    );

    const OnetoOneSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5">

  <!-- Horizontal connector -->
  <line x1="2" y1="25" x2="48" y2="25"/>

  <!-- Left vertical bar -->
 <line x1="2" y1="21" x2="2" y2="29"/>

  <!-- Right vertical bar -->
 <line x1="48" y1="21" x2="48" y2="29"/>
</svg>


`;
    const OnetoOneShape = createBoundedIcon(
      "1:1 Relationship",
      OnetoOneSvg,
      isPanelCollapsed
    );

    const NtoNSvg = `<svg viewBox="0 0 50 50" width="50" height="50"
     fill="none" stroke="currentColor" stroke-width="0.5"
     xmlns="http://www.w3.org/2000/svg">
  <!-- Horizontal connector -->
  <line x1="2" y1="25" x2="48" y2="25"/>

  <!-- Left Crow’s foot (narrower angle) -->
  <line x1="8" y1="25" x2="2" y2="21"/>
  <line x1="8" y1="25" x2="2" y2="25"/>
  <line x1="8" y1="25" x2="2" y2="29"/>

  <!-- Right Crow’s foot (narrower angle) -->
  <line x1="42" y1="25" x2="48" y2="21"/>
  <line x1="42" y1="25" x2="48" y2="25"/>
  <line x1="42" y1="25" x2="48" y2="29"/>
</svg>




`;
    const NtoNShape = createBoundedIcon(
      "N:N Relationship",
      NtoNSvg,
      isPanelCollapsed
    );

    const ntonSvg = `<svg viewBox="0 0 50 50" width="50" height="50"
     fill="none" stroke="currentColor" stroke-width="0.5"
     xmlns="http://www.w3.org/2000/svg">
  <!-- Horizontal connector -->
  <line x1="2" y1="25" x2="48" y2="25"/>

  <!-- Left Crow’s foot (narrower angle) -->
  <line x1="8" y1="25" x2="2" y2="21"/>
  <line x1="8" y1="25" x2="2" y2="25"/>
  <line x1="8" y1="25" x2="2" y2="29"/>

  <!-- Right Crow’s foot (narrower angle) -->
  <line x1="42" y1="25" x2="48" y2="21"/>
  <line x1="42" y1="25" x2="48" y2="25"/>
  <line x1="42" y1="25" x2="48" y2="29"/>
</svg>




`;
    const ntonShape = createBoundedIcon(
      "N:N Relationship",
      ntonSvg,
      isPanelCollapsed
    );

    const goalShape = createBoundedIcon("Goal", goalSvg, isPanelCollapsed);

    const SubProcessShape = createBoundedIcon(
      "Sub Process",
      subprocessSvg,
      isPanelCollapsed
    );

    const TransactionShape = createBoundedIcon(
      "Transaction",
      transactionSvg,
      isPanelCollapsed
    );

    const CallActivityShape = createBoundedIcon(
      "Call Activity",
      callactivitySvg,
      isPanelCollapsed
    );

    const ExclusiveGatewayShape = createBoundedIcon(
      "Exclusive Gateway",
      exclusivegatewaySvg,
      isPanelCollapsed
    );

    const EventGatewayShape = createBoundedIcon(
      "Event Gateway",
      eventgatewaySvg,
      isPanelCollapsed
    );

    const ParallelGatewayShape = createBoundedIcon(
      "Parallel Gateway",
      parallelgatewaySvg,
      isPanelCollapsed
    );

    const MessageFlowShape = createBoundedIcon(
      "Message Flow",
      messageflowSvg,
      isPanelCollapsed
    );

    const AssociationSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5"
     >
  <!-- Dashed horizontal line (centered, with padding) -->
  <line x1="2" y1="25" x2="48" y2="25" stroke-dasharray="2 2" />
</svg>

`;
    const AssociationShape = createBoundedIcon(
      "Association",
      AssociationSvg,
      isPanelCollapsed
    );
    const associationSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5"
     >
  <!-- Dashed horizontal line (centered, with padding) -->
  <line x1="2" y1="25" x2="48" y2="25" stroke-dasharray="2 2" />
</svg>
`;
    const associationShape = createBoundedIcon(
      "Association",
      associationSvg,
      isPanelCollapsed
    );

    const anchorlinkShape = createBoundedIcon(
      "Anchor Link",
      anchorLinkSvg,
      isPanelCollapsed
    );

    const classShape = createBoundedIcon("Class", classSvg, isPanelCollapsed);

    const interfaceShape = createBoundedIcon(
      "Interface",
      interfaceSvg,
      isPanelCollapsed
    );

    const enumShape = createBoundedIcon("Enum", enumSvg, isPanelCollapsed);
    //package needs to be fixed.
    const PackagestencilSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg">
  <!-- Main server body -->
  <rect x="3" y="15" width="42" height="30" rx="2" ry="2"/>
  
  <!-- Header / label slot -->
  <rect x="3" y="10" width="15" height="5"/>
  
  <!-- Lights / slots -->
  <rect x="12" y="24" width="4" height="6"/>
  <rect x="22" y="30" width="4" height="6"/>
  <rect x="32" y="24" width="4" height="6"/>
</svg>


`;
    const PackagestencilShape = createBoundedIcon(
      "Package",
      PackagestencilSvg,
      isPanelCollapsed
    );

    const cubeShape = createBoundedIcon("Cube", cubeSvg, isPanelCollapsed);

    const dimensionShape = createBoundedIcon(
      "Dimension",
      dimensionSvg,
      isPanelCollapsed
    );

    const measureShape = createBoundedIcon(
      "Measure",
      measureSvg,
      isPanelCollapsed
    );

    const freeNodeShape = createBoundedIcon(
      "Free Node",
      freeNodeSvg,
      isPanelCollapsed
    );

    const freeGroupShape = createBoundedIcon(
      "Group",
      groupSvg,
      isPanelCollapsed
    );

    const connectorLineShape = createBoundedIcon(
      "Connector Line",
      connectorlineSvg,
      isPanelCollapsed
    );

    const annotationShape = createBoundedIcon(
      "Annotation",
      annotationSvg,
      isPanelCollapsed
    );

    const titleboxShape = createBoundedIcon(
      "Title Box",
      titleBoxSvg,
      isPanelCollapsed
    );

    const processNodeShape = createBoundedIcon(
      "Process Node",
      processNodeSvg,
      isPanelCollapsed
    );

    const subprocessNodeShape = createBoundedIcon(
      "Subprocess Node",
      subprocessNodeSvg,
      isPanelCollapsed
    );

    const activityNodeShape = createBoundedIcon(
      "Activity Node",
      activityNodeSvg,
      isPanelCollapsed
    );

    const organizationShape = createBoundedIcon(
      "Organization",
      organizationSvg,
      isPanelCollapsed
    );

    const departmentShape = createBoundedIcon(
      "Department",
      departmentSvg,
      isPanelCollapsed
    );

    const roleShape = createBoundedIcon("Role", roleSvg, isPanelCollapsed);

    const positionShape = createBoundedIcon(
      "Position",
      positionSvg,
      isPanelCollapsed
    );

    const reportingLineShape = createBoundedIcon(
      "Reporting Line",
      reportingLineSvg,
      isPanelCollapsed
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
    const groupShape = createBoundedIcon(
      "Group",
      groupStencilSvg,
      isPanelCollapsed
    );

    const businessCapabilityShape = createBoundedIcon(
      "Business",
      businessSvg,
      isPanelCollapsed
    );

    const applicationShape = createBoundedIcon(
      "Application",
      applicationSvg,
      isPanelCollapsed
    );

    const technologyComponentShape = createBoundedIcon(
      "Technology",
      technologySvg,
      isPanelCollapsed
    );

    const dataObjecttShape = createBoundedIcon(
      "Database",
      databaseSvg,
      isPanelCollapsed
    );

    const processShape = createBoundedIcon(
      "Process",
      processSvg,
      isPanelCollapsed
    );

    const sourceShape = createBoundedIcon(
      "Source",
      sourceSvg,
      isPanelCollapsed
    );

    const targetShape = createBoundedIcon(
      "Target",
      targetSvg,
      isPanelCollapsed
    );

    const DataFlowShape = createBoundedIcon(
      "Data Flow",
      dataFlowSvg,
      isPanelCollapsed
    );

    const TransformationShape = createBoundedIcon(
      "Transformation",
      transformationSvg,
      isPanelCollapsed
    );

    const ServerShape = createBoundedIcon(
      "Server",
      serverSvg,
      isPanelCollapsed
    );

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
    const DatabaseShape = createBoundedIcon(
      "Database",
      DatabaseSvg,
      isPanelCollapsed
    );

    const xmlShape = createBoundedIcon("XML", xmlSvg, isPanelCollapsed);

    const businessProcessShape = createBoundedIcon(
      "Business Process",
      businessProcessSvg,
      isPanelCollapsed
    );

    const replicationShape = createBoundedIcon(
      "Replication",
      replicationSvg,
      isPanelCollapsed
    );

    const ReplicationServerShape = createBoundedIcon(
      "Replication Server",
      replicationServerSvg,
      isPanelCollapsed
    );

    const ConnectionShape = createBoundedIcon(
      "Connection",
      connectionSvg,
      isPanelCollapsed
    );

    const informationNodeShape = createBoundedIcon(
      "Information",
      informationSvg,
      isPanelCollapsed
    );

    const inputShape = createBoundedIcon("Input", inputSvg, isPanelCollapsed);

    const printShape = createBoundedIcon("Print", printSvg, isPanelCollapsed);

    const StoreShape = createBoundedIcon("Store", storeSvg, isPanelCollapsed);

    const ManageShape = createBoundedIcon(
      "Manage",
      manageSvg,
      isPanelCollapsed
    );

    const secureShape = createBoundedIcon(
      "Secure",
      secureSvg,
      isPanelCollapsed
    );

    const shredShape = createBoundedIcon("Shred", shredSvg, isPanelCollapsed);

    const flowShape = createBoundedIcon("Flow", flowSvg, isPanelCollapsed);

    const AccessPoint = createBoundedIcon(
      "Access Point",
      accesspointSvg,
      isPanelCollapsed
    );

    const Repository = createBoundedIcon(
      "Repository",
      repositorySvg,
      isPanelCollapsed
    );

    const impactNodeShape = createBoundedIcon(
      "Impact",
      impactSvg,
      isPanelCollapsed
    );

    const changeEventShape = createBoundedIcon(
      "Change Event",
      changeEventSvg,
      isPanelCollapsed
    );

    const riskEffectShape = createBoundedIcon(
      "Risk/Effect",
      riskSvg,
      isPanelCollapsed
    );

    const causeEffectLinkShape = createBoundedIcon(
      "Cause-Effect Link",
      causeeffectSvg,
      isPanelCollapsed
    );

    const mitigationStrategyShape = createBoundedIcon(
      "Mitigation",
      mitigationSvg,
      isPanelCollapsed
    );

    const matrixShape = createBoundedIcon(
      "Matrix",
      matrixSvg,
      isPanelCollapsed
    );

    const entitySvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer rounded rectangle (table frame) -->
  <rect x="7" y="10" width="36" height="30" rx="3" />
  <!-- Horizontal divider for header -->
  <line x1="7" y1="18" x2="43" y2="18" />
</svg>



`;
    const entityShape = createBoundedIcon(
      "Entity",
      entitySvg,
      isPanelCollapsed
    );

    const DependencyLinkSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 25h44" stroke-dasharray="2 1"/>
  <path d="M44 21l4 4-4 4" stroke-dasharray="2 1"/>
</svg>


`;
    const DependencyLinkShape = createBoundedIcon(
      "Dependency Link",
      DependencyLinkSvg,
      isPanelCollapsed
    );
    const packageSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg">
  <!-- Main server body -->
  <rect x="3" y="15" width="42" height="30" rx="2" ry="2"/>
  
  <!-- Header / label slot -->
  <rect x="3" y="10" width="15" height="5"/>
  
  <!-- Lights / slots -->
  <rect x="12" y="24" width="4" height="6"/>
  <rect x="22" y="30" width="4" height="6"/>
  <rect x="32" y="24" width="4" height="6"/>
</svg>
`;
    const packagelinkShape = createBoundedIcon(
      "Package",
      packageSvg,
      isPanelCollapsed
    );

    const PackageSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg">
  <!-- Main server body -->
  <rect x="4" y="15" width="42" height="30" rx="2" ry="2"/>
  
  <!-- Header / label slot -->
  <rect x="4" y="10" width="15" height="5"/>
  
  <!-- Lights / slots -->
  <rect x="12" y="24" width="4" height="6"/>
  <rect x="22" y="30" width="4" height="6"/>
  <rect x="32" y="24" width="4" height="6"/>
</svg>

`;
    const PackagelinkShape = createBoundedIcon(
      "Package",
      PackageSvg,
      isPanelCollapsed
    );

    const ViewShape = createBoundedIcon("View", viewSvg, isPanelCollapsed);

    const ReferenceShape = createBoundedIcon(
      "Reference",
      referenceSvg,
      isPanelCollapsed
    );

    const ProcedureShape = createBoundedIcon(
      "Procedure",
      procedureSvg,
      isPanelCollapsed
    );

    const FileIconShape = createBoundedIcon("File", fileSvg, isPanelCollapsed);

    const portShape = createBoundedIcon("Port", portSvg, isPanelCollapsed);
    //Important

    const generalizationShape = createBoundedIcon(
      "Generalization",
      generalizationSvg,
      isPanelCollapsed
    );

    const aggregationShape = createBoundedIcon(
      "Aggregation",
      aggregationSvg,
      isPanelCollapsed
    );

    const compositionShape = createBoundedIcon(
      "Composition",
      compositionSvg,
      isPanelCollapsed
    );
    const dependencySvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 25h44" stroke-dasharray="2 1"/>
  <path d="M44 21l4 4-4 4" stroke-dasharray="2 1"/>
</svg>



`;
    const dependencyShape = createBoundedIcon(
      "Dependency",
      dependencySvg,
      isPanelCollapsed
    );
    // Prepare filtered shapes data
    const shapesToLoad: any = {};

    // Always load complex group
    shapesToLoad.freeModel = [
      freeNodeShape,
      groupShape,
      linkShape,
      noteShape,
      titleboxShape,
    ];

    // Load shapes for selected model types only
    if (selectedModelTypes.has("mindMap")) {
      shapesToLoad.mindMap = [topicShape, subtopicShape, noteShape, linkShape];
    }

    if (selectedModelTypes.has("businessProcess")) {
      shapesToLoad.businessProcess = [
        startEventShape,
        taskActivityShape,
        gatewayShape,
        endEventShape,
        sequenceFlowShape,
        // Add other business process shapes as they're defined
        SubProcessShape,
        TransactionShape,
        CallActivityShape,
        ExclusiveGatewayShape,
        EventGatewayShape,
        ParallelGatewayShape,
        MessageFlowShape,
        AssociationShape,
      ];
    }

    if (selectedModelTypes.has("conceptualDataModel")) {
      shapesToLoad.conceptualDataModel = [
        EntityShape,
        InheritanceShape,
        onetoNShape,
        NtoNShape,
        onetooneShape,
      ];
    }

    if (selectedModelTypes.has("requirementsModel")) {
      shapesToLoad.requirementsModel = [
        requirementShape,
        usecaseShape,
        linkShape,
        ActorShape,
        stakeholderShape,
        goalShape,
      ];
    }

    if (selectedModelTypes.has("physicalDataModel")) {
      shapesToLoad.physicalDataModel = [
        TableShape,
        packagelinkShape,
        ViewShape,
        ReferenceShape,
        ProcedureShape,
        FileIconShape,
      ];
    }
    if (selectedModelTypes.has("objectOrientedModel")) {
      shapesToLoad.objectOrientedModel = [
        classShape,
        interfaceShape,
        enumShape,
        PackagestencilShape,
        portShape,
        generalizationShape,
        aggregationShape,
        compositionShape,
        dependencyShape,
        associationShape,
      ];
    }
    if (selectedModelTypes.has("multidimensionalModel")) {
      shapesToLoad.multidimensionalModel = [
        cubeShape,
        dimensionShape,
        measureShape,
      ];
    }

    if (selectedModelTypes.has("processHierarchyModel")) {
      shapesToLoad.processHierarchyModel = [
        processNodeShape,
        subprocessNodeShape,
        activityNodeShape,
      ];
    }

    if (selectedModelTypes.has("freeModel")) {
      shapesToLoad.freeModel = [
        freeNodeShape,
        groupShape,
        linkShape,
        noteShape,
        titleboxShape,
      ];
    }
    if (selectedModelTypes.has("organizationalChartModel")) {
      shapesToLoad.organizationalChartModel = [
        organizationShape,
        departmentShape,
        roleShape,
        positionShape,
        reportingLineShape,
      ];
    }
    if (selectedModelTypes.has("enterpriseArchitectureModel")) {
      shapesToLoad.enterpriseArchitectureModel = [
        businessCapabilityShape,
        applicationShape,
        processShape,
        positionShape,
        connectorLineShape,
        DatabaseShape,
      ];
    }
    if (selectedModelTypes.has("dataMovementModel")) {
      shapesToLoad.dataMovementModel = [
        sourceShape,
        targetShape,
        DataFlowShape,
        ServerShape,
        xmlShape,
        businessProcessShape,
        replicationShape,
        ReplicationServerShape,
        ConnectionShape,
        packagelinkShape,
        DatabaseShape,
      ];
    }

    if (selectedModelTypes.has("informationLifecycleManagement")) {
      shapesToLoad.informationLifecycleManagement = [
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
      ];
    }

    if (selectedModelTypes.has("impactAnalysisModel")) {
      shapesToLoad.impactAnalysisModel = [
        impactNodeShape,
        changeEventShape,
        riskEffectShape,
        causeEffectLinkShape,
        mitigationStrategyShape,
      ];
    }

    if (selectedModelTypes.has("dependencyPropagationModel")) {
      shapesToLoad.dependencyPropagationModel = [
        matrixShape,
        entityShape,
        dependencyShape,
      ];
    }

    if (selectedModelTypes.has("logicalDataModel")) {
      shapesToLoad.logicalDataModel = [
        EntityShape,
        InheritanceShape,
        OneToNShape,
        onetooneShape,
      ];
    }

    // Load all shapes into stencil
    stencil.load(shapesToLoad);

    stencilInstanceRef.current = stencil;

    return () => {
      stencilInstanceRef.current?.remove();
      stencilInstanceRef.current = null;
    };
  }, [paper, graph, selectedModelTypes, expandedGroups, isPanelCollapsed]);

  const selectAllState = getSelectAllState();

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
                {/* <div>
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
                </div> */}

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
                      <div
                        // className="bg-blue-50 border border-blue-200 rounded-lg p-3"
                        ref={stencilContainerRef}
                        className="stencil-container"
                        style={{
                          minHeight: "500px",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          backgroundColor: "#ffffff",
                        }}
                      ></div>
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
