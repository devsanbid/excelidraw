const fs = require('fs');
const path = 'packages/excalidraw/components/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// Undo previous target override
content = content.replace(
  `target: {
          ...this.interactiveCanvas,
          setPointerCapture: () => {},
          releasePointerCapture: () => {},
          nodeType: 1,
          tagName: 'CANVAS',
          parentElement: this.interactiveCanvas?.parentElement,
        },`,
  `target: this.interactiveCanvas,`
);

content = content.replace(
  `this.handleCanvasPointerDown(reactEvent as any);`,
  `if (this.interactiveCanvas && !this.interactiveCanvas._oldSetPointerCapture) {
          this.interactiveCanvas._oldSetPointerCapture = this.interactiveCanvas.setPointerCapture;
          this.interactiveCanvas.setPointerCapture = () => {};
        }
        
        try {
          this.handleCanvasPointerDown(reactEvent as any);
        } catch (e) {
          console.error("Synthetic pointer down failed:", e);
        } finally {
          if (this.interactiveCanvas && this.interactiveCanvas._oldSetPointerCapture) {
            this.interactiveCanvas.setPointerCapture = this.interactiveCanvas._oldSetPointerCapture;
            delete this.interactiveCanvas._oldSetPointerCapture;
          }
        }`
);

fs.writeFileSync(path, content);
