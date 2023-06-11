const makeQuery = require('../utilities');

const getDirectorById = async (req, res) => {
  try {
    const { id } = req.query;
    const query = `SELECT * FROM directors WHERE id = ${id}`;
    const results = await makeQuery(query);
    res.send(results);
  } catch (err) {
    res.send(err.message);
  }
};

const getMostRatedDirectors = async (req, res) => {
  try {
    const query = `SELECT directors.name, directors.id, AVG(movies.rank) AS avg_rank
                  FROM directors, movies_directors, movies
                  WHERE (directors.id = movies_directors.director_id AND movies.id = movies_directors.movie_id)
                  GROUP BY directors.name, directors.id
                  ORDER BY avg_rank DESC
                  LIMIT 20`;
    const results = await makeQuery(query);
    res.send(results);
  } catch (err) {
    res.send(err.message);
  }
};

const getFavoriteGenres = async (req, res) => {
  try {
    const { director } = req.query;
    const query = `SELECT movies_genres.genre, COUNT(movies.id) AS count
                  FROM movies_genres, movies, movies_directors, directors
                  WHERE (movies_genres.movie_id AND movies.id = movies_genres.movie_id)
                    AND (movies.id = movies_directors.movie_id AND directors.id = movies_directors.director_id)
                    AND directors.id = ${director}
                  GROUP BY movies_genres.genre 
                  ORDER BY count DESC
                  LIMIT 3`;
    const results = await makeQuery(query);
    res.send(results);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
  getDirectorById,
  getMostRatedDirectors,
  getFavoriteGenres
};
