const fs = require('fs');
const path = 'packages/excalidraw/components/App.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `        const reactEvent = {
          nativeEvent: ev,
          clientX: ev.clientX,
          clientY: ev.clientY,
          button: 0,
          buttons: 0,
          pointerId: ev.pointerId,
          preventDefault: () => {},
          stopPropagation: () => {},
          shiftKey: false,
          altKey: false,
          ctrlKey: false,
          metaKey: false,
          target: this.interactiveCanvas,
          type: 'pointerup'
        };
        this.handleCanvasPointerUp(ev as any);`,
  `        const reactEvent = {
          nativeEvent: ev,
          clientX: ev.clientX,
          clientY: ev.clientY,
          button: 0,
          buttons: 0,
          pointerId: ev.pointerId,
          preventDefault: () => {},
          stopPropagation: () => {},
          shiftKey: false,
          altKey: false,
          ctrlKey: false,
          metaKey: false,
          target: this.interactiveCanvas,
          type: 'pointerup'
        };
        this.handleCanvasPointerUp(reactEvent as any);`
);

fs.writeFileSync(path, content);
