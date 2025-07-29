import { type FC, useEffect, useState } from "react";
import DiagramSettings from "./DiagramSettings";
import { DIAGRAM_SETTINGS_EVENT } from "../hooks/useJointJS";
import PropertiesPanel from "./PropertiesPanel";
import SettingsPanel from "./SettingsPanel";
import iconSlide from "../assets/navigator/right-arrows.png";
import EntityInspector from "./EntityInspector";

import { dia } from "@joint/plus";

interface InspectorProps {
  paper: dia.Paper;
  graph: dia.Graph;
}

const Inspector: FC<InspectorProps> = ({ paper, graph }) => {
  const [activeContent, setActiveContent] = useState<
    "element" | "diagram" | "none"
  >("none");
  const [tab, setTab] = useState<"properties" | "settings">("settings");
  const [selectedCell, setSelectedCell] = useState<dia.Cell | null>(null);
  const [isPanelHidden, setIsPanelHidden] = useState(false);

  const toggleSlide = () => setIsPanelHidden((prev) => !prev);

  useEffect(() => {
    const handleDiagramSettings = (event: Event) => {
      const customEvent = event as CustomEvent;
      const type = customEvent.detail?.type;
      if (type === "settings" || type === "properties") {
        setTab(type);
        setActiveContent("diagram");
        setSelectedCell(null);
      }
      console.log("DIAGRAM_SETTINGS_EVENT triggered", customEvent.detail);
    };

    const handleCellSelection = (cellView: dia.CellView) => {
      setSelectedCell(cellView.model);
      setActiveContent("element");
    };

    const handleBlankPointerDown = () => {
      setSelectedCell(null);
      setActiveContent("diagram");
      setTab("settings");
    };

    const handleInspectorShow = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.show) {
        setActiveContent("diagram");
        setTab("properties");
      }
    };

    document.addEventListener("inspector:show", handleInspectorShow);
    document.addEventListener(DIAGRAM_SETTINGS_EVENT, handleDiagramSettings);
    paper.on("cell:pointerdown", handleCellSelection);
    paper.on("blank:pointerdown", handleBlankPointerDown);

    return () => {
      document.removeEventListener("inspector:show", handleInspectorShow);
      document.removeEventListener(
        DIAGRAM_SETTINGS_EVENT,
        handleDiagramSettings
      );
      paper.off("cell:pointerdown", handleCellSelection);
      paper.off("blank:pointerdown", handleBlankPointerDown);
    };
  }, [paper]);

  const handleCloseDiagramSettings = () => {
    setActiveContent("none");
  };

  const handleSettingsChange = (settings: any) => {
    const event = new CustomEvent("diagram:update-settings", {
      detail: { type: "properties" },
    });
    document.dispatchEvent(event);
  };

  const renderContent = () => {
    switch (activeContent) {
      case "diagram":
        return (
          <div>
            <div style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
                {tab === "properties"
                  ? "Diagram Properties"
                  : "Diagram Settings"}
              </h3>
              <p
                style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#666" }}
              >
                {tab === "properties"
                  ? "Edit diagram properties"
                  : "Configure canvas settings"}
              </p>
            </div>
            <DiagramSettings activeTab={tab} onTabChange={setTab} />
            {tab === "properties" && paper && graph && (
              <PropertiesPanel
                onClose={handleCloseDiagramSettings}
                paper={paper}
                graph={graph}
              />
            )}
            {tab === "settings" && (
              <SettingsPanel
                onClose={handleCloseDiagramSettings}
                onSettingsChange={handleSettingsChange}
              />
            )}
          </div>
        );
      case "element":
        if (selectedCell) {
          if (selectedCell.get("type") === "erd.Entity") {
            return <EntityInspector cell={selectedCell} />;
          }
          return (
            <div>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
                Element Inspector
              </h3>
              <p
                style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#666" }}
              >
                No properties to inspect for this element.
              </p>
            </div>
          );
        }
        return null;
      case "none":
      default:
        return (
          <div style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
              Inspector Panel
            </h3>
            <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#666" }}>
              Select an element to edit its properties
            </p>
          </div>
        );
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50px",
        right: 0,
        height: "calc(100% - 50px)",
        zIndex: 10,
        display: "flex",
        alignItems: "flex-start",
        transition: "transform 0.3s ease-in-out",
        transform: isPanelHidden ? `translateX(240px)` : "translateX(0)",
      }}
    >
      <div
        onClick={toggleSlide}
        style={{
          marginLeft: isPanelHidden ? "-270px" : "0px",
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
      <div
        id="inspector"
        style={{
          width: 240,
          background: "#f8f8f8",
          padding: 10,
          overflowY: "auto",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default Inspector;
