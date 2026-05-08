const fs = require("fs");
const path = "packages/excalidraw/components/App.tsx";
let content = fs.readFileSync(path, "utf8");

// Replace the old handleCanvasPointerUp call in onKeyUp with dispatchEvent
content = content.replace(
  `        this.handleCanvasPointerUp(reactEvent as any);`,
  `        try {
          this.handleCanvasPointerUp(reactEvent as any);
        } catch (e) {
          console.error("Synthetic handleCanvasPointerUp failed:", e);
        }
        window.dispatchEvent(ev);
        this.interactiveCanvas?.dispatchEvent(ev);`,
);

fs.writeFileSync(path, content);
