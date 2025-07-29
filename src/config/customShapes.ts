import { dia } from "@joint/plus";

// Register all custom shapes
export function registerCustomShapes() {
  // Entity
  dia.Element.define(
    "custom.Entity",
    {
      attrs: {
        body: {
          fill: "#E8F0FE",
          stroke: "#4A90E2",
          strokeWidth: 2,
          rx: 4,
          ry: 4,
        },
        label: {
          text: "Entity",
          fill: "#000000",
          fontSize: 14,
          fontWeight: "bold",
          textAnchor: "middle",
          yAlignment: "middle",
          refX: "50%",
          refY: "50%",
        },
      },
      size: { width: 120, height: 70 },
    },
    {
      markup: [
        { tagName: "rect", selector: "body" },
        { tagName: "text", selector: "label" },
      ],
    }
  );

  // WeakEntity
  dia.Element.define(
    "custom.WeakEntity",
    {
      attrs: {
        outerBody: {
          fill: "none",
          stroke: "#D0021B",
          strokeWidth: 2,
          rx: 4,
          ry: 4,
        },
        innerBody: {
          fill: "#FFE8E8",
          stroke: "#D0021B",
          strokeWidth: 1,
          rx: 2,
          ry: 2,
          refX: 4,
          refY: 4,
          refWidth: -8,
          refHeight: -8,
        },
        label: {
          text: "Weak Entity",
          fill: "#000000",
          fontSize: 14,
          fontWeight: "bold",
          textAnchor: "middle",
          yAlignment: "middle",
          refX: "50%",
          refY: "50%",
        },
      },
      size: { width: 140, height: 50 },
    },
    {
      markup: [
        { tagName: "rect", selector: "outerBody" },
        { tagName: "rect", selector: "innerBody" },
        { tagName: "text", selector: "label" },
      ],
    }
  );

  // Relationship (Diamond shape)
  dia.Element.define(
    "custom.Relationship",
    {
      attrs: {
        body: {
          fill: "#FFF4E5",
          stroke: "#F5A623",
          strokeWidth: 2,
          refPoints: "0,50 50,0 100,50 50,100",
        },
        label: {
          text: "Relationship",
          fill: "#000000",
          fontSize: 12,
          fontWeight: "bold",
          textAnchor: "middle",
          yAlignment: "middle",
          refX: "50%",
          refY: "50%",
        },
      },
      size: { width: 120, height: 80 },
    },
    {
      markup: [
        { tagName: "polygon", selector: "body" },
        { tagName: "text", selector: "label" },
      ],
    }
  );

  // Note
  dia.Element.define(
    "custom.Note",
    {
      attrs: {
        body: {
          fill: "#FFFACD",
          stroke: "#CCCCCC",
          strokeWidth: 1,
          rx: 6,
          ry: 6,
        },
        cornerFold: {
          fill: "#F0F0F0",
          stroke: "#CCCCCC",
          strokeWidth: 1,
          refPoints: "85,0 100,0 100,15",
        },
        label: {
          text: "Note",
          fill: "#000000",
          fontSize: 12,
          textAnchor: "start",
          refX: 10,
          refY: 25,
        },
      },
      size: { width: 140, height: 80 },
    },
    {
      markup: [
        { tagName: "rect", selector: "body" },
        { tagName: "polygon", selector: "cornerFold" },
        { tagName: "text", selector: "label" },
      ],
    }
  );

  // TitleBlock
  dia.Element.define(
    "custom.TitleBlock",
    {
      attrs: {
        body: {
          fill: "#333333",
          stroke: "#000000",
          strokeWidth: 2,
        },
        label: {
          text: "Title Block",
          fill: "#FFFFFF",
          fontSize: 16,
          fontWeight: "bold",
          textAnchor: "middle",
          yAlignment: "middle",
          refX: "50%",
          refY: "50%",
        },
      },
      size: { width: 200, height: 60 },
    },
    {
      markup: [
        { tagName: "rect", selector: "body" },
        { tagName: "text", selector: "label" },
      ],
    }
  );

  // AdvancedShape1 (Rounded Rectangle with gradient effect)
  dia.Element.define(
    "custom.AdvancedShape1",
    {
      attrs: {
        body: {
          fill: "#E0FFFF",
          stroke: "#00CED1",
          strokeWidth: 2,
          rx: 10,
          ry: 10,
        },
        highlight: {
          fill: "rgba(255, 255, 255, 0.3)",
          stroke: "none",
          rx: 10,
          ry: 10,
          refX: 2,
          refY: 2,
          refWidth: -4,
          refHeight: -20,
        },
        label: {
          text: "Advanced Shape 1",
          fill: "#000000",
          fontSize: 14,
          fontWeight: "bold",
          textAnchor: "middle",
          yAlignment: "middle",
          refX: "50%",
          refY: "50%",
        },
      },
      size: { width: 160, height: 80 },
    },
    {
      markup: [
        { tagName: "rect", selector: "body" },
        { tagName: "rect", selector: "highlight" },
        { tagName: "text", selector: "label" },
      ],
    }
  );

  // AdvancedShape2 (Hexagon)
  dia.Element.define(
    "custom.AdvancedShape2",
    {
      attrs: {
        body: {
          fill: "#F0FFF0",
          stroke: "#32CD32",
          strokeWidth: 2,
          refPoints: "25,0 75,0 100,50 75,100 25,100 0,50",
        },
        label: {
          text: "Advanced Shape 2",
          fill: "#000000",
          fontSize: 14,
          fontWeight: "bold",
          textAnchor: "middle",
          yAlignment: "middle",
          refX: "50%",
          refY: "50%",
        },
      },
      size: { width: 160, height: 80 },
    },
    {
      markup: [
        { tagName: "polygon", selector: "body" },
        { tagName: "text", selector: "label" },
      ],
    }
  );

  // Standard Rectangle
  dia.Element.define(
    "custom.Rectangle",
    {
      attrs: {
        body: {
          fill: "#F5F5F5",
          stroke: "#666666",
          strokeWidth: 1,
        },
        label: {
          text: "Rectangle",
          fill: "#000000",
          fontSize: 14,
          textAnchor: "middle",
          yAlignment: "middle",
          refX: "50%",
          refY: "50%",
        },
      },
      size: { width: 100, height: 60 },
    },
    {
      markup: [
        { tagName: "rect", selector: "body" },
        { tagName: "text", selector: "label" },
      ],
    }
  );

  // Standard Circle
  dia.Element.define(
    "custom.Circle",
    {
      attrs: {
        body: {
          fill: "#E6F3FF",
          stroke: "#4A90E2",
          strokeWidth: 2,
        },
        label: {
          text: "Circle",
          fill: "#000000",
          fontSize: 14,
          textAnchor: "middle",
          yAlignment: "middle",
          refX: "50%",
          refY: "50%",
        },
      },
      size: { width: 80, height: 80 },
    },
    {
      markup: [
        {
          tagName: "circle",
          selector: "body",
          attributes: { cx: "50%", cy: "50%", r: "50%" },
        },
        { tagName: "text", selector: "label" },
      ],
    }
  );

  // Standard Ellipse
  dia.Element.define(
    "custom.Ellipse",
    {
      attrs: {
        body: {
          fill: "#F0E6FF",
          stroke: "#8A4FFF",
          strokeWidth: 2,
        },
        label: {
          text: "Ellipse",
          fill: "#000000",
          fontSize: 14,
          textAnchor: "middle",
          yAlignment: "middle",
          refX: "50%",
          refY: "50%",
        },
      },
      size: { width: 120, height: 80 },
    },
    {
      markup: [
        {
          tagName: "ellipse",
          selector: "body",
          attributes: { cx: "50%", cy: "50%", rx: "50%", ry: "50%" },
        },
        { tagName: "text", selector: "label" },
      ],
    }
  );
  // Interface
  dia.Element.define(
    "custom.Interface",
    {
      attrs: {
        body: {
          width: "calc(w)",
          height: "calc(h)",
          rx: 4,
          fill: "white",
          stroke: "#566573",
          strokeWidth: 2,
        },
        separator: {
          x1: 1,
          y1: 50,
          x2: "calc(w)",
          y2: 50,
          stroke: "#566573",
          strokeWidth: 1.5,
        },
        stereotype: {
          text: "<<interface>>",
          x: "calc(w/2)",
          y: 20,
          fontFamily: "Arial, sans-serif",
          fontSize: 12,
          fontStyle: "italic",
          textAnchor: "middle",
        },
        interfaceName: {
          text: "[InterfaceName]",
          x: "calc(w/2)",
          y: 40,
          fontFamily: "Arial, sans-serif",
          fontSize: 14,
          fontWeight: "bold",
          textAnchor: "middle",
        },
        method1: {
          text: "+ methodOne(arg): void",
          x: 10,
          y: 65,
          fontFamily: "monospace",
          fontSize: 12,
        },
        method2: {
          text: "+ methodTwo(): String",
          x: 10,
          y: 80,
          fontFamily: "monospace",
          fontSize: 12,
        },
      },
      size: { width: 180, height: 100 },
    },
    {
      markup: [
        { tagName: "rect", selector: "body" },
        { tagName: "line", selector: "separator" },
        { tagName: "text", selector: "stereotype" },
        { tagName: "text", selector: "interfaceName" },
        { tagName: "text", selector: "method1" },
        { tagName: "text", selector: "method2" },
      ],
    }
  );

  console.log("✅ All custom shapes registered successfully");
}

