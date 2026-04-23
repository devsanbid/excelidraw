#!/bin/bash
echo "Patching App.tsx for Alt-draw feature"

sed -i 's/lastPointerMoveEvent: PointerEvent | null = null;/lastPointerMoveEvent: PointerEvent | null = null;\n  isAltDrawing: boolean = false;/' packages/excalidraw/components/App.tsx

