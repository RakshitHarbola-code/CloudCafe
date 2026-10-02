# The Cloud Factory Cafe & Lounge — source code

This bundle contains the **latest restaurant-first website** and all six image files needed to run it locally. It does not require a Manus login or API key.

## Before you start

- Install **Node.js 22** from [nodejs.org](https://nodejs.org/), then open a fresh terminal.
- Extract this ZIP. The project folder contains `package.json`.
- You need an internet connection for the one-time package installation and optional Google Fonts.

## Windows

1. Open the extracted project folder in File Explorer.
2. Click the address bar, type `powershell`, and press Enter. This opens PowerShell in the project folder.
3. Run these commands, one at a time:

```powershell
corepack enable
corepack prepare pnpm@11.25.0 --activate
pnpm install
pnpm run dev
```

4. When it says the server is ready, open **http://localhost:3000** in your browser.

## macOS

1. Extract the ZIP and open the project folder in Finder.
2. Open Terminal in that folder (or type `cd ` in Terminal, drag the extracted folder into the window, and press Enter).
3. Run these commands, one at a time:

```bash
corepack enable
corepack prepare pnpm@11.25.0 --activate
pnpm install
pnpm run dev
```

4. When it says the server is ready, open **http://localhost:3000** in your browser.

## Important

- Keep the terminal open while viewing the site. Press **Ctrl+C** in it when you want to stop the server.
- Do not double-click `index.html`; Vite serves the React site and its assets at `http://localhost:3000`.
- If `corepack` is unavailable, run `npm install --global pnpm@11.25.0`, then continue with `pnpm install` and `pnpm run dev`.
- The photos are included locally in `public/images`, so they work without Manus-hosted image URLs.

## Latest source

This bundle was made from checkpoint `e13c84b` of the Cloud Factory website.
