/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
const rp = require('request-promise');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const morgan = require('morgan');

app = express();

mongoose.connect('mongodb://localhost:27017/comic_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms'),
);
dotEnv.config();

const mangaRouter = require('./routes/mangas');

app.use('', mangaRouter);

app.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
