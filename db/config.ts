import { Sequelize } from "sequelize-typescript";
import { Client } from "../src/models/client";
import { Course } from "../src/models/course";
import { Enrollment } from "../src/models/enrollment";
import { Transaction } from "../src/models/transaction";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: "postgres",
  models: [Client, Course, Enrollment, Transaction], // Include all models
});

async function connect() {
  try {
    // Sync the models with the database
    await sequelize.sync({ alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default connect;
