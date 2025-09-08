import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { coverageConfigDefaults } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    post: 5173,
    host: true,
  },
  test: {
        coverage: {
            exclude: [...coverageConfigDefaults.exclude, "src/main.jsx"],
        },
        environment: 'jsdom',
        globals: true,
        setupFiles: "./test-setup.js"
    }
})
