import { Router, Request, Response } from 'express'; 

import clientRouter from './clientRoutes'; 
import courseRouter from './courseRoutes';
import personRouter from './personRoutes';
import tutorRouter from './tutorRoutes';
import paymentRouter from './paymentRoutes';

const apiRouter:Router = Router(); 

apiRouter.use('/product', clientRouter); 

apiRouter.get('/', (req:Request, res: Response) => { 
res.send('Hello World!') 
}) 

export default apiRouter;
