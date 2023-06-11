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

module.exports = {
  getDirectorById,
  getMostRatedDirectors
};
