import { useState, useRef, useEffect } from "react";

interface CanvasSettingsProps {
  onSettingsChange: (settings: {
    paperColor: string;
    snaplines: boolean;
    infinitePaper: boolean;
    dotGrid: boolean;
    gridSize: number;
  }) => void;
  initialSettings?: {
    paperColor: string;
    snaplines: boolean;
    infinitePaper: boolean;
    dotGrid: boolean;
    gridSize: number;
  };
}

const CanvasSettings: React.FC<CanvasSettingsProps> = ({
  onSettingsChange,
  initialSettings = {
    paperColor: "#ffffff",
    snaplines: true,
    infinitePaper: true,
    dotGrid: true,
    gridSize: 10,
  },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(initialSettings);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSettingChange = (
    key: keyof typeof settings,
    value: string | boolean | number
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <button
        onClick={toggleDropdown}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "6px 12px",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
          color: "#333",
        }}
      >
        Canvas settings
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginLeft: "8px" }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            width: "300px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 1000,
            padding: "16px",
            marginTop: "8px",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <label style={{ fontWeight: "500" }}>Paper color</label>
              <input
                type="color"
                value={settings.paperColor}
                onChange={(e) =>
                  handleSettingChange("paperColor", e.target.value)
                }
                style={{
                  width: "32px",
                  height: "32px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                id="snaplines"
                checked={settings.snaplines}
                onChange={(e) =>
                  handleSettingChange("snaplines", e.target.checked)
                }
                style={{ marginRight: "8px" }}
              />
              <label htmlFor="snaplines" style={{ fontWeight: "500" }}>
                Snaplines
              </label>
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                id="infinitePaper"
                checked={settings.infinitePaper}
                onChange={(e) =>
                  handleSettingChange("infinitePaper", e.target.checked)
                }
                style={{ marginRight: "8px" }}
              />
              <label htmlFor="infinitePaper" style={{ fontWeight: "500" }}>
                Infinite paper
              </label>
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                id="dotGrid"
                checked={settings.dotGrid}
                onChange={(e) =>
                  handleSettingChange("dotGrid", e.target.checked)
                }
                style={{ marginRight: "8px" }}
              />
              <label htmlFor="dotGrid" style={{ fontWeight: "500" }}>
                Dot grid
              </label>
            </div>
          </div>

          <div>
            <div style={{ marginBottom: "8px" }}>
              <label style={{ fontWeight: "500" }}>Grid size</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={settings.gridSize}
                  onChange={(e) =>
                    handleSettingChange("gridSize", parseInt(e.target.value))
                  }
                  style={{ flex: 1, marginRight: "8px" }}
                />
                <span style={{ minWidth: "30px", textAlign: "right" }}>
                  {settings.gridSize}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanvasSettings;
