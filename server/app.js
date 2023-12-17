
const express = require('express'); 

const router = require('./routers/router')
const usersRoutes = require('./routers/usersRoutes')
const individualRoutes= require('./routers/individualRoutes')

// Inisialisasi Express :
const app = express(); // Membuat instance aplikasi Express.
app.use(express.json());

// Router
app.use('/router', router);
app.use('/users', usersRoutes);
app.use('/individuals', individualRoutes);

// Menentukan Port dan Mendengarkan:
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
