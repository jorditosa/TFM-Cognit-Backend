import type { Request, Response } from "express"
import Users from "../models/Users"

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
    
    try {
        const user = new Users(req.body)

        await user.save()
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