(async function () {
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let whitelist = [];
  console.log("%cLUNA", "color: #ff00ff; font-weight: bold; font-size: 16px;");
  console.log("%cCommands: keep @channel · run · list · wipe · reload · exit", "color: #aaa; font-size: 12px;");

  while (true) {
    const input = prompt("luna ~");
    if (!input) continue;
    const [command, ...args] = input.trim().split(" ");

    if (command === "keep" && args[0]) {
      const normalized = args[0].replace(/^@/, "").toLowerCase();
      whitelist.push(normalized);
      console.log(`%c+ @${normalized} protected`, "color: #00e5ff;");
    }
    else if (command === "run") {
      console.log("%c> Starting...", "color: #aaa;");
      await startUnsubscribeProcess(whitelist, wait);
    }
    else if (command === "wipe") {
      whitelist = [];
      console.log("%c> Protected list cleared", "color: #ff4444;");
    }
    else if (command === "list") {
      console.log(
        whitelist.length > 0
          ? `%cProtected (${whitelist.length}): ${whitelist.map(i => "@" + i).join(", ")}`
          : "%cProtected: none",
        "color: #00e5ff;"
      );
    }
    else if (command === "reload") { location.reload(); break; }
    else if (command === "exit") {
      console.log("%c> Luna exited.", "color: #aaa;");
      break;
    }
    else {
      console.log(`%c? unknown command: ${command}`, "color: #ff4444;");
    }
  }

  async function startUnsubscribeProcess(currentWhitelist, wait) {
    console.log("%c> Scanning page...", "color: #aaa;");

    while (true) {
      const prevHeight = document.documentElement.scrollHeight;
      window.scrollTo(0, prevHeight);
      await wait(1500);
      if (document.documentElement.scrollHeight === prevHeight) break;
    }
    window.scrollTo(0, 0);
    await wait(1000);

    const channels = Array.from(document.querySelectorAll('ytd-channel-renderer'));
    console.log(`%c> Found ${channels.length} channels`, "color: #aaa;");

    let skipped = 0, removed = 0;

    for (const channel of channels) {
      const handle = (channel.querySelector('#subscribers')?.innerText || "")
        .replace(/^@/, "").toLowerCase().trim();

      const btn = channel.querySelector('ytd-subscribe-button-renderer button');
      const ariaLabel = (btn?.getAttribute('aria-label') || "").toLowerCase();

      if (!ariaLabel.includes("aboneliğinden çık")) continue;

      const isProtected = currentWhitelist.some(item => handle.includes(item));

      if (isProtected) {
        skipped++;
        console.log(`%c  ~ kept @${handle}`, "color: #00e5ff;");
        continue;
      }

      btn.click();
      await wait(1200);

      const confirmButton = document.querySelector('yt-confirm-dialog-renderer #confirm-button button');
      if (confirmButton) {
        confirmButton.click();
        await wait(1200);
        removed++;
        console.log(`%c  - removed @${handle}`, "color: #ff4444;");
      }
    }

    console.log(`%c> Done. ${removed} removed · ${skipped} kept`, "color: #ff00ff; font-weight: bold;");
  }
})();
