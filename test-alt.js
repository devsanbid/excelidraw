const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on("console", (msg) => console.log("PAGE:", msg.text()));

  await page.goto("http://localhost:3002");
  await page.waitForSelector(".excalidraw");

  // Wait a moment for app to be ready
  await new Promise((r) => setTimeout(r, 2000));

  console.log("Pressing Alt...");
  await page.keyboard.down("Alt");

  console.log("Moving mouse...");
  await page.mouse.move(200, 200);
  await page.mouse.down(); // This might not be needed for our test but playwright mouse move requires it?
  // Actually, our code simulates pointerdown on Alt down.
  // Wait, `lastPointerMoveEvent` needs to be set first!
  await page.mouse.move(100, 100);
  await new Promise((r) => setTimeout(r, 50));
  await page.keyboard.down("Alt"); // this will synthesize pointerdown at 100, 100
  await new Promise((r) => setTimeout(r, 50));

  await page.mouse.move(200, 200);
  await new Promise((r) => setTimeout(r, 50));
  await page.mouse.move(300, 300);
  await new Promise((r) => setTimeout(r, 50));

  console.log("Releasing Alt...");
  await page.keyboard.up("Alt");

  await new Promise((r) => setTimeout(r, 1000));

  console.log("Pressing Alt+Z...");
  await page.keyboard.down("Alt");
  await page.keyboard.press("z");
  await page.keyboard.up("Alt");

  await new Promise((r) => setTimeout(r, 1000));

  await browser.close();
})();
