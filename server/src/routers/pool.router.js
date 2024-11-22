// routers/pool.router.js

const express = require('express');
const multer = require('multer');
const { Pool } = require('../../db/models'); // Импорт модели Pool
const nodemailer = require('nodemailer');
const path = require('path');
const router = express.Router();
const fs = require('fs');

// Конфигурация Multer для загрузки файлов на сервер
const uploadDir = path.resolve(__dirname, '../../public/uploads');

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

// Настройка Nodemailer для отправки email
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
},
});
console.log("🚀 ~ EMAIL_PASS:", process.env.EMAIL_PASS)
console.log("🚀 ~ EMAIL_USER:", process.env.EMAIL_USER)

// Обработка отправки формы
router.post('/submit', upload.single('userImg'), async (req, res) => {
  const { userName, userEmail, userPhone } = req.body;
  const filePath = req.file ? `${req.file.filename}` : null;

  try {
    // Сохранение данных в базу данных через Sequelize
    await Pool.create({
      userName,
      userEmail,
      userPhone,
      userImg: filePath,
    });

    // Отправка email подтверждения пользователю
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Ваш заказ на часы принят',
      text: `Здравствуйте, ${userName}!\n\nВаш заказ принят. Мы скоро с вами свяжемся.\n\nСпасибо!`,
    });

    res.status(200).json({ message: 'Форма успешно отправлена и данные сохранены!' });
  } catch (error) {
    console.error('Ошибка обработки формы:', error);
    res.status(500).json({ error: 'Ошибка при обработке формы' });
  }
});

module.exports = router;
