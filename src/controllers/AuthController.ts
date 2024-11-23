import type { Request, Response } from "express"
import Users from "../models/Users"
import jwt from 'jsonwebtoken'
import { hashPassword } from "../utils/auth"
import { generateToken } from "../utils/token"
import { AuthEmail } from "../emails/AuthEmail"
import { generateJWT } from "../utils/jwt"

declare global {
    namespace Express {
        interface Request {
            user?: Users
        }
    }
}

export const getUserById = async(req: Request, res: Response) => {
    const bearer = req.headers.authorization

    if(!bearer) {
        const error = new Error('Unauthorized')
        res.status(401).json({error: error.message})
    }

    const [text, token] = bearer
    res.json({
        text,
        token
    })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (typeof decoded === 'object' && decoded.id) {
            const user = await Users.findByPk(decoded.id, {
                attributes: ['id', 'username', 'email']
            })
            res.json(user)
        }
    } catch (error) {
        res.status(500).json({error: 'Token not valid'})
    }
}

