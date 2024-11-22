import type { Request, Response } from "express"
import Users from "../models/Users"

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
    const { id } = req.params
    try {
        const user = await Users.findByPk(id)

        if (!user) {
            const error = new Error("User not found")
            res.status(404).json({ error: error.message })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: "Error getting user by id"})
    }
}

export const updateUser = async(req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = await Users.findByPk(id)

        if (!user) {
            const error = new Error("User not found")
            res.status(404).json({ error: error.message })
        }
       // Update data
       await user.update(req.body)

        res.status(200).json('User updated successfully')
    } catch (error) {
        res.status(500).json({ error: "Error getting user by id"})
    }
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

export const deleteUser = async(req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = new Users(req.body)

        if(!user) {
            res.status(404).json({ error: "User not found"})
        }

        await user.destroy()
        res.status(200).json('User deleted')
    } catch (error) {
        res.status(500).json({ error: "Error creating user"})
    }
}