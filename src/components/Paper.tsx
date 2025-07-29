import { forwardRef } from "react";

const Paper = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        position: "relative", // ✅ helps PaperScroller mount properly
      }}
    />
  );
});

export default Paper;
