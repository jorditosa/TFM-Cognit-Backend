import type { Request, Response, NextFunction} from 'express'
import { param, validationResult } from 'express-validator'

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