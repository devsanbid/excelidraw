#!/bin/bash
# A script to patch App.tsx for Alt-draw feature

APP_FILE="packages/excalidraw/components/App.tsx"

# Inject isAltDrawing property
sed -i '/lastPointerMoveEvent: PointerEvent | null = null;/a \  isAltDrawing: boolean = false;' "$APP_FILE"

