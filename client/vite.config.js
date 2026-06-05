// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// // import tailwindcss from '@tailwindcss/vite' 
// // This Vite configuration file sets up the React plugin and Tailwind CSS for the project.
// export default defineConfig({
//    server: {
//     // port:5173,
//     // host: true,
//     proxy: {
//       '/api': {
//         target: 'http://127.0.0.1:3001',  // your Express backend
//         changeOrigin: true,
//         secure: false,
//        // rewrite: path => path.replace(/^\/api/, ''),
//         ws:false,
//       }
//     }
//   },
//   plugins: [react()],
   
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host:true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  },
   plugins: [react()],
});
