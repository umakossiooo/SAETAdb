import { Router, Request, Response } from 'express'; 
const paymentRouter:Router = Router(); 

paymentRouter.get('/', (req:Request, res:Response) => { 
res.send('Get a list of payments') 
}); 

paymentRouter.get('/:id', (req:Request, res:Response) => { 
res.send(`Get the payment ${req.params.id}`) 
}); 

paymentRouter.post('/', (req:Request, res:Response) => { 
res.send(`Create a new payment with ID: ${req.body.id}`) 
}); 

paymentRouter.patch('/:id', (req:Request, res:Response) => { 
res.send(`Update the payment ${req.params.id} with the values of ${req.body.name}, ${req.body.price} and ${req.body.stock}`) 
}); 

paymentRouter.delete('/', (req:Request, res:Response) => { 
res.send(`Deleting the payment ${req.body.id}`) 
}); 

export default paymentRouter;
