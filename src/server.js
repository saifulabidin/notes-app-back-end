const Hapi = require('@hapi/hapi');
const routes = require('./routes');

/**
 * @description Fungsi untuk menginisialisasi server Hapi
 * @returns {Promise<void>}
 */
const init = async () => {
  // Konfigurasi server dengan port dan host yang sesuai
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'], // Mengizinkan akses dari semua origin
      },
    },
  });

  // Mendaftarkan routes
  server.route(routes);

  // Memulai server
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
