/**
 * @file routes.js
 * @description Konfigurasi rute API untuk aplikasi notes
 * @author Saiful Abidin
 * @version 1.0.0
 */

// Import semua handler yang diperlukan dari file handler.js
const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

/**
 * @description Konfigurasi rute API untuk aplikasi notes
 * @type {Array<object>}
 */
const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler, // Menambahkan catatan baru
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler, // Mengambil semua catatan
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler, // Mengambil catatan berdasarkan ID
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler, // Memperbarui catatan berdasarkan ID
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler, // Menghapus catatan berdasarkan ID
  },
];

// Export routes untuk digunakan di server.js
module.exports = routes;
