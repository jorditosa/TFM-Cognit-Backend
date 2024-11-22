import type { Request, Response, NextFunction } from 'express'
import { param, validationResult, body } from 'express-validator'
import Users from '../models/Users'
import { birthDayRegex, emailRegex } from '../constants/regex'

export const validateUserId = async (req: Request, res: Response, next: NextFunction) => {
    await param('id')
        .isInt()
        .custom(value => value > 0)
        .withMessage('Id must be an integer')
        .run(req)

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    next()
}

export const validateUserExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const user = await Users.findByPk(id)

        if (!user) {
            const error = new Error("User not found")
            res.status(404).json({ error: error.message })
            return;
        }

        req.user = user

        next()
    } catch (error) {
        res.status(500).json({ error: "Error getting user by id" })
    }
}

export const validateUserInput = async (req: Request, res: Response, next: NextFunction) => {
    await body('username')
        .notEmpty().withMessage('Username is required').run(req)
    await body('password')
            .notEmpty().isLength({ min: 8 }).withMessage('Password is not valid').run(req)
    await body('email')
            .notEmpty().matches(emailRegex).withMessage('Email is not valid').run(req)
    await body('points')
    .isInt().withMessage('Points must be an integer').run(req)

    next()
}