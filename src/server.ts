import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from "./config/db"
import usersRouter from './routes/authRouter'
import helmet from "helmet";
import cors from 'cors'

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log( colors.blue.bold('Database connection successfull'))
    } catch (error) {
        console.log( colors.red('Database connection failed'))
    }
}
connectDB()

const app = express()
app.use(helmet());
app.use(cors())

app.use(morgan('dev'))

app.use(express.json())

// routing
app.use('/api/auth', usersRouter)

export default app