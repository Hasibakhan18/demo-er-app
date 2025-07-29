import { type FC, useEffect, useRef } from "react";
import { dia, ui, shapes } from "@joint/plus";
import {
  getInspectorConfig,
  getPaperInspectorConfig,
} from "../config/inspector";

interface PropertiesPanelProps {
  paper: dia.Paper;
  graph: dia.Graph;
  onClose?: () => void;
}

const PropertiesPanel: FC<PropertiesPanelProps> = ({
  paper,
  graph,
  onClose,
}) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const inspectorRef = useRef<any | null>(null);

  useEffect(() => {
    if (!tabsRef.current) return;

    const propertiesTabContent = document.createElement("div");
    const aiAssistantTabContent = document.createElement("div");
    aiAssistantTabContent.innerHTML = `
      <div style="padding: 10px; color: #333;">
        <h3 style="margin-top: 0; font-size: 16px; color: #0052cc;">AI Assistant</h3>
        <p style="font-size: 14px;">AI-powered features are coming soon!</p>
        <ul style="list-style-type: disc; padding-left: 20px;">
          <li>Automated Layout</li>
          <li>Smart Suggestions</li>
          <li>Error Checking</li>
        </ul>
      </div>
    `;

    const tabs = new ui.Tab({
      tabs: [
        {
          name: "properties",
          label: "Properties",
          content: propertiesTabContent,
        },
        {
          name: "ai-assistant",
          label: "AI Assistant",
          content: aiAssistantTabContent,
        },
      ],
    });

    tabsRef.current.appendChild(tabs.render().el);

    const showInspector = (cell: dia.Cell | dia.Paper) => {
      if (inspectorRef.current) {
        inspectorRef.current.remove();
      }
      const config =
        "isElement" in cell || "isLink" in cell
          ? getInspectorConfig(cell as dia.Cell)
          : getPaperInspectorConfig();
      const inspector = new ui.Inspector({
        cell: cell,
        paper: paper,
        graph: graph,
        inputs: config.inputs,
        groups: config.groups,
        cellNamespace: shapes,
      });
      propertiesTabContent.innerHTML = "";
      propertiesTabContent.appendChild(inspector.render().el);
      inspectorRef.current = inspector;
    };

    // Show paper properties by default
    showInspector(paper);

    return () => {
      tabs.remove();
      if (inspectorRef.current) {
        inspectorRef.current.remove();
      }
    };
  }, [paper, graph]);

  return (
    <>
      <style>
        {`
          .joint-tab {
            background-color: #f9f9f9;
            border-bottom: 1px solid #ddd;
          }
          .joint-tab .tab-label {
            font-family: 'Arial', sans-serif;
            font-size: 14px;
            color: #333;
            padding: 10px 15px;
            border-right: 1px solid #ddd;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .joint-tab .tab-label:hover {
            background-color: #f0f0f0;
          }
          .joint-tab .tab-label.active {
            background-color: #fff;
            border-bottom: 1px solid transparent;
            font-weight: bold;
            color: #0052cc;
          }
          .joint-tab .tab-content {
            padding: 15px;
            background-color: #fff;
          }
        `}
      </style>
      <div
        ref={tabsRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: "#555",
            }}
          >
            &times;
          </button>
        )}
      </div>
    </>
  );
};

export default PropertiesPanel;
