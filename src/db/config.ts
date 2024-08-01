import { Sequelize } from "sequelize-typescript";
import { Client } from "../models/client";
import { Course } from "../models/course";
import { Payment } from "../models/payment";
import { Person } from "../models/person";
import { Tutor } from "../models/tutor";
import dotenv from "dotenv";
dotenv.config();

const connection = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: "postgres",
  models: [Course, Client, Payment, Person, Tutor],
  storage: ":memory:",
});

async function connect() {
  try {
    await connection.sync({ alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default connect;