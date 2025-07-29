import type { FC } from "react";

interface DiagramSettingsProps {
  activeTab: "properties" | "settings";
  onTabChange: (tab: "properties" | "settings") => void;
}

const DiagramSettings: FC<DiagramSettingsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div
      style={{
        display: "flex",
        borderBottom: "1px solid #eee",
        marginBottom: "16px",
      }}
    >
      <button
        onClick={() => onTabChange("properties")}
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
        onClick={() => onTabChange("settings")}
        style={{
          padding: "8px 16px",
          background: activeTab === "settings" ? "#f0f0f0" : "transparent",
          border: "none",
          borderBottom: activeTab === "settings" ? "2px solid #0066cc" : "none",
          cursor: "pointer",
          fontWeight: activeTab === "settings" ? "bold" : "normal",
        }}
      >
        Settings
      </button>
    </div>
  );
};

export default DiagramSettings;
