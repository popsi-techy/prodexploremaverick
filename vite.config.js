import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ensure this is also set for `dev` if you use it on Render
    port: 5173 // Your default dev port, Render will override this in prod
  },
  preview: {
    host: '0.0.0.0', // Make sure this is present (as per previous fix)
    port: 4173,      // Vite's default preview port
    strictPort: true, // Optional: ensure port is used exclusively
    allowedHosts: [
      '.onrender.com', // A wildcard for all Render subdomains (easier for Render deployments)
      'prodexploremaverick-frontend.onrender.com' // Specifically this exact URL
      // You can add 'localhost' here too if you test locally with preview
    ]
  }
});
