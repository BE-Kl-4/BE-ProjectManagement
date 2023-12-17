'use strict';

'use strict';

/** @type {import('sequelize').QueryInterface} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tasks', 'status', {
      type: Sequelize.STRING,
      defaultValue: 'todo',
      allowNull: false,
      validate: {
        isIn: [['todo', 'in_progress', 'done']],
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tasks', 'status');
  }
};

