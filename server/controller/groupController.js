// controllers/groupController.js
const { groups } = require('../database/models/groups');

/* ------------------------------------------------------------------------------------------------------------ */
// Fungsi untuk membuat grup baru (setiap user bisa melakukan)
const createGroup = async (req, res) => {
  try {
    const { NamaGrup, TaskID, UserID } = req.body;

    // Cek apakah nama grup sudah ada
    const existingGroup = await groups.findOne({
        where: {
          NamaGrup: NamaGrup,
        },
      });

    if (existingGroup) {
      // Jika nama grup sudah ada, kirim respons bahwa grup sudah ada
      res.status(400).send('Group with the same name already exists');
    } else {
       // Jika nama grup belum ada, buat grup baru
       const newGroup = await Group.create({
        NamaGrup,
        TaskID,
        UserID,
        Role: 'Manager',
      });

      // Tambahkan user sebagai project manager di grup yang baru dibuat
      // (Anda mungkin perlu menyesuaikan ini sesuai dengan model user Anda)
      await newGroup.addUser(UserID, { through: { Role: 'Manager' } });
      res.send('Group created successfully');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
/* ------------------------------------------------------------------------------------------------------------ */

/* --------------------------------  FUNGSI UNTUK MELIHAT LIST / DAFTAR GRUP  --------------------------------- */
// menampili seluruh data pada table group 
const getAllGroups = async (req, res) => {
    try {
      const allGroups = await groups.findAll();
      res.json(allGroups);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

const getGroupById = async (req, res) => {
  try {
    const groupId = req.params.id;
    const group = await groups.findByPk(groupId);

    if (!group) {
      return res.status(404).send('Group not found');
    }

    res.json(group);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

/* ------------------------------  FUNGSI UNTUK MELIHAT LIST / DAFTAR GRUP (END)  ----------------------------- */






/* --------------------------------   LIST / DAFTAR NAMA FUNGSI YANG DIEXPORT  --------------------------------- */
module.exports = {
  createGroup, // mengekspor fungsi pembuatan grup
  getAllGroups,
  getGroupById
};
