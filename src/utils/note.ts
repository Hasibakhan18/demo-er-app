import { shapes } from "@joint/plus";

export class Note extends shapes.standard.Rectangle {
  constructor(options = {}) {
    super({
      ...options,
      size: { width: 150, height: 60 },
      attrs: {
        body: {
          fill: "#FFFF88", // Light Yellow
          stroke: "#AAAA00",
          strokeWidth: 1,
          rx: 5,
          ry: 5,
        },
        label: {
          text: "New Note",
          fill: "#000000",
          fontSize: 14,
          refY: 0.5,
          yAlignment: "middle",
        },
      },
    });
  }
}
