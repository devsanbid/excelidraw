import React from "react";
import { Excalidraw } from "../index";
import { Keyboard } from "../tests/helpers/ui";
import { Pointer } from "../tests/helpers/ui";
import { fireEvent, render, waitFor } from "../tests/test-utils";

describe("Alt Draw feature", () => {
  it("draws and then undoes", async () => {
    await render(
      <Excalidraw handleKeyboardGlobally />
    );
    
    // wait for canvas
    await new Promise(r => setTimeout(r, 100));
    const canvas = document.querySelector("canvas");

    // 1. Move pointer
    fireEvent.pointerMove(canvas!, { clientX: 100, clientY: 100 });
    
    // 2. Press Alt
    Keyboard.keyDown("Alt");

    // 3. Move pointer (should draw)
    fireEvent.pointerMove(canvas!, { clientX: 150, clientY: 150 });
    fireEvent.pointerMove(canvas!, { clientX: 200, clientY: 200 });

    // 4. Release Alt (should finish draw)
    Keyboard.keyUp("Alt");

    await new Promise(r => setTimeout(r, 100));

    const h = window.h;
    console.log("Elements after draw:", h.elements.length);

    // 5. Press Alt + Z
    Keyboard.withModifierKeys({ alt: true }, () => {
      Keyboard.keyDown("z");
      Keyboard.keyUp("z");
    });

    await new Promise(r => setTimeout(r, 100));
    console.log("Elements after Undo:", h.elements.length);
    
    expect(h.elements.length).toBe(0);
  });
});

