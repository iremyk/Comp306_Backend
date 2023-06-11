const express = require('express');
const { getRandomMovies, getMovieById, getMovieByFilter } = require('../controllers/Movie');

const router = express.Router();

router.get('/getRandomMovies', getRandomMovies);
router.get('/getMovieById', getMovieById);
router.get('/getMovieByFilter', getMovieByFilter);

module.exports = router;
