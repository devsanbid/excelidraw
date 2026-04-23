const fs = require('fs');
const path = 'packages/excalidraw/components/App.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `target: this.interactiveCanvas,`,
  `target: {
          ...this.interactiveCanvas,
          setPointerCapture: () => {},
          releasePointerCapture: () => {},
          nodeType: 1,
          tagName: 'CANVAS',
          parentElement: this.interactiveCanvas?.parentElement,
        },`
);

fs.writeFileSync(path, content);
