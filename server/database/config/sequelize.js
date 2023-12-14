const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres', // Menggunakan PostgreSQL
  host: 'localhost', // Ganti dengan host database Anda
  username: 'postgres', // Ganti dengan username database Anda
  password: 'wilbert04', // Ganti dengan password database Anda
  database: 'tes_a', // Ganti dengan nama database yang digunakan
  port: 5432, // Ganti dengan port database Anda untuk PostgreSQL (biasanya 5432)
  define: {
    timestamps: false, // Jika Anda tidak ingin Sequelize membuat kolom createdAt dan updatedAt
  },
});

// Coba koneksi ke database
sequelize
  .authenticate()
  .then(() => {
    console.log('Koneksi ke database berhasil.');
  })
  .catch((err) => {
    console.error('Gagal terkoneksi ke database:', err);
  });

module.exports = sequelize;
