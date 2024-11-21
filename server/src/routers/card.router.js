const express = require('express');
const { Card } = require('../../db/models');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cards = await Card.findAll();
    res.json(cards);
  } catch (error) {
    console.error('Ошибка получения всех карточек часов:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
