import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from "./config/db"
import usersRouter from './routes/authRouter'
import gamesRouter from './routes/gamesRouter'
import helmet from "helmet";
import cors from 'cors'

async function connectDB() {
    try {
        await db.authenticate()
        db.sync(
            { alter: true }
        )
        console.log(colors.blue.bold('Database connection successfull'))
    } catch (error) {
        console.log(colors.red('Database connection failed'))
    }
}
connectDB()

const app = express()

// Basic configs
app.use(helmet());
app.use(cors({
    origin: ['https://cognit.website', 'http://localhost:5175'],
    credentials: true,
}));
app.use(morgan('dev'))

app.use(express.json())

// routing
app.use('/api/auth', usersRouter)
app.use('/api/games', gamesRouter)

export default app