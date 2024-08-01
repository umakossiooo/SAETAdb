import { Request, Response } from "express";
import { Tutor, TutorCreationAttributes } from "../models/tutor";
import { Course } from "../models/course";

// Getting clients
export const getTutors = async(req: Request, res: Response) => {
    const { from = 0, to = 5 } = req.query;

    // DB
    await Tutor.findAll({ offset: Number(from), limit: Number(to), include: [{model: Course, as: "course"}]}).then(
        Tutor => {
            res.json({
                status: "success",
                message: "Tutors found",
                data: Tutor,
            });
        }   
    ).catch( e =>{
        res.json({
            status: "error",
            message: "Tutor not found",
            error: e
        });
    
    });
}

// Getting a client
export const getTutor = async(req: Request, res: Response) => {
    const { id } = req.params;

    // DB
    await Tutor.findByPk(id, {include: [{model: Course, as: "course"}]}).then(
        Tutor => {
            res.json({
                status: "success",
                message: "Tutor found",
                data: Tutor,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Tutor not found",
                error: e
            });
        }
    );
    
}

// Creating a client
export const postTutor = async(req: Request, res: Response) => {
    const { personId, degree, course, activeDB }:TutorCreationAttributes = req.body;
    
    // if person not found return error because the relationship is required
    const tutor = await Tutor.findByPk(personId);
    if (!tutor) {
        res.json({
            status: "error",
            message: "Tutor not found",
        });
        return;
    }
    
    await Tutor.create({ personId, degree, course, activeDB}, {include: [{model: Course, as: "course"}]}).then(
        async(tutor) => {
            const clientWithAssociations = await Tutor.findByPk(personId, {include: [{model: Course, as: "course"}]});
            res.json({
                status: "success",
                message: "Tutor created",
                data: tutor,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Tutor not created",
                error: e
            });
        }
    );
}



// Updating a client
export const updateTutor = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    // // dont updateperson_id
    // delete restoperson_id;

    await Tutor.update(resto, { where: { id } }).then(
        async () => {
            const updatedTutor = await Tutor.findByPk(id, {include: [{model: Course, as: "course"}]});
            res.json({
                status: "success",
                message: "Tutor updated",
                data: updatedTutor,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Tutor not updated",
                error: e
            });
        }
    );
}


//Delete a client(soft delete)
export const deleteTutor = async(req: Request, res: Response) => {
    const { id } = req.params;

    await Tutor.update({activeDB:false},{ where: { id } }).then(
        () => {
            res.json({
                status: "success",
                message: "Tutor deleted",
                data: {
                    id
                },
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Tutor not deleted",
                error: e
            });
        }
    );
}