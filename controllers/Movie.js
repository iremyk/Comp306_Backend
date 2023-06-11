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
    startYear = parseInt(startYear) ? parseInt(startYear) : null;
    endYear = parseInt(endYear) ? parseInt(endYear) : null;
    startRank = parseFloat(startRank) ? parseFloat(startRank) : null;
    endRank = parseFloat(endRank) ? parseFloat(endRank) : null;
    genre = genre ? genre : null;
    actor = actor ? actor : null;
    director = director ? director : null;

    const query = `SELECT DISTINCT movies.name, movies.id
                  FROM movies, movies_genres, actors, directors, movies_directors, roles 
                  WHERE (movies.id = movies_genres.movie_id AND movies.id = movies_directors.movie_id AND movies.id = roles.movie_id AND roles.actor_id = actors.id AND movies_directors.director_id = directors.id)
                    ${name ? "AND (movies.name LIKE'%" + name + "%')" : ''}
                    ${startYear ? "AND (movies.year >= " + startYear + ")" : ''}
                    ${endYear ? "AND (movies.year <= " + endYear + ")" : ''}
                    ${startRank ? "AND (movies.rank >= " + startRank + ")" : ''}
                    ${endRank ? "AND (movies.rank <= " + endRank + ")" : ''}
                    ${genre ? "AND (movies_genres.genre LIKE '%" + genre + "%')" : ''}
                    ${actor ? "AND (actors.name LIKE '%" + actor + "%')" : ''}
                    ${director ? "AND (directors.name LIKE '%" + director + "%')" : ''}
                  ORDER BY RAND()
                  LIMIT 20`;
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
