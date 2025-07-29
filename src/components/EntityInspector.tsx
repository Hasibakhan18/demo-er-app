import React, { useState, useEffect } from "react";
import { dia } from "@joint/core";

interface Attribute {
  name: string;
  type: string;
}

interface EntityInspectorProps {
  cell: dia.Cell;
}

const EntityInspector: React.FC<EntityInspectorProps> = ({ cell }) => {
  const [entityName, setEntityName] = useState("");
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  useEffect(() => {
    const name = cell.attr("headerText/text") || "";
    setEntityName(name);

    const attrsText = cell.attr("attributesText/text") || "";
    const parsedAttributes = attrsText
      .split("\n")
      .filter((line: string) => line.trim() !== "")
      .map((line: string) => {
        const [name, type] = line.split(":").map((s) => s.trim());
        return { name: name || "", type: type || "" };
      });
    setAttributes(parsedAttributes);
  }, [cell]);

  const updateCell = (name: string, attrs: Attribute[]) => {
    const attributesText = attrs
      .map((attr) => `${attr.name}: ${attr.type}`)
      .join("\n");
    cell.attr({
      headerText: { text: name },
      attributesText: { text: attributesText },
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setEntityName(newName);
    updateCell(newName, attributes);
  };

  const handleAttributeChange = (
    index: number,
    field: keyof Attribute,
    value: string
  ) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
    updateCell(entityName, newAttributes);
  };

  const handleAddAttribute = () => {
    const newAttributes = [...attributes, { name: "", type: "" }];
    setAttributes(newAttributes);
    updateCell(entityName, newAttributes);
  };

  const handleDeleteAttribute = (index: number) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(newAttributes);
    updateCell(entityName, newAttributes);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Entity Inspector</div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Entity Name</label>
        <input
          type="text"
          value={entityName}
          onChange={handleNameChange}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Attributes</label>
        {attributes.map((attr, index) => (
          <div key={index} style={styles.attributeRow}>
            <input
              type="text"
              placeholder="Name"
              value={attr.name}
              onChange={(e) =>
                handleAttributeChange(index, "name", e.target.value)
              }
              style={{ ...styles.input, ...styles.attributeInput }}
            />
            <input
              type="text"
              placeholder="Type"
              value={attr.type}
              onChange={(e) =>
                handleAttributeChange(index, "type", e.target.value)
              }
              style={{ ...styles.input, ...styles.attributeInput }}
            />
            <button
              onClick={() => handleDeleteAttribute(index)}
              style={styles.deleteButton}
            >
              &#x1F5D1;
            </button>
          </div>
        ))}
        <button onClick={handleAddAttribute} style={styles.addButton}>
          Add Attribute
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    backgroundColor: "#f8f9fa",
    borderLeft: "1px solid #dee2e6",
    padding: "20px",
    color: "#212529",
    height: "100%",
    overflowY: "auto",
  },
  placeholder: {
    color: "#6c757d",
    textAlign: "center",
    paddingTop: "40px",
  },
  header: {
    fontSize: "20px",
    fontWeight: 600,
    marginBottom: "20px",
    color: "#004085",
    borderBottom: "2px solid #b8daff",
    paddingBottom: "10px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: 500,
    color: "#495057",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    fontSize: "14px",
    boxSizing: "border-box",
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
  },
  attributeRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    gap: "10px",
  },
  attributeInput: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    marginTop: "10px",
    transition: "background-color 0.15s ease-in-out",
  },
  deleteButton: {
    backgroundColor: "transparent",
    color: "#dc3545",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "18px",
    lineHeight: 1,
  },
};

export default EntityInspector;
