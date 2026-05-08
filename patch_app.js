const fs = require("fs");
const path = "packages/excalidraw/components/App.tsx";
let content = fs.readFileSync(path, "utf8");

// 1. Add handleAltDrawDown in onKeyDown
content = content.replace(
  `private onKeyDown = withBatchedUpdates(`,
  `private handleAltDrawDown = () => {
    if (!this.isAltDrawing && this.lastPointerMoveEvent) {
      this.isAltDrawing = true;
      this.setState({ activeTool: { ...this.state.activeTool, type: "freedraw" } });
      const ev = new PointerEvent("pointerdown", {
        clientX: this.lastPointerMoveEvent.clientX,
        clientY: this.lastPointerMoveEvent.clientY,
        button: 0,
        buttons: 1,
        bubbles: true,
      });
      // We need to construct a React-like event or pass the native event.
      // handleCanvasPointerDown expects a React.PointerEvent, but passing native event often works if we mock it.
      this.handleCanvasPointerDown(ev as any);
    }
  };

  private onKeyDown = withBatchedUpdates(`,
);

// Call handleAltDrawDown
content = content.replace(
  `if (event.key === KEYS.ALT) {`,
  `if (event.key === KEYS.ALT) {
        this.handleAltDrawDown();`,
);

// 2. Add handleAltDrawUp in onKeyUp
content = content.replace(
  `private onKeyUp = withBatchedUpdates((event: KeyboardEvent) => {`,
  `private onKeyUp = withBatchedUpdates((event: KeyboardEvent) => {
    if (event.key === KEYS.ALT && this.isAltDrawing) {
      this.isAltDrawing = false;
      if (this.lastPointerMoveEvent) {
        const ev = new PointerEvent("pointerup", {
          clientX: this.lastPointerMoveEvent.clientX,
          clientY: this.lastPointerMoveEvent.clientY,
          button: 0,
          buttons: 0,
          bubbles: true,
        });
        this.handleCanvasPointerUp(ev as any);
      }
    }`,
);

// 3. Bypass button === 0 check in handleCanvasPointerMove
// We need to find where the drawing is stopped
// In Excalidraw, it might check `event.buttons === 0` in handleCanvasPointerMove or it might just check `this.state.activeTool`
content = content.replace(
  `private handleCanvasPointerMove = (`,
  `private handleCanvasPointerMove = (
    event: React.PointerEvent<HTMLCanvasElement>,
  ) => {
    if (this.isAltDrawing) {
       Object.defineProperty(event, 'buttons', { value: 1 });
       Object.defineProperty(event.nativeEvent, 'buttons', { value: 1 });
    }
    this._handleCanvasPointerMove(event);
  };
  
  private _handleCanvasPointerMove = (`,
);

fs.writeFileSync(path, content);
console.log("Patched App.tsx");
