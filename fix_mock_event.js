const fs = require('fs');
const path = 'packages/excalidraw/components/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// The original injected handleAltDrawDown looks like this:
// const ev = new PointerEvent("pointerdown", { ... });
// this.handleCanvasPointerDown(ev as any);

content = content.replace(
  `const ev = new PointerEvent("pointerdown", {
        clientX: this.lastPointerMoveEvent.clientX,
        clientY: this.lastPointerMoveEvent.clientY,
        button: 0,
        buttons: 1,
        bubbles: true,
      });
      // We need to construct a React-like event or pass the native event.
      // handleCanvasPointerDown expects a React.PointerEvent, but passing native event often works if we mock it.
      this.handleCanvasPointerDown(ev as any);`,
  `const ev = new PointerEvent("pointerdown", {
        clientX: this.lastPointerMoveEvent.clientX,
        clientY: this.lastPointerMoveEvent.clientY,
        button: 0,
        buttons: 1,
        bubbles: true,
      });
      
      const reactEvent = {
        nativeEvent: ev,
        clientX: ev.clientX,
        clientY: ev.clientY,
        button: 0,
        buttons: 1,
        pointerId: ev.pointerId,
        preventDefault: () => {},
        stopPropagation: () => {},
        shiftKey: false,
        altKey: true,
        ctrlKey: false,
        metaKey: false,
        target: this.interactiveCanvas,
        type: 'pointerdown'
      };

      this.handleCanvasPointerDown(reactEvent as any);`
);

content = content.replace(
  `const ev = new PointerEvent("pointerup", {
          clientX: this.lastPointerMoveEvent.clientX,
          clientY: this.lastPointerMoveEvent.clientY,
          button: 0,
          buttons: 0,
          bubbles: true,
        });
        this.handleCanvasPointerUp(ev as any);`,
  `const ev = new PointerEvent("pointerup", {
          clientX: this.lastPointerMoveEvent.clientX,
          clientY: this.lastPointerMoveEvent.clientY,
          button: 0,
          buttons: 0,
          bubbles: true,
        });
        const reactEvent = {
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
        this.handleCanvasPointerUp(ev as any);` // Need to fix this too! Wait, the script has a typo, I'll just write a cleaner regex/replace.
);

fs.writeFileSync(path, content);
