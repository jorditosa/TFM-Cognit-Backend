import { Router } from 'express';
import { getUsers, getUserById, registerUser } from '../controllers/UsersController';

const router = Router();

// User i Register endpoints
router.get('/', getUsers);
router.get('/:id', getUserById);

router.post('/', registerUser);




export default router;