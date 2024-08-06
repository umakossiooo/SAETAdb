import { Router } from 'express';
import { CourseController } from '../controllers/course';

const courseRouter = Router();

// Define routes for Course operations
courseRouter.post('/', CourseController.create);
courseRouter.get('/', CourseController.getAll);
courseRouter.get('/:id', CourseController.getById);
courseRouter.put('/:id', CourseController.update);
courseRouter.delete('/:id', CourseController.delete);

export { courseRouter };

