import { useEffect, useRef, useState, useCallback } from "react";
import iconCollapse from "../assets/inspector/icon-collapse.svg";
import iconExpand from "../assets/inspector/icon-expand.svg";
import iconSlide from "../assets/navigator/right-arrows.png";
import { paletteGroups, stencilElements } from "../config/stencil";
import { dia, ui, shapes } from "@joint/plus";
import * as joint from "@joint/core";
import { createEREntity } from "../config/customShapes";
import ffmsquareSvg from "../assets/shapes/ffm-sqaure.svg?raw";
import ffmrectangleSvg from "../assets/shapes/ffm.rectangle.svg?raw";
import ffmellipseSvg from "../assets/shapes/ffm-ellispe.svg?raw";
import ffmcircleSvg from "../assets/shapes/ffm-circle.svg?raw";
import ffmtraingleSvg from "../assets/shapes/ffm-traingle.svg?raw";
import ffmdiamondSvg from "../assets/shapes/ffm.diamond.svg?raw";
import ffmhexagonSvg from "../assets/shapes/ffm.hexagon.svg?raw";
import ffmcylinderSvg from "../assets/shapes/ffm-cylinder.svg?raw";
import mmdtopicSvg from "../assets/shapes/mmd-topic.svg?raw";
import oomportSvg from "../assets/shapes/oom-port.svg?raw";
import pdmreferenceSvg from "../assets/shapes/pdm-reference.svg?raw";
import mmdsubtopicSvg from "../assets/shapes/mmd-subtopic.svg?raw";
import mmdnoteSvg from "../assets/shapes/mmd-note.svg?raw";
import bpmstarteventSvg from "../assets/shapes/bpm-startevent.svg?raw";
import phmprocessnodeSvg from "../assets/shapes/phm-process-node.svg?raw";
import ctlinkSvg from "../assets/shapes/ct-link.svg?raw";
import mmdlinkSvg from "../assets/shapes/mmd-link.svg?raw";
import phmactivitynodeSvg from "../assets/shapes/phm-activity-node.svg?raw";
import rmrequirementSvg from "../assets/shapes/rm-requirement.svg?raw";
import iammitigationSvg from "../assets/shapes/iam-mitigation.svg?raw";
import rmusecaseSvg from "../assets/shapes/rm-usecase.svg?raw";
import rmactorSvg from "../assets/shapes/rm-actor.svg?raw";
import rmlinkSvg from "../assets/shapes/rm-link.svg?raw";
import cdmentitySvg from "../assets/shapes/cdm-native-entity.svg?raw";
import cdmclonedEntitySvg from "../assets/shapes/cdm-entity-cloned.svg?raw";
import cdmreferenceentitySvg from "../assets/shapes/cdm-entity-reference.svg?raw";
import ldmreferenceentitySvg from "../assets/shapes/ldm-entity-referenced.svg?raw";
import ldmclonedEntitySvg from "../assets/shapes/ldm-cloned-entity.svg?raw";
import iamrefernceentitySvg from "../assets/shapes/iam-reference-entity.svg?raw";
import iamclonedEntitySvg from "../assets/shapes/iamclonedentity.svg?raw";
import oomclassSvg from "../assets/shapes/oom-class.svg?raw";
import oominterfaceSvg from "../assets/shapes/oom-interface.svg?raw";
import oompackageSvg from "../assets/shapes/oom-package.svg?raw";
import pdmpackageSvg from "../assets/shapes/pdm-package.svg?raw";
import oomgeneralizationSvg from "../assets/shapes/oom-generalization.svg?raw";
import oomassociationSvg from "../assets/shapes/oom-association.svg?raw";
import oomaggregationSvg from "../assets/shapes/oom-aggregation.svg?raw";
import oomcompositionSvg from "../assets/shapes/oom-composition.svg?raw";
import bpmassociationSvg from "../assets/shapes/bpm-association.svg?raw";
import oomdependencySvg from "../assets/shapes/oom-dependency.svg?raw";
import pdmtableSvg from "../assets/shapes/pdm-table.svg?raw";
import pdmviewSvg from "../assets/shapes/pdm-view.svg?raw";
import pdmprocedureSvg from "../assets/shapes/pdm-procedure.svg?raw";
import cdmonetonRelationshipSvg from "../assets/shapes/cdm-1ton-relationship.svg?raw";
import cdmonetoonerelationshipSvg from "../assets/shapes/cdm-1to1-relationship.svg?raw";
import cdmntonRealtionshipSvg from "../assets/shapes/cdm-nton-relationship.svg?raw";
import eambusinessSvg from "../assets/shapes/eam-business.svg?raw";
import ctfreenodeSvg from "../assets/shapes/ct-free-node.svg?raw";
import ctanchorlinkSvg from "../assets/shapes/ct-anchor-link.svg?raw";
import cttitleboxSvg from "../assets/shapes/ct-title-box.svg?raw";
import ocmorganizationSvg from "../assets/shapes/ocm-organization.svg?raw";
import ocmdepartmentSvg from "../assets/shapes/ocm-department.svg?raw";
import ocmpositionSvg from "../assets/shapes/ocm-position.svg?raw";
import ocmroleSvg from "../assets/shapes/ocm-role.svg?raw";
import ocmreportinglineSvg from "../assets/shapes/ocm-reporting-line.svg?raw";
import eamapplicationSvg from "../assets/shapes/eam-application.svg?raw";
import eamtechnologySvg from "../assets/shapes/eam-technology.svg?raw";
import dmmbusinessSvg from "../assets/shapes/dmm-business.svg?raw";
import ilminformationSvg from "../assets/shapes/ilm-information.svg?raw";
import eamprocessSvg from "../assets/shapes/eam-process.svg?raw";
import rmgoalSvg from "../assets/shapes/rm-goal.svg?raw";
import rmstakeholderSvg from "../assets/shapes/rm-stakeholder.svg?raw";
import dmmdataflowSvg from "../assets/shapes/dmm-data-flow.svg?raw";
import dmmdatabaseSvg from "../assets/shapes/dmm-database.svg?raw";
import dmmconnectionSvg from "../assets/shapes/dmm-connection.svg?raw";
import dmmpackageSvg from "../assets/shapes/dmm-package.svg?raw";
import dmmserverSvg from "../assets/shapes/dmm-server.svg?raw";
import eamdatabaseSvg from "../assets/shapes/eam-database.svg?raw";
import dmmreplicationserverSvg from "../assets/shapes/dmm-replication-server.svg?raw";
import pdmfileSvg from "../assets/shapes/pdm-file.svg?raw";
import dmmxmlSvg from "../assets/shapes/dmm-xml.svg?raw";
import dmmsourceSvg from "../assets/shapes/dmm-source.svg?raw";
import dmmtargetSvg from "../assets/shapes/dmm-target.svg?raw";
import dmmtransformationSvg from "../assets/shapes/dmm-transformation.svg?raw";
import dmmreplicationSvg from "../assets/shapes/dmm-replication.svg?raw";
import ilminputSvg from "../assets/shapes/ilm-input.svg?raw";
import ctgroupSvg from "../assets/shapes/ct-group.svg?raw";
import ctnoteSvg from "../assets/shapes/ct-note.svg?raw";
import ocmgroupSvg from "../assets/shapes/ocm-group.svg?raw";
import iammatrixSvg from "../assets/shapes/iam-matrix.svg?raw";
import iamentitySvg from "../assets/shapes/iam-entity.svg?raw";
import iamdependencySvg from "../assets/shapes/iam-dependency-link.svg?raw";
import iamcauseeffectSvg from "../assets/shapes/iam-cause-effect.svg?raw";
import iamriskSvg from "../assets/shapes/iam-risk.svg?raw";
import iamchangeeventSvg from "../assets/shapes/iam-change-event.svg?raw";
import iamimapactSvg from "../assets/shapes/iam-imapact.svg?raw";
import ilmrepositorySvg from "../assets/shapes/ilm-repository.svg?raw";
import ilmaccesspointSvg from "../assets/shapes/ilm-access-point.svg?raw";
import ilmflowSvg from "../assets/shapes/ilm-flow.svg?raw";
import ilmshredSvg from "../assets/shapes/ilm-shred.svg?raw";
import ilmsecureSvg from "../assets/shapes/ilm-secure.svg?raw";
import ilmmanageSvg from "../assets/shapes/ilm-manage.svg?raw";
import ilmstoreSvg from "../assets/shapes/ilm-store.svg?raw";
import ilmprintSvg from "../assets/shapes/ilm-print.svg?raw";
import ilmannotationSvg from "../assets/shapes/ilm-annotation.svg?raw";
import ldmentitySvg from "../assets/shapes/ldm-entity.svg?raw";
import ldminteritanceSvg from "../assets/shapes/ldm-inheritance.svg?raw";
import ldmonetooneSvg from "../assets/shapes/ldm-1to1-relationship.svg?raw";
import ldmonetomanySvg from "../assets/shapes/ldm-1ton-relationship.svg?raw";
import eamconnectorlineSvg from "../assets/shapes/eam-connector-line.svg?raw";
import mdmmeasureSvg from "../assets/shapes/mdm-measure.svg?raw";
import mdmdimensionSvg from "../assets/shapes/mdm-dimension.svg?raw";
import mdmcubevg from "../assets/shapes/mdm-cube.svg?raw";
import oomenumSvg from "../assets/shapes/oom-enum.svg?raw";
import bpmmessageflowSvg from "../assets/shapes/bpm-messageflow.svg?raw";
import bpmparallelgatewaySvg from "../assets/shapes/bpm-parallelgateway.svg?raw";
import bpmexclusivegatewaySvg from "../assets/shapes/bpm-exclusivegateway.svg?raw";
import bpmeventgatewaySvg from "../assets/shapes/bpm-eventgateway.svg?raw";
import bpmcallactivitySvg from "../assets/shapes/bpm-callactivity.svg?raw";
import bpmtransactionSvg from "../assets/shapes/bpm-transaction.svg?raw";
import bpmsubprocessSvg from "../assets/shapes/bpm-subprocess.svg?raw";
import phmsubprocessnodeSvg from "../assets/shapes/phm-subprocess-node.svg?raw";
import cdminheritanceSvg from "../assets/shapes/cdm-inheritance.svg?raw";
import bpmsequenceflowSvg from "../assets/shapes/bpm-sequenceflow.svg?raw";
import bpmendeventSvg from "../assets/shapes/bpm-endevent.svg?raw";
import bpmgatewaySvg from "../assets/shapes/bpm-gateway.svg?raw";
import bpmtaskactivitySvg from "../assets/shapes/bpm-taskactivity.svg?raw";

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

