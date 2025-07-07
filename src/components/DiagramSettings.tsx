import { useState, useEffect } from "react";
import type { FC } from "react";
import CanvasSettings from "./CanvasSettings";

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
const DiagramSettings: FC<DiagramSettingsProps> = ({ onClose, selectedTab = "settings" }) => {
  const [activeTab, setActiveTab] = useState<"properties" | "settings">(selectedTab);

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

      {activeTab === "properties" && (
        <div>
          <h4 style={{ margin: "0 0 16px 0" }}>Diagram Properties</h4>
          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                fontWeight: "500",
              }}
            >
              Diagram Name
            </label>
            <input
              type="text"
              placeholder="Enter diagram name"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                fontWeight: "500",
              }}
            >
              Description
            </label>
            <textarea
              placeholder="Enter diagram description"
              rows={3}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                resize: "vertical",
              }}
            />
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div>
          <h4 style={{ margin: "0 0 16px 0" }}>Canvas Settings</h4>
          <CanvasSettings
            onSettingsChange={handleSettingsChange}
            initialSettings={{
              paperColor: "#ffffff",
              snaplines: true,
              infinitePaper: true,
              dotGrid: true,
              gridSize: 10,
            }}
          />
        </div>
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
