import { dia, shapes } from '@joint/plus'

// Custom ERD Entity shape
export class ERDEntity extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: 'erd.Entity',
      size: { width: 150, height: 80 },
      attrs: {
        body: {
          width: 'calc(w)',
          height: 'calc(h)',
          strokeWidth: 2,
          stroke: '#333333',
          fill: '#ffffff',
          rx: 4,
          ry: 4
        },
        label: {
          textVerticalAnchor: 'top',
          textAnchor: 'middle',
          x: 'calc(0.5*w)',
          y: 10,
          fontSize: 14,
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          fill: '#333333'
        },
        attributes: {
          textVerticalAnchor: 'top',
          textAnchor: 'start',
          x: 10,
          y: 35,
          fontSize: 11,
          fontFamily: 'Arial, sans-serif',
          fill: '#666666'
        }
      }
    }
  }

  markup = [{
    tagName: 'rect',
    selector: 'body'
  }, {
    tagName: 'text',
    selector: 'label'
  }, {
    tagName: 'text',
    selector: 'attributes'
  }]

  setAttributes(attributes: string[]) {
    const attributeText = attributes.join('\n')
    this.attr('attributes/text', attributeText)
    
    // Adjust height based on number of attributes
    const baseHeight = 50
    const attributeHeight = attributes.length * 15
    const currentSize = this.get('size')
    if (currentSize) {
      this.resize(currentSize.width, Math.max(baseHeight + attributeHeight, 80))
    }
  }
}

// Weak Entity (double border)
export class ERDWeakEntity extends ERDEntity {
  defaults() {
    const parentDefaults = super.defaults()
    return {
      ...parentDefaults,
      type: 'erd.WeakEntity',
      attrs: {
        ...parentDefaults.attrs,
        body: {
          ...parentDefaults.attrs.body,
          strokeWidth: 1
        },
        outerBody: {
          x: 3,
          y: 3,
          width: 'calc(w-6)',
          height: 'calc(h-6)',
          strokeWidth: 2,
          stroke: '#333333',
          fill: 'none',
          rx: 4,
          ry: 4
        }
      }
    }
  }

  markup = [{
    tagName: 'rect',
    selector: 'body'
  }, {
    tagName: 'rect',
    selector: 'outerBody'
  }, {
    tagName: 'text',
    selector: 'label'
  }, {
    tagName: 'text',
    selector: 'attributes'
  }]
}

// ERD Relationship (diamond shape)
export class ERDRelationship extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: 'erd.Relationship',
      size: { width: 120, height: 60 },
      attrs: {
        body: {
          strokeWidth: 2,
          stroke: '#333333',
          fill: '#f8f9fa',
          points: 'calc(0.5*w),0 calc(w),calc(0.5*h) calc(0.5*w),calc(h) 0,calc(0.5*h)'
        },
        label: {
          textVerticalAnchor: 'middle',
          textAnchor: 'middle',
          x: 'calc(0.5*w)',
          y: 'calc(0.5*h)',
          fontSize: 12,
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          fill: '#333333'
        }
      }
    }
  }

  markup = [{
    tagName: 'polygon',
    selector: 'body'
  }, {
    tagName: 'text',
    selector: 'label'
  }]
}

// Identifying Relationship (double diamond)
export class ERDIdentifyingRelationship extends ERDRelationship {
  defaults() {
    const parentDefaults = super.defaults()
    return {
      ...parentDefaults,
      type: 'erd.IdentifyingRelationship',
      attrs: {
        ...parentDefaults.attrs,
        body: {
          ...parentDefaults.attrs.body,
          strokeWidth: 1
        },
        outerBody: {
          strokeWidth: 2,
          stroke: '#333333',
          fill: 'none',
          points: 'calc(0.5*w),3 calc(w-3),calc(0.5*h) calc(0.5*w),calc(h-3) 3,calc(0.5*h)'
        }
      }
    }
  }

  markup = [{
    tagName: 'polygon',
    selector: 'body'
  }, {
    tagName: 'polygon',
    selector: 'outerBody'
  }, {
    tagName: 'text',
    selector: 'label'
  }]
}

