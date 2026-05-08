const fs = require("fs");
const path = "packages/excalidraw/components/App.tsx";
let content = fs.readFileSync(path, "utf8");

content = content.replace(
  /this\.interactiveCanvas\._oldSetPointerCapture/g,
  "(this.interactiveCanvas as any)._oldSetPointerCapture",
);

fs.writeFileSync(path, content);
