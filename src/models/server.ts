import express, { Application } from "express";
import connect from "../db/config";

import {
  clientRouter,
  courseRouter,
  enrollmentRouter,  // Added for Enrollment routes
  transactionRouter  // Added for Transaction routes
} from "../routes";
import cors from 'cors';

class Server {
  private app: Application;
  private port: string;
  // path for routes
  private routePaths = {
    clients: "/api/clients",
    courses: "/api/courses",
    enrollments: "/api/enrollment",
    transactions: "/api/transactions"
  };


  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';

    // DB
    this.databaseConnect();

    // middlewares
    this.middlewares();
    // routes
    this.routes();
  }

  private async databaseConnect() {
    try {
      await connect();
      console.log("DB connected");
    } catch (error) {
      console.log("Error connecting to DB", error);
    }
  }

  private middlewares() {
    // // CORS
    this.app.use(cors());

    // Parsing body
    this.app.use(express.json());

    // this.app.use(fileUpload({
    //     useTempFiles : true,
    //     tempFileDir : '/tmp/',
    //     createParentPath: true
    // }));
  }

  routes() {
    //TODO: upload
    this.app.use(this.routePaths.clients, clientRouter);
    this.app.use(this.routePaths.courses, courseRouter);
    this.app.use(this.routePaths.enrollments, enrollmentRouter);
    this.app.use(this.routePaths.transactions, transactionRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`This Server is running in port ${this.port}`);
    });
  }
}

export default Server;