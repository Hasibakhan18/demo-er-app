import { type FC } from "react";

const Minimap: FC = () => {
  return (
    <div
      id="minimap"
      style={{
        position: "absolute",
        bottom: 20,
        right: 100,
        border: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto", // Only vertical scroll if content grows
        maxHeight: "60vh", // Prevents overflow off the screen
        minWidth: "120px",
        scrollBehavior: "smooth",
      }}
    />
  );
};

export default Minimap;
