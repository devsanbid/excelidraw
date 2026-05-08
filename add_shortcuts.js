const fs = require("fs");
const path = "packages/excalidraw/components/App.tsx";
let content = fs.readFileSync(path, "utf8");

// Insert after the HELP dialog check: `if (event.key === KEYS.QUESTION_MARK)`
content = content.replace(
  `if (event.key === KEYS.QUESTION_MARK) {`,
  `if (event.key.toLowerCase() === "c" && event.altKey) {
        event.preventDefault();
        this.actionManager.executeAction(this.actionManager.actions.clearCanvas);
        return;
      }
      
      if (event.key.toLowerCase() === "z" && event.altKey) {
        event.preventDefault();
        this.actionManager.executeAction(this.actionManager.actions.undo);
        return;
      }

      if (event.key === KEYS.QUESTION_MARK) {`,
);

fs.writeFileSync(path, content);
