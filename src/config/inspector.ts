import { dia } from "@joint/core";
import { colorPaletteOptions } from "./color-palette";
import { debug } from "../utils/logger";

export const getInspectorConfig = (cell: dia.Cell) => {
  debug(
    `Getting inspector config for cell type: ${
      cell.isElement() ? "element" : "link"
    }`
  );

  if (cell.isElement()) {
    debug(`Element cell ID: ${cell.id}`);
    return {
      inputs: {
        attrs: {
          body: {
            fill: {
              type: "color-palette",
              options: colorPaletteOptions,
              group: "presentation",
              label: "fill",
              index: 1,
            },
            stroke: {
              type: "color-palette",
              options: colorPaletteOptions,
              group: "presentation",
              label: "outline",
              index: 2,
            },
            strokeWidth: {
              type: "range",
              min: 0,
              max: 50,
              unit: "px",
              group: "presentation",
              label: "outline width",
              index: 3,
            },
          },
          label: {
            text: {
              type: "textarea",
              group: "text",
              label: "Text",
              index: 1,
            },
            fontSize: {
              type: "range",
              min: 5,
              max: 30,
              group: "text",
              label: "Font size",
              index: 2,
            },
            fontFamily: {
              type: "select",
              options: [
                "Arial",
                "Helvetica",
                "Times New Roman",
                "Courier New",
                "Georgia",
                "Garamond",
                "Tahoma",
                "Lucida Console",
                "Comic Sans MS",
              ],
              label: "Font family",
              group: "text",
              index: 3,
            },
            fill: {
              type: "color-palette",
              options: colorPaletteOptions,
              group: "text",
              label: "color",
              index: 4,
            },
          },
        },
      },
      groups: {
        presentation: { label: "Presentation", index: 1, path: "presentation" },
        text: { label: "Text", index: 2, path: "text" },
      },
    };
  }
  // cell.isLink()
  debug(`Link cell ID: ${cell.id}`);
  return {
    labels: {
      type: "list",
      label: "Labels",
      item: {
        type: "object",
        properties: {
          attrs: {
            text: {
              text: {
                type: "content-editable",
                label: "Text",
                defaultValue: "label",
              },
            },
          },
          position: {
            type: "select-box",
            options: [
              { value: 30, content: "Source" },
              { value: 0.5, content: "Middle" },
              { value: -30, content: "Target" },
            ],
            defaultValue: 0.5,
            label: "Position",
          },
        },
      },
    },
  };
};
