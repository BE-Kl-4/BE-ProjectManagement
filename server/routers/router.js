const express = require('express');
const userController = require('../controller/userController'); // Sesuaikan path dengan lokasi file userController.js Anda
const groupController = require('../controller/groupController');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/groups', groupController.getAllGroups);
router.get('/groups/:id', groupController.getGroupById);
module.exports = router;
