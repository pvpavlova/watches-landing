const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { verifyAccessToken } = require('../middlewares/verifyTokens');  // Импортируем middleware для проверки access token
const authAdmin = require('../middlewares/authAdmin');  // Импортируем middleware для проверки прав администратора
const { Card, Pool } = require('../../db/models');
const fs = require('fs');

const uploadDir = path.resolve(__dirname, '../../public/images');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.use(verifyAccessToken);
router.use(authAdmin);

// Маршрут для создания новой пиццы
router.post('/add', upload.single('img'), async (req, res) => {
  const { name, body } = req.body;
  console.log("🚀 ~ router.post ~ body:", body);
  console.log("🚀 ~ router.post ~ name:", name);
  const imgPath = req.file ? `${req.file.filename}` : null;

  try {
    // Создаем новую пиццу в базе данных
    const newCard = await Card.create({
      name,
      body,
      img: imgPath,
    });
    res.status(201).json({ message: 'Карточка успешно создана', Card: newCard });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании карточки', error: error.message });
  }
});

router.get('/pools', async (req, res) => {
  try {
    const pools = await Pool.findAll();  // Получаем все записи из модели Pools
    res.status(200).json(pools);
  } catch (error) {
    console.error('Ошибка при получении карточек:', error);
    res.status(500).json({ message: 'Ошибка при получении данных' });
  }
});

module.exports = router;
