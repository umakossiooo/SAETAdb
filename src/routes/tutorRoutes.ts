// ImportacionesTutor
import { Router } from "express";
import { tutorController } from "../controllers";// Controllers
const {getTutor, getTutors, postTutor, updateTutor, deleteTutor} = tutorController;

// Router
const tutorRouter:Router = Router();

tutorRouter.get('/', getTutors);

tutorRouter.get('/:id', [], getTutor);

tutorRouter.post('/',[], postTutor);

tutorRouter.patch('/:id', [], updateTutor);

tutorRouter.delete('/:id', [], deleteTutor);

export default tutorRouter;