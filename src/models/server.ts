import express, { Application } from "express";
// import fileUpload from 'express-fileupload';
import connect from "../../db/config";

import {
    clientRouter,
    courseRouter,
    personRouter,
    tutorRouter,
    paymentRouter
} from "../routes";
import cors from 'cors';

class Server {
  private app: Application;
  private port: string | undefined;
  // path for routes
  private routePaths = {
    clients: "/api/clients",
    courses: "/api/courses",
    payments: "/api/payments",
    persons: "/api/persons",
    tutors: "/api/tutors"
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // DB
    this.databaseConnect();

    // middlewares
    this.middlewares();
    // routes
    this.routes();
  }

  async databaseConnect() {
    try {
      await connect();
      console.log("DB connected");
    } catch (error) {
      console.log(error);
    }
  }

  middlewares() {
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
    this.app.use(this.routePaths.payments, paymentRouter);
    this.app.use(this.routePaths.persons, personRouter);
    this.app.use(this.routePaths.tutors, tutorRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`This Server is running in port ${this.port}`);
    });
  }
}

export default Server;