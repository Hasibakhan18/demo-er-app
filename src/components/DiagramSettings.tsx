import { useState, useEffect } from "react";
import type { FC } from "react";
import PropertiesPanel from "./PropertiesPanel";
import SettingsPanel from "./SettingsPanel";

// interface DiagramSettingsProps {
//   onClose?: () => void;
// }

// chatgptchanges - added selectedTab prop
interface DiagramSettingsProps {
  onClose?: () => void;
  selectedTab?: "properties" | "settings";
}

// const DiagramSettings: FC<DiagramSettingsProps> = ({ onClose }) => {
//   const [activeTab, setActiveTab] = useState<"properties" | "settings">(
//     "settings"
//   );

// chatgptchanges - initialize activeTab from selectedTab prop
const DiagramSettings: FC<DiagramSettingsProps> = ({
  onClose,
  selectedTab = "settings",
}) => {
  const [activeTab, setActiveTab] = useState<"properties" | "settings">(
    selectedTab
  );

  // chatgptchanges - update tab if selectedTab prop changes
  useEffect(() => {
    setActiveTab(selectedTab);
  }, [selectedTab]);

  const handleSettingsChange = (settings: {
    paperColor: string;
    snaplines: boolean;
    infinitePaper: boolean;
    dotGrid: boolean;
    gridSize: number;
  }) => {
    // Here you would apply the settings to the paper
    console.log("Settings changed:", settings);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #eee",
          marginBottom: "16px",
        }}
      >
        <button
          onClick={() => setActiveTab("properties")}
          style={{
            padding: "8px 16px",
            background: activeTab === "properties" ? "#f0f0f0" : "transparent",
            border: "none",
            borderBottom:
              activeTab === "properties" ? "2px solid #0066cc" : "none",
            cursor: "pointer",
            fontWeight: activeTab === "properties" ? "bold" : "normal",
          }}
        >
          Properties
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          style={{
            padding: "8px 16px",
            background: activeTab === "settings" ? "#f0f0f0" : "transparent",
            border: "none",
            borderBottom:
              activeTab === "settings" ? "2px solid #0066cc" : "none",
            cursor: "pointer",
            fontWeight: activeTab === "settings" ? "bold" : "normal",
          }}
        >
          Settings
        </button>
      </div>

      {activeTab === "properties" && <PropertiesPanel onClose={onClose} />}
      {activeTab === "settings" && (
        <SettingsPanel
          onClose={onClose}
          onSettingsChange={handleSettingsChange}
        />
      )}

      {onClose && (
        <div style={{ marginTop: "16px", textAlign: "right" }}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default DiagramSettings;
