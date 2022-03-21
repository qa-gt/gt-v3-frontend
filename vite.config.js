import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require("path")

export default defineConfig({
  presets: ['@babel/preset-env'],
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
})