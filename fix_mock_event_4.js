const fs = require("fs");
const path = "packages/excalidraw/components/App.tsx";
let content = fs.readFileSync(path, "utf8");

content = content.replace(
  `const ev = new PointerEvent("pointerdown", {`,
  `const ev = new PointerEvent("pointerdown", { pointerId: 1, `,
);

content = content.replace(
  `const ev = new PointerEvent("pointerup", {`,
  `const ev = new PointerEvent("pointerup", { pointerId: 1, `,
);

fs.writeFileSync(path, content);
