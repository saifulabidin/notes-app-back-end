/**
 * @file handler.test.js
 * @description File pengujian untuk menguji semua handler di aplikasi notes
 * @author Saiful Abidin
 * @version 1.0.0
 */

const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('../src/handler');
const notes = require('../src/notes');

/**
 * @description Mock untuk h object dari Hapi
 * @type {object}
 */
const mockH = {
  response: (obj) => {
    const responseObj = {
      ...obj,
      code: (statusCode) => {
        responseObj.statusCode = statusCode;
        return responseObj;
      },
    };
    return responseObj;
  },
};

/**
 * @description Fungsi untuk membersihkan array notes sebelum tiap test
 * @returns {void} Tidak mengembalikan nilai
 */
const clearNotes = () => {
  while (notes.length > 0) {
    notes.pop();
  }
};

describe('Notes Handler Tests', () => {
  // Membersihkan array notes sebelum setiap test
  beforeEach(() => {
    clearNotes();
  });

  describe('addNoteHandler', () => {
    test('harus menambahkan catatan baru dengan sukses', () => {
      // Persiapkan request dengan payload lengkap
      const request = {
        payload: {
          title: 'Test Title',
          tags: ['test'],
          body: 'Test body content',
        },
      };

      // Panggil handler yang diuji
      const response = addNoteHandler(request, mockH);
      // Verifikasi response
      expect(response.status).toBe('success');
      expect(response.message).toBe('Catatan berhasil ditambahkan');
      expect(response.statusCode).toBe(201);
      expect(notes.length).toBe(1);
    });

    test('harus menggunakan judul default jika tidak ada judul', () => {
      // Persiapkan request tanpa judul
      const request = {
        payload: {
          tags: ['test'],
          body: 'Test body content',
        },
      };

      // Panggil handler yang diuji
      addNoteHandler(request, mockH);
      // Verifikasi hasil
      expect(notes[0].title).toBe('untitled');
    });
  });

  describe('getAllNotesHandler', () => {
    test('harus mengembalikan array notes kosong', () => {
      // Panggil handler yang diuji
      const response = getAllNotesHandler();
      // Verifikasi response
      expect(response.status).toBe('success');
      expect(response.data.notes).toEqual([]);
    });

    test('harus mengembalikan array notes dengan data', () => {
      // Persiapkan data test
      const mockNote = {
        id: 'test-id',
        title: 'Test Title',
        tags: ['test'],
        body: 'Test body content',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      };
      notes.push(mockNote);

      // Panggil handler yang diuji
      const response = getAllNotesHandler();

      // Verifikasi response
      expect(response.status).toBe('success');
      expect(response.data.notes).toEqual([mockNote]);
    });
  });

  describe('getNoteByIdHandler', () => {
    test('harus mengembalikan catatan jika ID ditemukan', () => {
      // Persiapkan data test
      const mockNote = {
        id: 'test-id',
        title: 'Test Title',
        tags: ['test'],
        body: 'Test body content',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      };
      notes.push(mockNote);

      // Persiapkan request dengan ID valid
      const request = {
        params: {
          id: 'test-id',
        },
      };

      // Panggil handler yang diuji
      const response = getNoteByIdHandler(request, mockH);

      // Verifikasi response
      expect(response.status).toBe('success');
      expect(response.data.note).toEqual(mockNote);
    });

    test('harus mengembalikan 404 jika ID tidak ditemukan', () => {
      // Persiapkan request dengan ID yang tidak ada
      const request = {
        params: {
          id: 'not-exist',
        },
      };

      // Panggil handler yang diuji
      const response = getNoteByIdHandler(request, mockH);

      // Verifikasi response error
      expect(response.status).toBe('fail');
      expect(response.message).toBe('Catatan tidak ditemukan');
      expect(response.statusCode).toBe(404);
    });
  });

  describe('editNoteByIdHandler', () => {
    test('harus memperbarui catatan jika ID ditemukan', () => {
      // Persiapkan data test
      const mockNote = {
        id: 'test-id',
        title: 'Old Title',
        tags: ['old'],
        body: 'Old body content',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      };
      notes.push(mockNote);

      // Persiapkan request dengan ID valid dan data baru
      const request = {
        params: {
          id: 'test-id',
        },
        payload: {
          title: 'Updated Title',
          tags: ['updated'],
          body: 'Updated body content',
        },
      };

      // Panggil handler yang diuji
      const response = editNoteByIdHandler(request, mockH);

      // Verifikasi response dan perubahan data
      expect(response.status).toBe('success');
      expect(response.message).toBe('Catatan berhasil diperbarui');
      expect(response.statusCode).toBe(200);
      expect(notes[0].title).toBe('Updated Title');
    });

    test('harus mengembalikan 404 jika ID tidak ditemukan', () => {
      // Persiapkan request dengan ID yang tidak ada
      const request = {
        params: {
          id: 'not-exist',
        },
        payload: {
          title: 'Updated Title',
          tags: ['updated'],
          body: 'Updated body content',
        },
      };

      // Panggil handler yang diuji
      const response = editNoteByIdHandler(request, mockH);

      // Verifikasi response error
      expect(response.status).toBe('fail');
      expect(response.message).toBe('Gagal memperbarui catatan. Id tidak ditemukan');
      expect(response.statusCode).toBe(404);
    });
  });

  describe('deleteNoteByIdHandler', () => {
    test('harus menghapus catatan jika ID ditemukan', () => {
      // Persiapkan data test
      const mockNote = {
        id: 'test-id',
        title: 'Test Title',
        tags: ['test'],
        body: 'Test body content',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      };
      notes.push(mockNote);

      // Persiapkan request dengan ID valid
      const request = {
        params: {
          id: 'test-id',
        },
      };

      // Panggil handler yang diuji
      const response = deleteNoteByIdHandler(request, mockH);

      // Verifikasi response dan penghapusan data
      expect(response.status).toBe('success');
      expect(response.message).toBe('Catatan berhasil dihapus');
      expect(response.statusCode).toBe(200);
      expect(notes.length).toBe(0);
    });

    test('harus mengembalikan 404 jika ID tidak ditemukan', () => {
      // Persiapkan request dengan ID yang tidak ada
      const request = {
        params: {
          id: 'not-exist',
        },
      };

      // Panggil handler yang diuji
      const response = deleteNoteByIdHandler(request, mockH);

      // Verifikasi response error
      expect(response.status).toBe('fail');
      expect(response.message).toBe('Catatan gagal dihapus. Id tidak ditemukan');
      expect(response.statusCode).toBe(404);
    });
  });
});
