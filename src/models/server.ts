import express, { Application } from "express";
// import fileUpload from 'express-fileupload';
import dbConnection from "../db/config";
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
      await dbConnection();
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
    this.app.use(this.routePaths.roles, routerRole);
    this.app.use(this.routePaths.userRoles, routerUserRole);
    this.app.use(this.routePaths.users, routerUser);
    this.app.use(this.routePaths.clients, routerClient);
    this.app.use(this.routePaths.projects, routerProject);
    this.app.use(this.routePaths.jobPositions, routerJobPosition);
    this.app.use(this.routePaths.openings, routerOpening);
    this.app.use(this.routePaths.employees, routerEmployee);
    this.app.use(this.routePaths.employeeOpenings, routerEmployeeOpening);
    this.app.use(this.routePaths.candidates, routerCandidates);
    this.app.use(this.routePaths.persons, routerPersons);
    this.app.use(this.routePaths.allocations, routerAllocations);
    this.app.use(this.routePaths.interviews, routerInterviews);
    this.app.use(this.routePaths.pipelines, routerPipelines);
    this.app.use(this.routePaths.benches, routerBenches);
    this.app.use(this.routePaths.billings, routerBillings);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`This Server is running in port ${this.port}`);
    });
  }
}

export default Server;