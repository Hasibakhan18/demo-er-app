import { ExportOptions } from '../types'

export class ExportService {
  static exportToJSON(graph: any, filename: string = 'model.json'): void {
    try {
      const jsonData = JSON.stringify(graph.toJSON(), null, 2)
      this.downloadFile(jsonData, filename, 'application/json')
    } catch (error) {
      console.error('Failed to export JSON:', error)
      throw new Error('Failed to export model as JSON')
    }
  }

  static exportToPNG(paper: any, options: ExportOptions = {}): void {
    try {
      const { filename = 'model.png', quality = 1, scale = 1 } = options
      
      paper.toPNG((dataURL: string) => {
        // Create a canvas to handle scaling if needed
        if (scale !== 1) {
          const img = new Image()
          img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            
            canvas.width = img.width * scale
            canvas.height = img.height * scale
            
            if (ctx) {
              ctx.scale(scale, scale)
              ctx.drawImage(img, 0, 0)
              
              canvas.toBlob((blob) => {
                if (blob) {
                  this.downloadBlob(blob, filename)
                }
              }, 'image/png', quality)
            }
          }
          img.src = dataURL
        } else {
          // Direct download
          this.downloadDataURL(dataURL, filename)
        }
      }, {
        width: paper.options.width,
        height: paper.options.height,
        backgroundColor: '#1e293b'
      })
    } catch (error) {
      console.error('Failed to export PNG:', error)
      throw new Error('Failed to export model as PNG')
    }
  }

  static exportToSVG(paper: any, filename: string = 'model.svg'): void {
    try {
      paper.toSVG((svgString: string) => {
        // Add background color to SVG
        const styledSVG = svgString.replace(
          '<svg',
          '<svg style="background-color: #1e293b;"'
        )
        this.downloadFile(styledSVG, filename, 'image/svg+xml')
      }, {
        preserveDimensions: true,
        convertImagesToDataUris: true
      })
    } catch (error) {
      console.error('Failed to export SVG:', error)
      throw new Error('Failed to export model as SVG')
    }
  }

  static importFromJSON(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string)
          resolve(jsonData)
        } catch (error) {
          reject(new Error('Invalid JSON file format'))
        }
      }
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'))
      }
      
      reader.readAsText(file)
    })
  }

  private static downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType })
    this.downloadBlob(blob, filename)
  }

  private static downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.style.display = 'none'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }

  private static downloadDataURL(dataURL: string, filename: string): void {
    const link = document.createElement('a')
    link.href = dataURL
    link.download = filename
    link.style.display = 'none'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  static validateImportFile(file: File): { valid: boolean; error?: string } {
    // Check file type
    if (!file.type.includes('json') && !file.name.endsWith('.json')) {
      return { valid: false, error: 'Only JSON files are supported for import' }
    }

    // Check file size (limit to 10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return { valid: false, error: 'File size exceeds 10MB limit' }
    }

    return { valid: true }
  }

  static getExportFormats(): Array<{ value: string; label: string; extension: string }> {
    return [
      { value: 'json', label: 'JSON Model', extension: '.json' },
      { value: 'png', label: 'PNG Image', extension: '.png' },
      { value: 'svg', label: 'SVG Vector', extension: '.svg' }
    ]
  }
}