# Luna — YouTube Unsubscriber

A lightweight JavaScript script that runs directly in your browser console, giving you full control over which YouTube channels to unsubscribe from — with a built-in protection list so you never lose the ones you want to keep.

## Features

- Interactive terminal interface directly in the browser console
- Protect specific channels from being unsubscribed
- No third-party dependencies, extensions, or installation required
- Works in all major browsers
- Compatible with any YouTube interface language

## Usage

1. Open the [YouTube Subscriptions page](https://www.youtube.com/feed/channels).
2. Open your browser's Developer Tools:
   - Right-click anywhere on the page and select **Inspect**, or
   - Press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (macOS).
3. Navigate to the **Console** tab.
4. Copy and paste the contents of [`unsubscriber.js`](./unsubscriber.js) into the console and press `Enter`.
5. Use the commands below to control Luna.

## Commands

| Command | Description |
|---|---|
| `keep @channel` | Protect a channel from being unsubscribed |
| `run` | Start the unsubscribe process |
| `list` | Show all protected channels |
| `wipe` | Clear the protection list |
| `reload` | Reload the page |
| `exit` | Exit Luna |

**Example:**

```
keep @pewdiepie
keep @mkbhd
run
```

## Disclaimer

This script interacts with YouTube's web interface. If YouTube changes its internal structure, the script may stop functioning correctly. Use it at your own discretion.
