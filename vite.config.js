import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.json', '.jsx'],  // Make sure .json is included
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  server: {
    port: process.env.PORT || 3001,  // default port 3000, can be overridden by environment variable
  }, 
})
