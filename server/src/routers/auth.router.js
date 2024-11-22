const router = require('express').Router();
const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const cookieConfig = require('../configs/cookieConfig');

router.post('/signin', async (req, res) => {
  const { email, hashpass } = req.body;

  if (!(email && hashpass)) {
    res.status(400).json({ message: 'Необходимо заполнить все поля' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    const isCorrectPass = await bcrypt.compare(hashpass, user.hashpass);

    if (!isCorrectPass) {
      res.status(400).json({ message: 'Некорректный email или пароль' });
    } else {
      const plainUser = user.get();
      delete plainUser.hashpass;

      const { accessToken, refreshToken } = generateToken({ user: plainUser });

      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user: plainUser, accessToken });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: '' });
  }

  res.end();
});

router.get('/logout', async (req, res) => {
  try {
    res.clearCookie('refreshToken').sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;
