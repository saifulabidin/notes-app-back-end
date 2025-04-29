/**
 * @file server.js
 * @description File utama untuk konfigurasi dan inisialisasi server Hapi
 * @author Saiful Abidin
 * @version 1.0.0
 */

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

/**
 * @description Fungsi untuk menginisialisasi dan menjalankan server Hapi
 * @async
 * @function init
 * @returns {Promise<void>} Promise yang resolve ketika server telah berhasil dimulai
 */
const init = async () => {
  // Konfigurasi server dengan port dan host yang sesuai
  const server = Hapi.server({
    port: 5000, // Port yang digunakan server
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0', // Gunakan localhost untuk pengembangan, 0.0.0.0 untuk produksi
    routes: {
      cors: {
        origin: ['*'], // Mengizinkan akses dari semua origin untuk keperluan API
      },
    },
  });

  // Mendaftarkan routes dari modul routes.js ke server
  server.route(routes);

  // Memulai server dan menangani error jika ada
  try {
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  } catch (error) {
    console.error('Terjadi kesalahan saat menjalankan server:', error);
    process.exit(1);
  }
};

// Panggil fungsi init untuk memulai server
init();

/**
 * Menangani sinyal terminasi untuk mematikan server dengan baik
 */
process.on('SIGINT', () => {
  console.log('Server dihentikan');
  process.exit(0);
});

// Export fungsi init untuk keperluan pengujian
module.exports = { init };
