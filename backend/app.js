const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv')
  .config();
const helmet = require('helmet');
const { errors } = require('celebrate');
const userRouter = require('./routes/userRouter');
const cardRouter = require('./routes/cardRouter');
const handleExceptions = require('./utils/handleException');
const {
  login,
  createUser,
} = require('./cotrollers/userController');
const { auth } = require('./middlewares/auth');
const {
  celebrateCreateUser,
  celebrateLogin,
} = require('./celebrate/celebrateUser');
const PageNotFound = require('./exceptions/pageNotFound');
const { pageNotFound } = require('./utils/validationMessage');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

const allowedCors = [
  'http://gulshat-express.nomoreparties.sbs',
  'https://gulshat-express.nomoreparties.sbs',
  'https://158.160.114.23',
  'http://158.160.114.23',
  'gulshat-express.nomoreparties.sbs'
];

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  // if (allowedCors.includes(origin)) {
  //   res.header('Access-Control-Allow-Origin', origin);
  // }

  res.header('Access-Control-Allow-Origin', "*");
  return next();
});

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', celebrateLogin, login);
app.post('/signup', celebrateCreateUser, createUser);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res, next) => next(new PageNotFound(pageNotFound)));
app.use(errors());
app.use(handleExceptions);

app.listen(PORT);
