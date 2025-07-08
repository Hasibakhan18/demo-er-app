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
  const [isCollapsed, setIsCollapsed] = useState(false);

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
        width: isCollapsed ? 0 : 240,
        position: "absolute",
        top: "50px", // Below toolbar
        right: "0",
        /* deepseekchanges - Set bottom to minimap height */
        bottom: "210px",
        borderLeft: isCollapsed ? "none" : "1px solid #ccc",
        background: isCollapsed ? "transparent" : "#f8f8f8",
        padding: isCollapsed ? 0 : 10,
        overflowY: "auto",
        height: "calc(100vh - 50px - 300px)", // Full height minus toolbar and minimap
        boxSizing: "border-box",
        zIndex: 10,
        transition: "width 0.2s ease, padding 0.2s ease",
      }}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          position: "absolute",
          left: isCollapsed ? -30 : -25,
          top: "50%",
          transform: "translateY(-50%)",
          width: 25,
          height: 50,
          background: "#f8f8f8",
          border: "1px solid #ccc",
          borderRight: "none",
          borderRadius: "4px 0 0 4px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 11,
        }}
      >
        <img
          src={isCollapsed ? "/src/assets/inspector/icon-expand.svg" : "/src/assets/inspector/icon-collapse.svg"}
          alt={isCollapsed ? "Expand" : "Collapse"}
          width={16}
          height={16}
        />
      </button>
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
