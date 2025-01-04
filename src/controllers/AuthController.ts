import type { NextFunction, Request, Response } from "express"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateToken } from "../utils/genToken"
import { AuthEmail } from "../emails/AuthEmail"
import { generateJWT } from "../utils/jwt"
import User from "../models/Users"

export class AuthController {
    static getAllUsers = async (req: Request,res: Response) => {
        console.log('GET Users')
    }

    static createAccount = async (req: Request,res: Response) => {
        const {email, password } = req.body

        const userExists = await User.findOne({ where: {email}})
        if(userExists) {
            // Usuer already created
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
            res.json("User created successfully")
        } catch (error) {
            res.status(500).json({error: "Error creating user"})
        }
    }

    static confirmAccount = async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.body

        const user = await User.findOne({ where: { token }})
        if (!user) {
            const error = new Error("Token not valid")
            res.status(401).json({ error: error.message })
            return
        }

        user.confirmed = true
        user.token = null
        await user.save()

        res.json("Account confirmed")
    }

    static login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body

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

        const token = generateJWT(user.id)
        res.json(token)
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

    static updateCurrentUserPassword = async (req: Request, res: Response, next: NextFunction) => {
        const { current_password, password } = req.body
        const { id } = req.user

        const user = await User.findByPk(id)

        const isPasswordCorrect = await checkPassword(current_password, user.password)
        if(!isPasswordCorrect) {
            const error = new Error("Current password not valid")
            res.status(401).json({ error: error.message})
            return
        }

        user.password = await hashPassword(password)
        await user.save()

        res.json(user)
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
}