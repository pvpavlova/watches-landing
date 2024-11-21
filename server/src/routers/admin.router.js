const express = require('express');
const { Card } = require('../../db/models');
const authAdmin = require('../middlewares/authAdmin');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

const router = express.Router();

router.post('/add', verifyAccessToken, authAdmin, async (req, res) => {
  const { name, body, img } = req.body;

  try {
    if (!name || !body || !img) {
      return res.status(400).json({ message: 'Все поля обязательны' });
    }

    const newCard = await Card.create({ name, body, img });

    res.status(201).json({ message: 'Карточка успешно добавлена', card: newCard });
  } catch (error) {
    console.error('Ошибка при добавлении карточки:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
