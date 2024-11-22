import { Router } from 'express';
import { body } from 'express-validator'
import { getUsers, getUserById, registerUser, updateUser, deleteUser } from '../controllers/UsersController';
import { birthDayRegex } from '../constants/regex';
import { validateUserExists, validateUserId, validateUserInput } from '../middleware/user-validator';

const router = Router();

// Routing params
router.param('id', validateUserId)

// User i Register endpoints
router.get('/', getUsers);

router.get('/:id',
    validateUserExists,
    getUserById
);

router.post('/', 
    validateUserInput,
    registerUser
);

router.put('/:id', 
    validateUserExists,
    validateUserInput,    
    updateUser
);

router.delete('/:id', 
    validateUserExists,
    deleteUser
);


export default router;