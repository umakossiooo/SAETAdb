// ImportacionesClient
import { Router } from "express";
import { clientsController } from "../controllers";
// Controllers
const {getClient, getClients, postClient, updateClient, deleteClient} = clientsController;

// Router
const clientRouter:Router = Router();

clientRouter.get('/', getClients);

clientRouter.get('/:id', [], getClient);

clientRouter.post('/',[], postClient);

clientRouter.patch('/:id', [], updateClient);

clientRouter.delete('/:id', [], deleteClient);

export default clientRouter;
