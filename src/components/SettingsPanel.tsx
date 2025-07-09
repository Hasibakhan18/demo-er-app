import { type FC, useState } from "react";

interface SettingsPanelProps {
  onClose?: () => void;
  onSettingsChange?: (settings: {
    paperColor: string;
    snaplines: boolean;
    infinitePaper: boolean;
    dotGrid: boolean;
    gridSize: number;
  }) => void;
}

const SettingsPanel: FC<SettingsPanelProps> = ({ onClose, onSettingsChange }) => {
  const [settings, setSettings] = useState({
    gridSize: 20,
    gridStyle: "dots",
    autoLayout: false,
    showGrid: true,
    snapToGrid: true
  });

  const handleChange = (newSettings: Partial<typeof settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    onSettingsChange?.({
      paperColor: "#ffffff",
      snaplines: updated.snapToGrid,
      infinitePaper: true,
      dotGrid: updated.gridStyle === "dots",
      gridSize: updated.gridSize
    });
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
          Grid Size (px)
        </label>
        <input
          type="range"
          min="10"
          max="50"
          step="5"
          value={settings.gridSize}
          onChange={(e) => handleChange({ gridSize: Number(e.target.value) })}
          style={{ width: "100%" }}
        />
        <div style={{ textAlign: "center", marginTop: "4px" }}>{settings.gridSize}px</div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
          Grid Style
        </label>
        <select
          value={settings.gridStyle}
          onChange={(e) => handleChange({ gridStyle: e.target.value })}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option value="dots">Dots</option>
          <option value="lines">Lines</option>
          <option value="crosses">Crosses</option>
        </select>
      </div>

      <div style={{ marginBottom: "16px", display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={settings.autoLayout}
          onChange={(e) => handleChange({ autoLayout: e.target.checked })}
          style={{ marginRight: "8px" }}
        />
        <label style={{ fontWeight: "500" }}>Enable Auto Layout</label>
      </div>

      <div style={{ marginBottom: "16px", display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={settings.showGrid}
          onChange={(e) => handleChange({ showGrid: e.target.checked })}
          style={{ marginRight: "8px" }}
        />
        <label style={{ fontWeight: "500" }}>Show Grid</label>
      </div>

      <div style={{ marginBottom: "16px", display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={settings.snapToGrid}
          onChange={(e) => handleChange({ snapToGrid: e.target.checked })}
          style={{ marginRight: "8px" }}
        />
        <label style={{ fontWeight: "500" }}>Snap to Grid</label>
      </div>

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

export default SettingsPanel;