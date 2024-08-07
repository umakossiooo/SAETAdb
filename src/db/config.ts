import { Sequelize } from 'sequelize-typescript';
import { Client } from '../models/client';
import { Course } from '../models/course';
import { Enrollment } from '../models/enrollment';
import { Transaction } from '../models/transaction';
import dotenv from 'dotenv';

dotenv.config();
  
const connection = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: 'postgres',
  models: [Client, Course, Enrollment, Transaction], // Ensure only the defined models are included
  logging: false, // Optional: Log SQL queries to console for debugging
});

async function connect() {
  try {
    await connection.authenticate(); // Authenticate connection before syncing
    await connection.sync({ alter: true }); // Alter tables if necessary
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default connect;
