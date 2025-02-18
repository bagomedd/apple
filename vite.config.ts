import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      //'@components': "/src/components",
      '@assets': "/src/assets",
      '@icons': "/src/icons",
      '@styles': "/src/styles",
      '@svg': "/src/svg",
      '@utils': "/src/utils",
      '@fonts': "/src/fonts",

    },
  },
})
