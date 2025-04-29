/**
 * @file notes.js
 * @description Modul untuk menyimpan data catatan dalam aplikasi
 * @author Saiful Abidin
 * @version 1.0.0
 */

/**
 * @description Array untuk menyimpan semua catatan dalam aplikasi
 * @type {Array<object>}
 * @property {string} id - ID unik untuk catatan
 * @property {string} title - Judul catatan
 * @property {Array<string>} tags - Tag-tag untuk catatan
 * @property {string} body - Isi catatan
 * @property {string} createdAt - Timestamp pembuatan catatan
 * @property {string} updatedAt - Timestamp pembaruan terakhir
 */
const notes = [];

// Export array notes untuk digunakan oleh modul lain
module.exports = notes;
