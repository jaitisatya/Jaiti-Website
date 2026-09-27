import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          programs: path.resolve(__dirname, 'programs.html'),
          volunteer: path.resolve(__dirname, 'volunteer.html'),
          gallery: path.resolve(__dirname, 'gallery.html'),
          login: path.resolve(__dirname, 'login.html'),
          privacyPolicy: path.resolve(__dirname, 'privacy-policy.html'),
          dailyDriveUpdate: path.resolve(__dirname, 'daily-drive-update.html'),
          dashboard: path.resolve(__dirname, 'dashboard.html'),
          adminLogin: path.resolve(__dirname, 'admin-login.html'),
          adminPanel: path.resolve(__dirname, 'admin-panel.html'),
          adminDashboard: path.resolve(__dirname, 'admin-dashboard.html'),
          youtube: path.resolve(__dirname, 'youtube.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
