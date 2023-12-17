const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'root',
  database: 'tes_a',
  port: 5432,
  define: {
    timestamps: false,
  },
  logging: console.log, // Enable logging of SQL queries
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
