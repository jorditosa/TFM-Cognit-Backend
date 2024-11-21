import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
dotenv.config()

export const db = new Sequelize( process.env.DATABASE_URL, {
    models: [__dirname + '/../models/**/*'],
})

export default db