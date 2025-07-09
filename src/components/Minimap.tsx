import { type FC, useState, useRef } from "react";
import iconCollapse from "../assets/inspector/icon-collapse.svg";
import iconExpand from "../assets/inspector/icon-expand.svg";

const Minimap: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);

    if (contentRef.current) {
      if (newCollapsedState) {
        contentRef.current.style.height = "0";
      } else {
        contentRef.current.style.height = "200px";
      }
    }
  };

  return (
    <div
      id="minimap"
      style={{
        width: 200,
        position: "absolute",
        left: 0,
        bottom: 0,
        borderTop: "1px solid #ccc",
        backgroundColor: "#f8f8f8",
        zIndex: 10,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with title and collapse button */}
      <div
        style={{
          padding: "10px",
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "6px", fontWeight: "bold" }}>
          MINIMAP
        </h3>
        <button
          onClick={toggleCollapse}
          style={{
            background: "none",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
            padding: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "24px",
          }}
        >
          <img
            src={isCollapsed ? iconExpand : iconCollapse}
            alt={isCollapsed ? "Expand" : "Collapse"}
            width="20"
            height="20"
          />
        </button>
      </div>

      {/* Content area that collapses/expands */}
      <div
        ref={contentRef}
        style={{
          height: isCollapsed ? 0 : "200px",
          overflow: "hidden",
          transition: "height 0.3s ease-in-out",
        }}
      />
    </div>
  );
};

export default Minimap;
