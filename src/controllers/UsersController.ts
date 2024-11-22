import type { Request, Response } from "express"
import Users from "../models/Users"
import { hashPassword } from "../utils/auth"
import { generateToken } from "../utils/token"
import { AuthEmail } from "../emails/AuthEmail"

declare global {
    namespace Express {
        interface Request {
            user?: Users
        }
    }
}

export const getUsers = async(req: Request, res: Response) => {
    try {
        const users = await Users.findAll({
            order: [
                ['id', 'DESC']
            ],
            // TODO: add pagination
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: "Error getting users"})
    }
}

export const getUserById = async(req: Request, res: Response) => {
    res.json(req.user)
}
export const registerUser = async(req: Request, res: Response) => {
    const { username, password, email, points } = req.body

    try {
        const user = new Users(req.body)
        user.password = await hashPassword(password)
        user.token = generateToken()

        await user.save()

        // Sending email
        AuthEmail.sendConfirmationEmail({ 
            username, 
            email, 
            token: user.token 
        })

        res.status(201).json('User created')
    } catch (error) {
        res.status(500).json({ error: "Error creating user"})
    }
}

export const updateUser = async(req: Request, res: Response) => {
    await req.user.update(req.body)
    res.status(200).json('User updated successfully')
}


export const deleteUser = async(req: Request, res: Response) => {
    await req.user.destroy()
    res.status(200).json('User deleted')
}

export const confirmAccount = async (req:Request, res: Response) => {
    const { token } = req.body

    const user = await Users.findOne({
        where: { token: token }
    })

    if (!user) {
        const error = new Error('Token not valid')
        res.status(401).json({error: error.message})
        return
    }

    user.confirmed = true
    user.token = null
    await user.save()

    res.json('Account confirmed')
}