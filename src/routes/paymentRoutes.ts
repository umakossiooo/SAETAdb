// ImportacionesPayment
import { Router } from "express";
import { paymentController } from "../controllers";// Controllers
const {getPayment, getPayments, postPayment, updatePayment, deletePayment} = paymentController;

// Router
const paymentRouter:Router = Router();

paymentRouter.get('/', getPayments);

paymentRouter.get('/:id', [], getPayment);

paymentRouter.post('/',[], postPayment);

paymentRouter.patch('/:id', [], updatePayment);

paymentRouter.delete('/:id', [], deletePayment);

export default paymentRouter;