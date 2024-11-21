import cors from 'cors';
import express from 'express';
import usersRouter from './routes/usersRouter';
import { db } from './config/db';
import colors from 'colors'

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

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', usersRouter)

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
})
