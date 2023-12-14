// app.js

// Import modules yang dibutuhkan
const express = require('express'); // Modul utama untuk membuat dan mengelola server web dengan Express.

const router = require('./routers/router')

// Inisialisasi Express :
const app = express(); // Membuat instance aplikasi Express.

// Middleware Express untuk Parsing JSON dan URL-encoded:
// mengurai payload JSON dan data formulir yang dikirim dengan metode POST.
app.use(express.json());

// Router
app.use('/api/users', router);

// Menentukan Port dan Mendengarkan:
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

