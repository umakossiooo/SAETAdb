import { Router } from 'express';
import { EnrollmentController } from '../controllers/enrollment';

const enrollmentRouter = Router();

// Define routes for Enrollment operations
enrollmentRouter.post('/', EnrollmentController.create);
enrollmentRouter.get('/', EnrollmentController.getAll);
enrollmentRouter.get('/course/:courseId', EnrollmentController.getByCourseId);
enrollmentRouter.put('/:id', EnrollmentController.update);
enrollmentRouter.delete('/:id', EnrollmentController.delete);

export { enrollmentRouter };
