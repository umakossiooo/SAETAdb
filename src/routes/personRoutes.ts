import { Router, Request, Response } from 'express'; 
const personRouter:Router = Router(); 

personRouter.get('/', (req:Request, res:Response) => { 
res.send('Get a list of persons') 
}); 

personRouter.get('/:id', (req:Request, res:Response) => { 
res.send(`Get the person ${req.params.id}`) 
}); 

personRouter.post('/', (req:Request, res:Response) => { 
res.send(`Create a new person with ID: ${req.body.id}`) 
}); 

personRouter.patch('/:id', (req:Request, res:Response) => { 
res.send(`Update the person ${req.params.id} with the values of ${req.body.name}, ${req.body.price} and ${req.body.stock}`) 
}); 

personRouter.delete('/', (req:Request, res:Response) => { 
res.send(`Deleting the person ${req.body.id}`) 
}); 

export default personRouter;
