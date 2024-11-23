import { Router } from 'express';
import { body } from 'express-validator'
import { getUsers, getUserById, registerUser, updateUser, deleteUser, confirmAccount, login } from '../controllers/UsersController';
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

// Authentication Routes

router.post('/confirm-account',
    body('token')
    .notEmpty().isLength({min: 6, max: 6}).withMessage('token not valid'),
    confirmAccount
)


router.post('/login',
    body('username')
    .notEmpty().withMessage('Username not valid'),
    body('password')
    .notEmpty().withMessage('Username not valid'),
    login
)



export default router;