const express = require('express');
const router = express.Router();
const individualTask = require('../controller/individualTask');  
// Define routes for tasks
router.get('/', individualTask.getAllTasks);
router.get('/:id', individualTask.getTaskById);
router.post('/', individualTask.createTask);
router.put('/:id', individualTask.updateTask);
router.delete('/:id', individualTask.deleteTask);

module.exports = router;
