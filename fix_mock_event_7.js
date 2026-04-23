const fs = require('fs');
const path = 'packages/excalidraw/components/App.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `this.handleCanvasPointerDown(reactEvent as any);`,
  `try {
        this.handleCanvasPointerDown(reactEvent as any);
      } catch (e) {
        console.error("Synthetic pointer down failed:", e);
      }`
);

fs.writeFileSync(path, content);
