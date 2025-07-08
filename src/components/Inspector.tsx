import { type FC, useEffect, useState } from "react";
import DiagramSettings from "./DiagramSettings";

interface InspectorProps {
  showDiagramSettings?: boolean;
  settingsType?: "properties" | "settings";
  onCloseDiagramSettings?: () => void;
}

const Inspector: FC<InspectorProps> = ({
  showDiagramSettings = false,
  settingsType = "settings",
  onCloseDiagramSettings,
}) => {
  const [activeContent, setActiveContent] = useState<"element" | "diagram">(
    showDiagramSettings ? "diagram" : "element"
  );

// chatgptchanges - Added tab selection from right-click context menu
  const [tab, setTab] = useState<"properties" | "settings">(settingsType);

  

  // deepseekchanges - Added listener for inspector:show event
  useEffect(() => {
    const handleInspectorShow = (event: Event) => {
      const customEvent = event as CustomEvent;
      const show = customEvent.detail?.show;
      const type = customEvent.detail?.type;
      
      if (show) {
        setActiveContent("diagram");
        if (type === "settings" || type === "properties") {
          setTab(type);
        }
      }
    };

    document.addEventListener("inspector:show", handleInspectorShow);
    return () => {
      document.removeEventListener("inspector:show", handleInspectorShow);
    };
  }, []);




  // Update active content when props change
  if (showDiagramSettings && activeContent !== "diagram") {
    setActiveContent("diagram");
  }

  const handleCloseDiagramSettings = () => {
    setActiveContent("element");
    if (onCloseDiagramSettings) {
      onCloseDiagramSettings();
    }
  };

  return (
    <div
      id="inspector"
      style={{
        width: 240,
        position: "absolute",
        top: "50px", // Below toolbar
        right: "0",
        bottom: "0",
        borderLeft: "1px solid #ccc",
        background: "#f8f8f8",
        padding: 10,
        overflowY: "auto",
        height: "calc(100% - 50px)", // Full height minus toolbar
        boxSizing: "border-box",
        zIndex: 10,
      }}
    >
      {activeContent === "element" && !showDiagramSettings ? (
        <div style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
            Inspector Panel
          </h3>
          <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#666" }}>
            Select an element to edit its properties
          </p>
        </div>
      ) : (
        <div>
          <div style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
              {tab === "properties" ? "Diagram Properties" : "Diagram Settings"}
            </h3>
            <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#666" }}>
              {tab === "properties"
                ? "Edit diagram properties"
                : "Configure canvas settings"}
            </p>
          </div>
          <DiagramSettings
            onClose={handleCloseDiagramSettings}
            selectedTab={tab}
          />
        </div>
      )}
    </div>
  );
};

export default Inspector;
