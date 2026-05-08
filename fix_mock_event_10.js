const fs = require("fs");
const path = "packages/excalidraw/components/App.tsx";
let content = fs.readFileSync(path, "utf8");

content = content.replace(
  `const ev = new PointerEvent("pointerdown", { pointerId: this.lastPointerMoveEvent.pointerId || 1, `,
  `const ev = new PointerEvent("pointerdown", { pointerId: this.lastPointerMoveEvent.pointerId || 1, pressure: 0.5, `,
);

content = content.replace(
  `target: this.interactiveCanvas,
          type: 'pointerdown'`,
  `target: this.interactiveCanvas,
          pressure: 0.5,
          type: 'pointerdown'`,
);

// We must also force simulatePressure in the move handler if we're alt drawing!
content = content.replace(
  `Object.defineProperty(event.nativeEvent, 'buttons', { value: 1 });`,
  `Object.defineProperty(event.nativeEvent, 'buttons', { value: 1 });
       Object.defineProperty(event.nativeEvent, 'pressure', { value: 0.5 });`,
);

fs.writeFileSync(path, content);
