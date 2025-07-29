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
  const { containerRef, graph, paper, paperScroller } = useJointJS();

  return (
    <div
      id="canvas-container"
      style={{
        position: "relative",
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
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div style={{ flex: 1, minHeight: 0 }}>
            {paper && graph && <Stencil paper={paper} graph={graph} />}
          </div>
          <div style={{ flexShrink: 0 }}>
            {paperScroller && <Minimap paperScroller={paperScroller} />}
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
          {paper && graph && <Inspector paper={paper} graph={graph} />}
        </div>
      </div>
    </div>
  );
}

export default App;
