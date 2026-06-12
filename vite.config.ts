import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import fs from "fs";

const pkg = JSON.parse(
  fs.readFileSync("./package.json", "utf-8")
);

const manifest = {
  name: "Tab Manager",
  description: "A versatile browser extension to manager your tabs",
  version: pkg.version,
  manifest_version: 3,
  side_panel: {
    default_path: "sidepanel.html"
  },
  permissions: [
    "sidePanel",
    "tabs",
    "tabGroups",
    "downloads"
  ],
  background: {
    service_worker: "background/service-worker.js",
    type: "module"
  },
  icons: {
    "16": "icons/16.png",
    "32": "icons/32.png",
    "48": "icons/48.png",
    "128": "icons/128.png"
  },
  host_permissions: [
    "http://*/*",
    "https://*/*"
  ]
};

fs.writeFileSync(
  "./public/manifest.json",
  JSON.stringify(manifest, null, 2)
);

export default defineConfig({
  base: './',
  build: {
    assetsInlineLimit: 0,
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name]/[name].[ext]'
      },
      input: {
        "sidepanel/sidepanel": resolve(__dirname, 'sidepanel.html'),
        "background/service-worker": resolve(__dirname, 'src/background/service-worker.js')
      }
    }
  },
  plugins: [react(), tailwindcss()]
})
