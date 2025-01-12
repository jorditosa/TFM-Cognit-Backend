import type { NextFunction, Request, Response } from "express"
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateToken } from "../utils/genToken"
import { AuthEmail } from "../emails/AuthEmail"

export class AuthController {
    static getAllUsers = async (req: Request,res: Response) => {
        
        try {
            const users = await User.findAll()
            if (!users) {
                const error = new Error("Users not foun")
                res.status(404).json({ error: error.message })
                return
            }

            res.json(users);
        } catch (error) {
            console.log(error)
        }
    }

    static getUserByToken = async (req: Request,res: Response, next: NextFunction) => {
        const { token } = req.body
        console.log(token)
        
        try {
            const user = await User.findOne({ where: { token }})
            if (!user) {
                const error = new Error("Token not valid")
                res.status(401).json({ error: error.message })
                return
            }

            const tokenCode = user.token;

            res.json({ message: "Token confirmed", token: tokenCode });
        } catch (error) {
            next(error)
        }
    }

    static createAccount = async (req: Request,res: Response) => {
        const {email, password } = req.body

        const userExists = await User.findOne({ where: {email}})
        if(userExists) {
            // User already created
            const error = new Error("There is a problem creating user")
            res.status(409).json({error: error.message})
            return
        }

        try {
            const user = new User(req.body)
            user.password = await hashPassword(password)
            user.token = generateToken()

            await user.save()

            await AuthEmail.sendConfirmationEmail({
                 username: user.username,
                 email: user.email,
                 token: user.token,
            })
            res.status(201).json("User created successfully")
        } catch (error) {
            res.status(500).json({error: "Error creating user"})
        }
    }

    static confirmAccount = async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.body

        try {
            const user = await User.findOne({ where: { token }})
            if (!user) {
                const error = new Error("Token not valid")
                res.status(401).json({ error: error.message })
                return
            }
            
            user.confirmed = true
            await user.save()

            // Establecer cookie
            const userData = { id: user.id, email: user.email, points: user.points}; 
            // Devolver confirmacion
            res.json({ message: "Account confirmed", user: userData });
        } catch (error) {
            next(error)
        }
    }

    static login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body

        try {
            const user = await User.findOne({ where: {email}})
            if(!user) {
                // Usuer exists
                const error = new Error("User not found")
                res.status(404).json({error: error.message})
                return
            }
            if(!user.confirmed) {
                const error = new Error("Account not confirmed")
                res.status(403).json({error: error.message})
                return
            }
    
            const isPasswordCorrect = await checkPassword(password, user.password)
            if (!isPasswordCorrect) {
                const error = new Error("Invalid credentials")
                res.status(401).json({error: error.message})
                return
            }

            const userData = { id: user.id, email: user.email, points: user.points}; 
            res.json({ message: "User authenticated", user: userData });
        } catch (error) {
            res.status(500).json({ error: "User not authenticated" });
        }
    }

    static forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body

        const user = await User.findOne({ where: {email}})
        if(!user) {
            // Usuer exists
            const error = new Error("User not found")
            res.status(404).json({error: error.message})
            return
        }
        user.token = generateToken()
        user.save()

        await AuthEmail.sendPasswordResetToken({
            username: user.username,
            email: user.email,
            token: user.token
        })

        res.json("Check your email for instructions")
    }

    static validatetoken = async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.body

        const tokenExists = await User.findOne({ where: {token}})
        if(!tokenExists) {
            const error = new Error("Token not valid")
            res.status(404).json({ error: error.message})
            return
        }

       res.json('Token valid, assign new password')
    }

    static resetPasswordWithToken = async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.params
        const { password } = req.body

        const user = await User.findOne({ where: {token}})
        if(!user) {
            const error = new Error("Token not valid")
            res.status(404).json({ error: error.message})
            return
        }

        // Assign new password
        user.password = await hashPassword(password)
        user.token = null
        await user.save()

        res.json("Password reset successfull")
    }
    
    static getUserAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
        res.json(req.user)
    }

    static checkPassword = async (req: Request, res: Response, next: NextFunction) => {
        const { password } = req.body
        const { id } = req.user

        const user = await User.findByPk(id)

        const isPasswordCorrect = await checkPassword(password, user.password)
        if(!isPasswordCorrect) {
            const error = new Error("Current password not valid")
            res.status(401).json({ error: error.message})
            return
        }

        res.json("Correct Password")
    }

    static updatePlayerPoints = async (req: Request, res: Response, next: NextFunction) => {
        const {email, points } = req.body

        const user = await User.findOne({ where: {email}})

        if(!user) {
            const error = new Error("User not valid")
            res.status(404).json({ error: error.message})
            return
        }

        // Assign new points
        user.points = points
        await user.save()

        res.json("Correct points update")
    }
}