import { Router } from "express";
import { GamesController } from "../controllers/GamesController";
import { limiter } from "../config/limiter";

const router = Router()

router.get('/', GamesController.getAllGames)


export default router