// userController.js
// const sequelize = require('../database/config/sequelize');
const { users } = require('../database/models');

/* function getAllUsers :
   Penjelasan dasar untuk Fungsi Pengambilan Seluruh Data User

   Cara :
   membaca dan mengambil semua data pengguna dari basis data menggunakan Sequelize, kemudian merespons dengan 
   data tersebut dalam format JSON kepada klien atau aplikasi yang melakukan permintaan.

   Fungsi asinkron  getAllUsers yang berperan dalam mengambil semua pengguna dari basis data.
   syntax dasarnya :
   async function getAllUsers (req , res) {

   }

   const users = await User.findAll();
    Menggunakan Sequelize, fungsi findAll() digunakan untuk mengambil semua baris (records) dari tabel yang 
    sesuai dengan model User. Ini bisa dianggap sebagai operasi READ, di mana data pengguna diambil dari tabel.

    res.json(users);
    Setelah mendapatkan data pengguna, server akan merespons dengan mengirimkan data tersebut sebagai respons JSON.

    catch (err) { ... } 
    Ini adalah bagian penanganan kesalahan. 
    Jika terjadi kesalahan selama pengambilan data dari basis data, kesalahan dicetak ke konsol, dan server 
    memberikan respons dengan status 500 (Internal Server Error).
*/

/* --------------------------------------------------------------------------------------------------------------
                                        INI VERSI MENGAMBIL SEMUA DATA
-----------------------------------------------------------------------------------------------------------------
async function getAllUsers(req, res) {
    try {
        const allUsers = await users.findAll();
        res.json(allUsers);
    } catch (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Internal Server Error');
    }
}
--------------------------------------------------------------------------------------------------------------- */
async function getAllUsers(req, res) {
    try {
        // Menentukan atribut (kolom) yang ingin ditampilkan (exclude userid dan password)
        const allUsers = await users.findAll({
            attributes: { exclude: ['userid', 'password'] },
        });

        res.json(allUsers);
    } catch (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Internal Server Error');
    }
}




module.exports = {
    getAllUsers,
};
