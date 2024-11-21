import type { Request, Response } from "express"
import Users from "../models/Users"

export const getUsers = async(req: Request, res: Response) => {
    res.json()
}

export const getUserById = async(req: Request, res: Response) => {
    res.json()
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