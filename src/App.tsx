import "@joint/plus/joint-plus.css";
import "./App.css";
import { useJointJS, DIAGRAM_SETTINGS_EVENT } from "./hooks/useJointJS";
import Toolbar from "./components/Toolbar";
import Stencil from "./components/Stencil";
import Paper from "./components/Paper";
import Inspector from "./components/Inspector";
import Minimap from "./components/Minimap";
import { useState, useEffect } from "react";

function App() {
  const containerRef = useJointJS();
  const [showDiagramSettings, setShowDiagramSettings] = useState(false);
  const [settingsType, setSettingsType] = useState<"properties" | "settings">(
    "settings"
  );

  // Function to show diagram settings
  const handleShowDiagramSettings = (type: "properties" | "settings") => {
    setSettingsType(type);
    setShowDiagramSettings(true);
  };

  // Function to close diagram settings
  const handleCloseDiagramSettings = () => {
    setShowDiagramSettings(false);
  };

  // Listen for the custom event from the context menu
  useEffect(() => {
    const handleDiagramSettingsEvent = (event: CustomEvent) => {
      const { type } = event.detail;
      handleShowDiagramSettings(type as "properties" | "settings");
    };

    // Add event listener
    document.addEventListener(
      DIAGRAM_SETTINGS_EVENT,
      handleDiagramSettingsEvent as EventListener
    );

    // Clean up
    return () => {
      document.removeEventListener(
        DIAGRAM_SETTINGS_EVENT,
        handleDiagramSettingsEvent as EventListener
      );
    };
  }, []);

  return (
    <div
      id="canvas-container"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Top Toolbar */}
      <div style={{ height: 50, flexShrink: 0 }}>
        <Toolbar />
      </div>

      {/* Main section: Stencil | Paper | Inspector */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left sidebar with Stencil and Minimap */}
        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ flex: 1, minHeight: 0 }}>
            <Stencil />
          </div>
          <div style={{ flexShrink: 0 }}>
            <Minimap />
          </div>
        </div>

        {/* Paper - Center */}
        <div
          style={{
            flex: 1,
            minWidth: 400,
            minHeight: 400,
            position: "relative",
            overflow: "visible", // Allow paper to extend beyond container
          }}
        >
          <Paper ref={containerRef} />
        </div>

        {/* Inspector - Right sidebar */}
        <div style={{ width: 240, flexShrink: 0 }}>
          <Inspector
            showDiagramSettings={showDiagramSettings}
            settingsType={settingsType}
            onCloseDiagramSettings={handleCloseDiagramSettings}
          />
        </div>
      </div>

    </div>
  );
}

export default App;
