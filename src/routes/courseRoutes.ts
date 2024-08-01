// ImportacionesCourse
import { Router } from "express";
import { courseController } from "../controllers";// Controllers
const {getCourse, getCourses, postCourse, updateCourse, deleteCourse} = courseController;

// Router
const courseRouter:Router = Router();

courseRouter.get('/', getCourses);

courseRouter.get('/:id', [], getCourse);

courseRouter.post('/',[], postCourse);

courseRouter.patch('/:id', [], updateCourse);

courseRouter.delete('/:id', [], deleteCourse);

export default courseRouter;
