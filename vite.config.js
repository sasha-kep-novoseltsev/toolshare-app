import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' дозволяє публікувати збірку на GitHub Pages у будь-якій підпапці
export default defineConfig({ plugins: [react()], base: './' });
