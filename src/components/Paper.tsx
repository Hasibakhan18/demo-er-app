import { forwardRef } from "react";
import type { ForwardedRef } from "react";

const Paper = forwardRef<HTMLDivElement>(
  (_props, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        data-paper="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          minWidth: "5000px",

          minHeight: "5000px",
          overflow: "auto",
          backgroundColor: "#ffffff",
          border: "1px solid #e0e0e0",
          boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
          zIndex: 0, // Inner shadow for depth
        }}
      >
        {/* Placeholder for when paper is empty */}
        <div
          style={{
            // position: "absolute",
            top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
            color: "#aaa",
            fontSize: "14px",
            pointerEvents: "none", // Don't interfere with paper interactions
            zIndex: 0,
          }}
        >
          Click and drag elements from the stencil
        </div>
      </div>
    );
  }
);

export default Paper;