const createSafeBusinessProcessShapes = () => {
  try {
    // Start Event - Green Circle
    const startEventShape = new shapes.standard.Circle({
      size: { width: 40, height: 40 },
      attrs: {
        body: {
          fill: "#90EE90",
          stroke: "#228B22",
          "stroke-width": 2,
        },
        label: {
          text: "Start",
          fill: "#228B22",
          "font-size": 10,
          "font-weight": "bold",
        },
      },
    });

    // Task Activity - Blue Rectangle
    const taskActivityShape = new shapes.standard.Rectangle({
      size: { width: 100, height: 60 },
      attrs: {
        body: {
          fill: "#E6F3FF",
          stroke: "#4A90E2",
          "stroke-width": 2,
          rx: 10,
          ry: 10,
        },
        label: {
          text: "Task",
          fill: "#2E5A8A",
          "font-size": 12,
          "font-weight": "bold",
        },
      },
    });

    // End Event - Red Circle with thick border
    const endEventShape = new shapes.standard.Circle({
      size: { width: 40, height: 40 },
      attrs: {
        body: {
          fill: "#FFB6C1",
          stroke: "#DC143C",
          "stroke-width": 4,
        },
        label: {
          text: "End",
          fill: "#DC143C",
          "font-size": 10,
          "font-weight": "bold",
        },
      },
    });

    // Sequence Flow - Simple Link
    const sequenceFlowShape = new shapes.standard.Link({
      attrs: {
        line: {
          stroke: "#333",
          "stroke-width": 2,
          targetMarker: {
            type: "path",
            d: "M 10 -5 0 0 10 5 z",
            fill: "#333",
          },
        },
      },
    });

    // Sub Process - Larger green rectangle
    const subProcessShape = new shapes.standard.Rectangle({
      size: { width: 120, height: 80 },
      attrs: {
        body: {
          fill: "#F0F8E6",
          stroke: "#7CB342",
          "stroke-width": 2,
          rx: 10,
          ry: 10,
        },
        label: {
          text: "Sub Process",
          fill: "#4A7C59",
          "font-size": 12,
          "font-weight": "bold",
        },
      },
    });

    // Gateway - Diamond shape using Path
    const gatewayShape = new shapes.standard.Path({
      size: { width: 50, height: 50 },
      attrs: {
        body: {
          d: "M 25 0 L 50 25 L 25 50 L 0 25 Z",
          fill: "#FFF0F5",
          stroke: "#FF1493",
          "stroke-width": 2,
        },
        label: {
          text: "X",
          fill: "#FF1493",
          "font-size": 16,
          "font-weight": "bold",
          "text-anchor": "middle",
          "dominant-baseline": "central",
        },
      },
    });

    // Message Flow - Dashed link
    const messageFlowShape = new shapes.standard.Link({
      attrs: {
        line: {
          stroke: "#4A90E2",
          "stroke-width": 2,
          "stroke-dasharray": "5,5",
          targetMarker: {
            type: "circle",
            r: 3,
            fill: "white",
            stroke: "#4A90E2",
          },
        },
      },
    });

    // Association - Dotted link
    const associationShape = new shapes.standard.Link({
      attrs: {
        line: {
          stroke: "#666",
          "stroke-width": 1,
          "stroke-dasharray": "3,3",
        },
      },
    });

    console.log("Safe business process shapes created successfully");

    return {
      startEventShape,
      taskActivityShape,
      endEventShape,
      sequenceFlowShape,
      subProcessShape,
      gatewayShape,
      messageFlowShape,
      associationShape,
    };
  } catch (error) {
    console.error("Error creating safe business process shapes:", error);
    return {};
  }
};
// Define the model types with their IDs, labels, and group keys

