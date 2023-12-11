import cors from 'cors';
import express from 'express';
import router from './routes/routes.js';

const app = express();
const port = 3000;

// Database

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use(router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
