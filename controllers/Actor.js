const makeQuery = require('../utilities');

const getActorById = async (req, res) => {
  try {
    const { id } = req.query;
    const query = `SELECT * FROM actors WHERE id = ${id}`;
    const results = await makeQuery(query);
    res.send(results);
  } catch (err) {
    res.send(err.message);
  }
};

const getCommonMovies = async (req, res) => {
  try {
    const { actor1, actor2 } = req.query;
    const query = `SELECT DISTINCT movies.name
                  FROM movies, actors, roles 
                  WHERE (movies.id = roles.movie_id AND roles.actor_id = actors.id)
                    AND actors.name LIKE '%${actor1}%'
                  INTERSECT
                  SELECT DISTINCT movies.name
                  FROM movies, actors, roles 
                  WHERE (movies.id = roles.movie_id AND roles.actor_id = actors.id)
                  AND actors.name LIKE '%${actor2}%'`;
    const results = await makeQuery(query);
    res.send(results);
  } catch (err) {
    res.send(err.message);
  }
};

const getMostRatedRoles = async (req, res) => {
  try {
    const { actor } = req.query;
    const query = `SELECT actors.name, actors.id, roles.role, movies.name, movies.year, movies.rank, AVG(movies.rank) AS avg_rank
                  FROM actors, roles, movies
                  WHERE (actors.id = roles.actor_id AND movies.id = roles.movie_id) AND actors.id = ${actor}
                  GROUP BY actors.name, actors.id, roles.role, movies.name, movies.year, movies.rank
                  ORDER BY avg_rank DESC
                  LIMIT 20`;
    const results = await makeQuery(query);
    res.send(results);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
  getActorById,
  getCommonMovies,
  getMostRatedRoles
};