const MODEL_TYPES: ModelType[] = [
  { id: "mindMap", label: "Mind Map Model", groupKey: "mindMap" },
  {
    id: "businessProcess",
    label: "Business Process Model",
    groupKey: "businessProcess",
  },
  {
    id: "freeFormModel",
    label: "Free Form Model",
    groupKey: "freeFormModel",
  },
  {
    id: "conceptualDataModel",
    label: "Conceptual Data Model",
    groupKey: "conceptualDataModel",
  },
  {
    id: "requirementsModel",
    label: "Requirements Model",
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
    label: "Information Lifecycle Management Model",
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
// Define diagram type interface
interface DiagramType {
  id: string;
  label: string;
  modelTypeId: string;
}
// Define diagram types based on your spreadsheet data
const DIAGRAM_TYPES: DiagramType[] = [
  // Mind Map Model
  { id: "mindMapDiagram", label: "Mind Map Diagram", modelTypeId: "mindMap" },
  // Add this entry to your DIAGRAM_TYPES array
  {
    id: "freeFormModelDiagram",
    label: "Free Form Model Diagram",
    modelTypeId: "freeFormModel",
  },

  // Business Process Model
  {
    id: "processFlowDiagram",
    label: "Process Flow Diagram",
    modelTypeId: "businessProcess",
  },
  {
    id: "gatewayDiagram",
    label: "Gateway Diagram",
    modelTypeId: "businessProcess",
  },
  {
    id: "subprocessDiagram",
    label: "Subprocess Diagram",
    modelTypeId: "businessProcess",
  },

  // Conceptual Data Model
  {
    id: "conceptualDataModelDiagram",
    label: "Conceptual Data Model Diagram",
    modelTypeId: "conceptualDataModel",
  },

  // Requirements Model
  {
    id: "requirementsDiagram",
    label: "Requirements Diagram",
    modelTypeId: "requirementsModel",
  },

  // Physical Data Model
  {
    id: "physicalDataModelDiagram",
    label: "Physical Data Model Diagram",
    modelTypeId: "physicalDataModel",
  },

  // Object-Oriented Model
  {
    id: "classDiagram",
    label: "Class Diagram",
    modelTypeId: "objectOrientedModel",
  },
  {
    id: "componentDiagram",
    label: "Component Diagram",
    modelTypeId: "objectOrientedModel",
  },
  {
    id: "useCaseDiagram",
    label: "Use Case Diagram",
    modelTypeId: "objectOrientedModel",
  },

  // Multidimensional Model
  {
    id: "multidimensionalDiagram",
    label: "Multidimensional Diagram",
    modelTypeId: "multidimensionalModel",
  },

  // Process Hierarchy Model
  {
    id: "processTreeDiagram",
    label: "Process Tree Diagram",
    modelTypeId: "processHierarchyModel",
  },

  // Common Tool Stencil
  {
    id: "freeformDiagram",
    label: "Freeform Diagram",
    modelTypeId: "freeModel",
  },

  // Organizational Chart Model
  {
    id: "organizationalChart",
    label: "Organizational Chart",
    modelTypeId: "organizationalChartModel",
  },

  // Enterprise Architecture Model
  {
    id: "layeredArchitecture",
    label: "Layered Architecture",
    modelTypeId: "enterpriseArchitectureModel",
  },
  {
    id: "applicationMap",
    label: "Application Map",
    modelTypeId: "enterpriseArchitectureModel",
  },

  // Data Movement Model
  {
    id: "dataMovementDiagram",
    label: "Data Movement Diagram",
    modelTypeId: "dataMovementModel",
  },

  // Information Lifecycle Management
  {
    id: "informationLifecycleDiagram",
    label: "Information Lifecycle Diagram",
    modelTypeId: "informationLifecycleManagement",
  },

  // Impact Analysis Model
  {
    id: "impactAnalysisDiagram",
    label: "Impact Analysis Diagram",
    modelTypeId: "impactAnalysisModel",
  },

  // Dependency Propagation Model
  {
    id: "dependencyMatrixDiagram",
    label: "Dependency Matrix Diagram",
    modelTypeId: "dependencyPropagationModel",
  },

  // Logical Data Model
  {
    id: "logicalDataModelDiagram",
    label: "Logical Data Model Diagram",
    modelTypeId: "logicalDataModel",
  },
];

// Symbol type definitions based on your spreadsheet data
const SYMBOL_TYPES = {
  // Mind Map symbols
  mindMapDiagram: ["Topic", "Subtopic", "Link", "Note"],

  // Business Process symbols
  processFlowDiagram: [
    "Start Event",
    "Task/Activity",
    "End Event",
    "Sequence Flow",
    "Sub Process",
    "Transaction",
    "Call Activity",
  ],
  gatewayDiagram: [
    "Gateway",
    "Exclusive Gateway",
    "Event Gateway",
    "Parallel Gateway",
  ],
  subprocessDiagram: ["Message Flow", "Association"],

  // Conceptual Data Model symbols
  conceptualDataModelDiagram: [
    "Entity",
    "Inheritance",
    "1:N Relationship",
    "1:1 Relationship",
    "N-N Relationship",
  ],

  // Requirements Model symbols
  requirementsDiagram: [
    "Requirement",
    "Use Case",
    "Link",
    "Actor",
    "Stakeholder",
    "Goal",
  ],

  // Physical Data Model symbols
  physicalDataModelDiagram: [
    "Table",
    "Package",
    "View",
    "Reference",
    "Procedure",
    "File",
  ],

  // Object-Oriented Model symbols
  classDiagram: [
    "Class",
    "Interface",
    "Enum",
    "Package",
    "Aggregation",
    "Composition",
  ],
  componentDiagram: ["Port", "Dependency"],
  useCaseDiagram: ["Generalization", "Association"],

  // Other diagram types can be added here...
  multidimensionalDiagram: ["Cube", "Dimension", "Measure"],
  processTreeDiagram: ["Process Node", "Subprocess Node", "Activity Node"],
  freeformDiagram: [
    "Free Node",
    "Group",
    "Link",
    "Note",
    "Title Box",
    "Anchor Link",
  ],
  organizationalChart: [
    "Organization",
    "Department",
    "Role",
    "Position",
    "Reporting Line",
    "Group",
  ],
  layeredArchitecture: ["Business", "Process", "Connector Line", "Database"],
  applicationMap: ["Application", "Technology"],
  dataMovementDiagram: [
    "Source",
    "Target",
    "Data Flow",
    "Server",
    "Database",
    "XML",
    "Business process",
    "Replication",
    "Replication Server",
    "Connection",
    "Package",
    "Transformation",
  ],
  informationLifecycleDiagram: [
    "Information",
    "Input",
    "Print",
    "Store",
    "Manage",
    "Secure",
    "Shred",
    "Flow",
    "Access Point",
    "Repository",
    "Annotation",
  ],
  impactAnalysisDiagram: [
    "Impact",
    "Change Event",
    "Risk/Effect",
    "Cause/Effect Link",
    "Mitigation",
  ],
  dependencyMatrixDiagram: ["Matrix", "Entity", "Dependency Link"],
  logicalDataModelDiagram: [
    "Entity",
    "Inheritance",
    "1:1 Relationship",
    "1:N Relationship",
  ],
};

const Stencil = ({ paper, graph }: StencilProps) => {
  const [openSection, setOpenSection] = useState<string | null>("stencil");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set([
      // "basic",
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
  const [selectedModelType, setSelectedModelType] = useState<string | null>(
    null // Default to first model type
  );
  const [selectedDiagramType, setSelectedDiagramType] = useState<string | null>(
    null
  );
  const [isLinkingMode, setIsLinkingMode] = useState<boolean>(false);
  const [firstSelectedNode, setFirstSelectedNode] =
    useState<dia.Element | null>(null);
  const [linkType, setLinkType] = useState<string>("default");

  // Refs for tracking
  const linkingModeRef = useRef<boolean>(false);
  const firstNodeRef = useRef<dia.Element | null>(null);
  const linkTypeRef = useRef<string>("default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [folderNames, setFolderNames] = useState<string[]>([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [isPanelHidden, setIsPanelHidden] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const stencilContainerRef = useRef<HTMLDivElement | null>(null);
  const stencilInstanceRef = useRef<any | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Browser storage keys
  const STORAGE_KEYS = {
    MODEL_TYPE: "diagram_app_selected_model_type",
    DIAGRAM_TYPE: "diagram_app_selected_diagram_type",
    STENCIL_STATE: "diagram_app_stencil_state",
  };
  // Utility functions for browser storage
  const saveToStorage = (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  };

  const getFromStorage = (key: string, defaultValue: any = null) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.warn("Failed to load from localStorage:", error);
      return defaultValue;
    }
  };

  // Initialize state from browser storage on component mount
  useEffect(() => {
    const storedModelType = getFromStorage(STORAGE_KEYS.MODEL_TYPE);
    const storedDiagramType = getFromStorage(STORAGE_KEYS.DIAGRAM_TYPE);

    if (
      storedModelType &&
      MODEL_TYPES.some((mt) => mt.id === storedModelType)
    ) {
      setSelectedModelType(storedModelType);

      // Only set diagram type if it's valid for the stored model type
      if (storedDiagramType) {
        const availableDiagramTypes = DIAGRAM_TYPES.filter(
          (dt) => dt.modelTypeId === storedModelType
        );
        if (availableDiagramTypes.some((dt) => dt.id === storedDiagramType)) {
          setSelectedDiagramType(storedDiagramType);
        }
      }
    }
  }, []); // Empty dependency array - only run on mount

  // Save to storage whenever selections change
  useEffect(() => {
    if (selectedModelType) {
      saveToStorage(STORAGE_KEYS.MODEL_TYPE, selectedModelType);
    }
  }, [selectedModelType]);

  useEffect(() => {
    if (selectedDiagramType) {
      saveToStorage(STORAGE_KEYS.DIAGRAM_TYPE, selectedDiagramType);
    }
  }, [selectedDiagramType]);

  // --- REVISED HANDLERS WRAPPED IN useCallback ---

  // Handles toggling openSection for collapsible sections
  const handleSectionClick = useCallback((section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  }, []);

  // Updated handlers wrapped in useCallback
  const getAvailableDiagramTypes = useCallback(() => {
    if (!selectedModelType) return [];
    return DIAGRAM_TYPES.filter((dt) => dt.modelTypeId === selectedModelType);
  }, [selectedModelType]);

  const handleModelTypeSelect = useCallback((modelTypeId: string) => {
    setSelectedModelType(modelTypeId);

    const availableDiagramTypes = DIAGRAM_TYPES.filter(
      (dt) => dt.modelTypeId === modelTypeId
    );

    if (availableDiagramTypes.length > 0) {
      // Auto-select first diagram type
      setSelectedDiagramType(availableDiagramTypes[0].id);
    } else {
      // No diagram types → go straight to stencil
      setSelectedDiagramType(null);
    }

    // Reset linking mode
    setIsLinkingMode(false);
    setFirstSelectedNode(null);
  }, []);

  useEffect(() => {
    linkingModeRef.current = isLinkingMode;
    firstNodeRef.current = firstSelectedNode;
    linkTypeRef.current = linkType;
  }, [isLinkingMode, firstSelectedNode, linkType]);

  const handleDiagramTypeSelect = useCallback((diagramTypeId: string) => {
    setSelectedDiagramType(diagramTypeId);
    // Reset linking mode when diagram type changes
    setIsLinkingMode(false);
    setFirstSelectedNode(null);
  }, []);

  const getFilteredGroups = () => {
    const allGroups = {
      basic: {
        label: "Model Types",
        index: 1,
        closed: !expandedGroups.has("basic"),
      },
      // Add this in the allGroups object in getFilteredGroups()
      freeFormModel: {
        label: "Free Form Model Stencil",
        index: 21, // Or appropriate index
        closed: false,
      },
      diagramTypes: {
        label: "Diagram Types",
        index: 2,
        closed: !expandedGroups.has("diagramTypes"),
      },
      // Common Tool Stencil - Always rendered
      freeModel: {
        label: "Common Tool Stencil",
        index: 3,
        closed: !expandedGroups.has("freeModel"),
      },
      // // Separator group
      // separator: {
      //   label: "───────────────────",
      //   index: 4,
      //   closed: true,
      //   disabled: true,
      // },
      // Dynamic groups based on selection
      complex: {
        label: "Stencil Tools",
        index: 5,
        closed: !expandedGroups.has("complex"),
      },
      mindMap: {
        label: "Mind Map Stencil",
        index: 6,
        closed: !expandedGroups.has("mindMap"),
      },
      businessProcess: {
        label: "Business Process Model",
        index: 7,
        closed: !expandedGroups.has("businessProcess"),
      },
      requirementsModel: {
        label: "Requirements Model Stencil",
        index: 8,
        closed: !expandedGroups.has("requirementsModel"),
      },
      conceptualDataModel: {
        label: "Conceptual Data Model",
        index: 9,
        closed: !expandedGroups.has("conceptualDataModel"),
      },
      logicalDataModel: {
        label: "Logical Data Model Stencil",
        index: 10,
        closed: !expandedGroups.has("logicalDataModel"),
      },
      physicalDataModel: {
        label: "Physical Data Model",
        index: 11,
        closed: !expandedGroups.has("physicalDataModel"),
      },
      objectOrientedModel: {
        label: "Object-Oriented Model",
        index: 12,
        closed: !expandedGroups.has("objectOrientedModel"),
      },
      multidimensionalModel: {
        label: "Multidimensional Model",
        index: 13,
        closed: !expandedGroups.has("multidimensionalModel"),
      },
      processHierarchyModel: {
        label: "Process Hierarchy Model",
        index: 14,
        closed: !expandedGroups.has("processHierarchyModel"),
      },
      organizationalChartModel: {
        label: "Organizational Chart Model Stencil",
        index: 15,
        closed: !expandedGroups.has("organizationalChartModel"),
      },
      enterpriseArchitectureModel: {
        label: "Enterprise Architecture Model Stencil",
        index: 16,
        closed: !expandedGroups.has("enterpriseArchitectureModel"),
      },
      dataMovementModel: {
        label: "Data Movement Model Stencil",
        index: 17,
        closed: !expandedGroups.has("dataMovementModel"),
      },
      informationLifecycleManagement: {
        label: "Information Lifecycle Management Stencil",
        index: 18,
        closed: !expandedGroups.has("informationLifecycleManagement"),
      },
      impactAnalysisModel: {
        label: "Impact Analysis Model Stencil",
        index: 19,
        closed: !expandedGroups.has("impactAnalysisModel"),
      },
      dependencyPropagationModel: {
        label: "Dependency Propagation Model",
        index: 20,
        closed: !expandedGroups.has("dependencyPropagationModel"),
      },
    };

    if (!selectedModelType) {
      return {
        basic: allGroups.basic,
        diagramTypes: allGroups.diagramTypes,
        //complex: allGroups.complex,
      };
    }

    if (!selectedModelType) {
      return {
        basic: allGroups.basic,
        diagramTypes: allGroups.diagramTypes,
        //complex: allGroups.complex,
      };
    }

    // Only show the selected model type's group
    const filteredGroups: any = {
      basic: allGroups.basic,
      diagramTypes: allGroups.diagramTypes,
      freeModel: allGroups.freeModel, // Common Tool Stencil always included
    };
    // Add separator only if there's a selected model type
    if (selectedModelType) {
      // filteredGroups.separator = allGroups.separator;
      // filteredGroups.complex = allGroups.complex;

      // Add the specific model type group
      const selectedModel = MODEL_TYPES.find(
        (mt) => mt.id === selectedModelType
      );
      if (selectedModel && selectedModel.groupKey !== "freeModel") {
        // Don't duplicate freeModel
        filteredGroups[selectedModel.groupKey] =
          allGroups[selectedModel.groupKey as keyof typeof allGroups];
      }
    }

    return filteredGroups;
  };

  // Helper function to create different types of links
  const createLink = useCallback(
    (source: dia.Element, target: dia.Element, linkType: string) => {
      let link;

      switch (linkType) {
        case "sequenceFlow":
          link = new shapes.standard.Link({
            source: { id: source.id },
            target: { id: target.id },
            attrs: {
              line: {
                stroke: "#2563eb",
                strokeWidth: 2,
                targetMarker: {
                  type: "path",
                  d: "M 10 -5 0 0 10 5 z",
                  fill: "#2563eb",
                  stroke: "#2563eb",
                },
              },
            },
            labels: [
              {
                attrs: {
                  text: {
                    text: "Sequence Flow",
                    fontSize: 12,
                    fill: "#666",
                  },
                },
              },
            ],
          });
          break;

        case "messageFlow":
          link = new shapes.standard.Link({
            source: { id: source.id },
            target: { id: target.id },
            attrs: {
              line: {
                stroke: "#dc2626",
                strokeWidth: 2,
                strokeDasharray: "5,5",
                targetMarker: {
                  type: "circle",
                  r: 4,
                  fill: "#dc2626",
                  stroke: "#dc2626",
                },
              },
            },
            labels: [
              {
                attrs: {
                  text: {
                    text: "Message Flow",
                    fontSize: 12,
                    fill: "#666",
                  },
                },
              },
            ],
          });
          break;

        case "association":
          link = new shapes.standard.Link({
            source: { id: source.id },
            target: { id: target.id },
            attrs: {
              line: {
                stroke: "#16a34a",
                strokeWidth: 2,
                strokeDasharray: "3,3",
                targetMarker: {
                  type: "path",
                  d: "M 8 -4 0 0 8 4",
                  fill: "none",
                  stroke: "#16a34a",
                  strokeWidth: 2,
                },
              },
            },
            labels: [
              {
                attrs: {
                  text: {
                    text: "Association",
                    fontSize: 12,
                    fill: "#666",
                  },
                },
              },
            ],
          });
          break;

        case "inheritance":
          link = new shapes.standard.Link({
            source: { id: source.id },
            target: { id: target.id },
            attrs: {
              line: {
                stroke: "#7c3aed",
                strokeWidth: 2,
                targetMarker: {
                  type: "path",
                  d: "M 12 -6 0 0 12 6 z",
                  fill: "white",
                  stroke: "#7c3aed",
                  strokeWidth: 2,
                },
              },
            },
            labels: [
              {
                attrs: {
                  text: {
                    text: "Inheritance",
                    fontSize: 12,
                    fill: "#666",
                  },
                },
              },
            ],
          });
          break;

        case "dependency":
          link = new shapes.standard.Link({
            source: { id: source.id },
            target: { id: target.id },
            attrs: {
              line: {
                stroke: "#ea580c",
                strokeWidth: 2,
                strokeDasharray: "8,4",
                targetMarker: {
                  type: "path",
                  d: "M 10 -5 0 0 10 5 z",
                  fill: "#ea580c",
                  stroke: "#ea580c",
                },
              },
            },
            labels: [
              {
                attrs: {
                  text: {
                    text: "Dependency",
                    fontSize: 12,
                    fill: "#666",
                  },
                },
              },
            ],
          });
          break;

        case "dataFlow":
          link = new shapes.standard.Link({
            source: { id: source.id },
            target: { id: target.id },
            attrs: {
              line: {
                stroke: "#0891b2",
                strokeWidth: 3,
                targetMarker: {
                  type: "path",
                  d: "M 14 -7 0 0 14 7 z",
                  fill: "#0891b2",
                  stroke: "#0891b2",
                },
              },
            },
            labels: [
              {
                attrs: {
                  text: {
                    text: "Data Flow",
                    fontSize: 12,
                    fill: "#666",
                  },
                },
              },
            ],
          });
          break;

        default:
          link = new shapes.standard.Link({
            source: { id: source.id },
            target: { id: target.id },
            attrs: {
              line: {
                stroke: "#374151",
                strokeWidth: 2,
                targetMarker: {
                  type: "path",
                  d: "M 10 -5 0 0 10 5 z",
                  fill: "#374151",
                  stroke: "#374151",
                },
              },
            },
          });
      }

      // Make links interactive - allow editing and deletion
      link.attr("line/strokeOpacity", 0.8);

      return link;
    },
    []
  );

  // Function to handle node clicking during linking mode
  const handleNodeClick = useCallback(
    (cellView: dia.CellView, evt: dia.Event) => {
      if (!linkingModeRef.current || !cellView.model.isElement()) return;

      const clickedElement = cellView.model as dia.Element;

      if (!firstNodeRef.current) {
        // First node selection
        setFirstSelectedNode(clickedElement);

        // Visual feedback for first selected node
        clickedElement.attr("body/stroke", "#dc2626");
        clickedElement.attr("body/strokeWidth", 3);

        console.log("First node selected:", clickedElement.id);
      } else {
        // Second node selection - create link
        if (firstNodeRef.current.id !== clickedElement.id) {
          const link = createLink(
            firstNodeRef.current,
            clickedElement,
            linkTypeRef.current
          );
          graph.addCell(link);

          console.log(
            "Link created between:",
            firstNodeRef.current.id,
            "and",
            clickedElement.id
          );
        }

        // Reset linking mode and visual feedback
        firstNodeRef.current.attr("body/stroke", null);
        firstNodeRef.current.attr("body/strokeWidth", null);
        setFirstSelectedNode(null);
        setIsLinkingMode(false);
        setLinkType("default");

        // Update cursor
        if (paper) {
          paper.el.style.cursor = "default";
        }
      }
    },
    [graph, paper, createLink]
  );

  // Function to check if an element is a link tool
  const isLinkTool = useCallback((element: dia.Element): boolean => {
    const linkTools = [
      "sequenceFlowShape",
      "messageFlowShape",
      "associationShape",
      "linkShape",
      "inheritanceShape",
      "dependencyShape",
      "dataFlowShape",
      "connectionShape",
      "onetoNShape",
      "onetooneShape",
      "aggregationShape",
      "compositionShape",
      "generalizationShape",
      "reportingLineShape",
      "connectorLineShape",
      "causeEffectLinkShape",
      "dependencyLinkShape",
      "flowShape",
    ];

    // Check by element type or custom attribute
    const elementType = element.get("type");
    const elementTitle =
      element.attr("root/title") || element.attr("label/text") || "";

    return linkTools.some(
      (tool) =>
        elementType.includes("Link") ||
        elementType.includes("Flow") ||
        elementTitle.toLowerCase().includes("link") ||
        elementTitle.toLowerCase().includes("flow") ||
        elementTitle.toLowerCase().includes("connection")
    );
  }, []);

  // Function to determine link type from element
  const getLinkTypeFromElement = useCallback((element: dia.Element): string => {
    const elementTitle =
      element.attr("root/title") || element.attr("label/text") || "";
    const elementType = element.get("type");

    if (elementTitle.includes("Sequence") || elementType.includes("sequence"))
      return "sequenceFlow";
    if (elementTitle.includes("Message") || elementType.includes("message"))
      return "messageFlow";
    if (
      elementTitle.includes("Association") ||
      elementType.includes("association")
    )
      return "association";
    if (
      elementTitle.includes("Inheritance") ||
      elementType.includes("inheritance")
    )
      return "inheritance";
    if (
      elementTitle.includes("Dependency") ||
      elementType.includes("dependency")
    )
      return "dependency";
    if (elementTitle.includes("Data") || elementType.includes("data"))
      return "dataFlow";

    return "default";
  }, []);

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

      // In the stencil configuration, update dragStartClone:
      dragStartClone: (cell: dia.Element) => {
        // Check if it's a link tool
        if (isLinkTool(cell)) {
          const linkType = getLinkTypeFromElement(cell);
          setLinkType(linkType);
          setIsLinkingMode(true);
          setFirstSelectedNode(null);

          // Change cursor to indicate linking mode
          if (paper) {
            paper.el.style.cursor = "crosshair";
          }

          console.log("Link tool selected, entering linking mode:", linkType);
          return null; // Don't create a draggable clone for link tools
        }

        // Create a proper clone with a new unique ID for regular shapes
        const clone = cell.clone();
        clone.set("id", undefined); // Remove ID to force new one
        return clone;
      },
      dragEndClone: (cell: dia.Element) => {
        // Skip if it's a link tool (handled in dragStartClone)
        if (isLinkTool(cell)) {
          return null;
        }
        // Create a completely new element with unique ID
        const finalElement = cell.clone();

        // Force a new unique ID
        finalElement.set("id", undefined);
        finalElement.set("id", joint.util.uuid());

        // Reset any shared references to prevent conflicts
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
        } else if (finalElement.attr("root/title") === "Composition") {
          const newSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Resized, centered diamond -->
  <path d="M12 25L20 17L28 25L20 33Z" fill="currentColor" fill-opacity="0.4" />
  
  <!-- Extended line -->
  <line x1="28" y1="25" x2="48" y2="25" />
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(120, 60);
          finalElement.attr("label/text", ""); // remove the old label
        } else if (finalElement.attr("root/title") === "Aggregation") {
          const newSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Left-shifted diamond -->
  <path d="M7 25L15 17L23 25L15 33Z" />
  
  <!-- Horizontal line from right edge of diamond to far right -->
  <line x1="23" y1="25" x2="48" y2="25" />
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(120, 60);
          finalElement.attr("label/text", ""); // remove the old label
        } else if (finalElement.attr("root/title") === "Port") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
  <!-- Example container -->
  <rect x="5" y="5" width="30" height="30" fill="white" stroke="#374151" stroke-width="0.5"/>
  
  <!-- Port -->
  <rect x="30" y="16" width="8" height="8" fill="white" stroke="#374151" stroke-width="0.5"/>
</svg>
`;
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
        } else if (finalElement.attr("root/title") === "Generalization") {
          const newSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg">
  <polygon points="25,10 17,28 33,28"/>
  <line x1="25" y1="28" x2="25" y2="40"/>
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
        } else if (finalElement.attr("root/title") === "Measure") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100">
  <!-- Outer Border -->
  <rect x="1" y="1" width="198" height="98" fill="white" stroke="#374151" stroke-width="0.5"/>
  
  <!-- Header -->
  <rect x="1" y="1" width="198" height="28" fill="#e5e7eb" stroke="#374151" stroke-width="0.5"/>
  
  <!-- Title -->
  <text x="100" y="18" font-size="14" text-anchor="middle" fill="#111827" font-family="Arial, sans-serif">Measure</text>
  
  <!-- Ruler icon in header -->
  <rect x="170" y="8" width="20" height="8" fill="white" stroke="#374151" stroke-width="0.3"/>
  <line x1="172" y1="8" x2="172" y2="16" stroke="#374151" stroke-width="0.3"/>
  <line x1="176" y1="8" x2="176" y2="16" stroke="#374151" stroke-width="0.3"/>
  <line x1="180" y1="8" x2="180" y2="16" stroke="#374151" stroke-width="0.3"/>
  <line x1="184" y1="8" x2="184" y2="16" stroke="#374151" stroke-width="0.3"/>
  
  <!-- Example attributes -->
  <text x="10" y="48" font-size="12" fill="#374151" font-family="Arial, sans-serif">length</text>
  <text x="10" y="68" font-size="12" fill="#374151" font-family="Arial, sans-serif">width</text>
  <text x="10" y="88" font-size="12" fill="#374151" font-family="Arial, sans-serif">height</text>
</svg>
`;
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
        } else if (finalElement.attr("root/title") === "Dependency") {
          const newSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 25h44" stroke-dasharray="2 1"/>
  <path d="M44 21l4 4-4 4" stroke-dasharray="2 1"/>
</svg>
`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(100, 100);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Enumeration") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120">
  <!-- Outer Border -->
  <rect x="1" y="1" width="198" height="118" fill="white" stroke="#374151" stroke-width="2"/>
  
  <!-- Header -->
  <rect x="1" y="1" width="198" height="28" fill="#e5e7eb" stroke="#374151" stroke-width="2"/>
  <text x="100" y="20" font-size="14" text-anchor="middle" fill="#111827" font-family="Arial, sans-serif">Enumeration</text>
  
  <!-- Bullet Points -->
  <circle cx="15" cy="50" r="3" fill="#374151"/>
  <text x="25" y="54" font-size="12" fill="#374151" font-family="Arial, sans-serif">Value 1</text>
  
  <circle cx="15" cy="70" r="3" fill="#374151"/>
  <text x="25" y="74" font-size="12" fill="#374151" font-family="Arial, sans-serif">Value 2</text>
  
  <circle cx="15" cy="90" r="3" fill="#374151"/>
  <text x="25" y="94" font-size="12" fill="#374151" font-family="Arial, sans-serif">Value 3</text>
</svg>
`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(100, 100);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "1:N Relationship") {
          const newSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
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
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(100, 100);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "1:1 Relationship") {
          const newSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5">

  <!-- Horizontal connector -->
  <line x1="2" y1="25" x2="48" y2="25"/>

  <!-- Left vertical bar -->
 <line x1="2" y1="21" x2="2" y2="29"/>

  <!-- Right vertical bar -->
 <line x1="48" y1="21" x2="48" y2="29"/>
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(100, 100);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "N:N Relationship") {
          const newSvg = `<svg viewBox="0 0 50 50" width="50" height="50"
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
</svg>`;
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
        } else if (finalElement.attr("root/title") === "Sub Process Node") {
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
        } else if (finalElement.attr("root/title") === "Free Node") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
  <rect x="5" y="15" width="40" height="20" rx="6" ry="6" fill="white" stroke="#374151" stroke-width="0.5"/>
</svg>

`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(200, 80);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Free Node") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
  <rect x="5" y="15" width="40" height="20" rx="6" ry="6" fill="white" stroke="#374151" stroke-width="0.5"/>
</svg>

`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(200, 80);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Requirement") {
          const newSvg = `<svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="5" width="190" height="90" rx="5" ry="5" fill="#FAFFF5" stroke="#2F855A" stroke-width="1"/>

  <line x1="5" y1="35" x2="195" y2="35" stroke="#2F855A" stroke-width="1"/>

  <text x="10" y="25" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#2F855A">
    RED-001
  </text>

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
        } else if (finalElement.attr("root/title") === "Stakeholder") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" role="img" aria-labelledby="stakeholderTitle">
  <title id="stakeholderTitle">Stakeholder</title>

  <!-- Left Figure -->
  <!-- Head -->
  <circle cx="24" cy="12" r="8" fill="none" stroke="#374151" stroke-width="2"/>
  <!-- Body -->
  <line x1="24" y1="20" x2="24" y2="56" stroke="#374151" stroke-width="2"/>
  <!-- Arms -->
  <line x1="8" y1="32" x2="40" y2="32" stroke="#374151" stroke-width="2"/>
  <!-- Legs -->
  <line x1="24" y1="56" x2="8" y2="88" stroke="#374151" stroke-width="2"/>
  <line x1="24" y1="56" x2="40" y2="88" stroke="#374151" stroke-width="2"/>

  <!-- Right Figure -->
  <!-- Head -->
  <circle cx="72" cy="12" r="8" fill="none" stroke="#374151" stroke-width="2"/>
  <!-- Body -->
  <line x1="72" y1="20" x2="72" y2="56" stroke="#374151" stroke-width="2"/>
  <!-- Arms -->
  <line x1="56" y1="32" x2="88" y2="32" stroke="#374151" stroke-width="2"/>
  <!-- Legs -->
  <line x1="72" y1="56" x2="56" y2="88" stroke="#374151" stroke-width="2"/>
  <line x1="72" y1="56" x2="88" y2="88" stroke="#374151" stroke-width="2"/>

  <!-- Label -->
  <text x="48" y="96" font-size="14" text-anchor="middle" fill="#374151" font-family="Arial, sans-serif">
    Stakeholder
  </text>
</svg>
`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(120, 180);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Goal") {
          const newSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none" stroke="currentColor" stroke-width="0.5">
  <circle cx="25" cy="25" r="22" />
  <circle cx="25" cy="25" r="12" />
  <circle cx="25" cy="25" r="4"  />
</svg>
`;
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
        } else if (finalElement.attr("root/title") === "Table") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="140" viewBox="0 0 180 140" role="img" aria-labelledby="tableCanvasTitle">
  <title id="tableCanvasTitle">Table</title>

  <!-- Outer Border -->
  <rect x="1" y="1" width="178" height="138" fill="white" stroke="#374151" stroke-width="2"/>

  <!-- Header Background -->
  <rect x="1" y="1" width="178" height="28" fill="#e5e7eb" stroke="#374151" stroke-width="2"/>

  <!-- Header Text -->
  <text x="90" y="20" font-size="14" text-anchor="middle" fill="#111827" font-family="Arial, sans-serif">
    Table Name
  </text>

  <!-- Row Lines -->
  <line x1="1" y1="42" x2="179" y2="42" stroke="#d1d5db" stroke-width="1"/>
  <line x1="1" y1="62" x2="179" y2="62" stroke="#d1d5db" stroke-width="1"/>
  <line x1="1" y1="82" x2="179" y2="82" stroke="#d1d5db" stroke-width="1"/>
  <line x1="1" y1="102" x2="179" y2="102" stroke="#d1d5db" stroke-width="1"/>
  <line x1="1" y1="122" x2="179" y2="122" stroke="#d1d5db" stroke-width="1"/>

  <!-- Field Names -->
  <text x="10" y="38" font-size="12" fill="#374151" font-family="Arial, sans-serif">id</text>
  <text x="10" y="58" font-size="12" fill="#374151" font-family="Arial, sans-serif">name</text>
  <text x="10" y="78" font-size="12" fill="#374151" font-family="Arial, sans-serif">created_at</text>
  <text x="10" y="98" font-size="12" fill="#374151" font-family="Arial, sans-serif">updated_at</text>
  <text x="10" y="118" font-size="12" fill="#374151" font-family="Arial, sans-serif">status</text>
</svg>
`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(150, 80);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "View") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="140" viewBox="0 0 180 140" role="img" aria-labelledby="viewCanvasTitle">
  <title id="viewCanvasTitle">View</title>

  <!-- Outer Dashed Border -->
  <rect x="1" y="1" width="178" height="138" fill="white" stroke="#374151" stroke-width="2" stroke-dasharray="6,4"/>

  <!-- Header Background -->
  <rect x="1" y="1" width="178" height="28" fill="#e5e7eb" stroke="#374151" stroke-width="2" stroke-dasharray="6,4"/>

  <!-- Header Text -->
  <text x="90" y="20" font-size="14" text-anchor="middle" fill="#111827" font-family="Arial, sans-serif">
    View Name
  </text>

  <!-- Row Lines -->
  <line x1="1" y1="42" x2="179" y2="42" stroke="#d1d5db" stroke-width="1"/>
  <line x1="1" y1="62" x2="179" y2="62" stroke="#d1d5db" stroke-width="1"/>
  <line x1="1" y1="82" x2="179" y2="82" stroke="#d1d5db" stroke-width="1"/>
  <line x1="1" y1="102" x2="179" y2="102" stroke="#d1d5db" stroke-width="1"/>
  <line x1="1" y1="122" x2="179" y2="122" stroke="#d1d5db" stroke-width="1"/>

  <!-- Column Names -->
  <text x="10" y="38" font-size="12" fill="#374151" font-family="Arial, sans-serif">column1</text>
  <text x="10" y="58" font-size="12" fill="#374151" font-family="Arial, sans-serif">column2</text>
  <text x="10" y="78" font-size="12" fill="#374151" font-family="Arial, sans-serif">column3</text>
  <text x="10" y="98" font-size="12" fill="#374151" font-family="Arial, sans-serif">column4</text>
  <text x="10" y="118" font-size="12" fill="#374151" font-family="Arial, sans-serif">column5</text>
</svg>

`;
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
        } else if (finalElement.attr("root/title") === "Reference") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="80" viewBox="0 0 300 80" role="img" aria-labelledby="referenceCanvasTitle">
  <title id="referenceCanvasTitle">Reference</title>

  <!-- Relationship Line -->
  <line x1="40" y1="40" x2="250" y2="40" stroke="#374151" stroke-width="2" marker-end="url(#arrowhead)"/>

  <!-- Arrowhead Marker -->
  <defs>
    <marker id="arrowhead" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" fill="#374151">
      <polygon points="0 0, 10 6, 0 12" />
    </marker>
  </defs>

  <!-- Label Above Line -->
  <text x="145" y="25" font-size="12" text-anchor="middle" fill="#374151" font-family="Arial, sans-serif">
    FK_customer
  </text>
</svg>

`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(150, 80);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Procedure") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120" role="img" aria-labelledby="procedureCanvasTitle">
  <title id="procedureCanvasTitle">Procedure</title>

  <!-- Outer Rounded Rectangle -->
  <rect x="1" y="1" width="198" height="118" rx="12" ry="12" fill="white" stroke="#374151" stroke-width="2"/>

  <!-- Header Background -->
  <rect x="1" y="1" width="198" height="28" rx="12" ry="12" fill="#e5e7eb" stroke="#374151" stroke-width="2"/>

  <!-- Header Text -->
  <text x="100" y="20" font-size="14" text-anchor="middle" fill="#111827" font-family="Arial, sans-serif">
    Procedure Name
  </text>

  <!-- Divider -->
  <line x1="1" y1="29" x2="199" y2="29" stroke="#374151" stroke-width="2"/>

  <!-- Parameters / Body -->
  <text x="10" y="48" font-size="12" fill="#374151" font-family="Arial, sans-serif">param1 IN INT</text>
  <text x="10" y="68" font-size="12" fill="#374151" font-family="Arial, sans-serif">param2 OUT VARCHAR</text>
  <text x="10" y="88" font-size="12" fill="#374151" font-family="Arial, sans-serif">param3 IN DATE</text>
</svg>


`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(150, 80);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "File") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="140" viewBox="0 0 120 140" role="img" aria-labelledby="fileCanvasTitle">
  <title id="fileCanvasTitle">File</title>

  <!-- File Body -->
  <path d="M10 1 H75 L110 36 V139 H10 Z" fill="white" stroke="#374151" stroke-width="2"/>

  <!-- Folded Corner -->
  <path d="M75 1 L75 36 H110" fill="#e5e7eb" stroke="#374151" stroke-width="2"/>

  <!-- Label -->
  <text x="60" y="130" font-size="14" text-anchor="middle" fill="#111827" font-family="Arial, sans-serif">
    file.txt
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
        } else if (finalElement.attr("root/title") === "Native Entity") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120" role="img" aria-labelledby="nativeEntityCanvasTitle">
  <title id="nativeEntityCanvasTitle">Native Entity</title>

  <!-- Outer Border -->
  <rect x="1" y="1" width="198" height="118" fill="white" stroke="#374151" stroke-width="2"/>

  <!-- Inner Border -->
  <rect x="5" y="5" width="190" height="110" fill="none" stroke="#374151" stroke-width="1"/>

  <!-- Header Background -->
  <rect x="1" y="1" width="198" height="28" fill="#e5e7eb" stroke="#374151" stroke-width="2"/>

  <!-- Entity Name -->
  <text x="100" y="20" font-size="14" text-anchor="middle" fill="#111827" font-family="Arial, sans-serif">
    Native Entity
  </text>

  <!-- Divider -->
  <line x1="1" y1="29" x2="199" y2="29" stroke="#374151" stroke-width="2"/>

  <!-- Example Attributes -->
  <text x="10" y="48" font-size="12" fill="#374151" font-family="Arial, sans-serif">name</text>
  <text x="10" y="68" font-size="12" fill="#374151" font-family="Arial, sans-serif">type</text>
  <text x="10" y="88" font-size="12" fill="#374151" font-family="Arial, sans-serif">status</text>
</svg>
`;
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
        } else if (finalElement.attr("root/title") === "Reference Entity") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120" role="img" aria-labelledby="referenceEntityCanvasTitle">
  <title id="referenceEntityCanvasTitle">Reference Entity</title>

  <!-- Outer Border (Dashed for reference) -->
  <rect x="1" y="1" width="198" height="118" fill="white" stroke="#374151" stroke-width="2" stroke-dasharray="6,4"/>

  <!-- Header Background -->
  <rect x="1" y="1" width="198" height="28" fill="#e5e7eb" stroke="#374151" stroke-width="2" stroke-dasharray="6,4"/>

  <!-- Entity Name -->
  <text x="100" y="20" font-size="14" text-anchor="middle" fill="#111827" font-family="Arial, sans-serif">
    Reference Entity
  </text>

  <!-- Divider -->
  <line x1="1" y1="29" x2="199" y2="29" stroke="#374151" stroke-width="2" stroke-dasharray="6,4"/>

  <!-- Example Attributes -->
  <text x="10" y="48" font-size="12" fill="#374151" font-family="Arial, sans-serif">ref_id</text>
  <text x="10" y="68" font-size="12" fill="#374151" font-family="Arial, sans-serif">source</text>
  <text x="10" y="88" font-size="12" fill="#374151" font-family="Arial, sans-serif">linked_status</text>
</svg>
`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Cloned Entity") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120" role="img" aria-labelledby="clonedEntityCanvasTitle">
  <title id="clonedEntityCanvasTitle">Cloned Entity</title>

  <!-- Outer Border (Long dash + dot) -->
  <rect x="1" y="1" width="198" height="118" fill="white" stroke="#374151" stroke-width="2" stroke-dasharray="8,4,2,4"/>

  <!-- Header Background -->
  <rect x="1" y="1" width="198" height="28" fill="#e5e7eb" stroke="#374151" stroke-width="2" stroke-dasharray="8,4,2,4"/>

  <!-- Entity Name -->
  <text x="100" y="20" font-size="14" text-anchor="middle" fill="#111827" font-family="Arial, sans-serif">
    Cloned Entity
  </text>

  <!-- Divider -->
  <line x1="1" y1="29" x2="199" y2="29" stroke="#374151" stroke-width="2" stroke-dasharray="8,4,2,4"/>

  <!-- Example Attributes -->
  <text x="10" y="48" font-size="12" fill="#374151" font-family="Arial, sans-serif">clone_id</text>
  <text x="10" y="68" font-size="12" fill="#374151" font-family="Arial, sans-serif">origin_entity</text>
  <text x="10" y="88" font-size="12" fill="#374151" font-family="Arial, sans-serif">sync_status</text>
</svg>

`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Task Activity") {
          const newSvg = `<svg width="50" height="50" viewBox="0 0 50 50" stroke="currentColor" stroke-width="0.5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="13" width="46" height="24" rx="8" ry="8" />
</svg>`;
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
        } else if (finalElement.attr("root/title") === "Message Flow") {
          const newSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5"
     stroke-dasharray="4 2">
  <!-- Dashed horizontal line -->
  <line x1="2" y1="25" x2="46" y2="25" />
  
  <!-- Arrowhead pointing right -->
  <polyline points="42,22 46,25 42,28" stroke-dasharray="0" />
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Message Flow") {
          const newSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5"
     stroke-dasharray="4 2">
  <!-- Dashed horizontal line -->
  <line x1="2" y1="25" x2="46" y2="25" />
  
  <!-- Arrowhead pointing right -->
  <polyline points="42,22 46,25 42,28" stroke-dasharray="0" />
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Association") {
          const newSvg = `<svg width="50" height="50" viewBox="0 0 50 50"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     stroke="currentColor"
     stroke-width="0.5"
     >
  <!-- Dashed horizontal line (centered, with padding) -->
  <line x1="2" y1="25" x2="48" y2="25" stroke-dasharray="2 2" />
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
        } else if (finalElement.attr("root/title") === "Native Entity") {
          const newSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer rounded rectangle (table frame) -->
  <rect x="7" y="10" width="36" height="30" rx="3" />
  <!-- Horizontal divider for header -->
  <line x1="7" y1="18" x2="43" y2="18" />
</svg>`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Inheritance") {
          const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" role="img" aria-labelledby="inheritanceCanvasTitle">
  <title id="inheritanceCanvasTitle">Inheritance</title>

  <!-- Connecting Line -->
  <line x1="40" y1="70" x2="40" y2="30" stroke="#374151" stroke-width="2" fill="none"/>

  <!-- Triangle (Hollow, UML style) -->
  <polygon points="20,30 60,30 40,10" fill="white" stroke="#374151" stroke-width="2"/>
  
  <!-- Label -->
  <text x="40" y="78" font-size="12" text-anchor="middle" fill="#374151" font-family="Arial, sans-serif">
    Inheritance
  </text>
</svg>

`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Cloned Entity") {
          const newSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer rounded rectangle (long dash, small dot) -->
  <rect x="7" y="10" width="36" height="30" rx="3" stroke-dasharray="8 3 0.5 3" />
  <!-- Horizontal divider (long dash, small dot) -->
  <line x1="7" y1="18" x2="43" y2="18" stroke-dasharray="8 3 0.5 3" />
</svg>
`;
          finalElement.attr(
            "image/xlink:href",
            `data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`
          );
          finalElement.size(70, 40);
          finalElement.attr("label/text", "");
        } else if (finalElement.attr("root/title") === "Reference Entity") {
          const newSvg = `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer rounded rectangle (dashed) -->
  <rect x="7" y="10" width="36" height="30" rx="3" stroke-dasharray="4 2" />
  <!-- Horizontal divider (dashed) -->
  <line x1="7" y1="18" x2="43" y2="18" stroke-dasharray="4 2" />
</svg>
`;
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
  <polygon points="25,2.5 47.5,25 25,47.5 2.5,25" />

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
  <polygon points="25,2.5 47.5,25 25,47.5 2.5,25" />

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
  <polygon points="25,2.5 47.5,25 25,47.5 2.5,25" />

  <line x1="25" y1="12.5" x2="25" y2="37.5" />

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
  <line x1="0" y1="10" x2="35" y2="10" stroke="black" stroke-width="1" />
  
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
        const position = finalElement.get("position");
        if (!position || (position.x === 0 && position.y === 0)) {
          // Set a default position if none exists
          finalElement.position(50, 50);
        }

        return finalElement;
      },
    });
    stencilInstanceRef.current = stencil; // Store instance

    // Add this after stencil.render() in your useEffect
    stencil.on(
      "element:pointerclick",
      (elementView: dia.ElementView, evt: dia.Event) => {
        const element = elementView.model as dia.Element;

        // Check if clicked element is a link tool
        if (isLinkTool(element)) {
          evt.stopPropagation();

          const linkType = getLinkTypeFromElement(element);
          setLinkType(linkType);
          setIsLinkingMode(true);
          setFirstSelectedNode(null);

          // Change cursor to indicate linking mode
          if (paper) {
            paper.el.style.cursor = "crosshair";
          }

          console.log("Link tool clicked, entering linking mode:", linkType);
        }
      }
    );
    stencil.on(
      "element:drop",
      (view: { model: { get: (arg0: string) => any } }) => {
        const droppedElement = view.model;
        console.log(
          "Dropped element:",
          droppedElement.get("type"),
          "with ID:",
          droppedElement.get("id")
        );

        // Ensure the dropped element is added to the graph
        // if (!graph.getCell(droppedElement.get("id"))) {
        //   graph.addCell(droppedElement);
        // }
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

    // Add click handler for linking mode
    paper.on("element:pointerclick", handleNodeClick);
    // Add escape key handler to cancel linking mode
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === "Escape" && linkingModeRef.current) {
        // Cancel linking mode
        if (firstNodeRef.current) {
          firstNodeRef.current.attr("body/stroke", null);
          firstNodeRef.current.attr("body/strokeWidth", null);
        }
        setIsLinkingMode(false);
        setFirstSelectedNode(null);
        setLinkType("default");
        paper.el.style.cursor = "default";
        console.log("Linking mode cancelled");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

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

    const basicLabel = stencil.el.querySelector(
      '[data-name="basic"] .group-label'
    );
    if (basicLabel) {
      // Create a container for the dropdown
      const dropdownContainer = document.createElement("div");
      dropdownContainer.style.cssText = `
      display: block;
      margin: 8px 0 4px 0;
      width: 100%;
    `;

      // Create the select element
      const selectElement = document.createElement("select");
      selectElement.style.cssText = `
      width: 100%;
      padding: 6px 8px;
      font-size: 12px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      background-color: white;
      color: #374151;
      cursor: pointer;
      outline: none;
    `;

      // Add options to select
      MODEL_TYPES.forEach((modelType) => {
        const option = document.createElement("option");
        option.value = modelType.id;
        option.textContent = modelType.label;
        option.selected = selectedModelType === modelType.id;
        selectElement.appendChild(option);
      });

      // Handle selection change
      selectElement.onchange = (e) => {
        const target = e.target as HTMLSelectElement;
        handleModelTypeSelect(target.value);
      };

      dropdownContainer.appendChild(selectElement);

      // Insert the dropdown after the label
      basicLabel.appendChild(dropdownContainer);
    }
    stencilContainerRef.current.style.position = "relative";

    stencilContainerRef.current.innerHTML = "";
    stencilContainerRef.current.appendChild(stencil.el);

    // Function to create diagram type dropdown (same as before)
    const createDiagramTypeDropdown = () => {
      const diagramTypesLabel = stencil.el.querySelector(
        '[data-name="diagramTypes"] .group-label'
      );
      if (diagramTypesLabel && selectedModelType) {
        // Remove existing dropdown if it exists
        const existingDropdown = diagramTypesLabel.querySelector(
          ".diagram-dropdown-container"
        );
        if (existingDropdown) {
          existingDropdown.remove();
        }

        // Create a container for the dropdown
        const dropdownContainer = document.createElement("div");
        dropdownContainer.className = "diagram-dropdown-container";
        dropdownContainer.style.cssText = `
        display: block;
        margin: 8px 0 4px 0;
        width: 100%;
      `;

        // Create the select element
        const selectElement = document.createElement("select");
        selectElement.style.cssText = `
        width: 100%;
        padding: 6px 8px;
        font-size: 12px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        background-color: white;
        color: #374151;
        cursor: pointer;
        outline: none;
      `;

        const availableTypes = getAvailableDiagramTypes();

        // Add default option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select Diagram Type";
        defaultOption.selected = !selectedDiagramType;
        selectElement.appendChild(defaultOption);

        // Add available diagram types
        availableTypes.forEach((diagramType) => {
          const option = document.createElement("option");
          option.value = diagramType.id;
          option.textContent = diagramType.label;
          option.selected = selectedDiagramType === diagramType.id;
          selectElement.appendChild(option);
        });

        // Handle selection change
        selectElement.onchange = (e) => {
          const target = e.target as HTMLSelectElement;
          if (target.value) {
            handleDiagramTypeSelect(target.value);
          }
        };

        dropdownContainer.appendChild(selectElement);
        diagramTypesLabel.appendChild(dropdownContainer);
      }
    };

    // Add linking mode indicator
    const createLinkingIndicator = () => {
      const stencilHeader =
        stencil.el.querySelector(".stencil-header") || stencil.el;

      const indicatorContainer = document.createElement("div");
      indicatorContainer.className = "linking-indicator";
      indicatorContainer.style.cssText = `
      position: absolute;
      top: 5px;
      right: 10px;
      background: ${isLinkingMode ? "#dc2626" : "#transparent"};
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      display: ${isLinkingMode ? "block" : "none"};
      z-index: 1000;
    `;
      indicatorContainer.textContent = firstSelectedNode
        ? "Click target node"
        : "Click source node";

      stencilHeader.appendChild(indicatorContainer);

      // Update indicator when linking state changes
      const updateIndicator = () => {
        indicatorContainer.style.display = isLinkingMode ? "block" : "none";
        indicatorContainer.style.background = isLinkingMode
          ? "#dc2626"
          : "transparent";
        indicatorContainer.textContent = firstSelectedNode
          ? "Click target node (ESC to cancel)"
          : "Click source node (ESC to cancel)";
      };

      // Store update function for later use
      (stencil as any).updateLinkingIndicator = updateIndicator;
    };

    // ========== Updated Diagram Type Dropdown (Single Select) ==========
    const diagramTypesLabel = stencil.el.querySelector(
      '[data-name="diagramTypes"] .group-label'
    );
    if (diagramTypesLabel) {
      // Create a container for the dropdown
      const dropdownContainer = document.createElement("div");
      dropdownContainer.style.cssText = `
      display: block;
      margin: 8px 0 4px 0;
      width: 100%;
    `;

      // Create the select element
      const selectElement = document.createElement("select");
      selectElement.style.cssText = `
      width: 100%;
      padding: 6px 8px;
      font-size: 12px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      background-color: white;
      color: #374151;
      cursor: pointer;
      outline: none;
    `;

      const updateDiagramSelect = () => {
        // Clear existing options
        selectElement.innerHTML = "";

        const availableTypes = getAvailableDiagramTypes();

        if (availableTypes.length === 0 || !selectedModelType) {
          // Add placeholder option
          const placeholderOption = document.createElement("option");
          placeholderOption.value = "";
          placeholderOption.textContent = "Select Model Type First";
          placeholderOption.disabled = true;
          placeholderOption.selected = true;
          selectElement.appendChild(placeholderOption);
          selectElement.disabled = true;
          selectElement.style.opacity = "0.5";
        } else {
          selectElement.disabled = false;
          selectElement.style.opacity = "1";

          // Add default option
          const defaultOption = document.createElement("option");
          defaultOption.value = "";
          defaultOption.textContent = "Select Diagram Type";
          defaultOption.selected = !selectedDiagramType;
          selectElement.appendChild(defaultOption);

          // Add available diagram types
          availableTypes.forEach((diagramType) => {
            const option = document.createElement("option");
            option.value = diagramType.id;
            option.textContent = diagramType.label;
            option.selected = selectedDiagramType === diagramType.id;
            selectElement.appendChild(option);
          });
        }
      };

      // Initial population
      updateDiagramSelect();

      // Handle selection change
      selectElement.onchange = (e) => {
        const target = e.target as HTMLSelectElement;
        if (target.value) {
          handleDiagramTypeSelect(target.value);
        }
      };

      dropdownContainer.appendChild(selectElement);

      // Insert the dropdown after the label
      diagramTypesLabel.appendChild(dropdownContainer);

      // Update the diagram select when model type changes
      const observer = new MutationObserver(() => {
        updateDiagramSelect();
      });

      // Store reference to update function for external calls
      (selectElement as any).updateOptions = updateDiagramSelect;
    }
    return () => {
      paper.off("element:pointerclick", handleNodeClick);
      document.removeEventListener("keydown", handleKeyDown);
      stencil.remove();
    };

    // We need to re-render the menu content whenever selections change
  }, [
    paper,
    graph,
    selectedModelType,
    selectedDiagramType,
    // isLinkingMode,
    // firstSelectedNode,
  ]);

  const allElements: dia.Element[] = [];

  paletteGroups.forEach((group) => {
    group.elements.forEach((cfg) => {
      if (cfg.type === "erd.Entity") {
        allElements.push(createEREntity(cfg));
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

  // Additional useEffect to handle link interactivity on the canvas
  useEffect(() => {
    if (!paper || !graph) return;

    // Make links selectable and editable
    const handleLinkPointerClick = (linkView: dia.LinkView, evt: dia.Event) => {
      // Prevent event from bubbling to paper
      evt.stopPropagation();

      // Add selection highlight to link
      linkView.model.attr("line/stroke", "#dc2626");
      linkView.model.attr("line/strokeWidth", 3);

      console.log("Link selected:", linkView.model.id);

      // Remove highlight after 2 seconds
      setTimeout(() => {
        linkView.model.attr("line/stroke", null);
        linkView.model.attr("line/strokeWidth", null);
      }, 2000);
    };

    // Handle link double-click for editing
    const handleLinkDoubleClick = (linkView: dia.LinkView, evt: dia.Event) => {
      evt.stopPropagation();

      const currentLabel = linkView.model.label(0)?.attrs?.text?.text || "";
      const newLabel = prompt("Edit link label:", currentLabel);

      if (newLabel !== null) {
        linkView.model.label(0, {
          attrs: {
            text: {
              text: newLabel,
              fontSize: 12,
              fill: "#666",
            },
          },
        });
      }
    };

    // Handle link right-click for context menu (delete)
    const handleLinkContextMenu = (linkView: dia.LinkView, evt: dia.Event) => {
      evt.preventDefault();
      evt.stopPropagation();

      const confirmDelete = confirm("Delete this link?");
      if (confirmDelete) {
        linkView.model.remove();
      }
    };

    // Add link interaction event listeners
    paper.on("link:pointerclick", handleLinkPointerClick);
    paper.on("link:pointerdblclick", handleLinkDoubleClick);
    paper.on("link:contextmenu", handleLinkContextMenu);

    // Add hover effects for links
    paper.on("link:mouseenter", (linkView: dia.LinkView) => {
      linkView.model.attr("line/strokeOpacity", 1);
      linkView.model.attr("line/strokeWidth", 3);
    });

    paper.on("link:mouseleave", (linkView: dia.LinkView) => {
      linkView.model.attr("line/strokeOpacity", 0.8);
      linkView.model.attr("line/strokeWidth", 2);
    });

    // Cleanup function
    return () => {
      paper.off("link:pointerclick", handleLinkPointerClick);
      paper.off("link:pointerdblclick", handleLinkDoubleClick);
      paper.off("link:contextmenu", handleLinkContextMenu);
      paper.off("link:mouseenter");
      paper.off("link:mouseleave");
    };
  }, [paper, graph]);

  // Function to programmatically create links (useful for API integration)
  const createProgrammaticLink = useCallback(
    (sourceId: string, targetId: string, linkType: string = "default") => {
      const sourceElement = graph.getCell(sourceId) as dia.Element;
      const targetElement = graph.getCell(targetId) as dia.Element;

      if (
        sourceElement &&
        targetElement &&
        sourceElement.isElement() &&
        targetElement.isElement()
      ) {
        const link = createLink(sourceElement, targetElement, linkType);
        graph.addCell(link);
        return link;
      }

      console.warn("Could not create link: source or target element not found");
      return null;
    },
    [graph, createLink]
  );

  // Expose functions for external use
  const linkingAPI = {
    createLink: createProgrammaticLink,
    enterLinkingMode: (linkType: string = "default") => {
      setIsLinkingMode(true);
      setLinkType(linkType);
      setFirstSelectedNode(null);
      if (paper) {
        paper.el.style.cursor = "crosshair";
      }
    },
    exitLinkingMode: () => {
      if (firstSelectedNode) {
        firstSelectedNode.attr("body/stroke", null);
        firstSelectedNode.attr("body/strokeWidth", null);
      }
      setIsLinkingMode(false);
      setFirstSelectedNode(null);
      setLinkType("default");
      if (paper) {
        paper.el.style.cursor = "default";
      }
    },
    isInLinkingMode: () => isLinkingMode,
    getLinkType: () => linkType,
  };

  useEffect(() => {
    // Restore from local storage if nothing is selected
    let modelTypeToUse = selectedModelType;
    let diagramTypeToUse = selectedDiagramType;

    if (!selectedModelType || !selectedDiagramType) {
      const savedState = getFromStorage(STORAGE_KEYS.STENCIL_STATE);
      if (savedState) {
        if (!modelTypeToUse) modelTypeToUse = savedState.selectedModelType;
        if (!diagramTypeToUse)
          diagramTypeToUse = savedState.selectedDiagramType;
      }
    }

    if (stencilInstanceRef.current && diagramTypeToUse) {
      // Always update groups based on model type
      stencilInstanceRef.current.groups = getFilteredGroups();

      const shapesToLoad: { [key: string]: dia.Element[] } = {};

      const addShapesToGroup = (groupKey: string, shapes: dia.Element[]) => {
        if (!shapesToLoad[groupKey]) shapesToLoad[groupKey] = [];
        shapesToLoad[groupKey].push(...shapes);
      };

      // Always add common tool stencil first
      addShapesToGroup("freeModel", [
        createBoundedIcon("Free Node", ctfreenodeSvg, isPanelCollapsed),
        createBoundedIcon("Group", ctgroupSvg, isPanelCollapsed),
        createBoundedIcon("Link", ctlinkSvg, isPanelCollapsed),
        createBoundedIcon("Note", ctnoteSvg, isPanelCollapsed),
        createBoundedIcon("Title Box", cttitleboxSvg, isPanelCollapsed),
        createBoundedIcon("Anchor Link", ctanchorlinkSvg, isPanelCollapsed),
      ]);

      // Load shapes based on model/diagram type (same switch as your original)
      const selectedModel = MODEL_TYPES.find((mt) => mt.id === modelTypeToUse);
      if (!selectedModel) return;

      switch (diagramTypeToUse) {
        case "mindMapDiagram":
          addShapesToGroup("mindMap", [
            createBoundedIcon("Topic", mmdtopicSvg, isPanelCollapsed),
            createBoundedIcon("Subtopic", mmdsubtopicSvg, isPanelCollapsed),
            createBoundedIcon("Link", mmdlinkSvg, isPanelCollapsed),
            createBoundedIcon("Note", mmdnoteSvg, isPanelCollapsed),
          ]);
          break;

        case "processFlowDiagram":
          addShapesToGroup("businessProcess", [
            createBoundedIcon(
              "Start Event",
              bpmstarteventSvg,
              isPanelCollapsed
            ),
            createBoundedIcon("End Event", bpmendeventSvg, isPanelCollapsed),

            createBoundedIcon(
              "Task Activity",
              bpmtaskactivitySvg,
              isPanelCollapsed
            ),

            createBoundedIcon(
              "Sequence Flow",
              bpmsequenceflowSvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "Sub Process",
              bpmsubprocessSvg,
              isPanelCollapsed
            ),
          ]);
          break;
        case "freeFormModelDiagram":
          addShapesToGroup("freeFormModel", [
            createBoundedIcon("Free Node", ctfreenodeSvg, isPanelCollapsed),
            createBoundedIcon("Group", ctgroupSvg, isPanelCollapsed),
            createBoundedIcon("Link", ctlinkSvg, isPanelCollapsed),
            createBoundedIcon("Circle", ffmcircleSvg, isPanelCollapsed),
            createBoundedIcon("Cylinder", ffmcylinderSvg, isPanelCollapsed),
            createBoundedIcon("Rectangle", ffmrectangleSvg, isPanelCollapsed),
            createBoundedIcon("Diamond", ffmdiamondSvg, isPanelCollapsed),
            createBoundedIcon("Ellipse", ffmellipseSvg, isPanelCollapsed),
            createBoundedIcon("Square", ffmsquareSvg, isPanelCollapsed),
            createBoundedIcon("Traingle", ffmtraingleSvg, isPanelCollapsed),
            createBoundedIcon("Hexagon", ffmhexagonSvg, isPanelCollapsed),
          ]);
          break;

        case "gatewayDiagram":
          addShapesToGroup("businessProcess", [
            createBoundedIcon("Gateway", bpmgatewaySvg, isPanelCollapsed),
            createBoundedIcon(
              "Exclusive Gateway",
              bpmexclusivegatewaySvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "Event Gateway",
              bpmeventgatewaySvg,
              isPanelCollapsed
            ),

            createBoundedIcon(
              "Parallel Gateway",
              bpmparallelgatewaySvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "Message Flow",
              bpmmessageflowSvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "Association",
              bpmassociationSvg,
              isPanelCollapsed
            ),
          ]);
          break;

        case "subprocessDiagram":
          addShapesToGroup("businessProcess", [
            createBoundedIcon(
              "Call Activity",
              bpmcallactivitySvg,
              isPanelCollapsed
            ),

            createBoundedIcon(
              "Transaction",
              bpmtransactionSvg,
              isPanelCollapsed
            ),
          ]);
          break;

        case "conceptualDataModelDiagram":
          addShapesToGroup("conceptualDataModel", [
            createBoundedIcon("Native Entity", cdmentitySvg, isPanelCollapsed),
            createBoundedIcon(
              "Cloned Entity",
              cdmclonedEntitySvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "Reference Entity",
              cdmreferenceentitySvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "Inheritance",
              cdminheritanceSvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "1:N Relationship",
              cdmonetonRelationshipSvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "1:1 Relationship",
              cdmonetoonerelationshipSvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "N:N Relationship",
              cdmntonRealtionshipSvg,
              isPanelCollapsed
            ),
          ]);
          break;

        case "requirementsDiagram":
          addShapesToGroup("requirementsModel", [
            createBoundedIcon(
              "Requirement",
              rmrequirementSvg,
              isPanelCollapsed
            ),
            createBoundedIcon("Use Case", rmusecaseSvg, isPanelCollapsed),
            createBoundedIcon("Link", rmlinkSvg, isPanelCollapsed),
            createBoundedIcon("Actor", rmactorSvg, isPanelCollapsed),
            createBoundedIcon(
              "Stakeholder",
              rmstakeholderSvg,
              isPanelCollapsed
            ),
            createBoundedIcon("Goal", rmgoalSvg, isPanelCollapsed),
          ]);
          break;

        case "physicalDataModelDiagram":
          addShapesToGroup("physicalDataModel", [
            createBoundedIcon("Table", pdmtableSvg, isPanelCollapsed),
            createBoundedIcon("Package", pdmpackageSvg, isPanelCollapsed),
            createBoundedIcon("View", pdmviewSvg, isPanelCollapsed),
            createBoundedIcon("Reference", pdmreferenceSvg, isPanelCollapsed),
            createBoundedIcon("Procedure", pdmprocedureSvg, isPanelCollapsed),
            createBoundedIcon("File", pdmfileSvg, isPanelCollapsed),
          ]);
          break;

        case "classDiagram":
          addShapesToGroup("objectOrientedModel", [
            createBoundedIcon("Class", oomclassSvg, isPanelCollapsed),
            createBoundedIcon("Interface", oominterfaceSvg, isPanelCollapsed),

            createBoundedIcon("Enumeration", oomenumSvg, isPanelCollapsed),
            createBoundedIcon("Package", oompackageSvg, isPanelCollapsed),
            createBoundedIcon(
              "Aggregation",
              oomaggregationSvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "Composition",
              oomcompositionSvg,
              isPanelCollapsed
            ),
          ]);
          break;

        case "componentDiagram":
          addShapesToGroup("objectOrientedModel", [
            createBoundedIcon("Port", oomportSvg, isPanelCollapsed),
            createBoundedIcon("Dependency", oomdependencySvg, isPanelCollapsed),
          ]);
          break;

        case "useCaseDiagram":
          addShapesToGroup("objectOrientedModel", [
            createBoundedIcon(
              "Generalization",
              oomgeneralizationSvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "Association",
              oomassociationSvg,
              isPanelCollapsed
            ),
          ]);
          break;

        // Add all other cases following the same pattern...
        case "multidimensionalDiagram":
          addShapesToGroup("multidimensionalModel", [
            createBoundedIcon("Cube", mdmcubevg, isPanelCollapsed),
            createBoundedIcon("Dimension", mdmdimensionSvg, isPanelCollapsed),
            createBoundedIcon("Measure", mdmmeasureSvg, isPanelCollapsed),
          ]);
          break;

        case "processTreeDiagram":
          addShapesToGroup("processHierarchyModel", [
            createBoundedIcon(
              "Process Node",
              phmprocessnodeSvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "Sub Process Node",
              phmsubprocessnodeSvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "Activity Node",
              phmactivitynodeSvg,
              isPanelCollapsed
            ),
          ]);
          break;

        case "freeformDiagram":
          addShapesToGroup("freeModel", [
            createBoundedIcon("Free Node", ctfreenodeSvg, isPanelCollapsed),
            createBoundedIcon("Group", ctgroupSvg, isPanelCollapsed),
            createBoundedIcon("Link", ctlinkSvg, isPanelCollapsed),
            createBoundedIcon("Note", ctnoteSvg, isPanelCollapsed),
            createBoundedIcon("Title Box", cttitleboxSvg, isPanelCollapsed),
            createBoundedIcon("Anchor Link", ctanchorlinkSvg, isPanelCollapsed),
          ]);
          break;

        case "organizationalChart":
          addShapesToGroup("organizationalChartModel", [
            createBoundedIcon(
              "Organization",
              ocmorganizationSvg,
              isPanelCollapsed
            ),
            createBoundedIcon("Department", ocmdepartmentSvg, isPanelCollapsed),
            createBoundedIcon("Role", ocmroleSvg, isPanelCollapsed),
            createBoundedIcon("Position", ocmpositionSvg, isPanelCollapsed),
            createBoundedIcon(
              "Reporting Line",
              ocmreportinglineSvg,
              isPanelCollapsed
            ),
            createBoundedIcon("Group", ocmgroupSvg, isPanelCollapsed),
          ]);
          break;

        case "layeredArchitecture":
          addShapesToGroup("enterpriseArchitectureModel", [
            createBoundedIcon("Business", eambusinessSvg, isPanelCollapsed),
            createBoundedIcon("Process", eamprocessSvg, isPanelCollapsed),
            createBoundedIcon(
              "Connector Line",
              eamconnectorlineSvg,
              isPanelCollapsed
            ),
            createBoundedIcon("Database", eamdatabaseSvg, isPanelCollapsed),
          ]);
          break;

        case "applicationMap":
          addShapesToGroup("enterpriseArchitectureModel", [
            createBoundedIcon(
              "Application",
              eamapplicationSvg,
              isPanelCollapsed
            ),
            createBoundedIcon("Technology", eamtechnologySvg, isPanelCollapsed),
          ]);
          break;

        case "dataMovementDiagram":
          addShapesToGroup("dataMovementModel", [
            createBoundedIcon("Source", dmmsourceSvg, isPanelCollapsed),
            createBoundedIcon("Target", dmmtargetSvg, isPanelCollapsed),
            createBoundedIcon("Data Flow", dmmdataflowSvg, isPanelCollapsed),
            createBoundedIcon("Server", dmmserverSvg, isPanelCollapsed),
            createBoundedIcon("Database", dmmdatabaseSvg, isPanelCollapsed),
            createBoundedIcon("XML", dmmxmlSvg, isPanelCollapsed),
            createBoundedIcon("Business", dmmbusinessSvg, isPanelCollapsed),
            createBoundedIcon(
              "Replication",
              dmmreplicationSvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "Replication Server",
              dmmreplicationserverSvg,
              isPanelCollapsed
            ),
            createBoundedIcon("Connection", dmmconnectionSvg, isPanelCollapsed),
            createBoundedIcon("Package", dmmpackageSvg, isPanelCollapsed),
            createBoundedIcon(
              "Transformation",
              dmmtransformationSvg,
              isPanelCollapsed
            ),
          ]);
          break;

        case "informationLifecycleDiagram":
          addShapesToGroup("informationLifecycleManagement", [
            createBoundedIcon(
              "Information",
              ilminformationSvg,
              isPanelCollapsed
            ),
            createBoundedIcon("Input", ilminputSvg, isPanelCollapsed),
            createBoundedIcon("Print", ilmprintSvg, isPanelCollapsed),
            createBoundedIcon("Store", ilmstoreSvg, isPanelCollapsed),
            createBoundedIcon("Manage", ilmmanageSvg, isPanelCollapsed),
            createBoundedIcon("Secure", ilmsecureSvg, isPanelCollapsed),
            createBoundedIcon("Shred", ilmshredSvg, isPanelCollapsed),
            createBoundedIcon("Flow", ilmflowSvg, isPanelCollapsed),
            createBoundedIcon(
              "Access Point",
              ilmaccesspointSvg,
              isPanelCollapsed
            ),
            createBoundedIcon("Repository", ilmrepositorySvg, isPanelCollapsed),
            createBoundedIcon("Annotation", ilmannotationSvg, isPanelCollapsed),
          ]);
          break;

        case "impactAnalysisDiagram":
          addShapesToGroup("impactAnalysisModel", [
            createBoundedIcon("Impact", iamimapactSvg, isPanelCollapsed),
            createBoundedIcon(
              "Change Event",
              iamchangeeventSvg,
              isPanelCollapsed
            ),
            createBoundedIcon("Risk", iamriskSvg, isPanelCollapsed),
            createBoundedIcon(
              "Cause Effect",
              iamcauseeffectSvg,
              isPanelCollapsed
            ),
            createBoundedIcon("Mitigation", iammitigationSvg, isPanelCollapsed),
          ]);
          break;

        case "dependencyMatrixDiagram":
          addShapesToGroup("dependencyPropagationModel", [
            createBoundedIcon("Matrix", iammatrixSvg, isPanelCollapsed),
            createBoundedIcon("Native Entity", iamentitySvg, isPanelCollapsed),
            createBoundedIcon(
              "Reference Entity",
              iamrefernceentitySvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "Cloned Entity",
              iamclonedEntitySvg,
              isPanelCollapsed
            ),
            createBoundedIcon("Dependency", iamdependencySvg, isPanelCollapsed),
          ]);
          break;

        case "logicalDataModelDiagram":
          addShapesToGroup("logicalDataModel", [
            createBoundedIcon("Native Entity", ldmentitySvg, isPanelCollapsed),
            createBoundedIcon(
              "Reference Entity",
              ldmreferenceentitySvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "Cloned Entity",
              ldmclonedEntitySvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "Inheritance",
              ldminteritanceSvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "1:1 Relationship",
              ldmonetooneSvg,
              isPanelCollapsed
            ),
            createBoundedIcon(
              "1:N Relationship",
              ldmonetomanySvg,
              isPanelCollapsed
            ),
          ]);
          break;
      }

      // Load into stencil panel
      stencilInstanceRef.current.load(shapesToLoad);
    }

    // Save current (or restored) state back into storage
    const stencilState = {
      selectedModelType: modelTypeToUse,
      selectedDiagramType: diagramTypeToUse,
      timestamp: Date.now(),
    };
    saveToStorage(STORAGE_KEYS.STENCIL_STATE, stencilState);
  }, [
    selectedModelType,
    selectedDiagramType,
    expandedGroups,
    isPanelCollapsed,
  ]);

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
              // onClick={toggleCollapse}
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
        // onClick={toggleSlide}
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
// React's useCallback is imported from 'react', so this function is not needed.
// Remove this stub. If you need to use useCallback, import it from 'react':
// import { useCallback } from "react";