// ERD Attribute (ellipse)
export class ERDAttribute extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: 'erd.Attribute',
      size: { width: 80, height: 40 },
      attrs: {
        body: {
          cx: 'calc(0.5*w)',
          cy: 'calc(0.5*h)',
          rx: 'calc(0.5*w)',
          ry: 'calc(0.5*h)',
          strokeWidth: 2,
          stroke: '#333333',
          fill: '#ffffff'
        },
        label: {
          textVerticalAnchor: 'middle',
          textAnchor: 'middle',
          x: 'calc(0.5*w)',
          y: 'calc(0.5*h)',
          fontSize: 11,
          fontFamily: 'Arial, sans-serif',
          fill: '#333333'
        }
      }
    }
  }

  markup = [{
    tagName: 'ellipse',
    selector: 'body'
  }, {
    tagName: 'text',
    selector: 'label'
  }]
}

// Key Attribute (underlined)
export class ERDKeyAttribute extends ERDAttribute {
  defaults() {
    const parentDefaults = super.defaults()
    return {
      ...parentDefaults,
      type: 'erd.KeyAttribute',
      attrs: {
        ...parentDefaults.attrs,
        label: {
          ...parentDefaults.attrs.label,
          fontWeight: 'bold',
          textDecoration: 'underline'
        }
      }
    }
  }
}

// Multivalued Attribute (double ellipse)
export class ERDMultivaluedAttribute extends ERDAttribute {
  defaults() {
    const parentDefaults = super.defaults()
    return {
      ...parentDefaults,
      type: 'erd.MultivaluedAttribute',
      attrs: {
        ...parentDefaults.attrs,
        body: {
          ...parentDefaults.attrs.body,
          strokeWidth: 1
        },
        outerBody: {
          cx: 'calc(0.5*w)',
          cy: 'calc(0.5*h)',
          rx: 'calc(0.5*w-3)',
          ry: 'calc(0.5*h-3)',
          strokeWidth: 2,
          stroke: '#333333',
          fill: 'none'
        }
      }
    }
  }

  markup = [{
    tagName: 'ellipse',
    selector: 'body'
  }, {
    tagName: 'ellipse',
    selector: 'outerBody'
  }, {
    tagName: 'text',
    selector: 'label'
  }]
}

// Custom Link for ERD relationships
export class ERDLink extends dia.Link {
  defaults() {
    return {
      ...super.defaults,
      type: 'erd.Link',
      attrs: {
        line: {
          connection: true,
          stroke: '#333333',
          strokeWidth: 2,
          strokeLinejoin: 'round',
          targetMarker: {
            type: 'path',
            d: 'M 10 -5 0 0 10 5 z',
            fill: '#333333'
          }
        }
      },
      router: {
        name: 'manhattan',
        args: {
          padding: 10
        }
      },
      connector: {
        name: 'rounded'
      }
    }
  }

  markup = [{
    tagName: 'path',
    selector: 'wrapper',
    attributes: {
      'fill': 'none',
      'cursor': 'pointer',
      'stroke': 'transparent',
      'stroke-linecap': 'round'
    }
  }, {
    tagName: 'path',
    selector: 'line',
    attributes: {
      'fill': 'none',
      'pointer-events': 'none'
    }
  }]

  setCardinality(source: string, target: string) {
    this.appendLabel({
      attrs: {
        text: {
          text: source,
          fontSize: 12,
          fill: '#333333'
        }
      },
      position: {
        distance: 0.2,
        offset: -10
      }
    })

    this.appendLabel({
      attrs: {
        text: {
          text: target,
          fontSize: 12,
          fill: '#333333'
        }
      },
      position: {
        distance: 0.8,
        offset: -10
      }
    })
  }
}

// Register custom shapes
export const erdShapes = {
  erd: {
    Entity: ERDEntity,
    WeakEntity: ERDWeakEntity,
    Relationship: ERDRelationship,
    IdentifyingRelationship: ERDIdentifyingRelationship,
    Attribute: ERDAttribute,
    KeyAttribute: ERDKeyAttribute,
    MultivaluedAttribute: ERDMultivaluedAttribute,
    Link: ERDLink
  }
}

// Extend the shapes namespace
export const extendedShapes = {
  ...shapes,
  ...erdShapes
}