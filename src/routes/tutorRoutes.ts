import { Router, Request, Response } from 'express'; 
const tutorRouter:Router = Router(); 

tutorRouter.get('/', (req:Request, res:Response) => { 
res.send('Get a list of tutors') 
}); 

tutorRouter.get('/:id', (req:Request, res:Response) => { 
res.send(`Get the tutor ${req.params.id}`) 
}); 

tutorRouter.post('/', (req:Request, res:Response) => { 
res.send(`Create a new tutor with ID: ${req.body.id}`) 
}); 

tutorRouter.patch('/:id', (req:Request, res:Response) => { 
res.send(`Update the tutor ${req.params.id} with the values of ${req.body.name}, ${req.body.price} and ${req.body.stock}`) 
}); 

tutorRouter.delete('/', (req:Request, res:Response) => { 
res.send(`Deleting the tutor ${req.body.id}`) 
}); 

export default tutorRouter;
