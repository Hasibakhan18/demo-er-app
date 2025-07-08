import { type FC, useState } from "react";

interface PropertiesPanelProps {
  onClose?: () => void;
}

const PropertiesPanel: FC<PropertiesPanelProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [canvasSize, setCanvasSize] = useState("medium");
  const [isVisible, setIsVisible] = useState(true);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [lockStatus, setLockStatus] = useState("unlocked");

  const colors = [
    { name: "White", hex: "#ffffff" },
    { name: "Light Gray", hex: "#f0f0f0" },
    { name: "Dark Gray", hex: "#333333" },
    { name: "Black", hex: "#000000" },
    { name: "Blue", hex: "#007bff" },
    { name: "Red", hex: "#dc3545" },
    { name: "Green", hex: "#28a745" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter diagram name"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
          Canvas Size
        </label>
        <select
          value={canvasSize}
          onChange={(e) => setCanvasSize(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div style={{ marginBottom: "16px", display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={isVisible}
          onChange={(e) => setIsVisible(e.target.checked)}
          style={{ marginRight: "8px" }}
        />
        <label style={{ fontWeight: "500" }}>Visible</label>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
          Background Color
        </label>
        <select
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          {colors.map((color) => (
            <option key={color.hex} value={color.hex}>
              {color.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
          Lock Status
        </label>
        <select
          value={lockStatus}
          onChange={(e) => setLockStatus(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option value="locked">Locked</option>
          <option value="unlocked">Unlocked</option>
        </select>
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

export default PropertiesPanel;