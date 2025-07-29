// config/stencil.ts
import { shapes } from "@joint/plus";
import { Database, Square, Hexagon } from "lucide-react";

interface PaletteGroup {
  id: string;
  label: string;
  icon: React.ReactNode;
  elements: any[];
  defaultExpanded?: boolean;
}

export const stencilElements = () => [
  {
    label: "Rectangle",
    description: "A simple rectangle shape",
    group: "general",
    shape: new shapes.standard.Rectangle().resize(100, 40).attr({
      body: {
        fill: "#E0F7FA",
        stroke: "#00796B",
        strokeWidth: 2,
        rx: 6,
        ry: 6,
      },
      label: {
        text: "Rectangle",
        fill: "#004D40",
        fontSize: 13,
      },
    }),
  },
  {
    label: "Circle",
    description: "A circle shape",
    group: "general",
    shape: new shapes.standard.Circle().resize(60, 60).attr({
      body: {
        fill: "#FFF3E0",
        stroke: "#EF6C00",
        strokeWidth: 2,
      },
      label: {
        text: "Circle",
        fill: "#E65100",
        fontSize: 13,
      },
    }),
  },
  {
    label: "Ellipse",
    description: "An ellipse shape",
    group: "advanced",
    shape: new shapes.standard.Ellipse().resize(100, 60).attr({
      body: {
        fill: "#F3E5F5",
        stroke: "#6A1B9A",
        strokeWidth: 2,
      },
      label: {
        text: "Ellipse",
        fill: "#4A148C",
        fontSize: 13,
      },
    }),
  },
  {
    label: "Polygon",
    description: "A polygon shape",
    group: "annotations",
    shape: new shapes.standard.Polygon().resize(70, 70).attr({
      body: {
        refPoints: "0,10 10,0 20,10 10,20",
        fill: "#FFFDE7",
        stroke: "#FBC02D",
      },
      label: {
        text: "Polygon",
        fill: "#F57F17",
        fontSize: 13,
      },
    }),
  },
];

export const paletteGroups: PaletteGroup[] = [
  {
    id: "entities",
    label: "ER Entities",
    icon: <Database className="w-4 h-4" />,
    defaultExpanded: true,
    elements: [
      {
        type: "erd.Entity",
        size: { width: 120, height: 80 },
        attrs: {
          headerText: { text: "Entity" },
          attributesText: { text: "id: INTEGER\nname: VARCHAR" },
        },
        ports: {
          items: [
            { id: "in0", group: "in" },
            { id: "in1", group: "in" },
            { id: "out0", group: "out" },
            { id: "out1", group: "out" },
          ],
        },
      },
    ],
  },
  {
    id: "basic",
    label: "Basic Shapes",
    icon: <Square className="w-4 h-4" />,
    defaultExpanded: true,
    elements: [
      {
        type: "standard.Rectangle",
        size: { width: 80, height: 50 },
        attrs: {
          body: {
            stroke: "#4f46e5",
            strokeWidth: 2,
            fill: "#f8fafc",
            rx: 4,
            ry: 4,
          },
          label: {
            text: "Rectangle",
            fontSize: 12,
            fontFamily: "Inter, sans-serif",
            fill: "#1e293b",
          },
        },
      },
      {
        type: "standard.Ellipse",
        size: { width: 80, height: 50 },
        attrs: {
          body: {
            stroke: "#10b981",
            strokeWidth: 2,
            fill: "#f0fdf4",
          },
          label: {
            text: "Ellipse",
            fontSize: 12,
            fontFamily: "Inter, sans-serif",
            fill: "#1e293b",
          },
        },
      },
      {
        type: "standard.Polygon",
        size: { width: 80, height: 50 },
        attrs: {
          body: {
            stroke: "#f59e0b",
            strokeWidth: 2,
            fill: "#fffbeb",
            points:
              "calc(w/2),0 calc(w),calc(h/2) calc(w/2),calc(h) 0,calc(h/2)",
          },
          label: {
            text: "Diamond",
            fontSize: 12,
            fontFamily: "Inter, sans-serif",
            fill: "#1e293b",
          },
        },
      },
    ],
  },
  {
    id: "complex",
    label: "Complex Shapes",
    icon: <Hexagon className="w-4 h-4" />,
    defaultExpanded: false,
    elements: [
      {
        type: "standard.Cylinder",
        size: { width: 80, height: 60 },
        attrs: {
          body: {
            stroke: "#8b5cf6",
            strokeWidth: 2,
            fill: "#faf5ff",
          },
          top: {
            fill: "#8b5cf6",
            stroke: "#8b5cf6",
          },
          label: {
            text: "Cylinder",
            fontSize: 12,
            fontFamily: "Inter, sans-serif",
            fill: "#1e293b",
          },
        },
      },
      {
        type: "standard.Path",
        size: { width: 80, height: 50 },
        attrs: {
          body: {
            stroke: "#ef4444",
            strokeWidth: 2,
            fill: "#fef2f2",
            d: "M 0 calc(h/2) L calc(w/4) 0 L calc(3*w/4) 0 L calc(w) calc(h/2) L calc(3*w/4) calc(h) L calc(w/4) calc(h) Z",
          },
          label: {
            text: "Hexagon",
            fontSize: 12,
            fontFamily: "Inter, sans-serif",
            fill: "#1e293b",
          },
        },
      },
    ],
  },
  {
    id: "object-oriented",
    label: "Object-Oriented Model",
    icon: <Hexagon className="w-4 h-4" />,
    defaultExpanded: true,
    elements: [
      {
        type: "custom.Interface",
        size: { width: 180, height: 100 },
        attrs: {
          root: {
            data: {
              symbolType: "Interface",
            },
          },
        },
        icon: `<svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="80" height="80" rx="4" stroke="#58D68D" stroke-width="6" fill="none"/>
          <text x="50" y="55" font-family="Arial, sans-serif" font-size="20" font-style="italic" fill="#58D68D" text-anchor="middle">&lt;&lt; I &gt;&gt;</text>
        </svg>`,
      },
    ],
  },
];
