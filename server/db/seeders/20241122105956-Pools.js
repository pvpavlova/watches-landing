'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Pools',
      [
        {
          userName: 'John Doe',
          userEmail: 'JohnDoe@mail.ru',
          userPhone: 89174203456,
          userImg: '2.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'Владислав Мезенцев',
          userEmail: 'Vladislav@gmail.ru',
          userPhone: 89176523456,
          userImg: '3.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'Полина Павлова',
          userEmail: 'polinapavlova174@gmail.com',
          userPhone: 89174756456,
          userImg: '1.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'Аблеев Султан',
          userEmail: 'sult_abl@mail.ru',
          userPhone: 89178343456,
          userImg: '4.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'ozon',
          userEmail: 'ozon@gmail.ru',
          userPhone: 89177693461,
          userImg: '5.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'Саша Крутой',
          userEmail: 'alekssss223@mail.ru',
          userPhone: 89172435234,
          userImg: '6.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pools', null, {});
  },
};
