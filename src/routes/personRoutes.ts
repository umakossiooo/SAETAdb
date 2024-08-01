// ImportacionesPerson
import { Router } from "express";
import { personController } from "../controllers";// Controllers
const {getPerson, getPersons, postPerson, updatePerson, deletePerson} = personController;

// Router
const personRouter:Router = Router();

personRouter.get('/', getPersons);

personRouter.get('/:id', [], getPerson);

personRouter.post('/',[], postPerson);

personRouter.patch('/:id', [], updatePerson);

personRouter.delete('/:id', [], deletePerson);

export default personRouter;