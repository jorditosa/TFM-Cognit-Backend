import type { Request, Response } from "express"
import Games from "../models/Games"

export class GamesController {
    static getAllGames = async (req: Request,res: Response) => {

        try {
            const games = await Games.findAll()
            
            if (!games) {
                const error = new Error("Games not found")
                res.status(404).json({ error: error.message })
                return
            }

            res.status(200).json(games)
        } catch (error) {
            
        }
    } 
}