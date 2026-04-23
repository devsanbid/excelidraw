const fs = require('fs');
const path = 'packages/excalidraw/components/App.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'this.setState({ activeTool: { ...this.state.activeTool, type: "freedraw" } });',
  'this.setState({ activeTool: { ...this.state.activeTool, type: "freedraw", customType: null } });'
);

fs.writeFileSync(path, content);
console.log("Fixed type error");
