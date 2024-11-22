import { Router } from 'express';
import { body, param } from 'express-validator'
import { getUsers, getUserById, registerUser, updateUser, deleteUser } from '../controllers/UsersController';
import { birthDayRegex } from '../constants/regex';
import { validateUserId } from '../middleware/user';

const router = Router();

// User i Register endpoints
router.get('/', getUsers);

router.get('/:id',
    validateUserId,
    getUserById
);

router.post('/', 
    body('username')
        .notEmpty().withMessage('Username is required'),
    body('password')
        .notEmpty().isLength({ min: 8 }).withMessage('Password is required'),
    body('birthDate')
        .notEmpty().matches(birthDayRegex).withMessage('Birth date is required'),
    registerUser
);

router.put('/:id', 
    validateUserId,
    body('username')
        .notEmpty().withMessage('Username is required'),
    body('password')
        .notEmpty().isLength({ min: 8 }).withMessage('Password is required'),
    body('birthDate')
        .notEmpty().matches(birthDayRegex).withMessage('Birth date is required'),
    body('points')
        .isInt().withMessage('Points must be an integer'),
    updateUser
);

router.delete('/:id', 
    validateUserId,
    deleteUser
);


export default router;