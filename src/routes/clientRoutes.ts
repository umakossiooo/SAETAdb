import { Router } from 'express';
import { ClientController } from '../controllers/client';

const clientRouter = Router();

// Define routes for Client operations
clientRouter.post('/', ClientController.create);
clientRouter.get('/', ClientController.getAll);
clientRouter.get('/:id', ClientController.getById);
clientRouter.put('/:id', ClientController.update);
clientRouter.delete('/:id', ClientController.delete);

export { clientRouter };
