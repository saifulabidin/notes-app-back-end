/**
 * @file jest.config.js
 * @description Konfigurasi untuk menjalankan pengujian dengan Jest
 * @author Saiful Abidin
 * @version 1.0.0
 */

module.exports = {
  // Lingkungan pengujian untuk Node.js
  testEnvironment: 'node',

  // Mengabaikan folder node_modules dalam laporan cakupan kode
  coveragePathIgnorePatterns: ['/node_modules/'],

  // Menampilkan informasi rinci selama pengujian
  verbose: true,

  // Mengumpulkan informasi cakupan kode
  collectCoverage: true,

  // Pola untuk file pengujian
  testMatch: ['**/?(*.)+(spec|test).js'],
};
