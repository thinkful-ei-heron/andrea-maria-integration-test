/* eslint-disable strict */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const playstore = require('./playstore.js');

app.use(morgan('common'));
app.use(cors());

app.get('/', (req, res) => {

  const validGenres = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card']

  let filteredData = playstore;

  if ('sort' in req.query && (req.query.sort !== 'rating' && req.query.sort !== 'app')) {
    return res.status(400).json({error: 'not valid query'})
  }

  if ('genres' in req.query && (!validGenres.filter(item => item === req.query.genres)[0] )) {
    return res.status(400).json({ error: 'not valid query' })
  }

  if (req.query.genres) {
    filteredData = playstore.filter(app => app.Genres.toLowerCase() === req.query.genres.toLowerCase())
  }

  if(req.query.sort === 'rating') {

    let response = filteredData.sort((a,b) => a.Rating < b.Rating ? 1: -1)
    return res.json(response)
  }

  if (req.query.sort === 'app') {

    let response = filteredData.sort((a, b) => a.App > b.App ? 1 : -1)
    return res.json(response)
  }


  return res.json(playstore)
});

module.exports = app; 