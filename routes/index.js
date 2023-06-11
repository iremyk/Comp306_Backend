const express = require('express');

const { getRandomMovies, getMovieById, getMovieByFilter } = require('../controllers/Movie');
const { getActorById, getCommonMovies } = require('../controllers/Actor');
const { getDirectorById, getMostRatedDirectors } = require('../controllers/Director');

const router = express.Router();

router.get('/getRandomMovies', getRandomMovies);
router.get('/getMovieById', getMovieById);
router.get('/getMovieByFilter', getMovieByFilter);

router.get('/getActorById', getActorById);
router.get('/getCommonMovies', getCommonMovies);

router.get('/getDirectorById', getDirectorById);
router.get('/getMostRatedDirectors', getMostRatedDirectors);

module.exports = router;
