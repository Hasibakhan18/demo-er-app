import { type FC, useRef, useState, useEffect } from "react";
import iconCollapse from "../assets/inspector/icon-collapse.svg";
import iconExpand from "../assets/inspector/icon-expand.svg";
import { stencilElements } from "../config/stencil";
import { dia, shapes, ui } from "@joint/plus";

const Stencil: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const stencilRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const stencilInstance = useRef<any>(null);

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);

    // Update the content visibility when toggle is clicked
    if (contentRef.current) {
      if (newCollapsedState) {
        contentRef.current.style.height = "0";
      } else {
        contentRef.current.style.height = "calc(100% - 50px)";
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter stencil elements if stencil is initialized
    if (stencilInstance.current) {
      stencilInstance.current.filter(term);
    }
  };

  useEffect(() => {
    // Wait for the stencil container to be available
    if (!stencilRef.current) return;

    // Find the main paper from the DOM
    const paperEl = document.querySelector(".joint-paper");
    if (!paperEl) {
      // If we can't find the paper yet, try again later
      const checkInterval = setInterval(() => {
        const el = document.querySelector(".joint-paper");
        if (el) {
          clearInterval(checkInterval);
          initializeStencil(el);
        }
      }, 100);

      // Clean up interval if component unmounts
      return () => clearInterval(checkInterval);
    }

    initializeStencil(paperEl);

    function initializeStencil(paperElement: Element) {
      // Try to get the paper instance
      // @ts-ignore - We know this property exists in JointJS
      const mainPaper = paperElement.__paper__;
      if (!mainPaper) {
        console.error("Could not find JointJS paper instance");
        return;
      }

      // Create and initialize the stencil with groups
      const stencil = new ui.Stencil({
        paper: mainPaper,
        width: 180,
        height: 380,
        search: {
          "*": ["attrs/label/text", "attrs/root/title", "type"],
        },
        // Define groups for the stencil
        groups: {
          basicShapes: {
            label: "Basic shapes",
            index: 1,
          },
          advancedShapes: {
            label: "Advanced shapes",
            index: 2,
          },
        },
        groupsToggleButtons: true,
        layout: true,
        dropAnimation: true,
      });

      // Save the stencil instance for later use
      stencilInstance.current = stencil;

      // Render the stencil
      stencil.render();

      // Append the stencil element to the container
      if (stencilRef.current) {
        stencilRef.current.innerHTML = "";
        stencilRef.current.appendChild(stencil.el);
      }

      // Organize stencil elements into groups
      const basicShapes = stencilElements.slice(0, 2); // Rectangle and Ellipse
      const advancedShapes = stencilElements.slice(2); // Polygon and Cylinder

      // Load the stencil elements into their respective groups
      stencil.load({
        basicShapes: basicShapes,
        advancedShapes: advancedShapes,
      });

      // Open all groups by default to show all elements
      stencil.openGroups();

      // Set up event handler for dropped elements
      stencil.on("element:drop", function (elementView: dia.ElementView) {
        // You can add custom handling for dropped elements here
        console.log("Element dropped:", elementView.model.get("type"));
      });
    }

    return () => {
      // Clean up
      if (stencilRef.current) {
        stencilRef.current.innerHTML = "";
      }
      if (stencilInstance.current) {
        stencilInstance.current.remove();
        stencilInstance.current = null;
      }
    };
  }, []);

  return (
    <div
      id="stencil"
      style={{
        width: 200,
        position: "absolute",
        top: "50px", // Below toolbar
        left: 0,
        bottom: 0,
        borderRight: "1px solid #ccc",
        backgroundColor: "#f8f8f8",
        zIndex: 10,
        height: "calc(100% - 50px)", // Full height minus toolbar
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
          STENCIL PANEL
        </h3>
        <div style={{ display: "flex", gap: "5px" }}>
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
      </div>

      {/* Content area that collapses/expands */}
      <div
        ref={contentRef}
        style={{
          height: isCollapsed ? 0 : "calc(100% - 50px)", // Subtract header height
          overflow: "hidden",
          transition: "height 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Search box */}
        <div style={{ padding: "10px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "5px 10px",
              backgroundColor: "white",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "5px" }}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                fontSize: "14px",
              }}
            />
          </div>
        </div>

        {/* Stencil elements container */}
        <div
          id="stencil-elements-container"
          ref={stencilRef}
          style={{
            width: "100%",
            flex: 1,
            overflow: "auto",
            padding: "0",
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>
  );
};

export default Stencil;
