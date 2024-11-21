'use strict';

const { Card, User } = require('../models');
const { hashSync } = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      { email: '123@123', hashpass: hashSync('123', 10) },
      { email: 'bob@mail.com', hashpass: hashSync('123', 10) },
    ]);

    await Card.bulkCreate([
      {
        name: '',
        body: '',
        userId: 1,
        img: 'watchs 1.jpg',
      },
      {
        name: '',
        body: '',
        userId: 1,
        img: 'watchs 2.jpg',
      },
      {
        name: '',
        body: '',
        userId: 1,
        img: 'watchs 3.jpg',
      },
      {
        name: '',
        body: '',
        userId: 1,
        img: 'watchs 4.jpg',
      },
      {
        name: '',
        body: '',
        userId: 1,
        img: 'watchs 5.jpg',
      },
      {
        name: '',
        body: '',
        userId: 1,
        img: 'watchs 6.jpg',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Card.destroy({
      where: {
        id: { [Sequelize.Op.gt]: 0 },
      },
    });
  },
};
