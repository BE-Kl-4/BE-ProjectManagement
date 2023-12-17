// controllers/userController.js
const { user } = require('../database/models/users.js');

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await user.findAll();
    res.status(200).json({ status: 'success', users });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await user.findByPk(id);

    if (!user) {
      return res.status(404).json({ status: 'error', message: "The user you are looking for doesn't exist." });
    }

    res.status(200).json({ status: 'success', user });
  } catch (error) {
    next(error);
  }
};

// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await user.create({
      username,
      email,
      password,
      // Tambahkan bidang lain sesuai kebutuhan
    });

    res.status(201).json({ status: 'success', user: newUser });
  } catch (error) {
    next(error);
  }
};

// Update user by ID
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [updatedRowsCount, updatedUsers] = await user.update(req.body, {
      where: { id },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ status: 'error', message: "The user you are trying to update doesn't exist." });
    }

    res.status(200).json({ status: 'success', updatedUser: updatedUsers[0] });
  } catch (error) {
    next(error);
  }
};

// Delete user by ID
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedRowCount = await user.destroy({
      where: { id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ status: 'error', message: "The user you are trying to delete doesn't exist." });
    }

    res.status(204).json({ status: 'success', message: 'User removed successfully' });
  } catch (error) {
    next(error);
  }
};
