import { Router } from 'express';
import { TransactionController } from '../controllers/transaction';

const transactionRouter = Router();

// Define routes for Transaction operations
transactionRouter.post('/', TransactionController.create);
transactionRouter.get('/', TransactionController.getAll);
transactionRouter.get('/:id', TransactionController.getById);
transactionRouter.put('/:id', TransactionController.update);
transactionRouter.delete('/:id', TransactionController.delete);

export { transactionRouter };
