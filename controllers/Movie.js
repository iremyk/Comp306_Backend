const makeQuery = require('../utilities');

const getRandomMovies = async (req, res) => {
  try {
    const query = `SELECT * FROM movies ORDER BY RAND() LIMIT 10`;
    const results = await makeQuery(query);
    res.send(results);
  } catch (err) {
    res.send(err.message);
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.query;
    const query = `SELECT * FROM movies WHERE id = ${id}`;
    const results = await makeQuery(query);
    res.send(results);
  } catch (err) {
    res.send(err.message);
  }
};

const getMovieByFilter = async (req, res) => {
  try {
    let { name, startYear, endYear, startRank, endRank, genre, actor, director } = req.query;

    name = name ? name : null;
    startYear = startYear ? startYear : null;
    endYear = endYear ? endYear : null;
    startRank = startRank ? startRank : null;
    endRank = endRank ? endRank : null;
    genre = genre ? genre : null;
    actor = actor ? actor : null;
    director = director ? director : null;

    const query = `SELECT DISTINCT movies.name
                  FROM movies, movies_genres, actors, directors, movies_directors, roles 
                  WHERE (movies.id = movies_genres.movie_id AND movies.id = movies_directors.movie_id AND movies.id = roles.movie_id AND roles.actor_id = actors.id AND movies_directors.director_id = directors.id)
                    AND (${name} IS NULL OR movies.name LIKE '%${name}%') 
                    AND (${startYear} IS NULL OR movies.year >= ${startYear})
                    AND (${endYear} IS NULL OR movies.year <= ${endYear}) 
                    AND (${startRank} IS NULL OR movies.rank >= ${startRank})
                    AND (${endRank} IS NULL OR movies.rank <= ${endRank}) 
                    AND (${genre} IS NULL OR movies_genres.genre LIKE '%${genre}%')
                    AND (${actor} IS NULL OR actors.name LIKE '%${actor}%')
                    AND (${director} IS NULL OR directors.name LIKE '%${director}%')`;
    const results = await makeQuery(query);
    res.send(results);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
  getRandomMovies,
  getMovieById,
  getMovieByFilter
};
