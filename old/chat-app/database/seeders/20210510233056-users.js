'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        username: 'johndoe',
        email: 'john.doe@example.com',
        password: bcrypt.hashSync('johndoe', 10),
        favoritePokemon: 'Rowlet',
        avatar: '',
      },
      {
        username: 'janedoe',
        email: 'jane.doe@example.com',
        password: bcrypt.hashSync('janedoe', 10),
        favoritePokemon: 'Vaporeon',
        avatar: '',
      },
      {
        username: 'blacksmith',
        email: 'blacksmith@example.com',
        password: bcrypt.hashSync('blacksmith', 10),
        favoritePokemon: 'Machamp',
        avatar: '',
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
