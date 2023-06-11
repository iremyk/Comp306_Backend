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
                  AND actors.name LIKE '%${actor2}%';`;
    const results = await makeQuery(query);
    res.send(results);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
  getActorById,
  getCommonMovies
};
