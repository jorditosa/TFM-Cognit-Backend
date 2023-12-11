import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config({ path: '.env' });

const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: "cognit_personalif",
  max: 20,
  connectionTimeoutMillis: 5000,
});

export default pool;