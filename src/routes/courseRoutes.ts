import { Router, Request, Response } from 'express'; 
const courseRouter:Router = Router(); 

courseRouter.get('/', (req:Request, res:Response) => { 
res.send('Get a list of courses') 
}); 

courseRouter.get('/:id', (req:Request, res:Response) => { 
res.send(`Get the course ${req.params.id}`) 
}); 

courseRouter.post('/', (req:Request, res:Response) => { 
res.send(`Create a new course with ID: ${req.body.id}`) 
}); 

courseRouter.patch('/:id', (req:Request, res:Response) => { 
res.send(`Update the course ${req.params.id} with the values of ${req.body.name}, ${req.body.price} and ${req.body.stock}`) 
}); 

courseRouter.delete('/', (req:Request, res:Response) => { 
res.send(`Deleting the course ${req.body.id}`) 
}); 

export default courseRouter;
