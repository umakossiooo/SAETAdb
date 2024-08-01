// ImportacionesClient
import { Router } from "express";
import {clientsController} from "../controllers/client";
// Controllers
const {getClient, getClients, postClient, updateClient, deleteClient} = clientsController;

// Router
const router:Router = Router();

router.get('/', getClients);

router.get('/:id', [], getClient);

router.post('/',[], postClient);

router.patch('/:clientId', [], updateClient);

router.delete('/:clientId', [], deleteClient);

export default router;
