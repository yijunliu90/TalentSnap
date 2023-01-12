const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const path = require('path');

const app = express();

const apiRouter = require('./routes/api');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.resolve(__dirname, '../client/src')));

app.use('/api', apiRouter);
// app.get('/', (req, res) => res.status(200).json('express is here!'));

app.use((req, res) => res.status(404).send('This page does not exist'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
