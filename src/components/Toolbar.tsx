import { type FC } from "react";
import CanvasSettings from "./CanvasSettings";

const Toolbar: FC = () => {
  const handleSettingsChange = (settings: {
    paperColor: string;
    snaplines: boolean;
    infinitePaper: boolean;
    dotGrid: boolean;
    gridSize: number;
  }) => {
    // Access the paper instance from the DOM
    const paperEl = document.querySelector("[data-paper]");
    if (paperEl && (paperEl as any).__paper__) {
      const paper = (paperEl as any).__paper__;

      // Apply settings to the paper
      paper.options.background = { color: settings.paperColor };
      paper.options.snaplines = settings.snaplines
        ? { enabled: true }
        : { enabled: false };
      paper.options.infinity = settings.infinitePaper;
      paper.options.drawGrid = settings.dotGrid;
      paper.options.gridSize = settings.gridSize;

      // Update the paper
      paper.drawBackground();
      paper.drawGrid();
    }
  };

  return (
    <div
      id="toolbar"
      style={{
        width: "100%",
        height: 30,
        position: "relative",
        top: 0,
        left: 0,
        right: 0,
        borderBottom: "1px solid #ccc",
        backgroundColor: "#f0f0f0",
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: " 10px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: "18px",
          marginRight: "20px",
          color: "#333",
        }}
      >
        JointJS+ Diagram Editor
      </div>

      <div>
        <CanvasSettings
          onSettingsChange={handleSettingsChange}
          initialSettings={{
            paperColor: "#F5F5F5",
            snaplines: true,
            infinitePaper: true,
            dotGrid: true,
            gridSize: 10,
          }}
        />
      </div>
    </div>
  );
};

export default Toolbar;
