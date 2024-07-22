import { Router, Request, Response } from 'express'; 
const clientRouter:Router = Router(); 

clientRouter.get('/', (req:Request, res:Response) => { 
res.send('Get a list of clients') 
}); 

clientRouter.get('/:id', (req:Request, res:Response) => { 
res.send(`Get the client ${req.params.id}`) 
}); 

clientRouter.post('/', (req:Request, res:Response) => { 
res.send(`Create a new client with ID: ${req.body.id}`) 
}); 

clientRouter.patch('/:id', (req:Request, res:Response) => { 
res.send(`Update the client ${req.params.id} with the values of ${req.body.name}, ${req.body.price} and ${req.body.stock}`) 
}); 

clientRouter.delete('/', (req:Request, res:Response) => { 
res.send(`Deleting the client ${req.body.id}`) 
}); 

export default clientRouter;
