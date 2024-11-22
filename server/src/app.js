require('dotenv').config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cardRouter = require('./routers/card.router')
const tokenRouter = require('./routers/token.router')
const adminRouter = require('./routers/admin.router');
const authRouter = require('./routers/auth.router')

const { PORT } = process.env;

const corsConfig = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
};

app.use(express.static(path.join(__dirname, '../public')));
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/token', tokenRouter)
app.use('/api/card', cardRouter);
app.use('/api/admin', adminRouter);


app.listen(PORT, () => {
  `console.log(Server started at ${PORT} port);`;
});
