import pool from '../db.js';

const getGames = async (req, res) => {
  const searchTerm = req.query.search;
  try {
    let query = 'SELECT * FROM cognit.games'
    if (searchTerm) {
      query += ` WHERE game_category_id = ${searchTerm};`
    }
    // Pool query
    const result = await pool.query(query);

    // Estado respuesta
    res.status(200).json(result.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
}

export {
  getGames
};
