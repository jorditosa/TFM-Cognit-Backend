import cors from 'cors';
import express from 'express';
import usersRouter from './routes/usersRouter';
import { db } from './config/db';
import colors from 'colors'
import { limiter } from './config/limiter';
import morgan from 'morgan'

// Database
async function connectDB() {
  try {
    await db.authenticate()
    db.sync({ alter: true })
    console.log( colors.blue("Database connection was susccessfull"))
  } catch (error) {
    console.log( colors.red("Database connection failed"))
  }
}
connectDB()

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Limiting request
app.use(limiter)

// Routes
app.use('/api/auth', usersRouter)

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
})
