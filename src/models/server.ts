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
    roles: "/api/roles",
    userRoles: "/api/userRoles",
    users: "/api/users",
    clients: "/api/clients",
    projects: "/api/projects",
    jobPositions: "/api/jobPositions",
    openings: "/api/openings",
    employees: "/api/employees",
    employeeOpenings: "/api/employeeOpenings",
    candidates: "/api/candidates",
    persons: "/api/persons",
    allocations: "/api/allocations",
    interviews: "/api/interviews",
    pipelines: "/api/pipelines",
    benches: "/api/benches",
    billings: "/api/billings"
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
    this.app.use(this.routePaths.roles, tutorRouter);
    this.app.use(this.routePaths.userRoles, clientRouter);
    this.app.use(this.routePaths.users, courseRouter);
    this.app.use(this.routePaths.clients, personRouter);
    this.app.use(this.routePaths.projects, paymentRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`This Server is running in port ${this.port}`);
    });
  }
}

export default Server;