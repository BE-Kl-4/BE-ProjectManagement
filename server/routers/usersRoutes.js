// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Define routes for users
router.get('/', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
