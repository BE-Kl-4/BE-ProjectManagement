// migrations/20231217120000-add-description-to-tasks.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tasks', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'The description of the task',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tasks', 'description');
  }
};
