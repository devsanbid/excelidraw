const fs = require('fs');
const path = 'packages/excalidraw/components/App.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/pointerId: 1,/g, "pointerId: this.lastPointerMoveEvent.pointerId || 1,");

fs.writeFileSync(path, content);
