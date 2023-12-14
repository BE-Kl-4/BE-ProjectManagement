const { usertasks } = require('../database/models/usertasks');

const taskController = {
    // Render halaman pengumpulan tugas individu (tanpa otentikasi)
    renderSubmitPage: async (req, res) => {
        try {
            // Mendapatkan data dari parameter URL
            const userId = req.params.userId;
            const taskId = req.params.taskId;

            // TODO: Implementasi logika otorisasi (tanpa otentikasi)

            // Contoh data tugas (gantilah dengan data sebenarnya)
            const taskData = {
                title: 'Task Title',
                description: 'Task Description',
            };

            // Render halaman dengan formulir pengumpulan
            res.render('submitPage', { taskData });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    // Mengumpulkan tugas individu (tanpa otentikasi)
    submitTask: async (req, res) => {
        try {
            // Mendapatkan data dari body permintaan (req.body)
            const { title, description, userId, taskId } = req.body;

            // TODO: Implementasi logika pengumpulan tugas individu (tanpa otentikasi)
            const submissionData = {
                title,
                description,
                userId,
                taskId,
                // submissionDate: new Date(), // Misalnya, menambahkan tanggal pengumpulan
            };
            
            // Simpan data ke dalam database menggunakan model tasks
            const result = await usertasks.create(submissionData);

            // Setelah berhasil, kirim respons ke klien
            res.status(200).json({ message: 'Task submitted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    // Membatalkan pengumpulan tugas individu (tanpa otentikasi)
    cancelSubmission: async (req, res) => {
        try {
            // TODO: Implementasi logika pembatalan pengumpulan tugas individu (tanpa otentikasi)
            // Menghapus data pengumpulan tugas dari database

            // Setelah berhasil, kirim respons ke klien
            res.status(200).json({ message: 'Task submission canceled' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    // Memperbarui pengumpulan tugas individu (tanpa otentikasi)
    updateSubmission: async (req, res) => {
        try {
            // TODO: Implementasi logika update pengumpulan tugas individu (tanpa otentikasi)
            // Mendapatkan data dari body permintaan (req.body) dan memperbarui data di database

            // Setelah berhasil, kirim respons ke klien
            res.status(200).json({ message: 'Task submission updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
};

module.exports = taskController;
