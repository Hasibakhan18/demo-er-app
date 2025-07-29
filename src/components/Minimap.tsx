import { type FC, useState, useRef } from "react";
import { useEffect } from "react";
import { ui } from "@joint/plus";
import * as joint from "@joint/core";

const Minimap: FC<{ paperScroller: any }> = ({ paperScroller }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

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
    ></div>
  );
};

export default Minimap;
