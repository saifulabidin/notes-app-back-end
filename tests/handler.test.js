const { 
  addNoteHandler, 
  getAllNotesHandler, 
  getNoteByIdHandler, 
  editNoteByIdHandler, 
  deleteNoteByIdHandler 
} = require('../src/handler');
const notes = require('../src/notes');

/**
 * @description Mock untuk h object dari Hapi
 */
const mockH = {
  response: (obj) => ({
    ...obj,
    code: (statusCode) => ({
      ...obj,
      statusCode,
    }),
  }),
};

/**
 * @description Fungsi untuk membersihkan array notes sebelum tiap test
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
      const request = {
        payload: {
          title: 'Test Title',
          tags: ['test'],
          body: 'Test body content',
        },
      };

      const response = addNoteHandler(request, mockH);
      expect(response.status).toBe('success');
      expect(response.message).toBe('Catatan berhasil ditambahkan');
      expect(response.statusCode).toBe(201);
      expect(notes.length).toBe(1);
    });

    test('harus menggunakan judul default jika tidak ada judul', () => {
      const request = {
        payload: {
          tags: ['test'],
          body: 'Test body content',
        },
      };

      addNoteHandler(request, mockH);
      expect(notes[0].title).toBe('untitled');
    });
  });

  describe('getAllNotesHandler', () => {
    test('harus mengembalikan array notes kosong', () => {
      const response = getAllNotesHandler();
      expect(response.status).toBe('success');
      expect(response.data.notes).toEqual([]);
    });

    test('harus mengembalikan array notes dengan data', () => {
      const mockNote = {
        id: 'test-id',
        title: 'Test Title',
        tags: ['test'],
        body: 'Test body content',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      };
      notes.push(mockNote);

      const response = getAllNotesHandler();
      expect(response.status).toBe('success');
      expect(response.data.notes).toEqual([mockNote]);
    });
  });

  describe('getNoteByIdHandler', () => {
    test('harus mengembalikan catatan jika ID ditemukan', () => {
      const mockNote = {
        id: 'test-id',
        title: 'Test Title',
        tags: ['test'],
        body: 'Test body content',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      };
      notes.push(mockNote);

      const request = {
        params: {
          id: 'test-id',
        },
      };

      const response = getNoteByIdHandler(request, mockH);
      expect(response.status).toBe('success');
      expect(response.data.note).toEqual(mockNote);
    });

    test('harus mengembalikan 404 jika ID tidak ditemukan', () => {
      const request = {
        params: {
          id: 'not-exist',
        },
      };

      const response = getNoteByIdHandler(request, mockH);
      expect(response.status).toBe('fail');
      expect(response.message).toBe('Catatan tidak ditemukan');
      expect(response.statusCode).toBe(404);
    });
  });

  describe('editNoteByIdHandler', () => {
    test('harus memperbarui catatan jika ID ditemukan', () => {
      const mockNote = {
        id: 'test-id',
        title: 'Old Title',
        tags: ['old'],
        body: 'Old body content',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      };
      notes.push(mockNote);

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

      const response = editNoteByIdHandler(request, mockH);
      expect(response.status).toBe('success');
      expect(response.message).toBe('Catatan berhasil diperbarui');
      expect(response.statusCode).toBe(200);
      expect(notes[0].title).toBe('Updated Title');
    });

    test('harus mengembalikan 404 jika ID tidak ditemukan', () => {
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

      const response = editNoteByIdHandler(request, mockH);
      expect(response.status).toBe('fail');
      expect(response.message).toBe('Gagal memperbarui catatan. Id tidak ditemukan');
      expect(response.statusCode).toBe(404);
    });
  });

  describe('deleteNoteByIdHandler', () => {
    test('harus menghapus catatan jika ID ditemukan', () => {
      const mockNote = {
        id: 'test-id',
        title: 'Test Title',
        tags: ['test'],
        body: 'Test body content',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      };
      notes.push(mockNote);

      const request = {
        params: {
          id: 'test-id',
        },
      };

      const response = deleteNoteByIdHandler(request, mockH);
      expect(response.status).toBe('success');
      expect(response.message).toBe('Catatan berhasil dihapus');
      expect(response.statusCode).toBe(200);
      expect(notes.length).toBe(0);
    });

    test('harus mengembalikan 404 jika ID tidak ditemukan', () => {
      const request = {
        params: {
          id: 'not-exist',
        },
      };

      const response = deleteNoteByIdHandler(request, mockH);
      expect(response.status).toBe('fail');
      expect(response.message).toBe('Catatan gagal dihapus. Id tidak ditemukan');
      expect(response.statusCode).toBe(404);
    });
  });
});
