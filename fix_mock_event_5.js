const fs = require("fs");
const path = "packages/excalidraw/components/App.tsx";
let content = fs.readFileSync(path, "utf8");

content = content.replace(
  `private handleAltDrawDown = () => {
    if (!this.isAltDrawing && this.lastPointerMoveEvent) {
      this.isAltDrawing = true;
      flushSync(() => {
        this.setState({ activeTool: { ...this.state.activeTool, type: "freedraw", customType: null } });
      });`,
  `private handleAltDrawDown = () => {
    if (!this.isAltDrawing && this.lastPointerMoveEvent) {
      this.isAltDrawing = true;
      
      // Ensure state is updated synchronously so pointerdown sees it
      flushSync(() => {
        this.setState({ activeTool: { ...this.state.activeTool, type: "freedraw", customType: null } });
      });
      `,
);

fs.writeFileSync(path, content);
