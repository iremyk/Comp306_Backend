const express = require('express');

const { getRandomMovies, getMovieById, getMovieByFilter } = require('../controllers/Movie');
const { getActorById, getCommonMovies, getMostRatedRoles } = require('../controllers/Actor');
const { getDirectorById, getMostRatedDirectors, getFavoriteGenres } = require('../controllers/Director');

const router = express.Router();

router.get('/getRandomMovies', getRandomMovies);
router.get('/getMovieById', getMovieById);
router.get('/getMovieByFilter', getMovieByFilter);

router.get('/getActorById', getActorById);
router.get('/getCommonMovies', getCommonMovies);
router.get('/getMostRatedRoles', getMostRatedRoles);

router.get('/getDirectorById', getDirectorById);
router.get('/getMostRatedDirectors', getMostRatedDirectors);
router.get('/getFavoriteGenres', getFavoriteGenres);

module.exports = router;
