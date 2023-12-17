// controllers/individualTask.js
const { tasks, usertasks } = require('../database/models');

// Get all tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await tasks.findAll();

    res.status(200).json({ status: 'success', tasks: allTasks });
  } catch (error) {
    next(error);
  }
};

// Get task by ID
exports.getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await tasks.findByPk(id);

    if (!task) {
      return res.status(404).json({ status: 'error', message: "The Task you are looking for doesn't exist." });
    }

    res.status(200).json({ status: 'success', task });
  } catch (error) {
    next(error);
  }
};

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status, type } = req.body;

    const newTask = await tasks.create({
      title,
      description,
      status,
      type,
    });

    // Select only specific columns to match the PostgreSQL query
    const createdTask = await tasks.findOne({
      attributes: ['taskid', 'title', 'type', 'status', 'description'], // Corrected column order
      where: {
        taskid: newTask.taskid,
      },
    });

    res.status(201).json({ status: 'success', task: createdTask });
  } catch (error) {
    // Log the actual error message for debugging purposes
    console.error('Error creating task:', error.message);

    next(error);
  }
};

// Update a task
exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newDescription, newStatus } = req.body;

    // Validation: Check if newStatus is a valid status
    const allowedStatus = ['todo', 'in_progress', 'done'];
    if (!allowedStatus.includes(newStatus)) {
      return res.status(400).json({ status: 'error', message: 'Invalid status' });
    }

    // Update the task in the database
    const [updatedRowsCount, [updatedTask]] = await tasks.update(
      { description: newDescription, status: newStatus },
      { where: { taskid: id }, returning: true }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ status: 'error', message: "The Task you are trying to update doesn't exist." });
    }

    res.status(200).json({ status: 'success', updatedTask });
  } catch (error) {
    next(error);
  }
};
// Delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskId = parseInt(id, 10);

    // Delete associated records in usertasks table
    await usertasks.destroy({
      where: { taskid: taskId },
    });

    // Delete the task in tasks table
    const deletedTask = await tasks.findOne({
      attributes: ['taskid', 'title', 'type', 'status', 'description'],
      where: { taskid: taskId },
    });

    const deletedRowCount = await tasks.destroy({
      where: { taskid: taskId },
    });

    if (deletedRowCount === 0) {
      console.log(`Task with ID ${taskId} not found.`);
      return res.status(404).json({ status: 'error', message: "The Task you are trying to delete doesn't exist." });
    }

    console.log(`Task with ID ${taskId} deleted successfully.`);

    // Respond with a success message and deleted task details
    res.status(200).json({ status: 'success', message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    next(error);
  }
};