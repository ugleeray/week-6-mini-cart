import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// CodeAlong: prints errors from your running app in the terminal, so your workspace can see them.
// src/ca-probe.js sends them here. You don't need to edit this.
function caErrors() {
  return {
    name: 'ca-errors',
    configureServer(server) {
      // server.hot is Vite's connection to every open copy of your app
      server.hot.on('ca:error', (raw) => {
        // one line of JSON, so CodeAlong can read it back
        console.log('ca-error ' + JSON.stringify(raw))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), caErrors()],
  server: {
    // Send every /api request to the Express server in server/api.js
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
