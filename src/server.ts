import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from "./config/db"
import usersRouter from './routes/authRouter'
import gamesRouter from './routes/gamesRouter'
import helmet from "helmet";
import cors from 'cors'
import session from 'express-session'

async function connectDB() {
    try {
        await db.authenticate()
        db.sync(
            {alter: true}
        )
        console.log( colors.blue.bold('Database connection successfull'))
    } catch (error) {
        console.log( colors.red('Database connection failed'))
    }
}
connectDB()

const app = express()
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:5173', 'https://cognit.website'],
    credentials: true,
}));
app.use(morgan('dev'))

app.use(express.json())

// session cookies
app.use(
    session({
        secret: 'cognit',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 180
        }
    })
)

// routing
app.use('/api/auth', usersRouter)
app.use('/api/games', gamesRouter)

export default app