export const createEREntity = (isHovered: boolean) =>
  dia.Element.define(
    "erd.Entity",
    {
      size: { width: 260, height: 200 },
      attrs: {
        root: { magnet: false },
        body: {
          width: "calc(w)",
          height: "calc(h)",
          stroke: isHovered ? "#4f46e5" : "#D1D5DB",
          strokeWidth: isHovered ? 2 : 1,
          fill: isHovered ? "#EEF2FF" : "#FFFFFF",
          rx: 6,
          ry: 6,
        },

        header: {
          width: "calc(w)",
          height: 40,
          fill: isHovered ? "#E0E7FF" : "#F9FAFB",
          stroke: isHovered ? "#4f46e5" : "#D1D5DB",
          strokeWidth: isHovered ? 2 : 1,
          rx: 6,
          ry: 6,
        },

        headerLine: {
          x1: 0,
          y1: 40,
          x2: "calc(w)",
          y2: 40,
          stroke: "#E5E7EB",
          strokeWidth: 1,
        },

        headerText: {
          text: "Customer Entity",
          textVerticalAnchor: "middle",
          textAnchor: "middle",
          x: "calc(0.5*w)",
          y: 20,
          fontSize: 14,
          fontFamily: "Inter, sans-serif",
          fontWeight: "600",
          fill: "#111827",
        },

        attr1: {
          text: "🔑 Name         (String)",
          x: 16,
          y: 56,
          fontSize: 13,
          fontFamily: "Inter, sans-serif",
          fontWeight: "400",
          fill: "#1F2937",
          textAnchor: "start",
        },
        attr2: {
          text: "    Email        (Text)",
          x: 16,
          y: 76,
          fontSize: 13,
          fontFamily: "Inter, sans-serif",
          fontWeight: "400",
          fill: "#1F2937",
          textAnchor: "start",
        },
        attr3: {
          text: "🔐 OrderID    (ULID)",
          x: 16,
          y: 96,
          fontSize: 13,
          fontFamily: "Inter, sans-serif",
          fontWeight: "400",
          fill: "#1F2937",
          textAnchor: "start",
        },
      },
    },
    {
      markup: [
        { tagName: "rect", selector: "body" },
        { tagName: "rect", selector: "header" },
        { tagName: "line", selector: "headerLine" },
        { tagName: "text", selector: "headerText" },
        { tagName: "text", selector: "attr1" },
        { tagName: "text", selector: "attr2" },
        { tagName: "text", selector: "attr3" },
      ],
    }
  );
