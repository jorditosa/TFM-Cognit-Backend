import { Router } from 'express';
import { getGames } from '../controllers/games.controller.js';
import { createUser, getUser, getUsers, updateUser } from '../controllers/users.controller.js';

const router = Router();

// User i Register endpoints
router.get('/users', getUsers);

router.get('/users/:token', getUser);

router.post('/users', createUser);

router.put('/users/:token', updateUser);

// Jocs i accions endpoints
router.get('/games/', getGames);

export default router;