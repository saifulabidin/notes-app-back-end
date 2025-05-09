/**
 * @file handler.js
 * @description Berisi handler untuk semua rute API Notes
 * @author Saiful Abidin
 * @version 1.0.0
 */

const { nanoid } = require('nanoid');
const notes = require('./notes');

/**
 * @description Handler untuk menambahkan catatan baru
 * @param {object} request - Request object Hapi yang berisi payload catatan baru
 * @param {object} h - Response toolkit Hapi
 * @returns {object} Response dengan status dan data catatan yang berhasil dibuat
 */
const addNoteHandler = (request, h) => {
  // Ekstrak data dari payload request
  const { title = 'untitled', tags, body } = request.payload;

  // Buat ID unik dan timestamp untuk catatan baru
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  // Buat objek catatan baru
  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  // Tambahkan ke array notes
  notes.push(newNote);

  // Verifikasi apakah catatan berhasil ditambahkan
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    // Mengembalikan response sukses dengan kode 201 (Created)
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  // Jika gagal ditambahkan, kembalikan response error dengan kode 500
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

/**
 * @description Handler untuk mengambil semua catatan
 * @returns {object} Response dengan semua data catatan
 */
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

/**
 * @description Handler untuk mengambil catatan berdasarkan ID
 * @param {object} request - Request object Hapi yang berisi parameter ID
 * @param {object} h - Response toolkit Hapi
 * @returns {object} Response dengan catatan yang diminta atau pesan error jika tidak ditemukan
 */
const getNoteByIdHandler = (request, h) => {
  // Dapatkan ID dari parameter request
  const { id } = request.params;

  // Cari catatan dengan ID yang cocok
  const note = notes.filter((n) => n.id === id)[0];

  // Jika catatan ditemukan, kembalikan response sukses
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  // Jika catatan tidak ditemukan, kembalikan response error dengan kode 404
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

/**
 * @description Handler untuk mengubah catatan berdasarkan ID
 * @param {object} request - Request object Hapi yang berisi parameter ID dan payload perubahan
 * @param {object} h - Response toolkit Hapi
 * @returns {object} Response dengan status perubahan sukses atau gagal
 */
const editNoteByIdHandler = (request, h) => {
  // Dapatkan ID dari parameter request
  const { id } = request.params;

  // Dapatkan data yang diperbarui dari payload
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  // Cari indeks catatan dengan ID yang cocok
  const index = notes.findIndex((note) => note.id === id);

  // Jika catatan ditemukan, perbarui data
  if (index !== -1) {
    notes[index] = {
      ...notes[index], // Pertahankan data lain yang tidak diubah
      title,
      tags,
      body,
      updatedAt,
    };

    // Kembalikan response sukses dengan kode 200 (OK)
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  // Jika catatan tidak ditemukan, kembalikan response error dengan kode 404
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

/**
 * @description Handler untuk menghapus catatan berdasarkan ID
 * @param {object} request - Request object Hapi yang berisi parameter ID
 * @param {object} h - Response toolkit Hapi
 * @returns {object} Response dengan status penghapusan sukses atau gagal
 */
const deleteNoteByIdHandler = (request, h) => {
  // Dapatkan ID dari parameter request
  const { id } = request.params;

  // Cari indeks catatan dengan ID yang cocok
  const index = notes.findIndex((note) => note.id === id);

  // Jika catatan ditemukan, hapus dari array
  if (index !== -1) {
    notes.splice(index, 1);
    
    // Kembalikan response sukses dengan kode 200 (OK)
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  // Jika catatan tidak ditemukan, kembalikan response error dengan kode 404
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Export semua handler untuk digunakan di routes.js
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};