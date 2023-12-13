import { v4 as uuidv4 } from 'uuid';
import pool from '../db.js';
import { checkSkill } from '../helpers/checkSkill.js';

const getUser = async (req, res) => {
  const { token } = req.params;

  try {
    // Pool query
    const result = await pool.query('SELECT * FROM cognit.users WHERE user_code_validation = $1', [token]);
    console.log(result);

    // Estado respuesta
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
}

const getUsers = async (req, res) => {
  try {
    // Pool query
    const result = await pool.query('SELECT * FROM cognit.users');

    // Estado respuesta
    res.status(200).json(result.rows);

  } catch (error) {
    res.json({ error: error.message });
  }
}

const createUser = async (req, res) => {
  const {
    user_code_validation,
    user_email,
    user_points,
    skill_know_points,
    skill_sust_points,
    skill_prot_points,
    skill_expl_points
  } = req.body;

  // Create new token and assign to user_status
  const user_status = uuidv4();

  try {
    // Pool query
    const result = await pool.query('INSERT INTO cognit.users (user_status, user_code_validation, user_email, user_points, skill_know_points, skill_sust_points, skill_prot_points, skill_expl_points) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [user_status, user_code_validation, user_email, user_points, skill_know_points, skill_sust_points, skill_prot_points, skill_expl_points]);

    // Estado respuesta
    res.status(201).json(result.rows[0]);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateUser = async (req, res) => {
  const { points, skill, skill_points, user } = req.body;
  console.log(points, skill, skill_points, user);

  try {
    // Get user
    const userInfo = await pool.query('SELECT * FROM cognit.users WHERE user_id = $1', [user]);
    console.log(userInfo);

    // Update User Points
    const newPoints = parseInt(userInfo.rows[0].user_points) + parseInt(points);

    // Update user skill points
    const skillKnow = parseInt(userInfo.rows[0].skill_know_points) + checkSkill(skill, skill_points);
    const skillProt = parseInt(userInfo.rows[0].skill_prot_points) + checkSkill(skill, skill_points);
    const skillSust = parseInt(userInfo.rows[0].skill_sust_points) + checkSkill(skill, skill_points);
    const skillExpl = parseInt(userInfo.rows[0].skill_expl_points) + checkSkill(skill, skill_points);

    // Pool query
    const result = await pool.query('UPDATE cognit.users SET user_points = $1, skill_know_points = $2, skill_sust_points = $3, skill_prot_points = $4, skill_expl_points = $5 WHERE user_id = $6 RETURNING *',
      [newPoints, skillKnow, skillProt, skillSust, skillExpl, user]);

    // Estado respuesta
    res.status(200).json(result.rows[0]);

  } catch (error) {
    res.json({ error: error.message });
  }
}

export {
  createUser, getUser, getUsers, updateUser
};
