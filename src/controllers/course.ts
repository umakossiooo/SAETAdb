import { Request, Response } from "express";
import { Client } from "../models/client";
import { CourseCreationAttributes } from "../models/course";
import { Course } from "../models/course";
import { Tutor } from "../models/tutor";

// Getting clients
export const getCourses = async(req: Request, res: Response) => {
    const { from = 0, to = 5 } = req.query;

    // DB
    await Course.findAll({ offset: Number(from), limit: Number(to), include: [{model: Client, as: "clients"}, {model: Tutor, as:"tutors"}]}).then(
        clients => {
            res.json({
                status: "success",
                message: "Clients found",
                data: clients,
            });
        }   
    ).catch( e =>{
        res.json({
            status: "error",
            message: "Clients not found",
            error: e
        });
    
    });
}

// Getting a client
export const getCourse = async(req: Request, res: Response) => {
    const { id } = req.params;

    // DB
    await Course.findByPk(id, {include: [{model: Client, as: "clients"}, {model: Tutor, as:"tutors"}]}).then(
        client => {
            res.json({
                status: "success",
                message: "Client found",
                data: client,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Client not found",
                error: e
            });
        }
    );
    
}

// Creating a course
export const postCourse = async(req: Request, res: Response) => {
    const { name, tutors }:CourseCreationAttributes = req.body;
    
    await Course.create({ name, tutors}, {include: [{model: Tutor, as: "tutors"}]}).then(
        async(course) => {
            const courseWithAssociations = await Course.findByPk(id, {include: [{model: Tutor, as: "tutors"}, {model: Course, as:"courses"}]});
            res.json({
                status: "success",
                message: "Client created",
                data: courseWithAssociations,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Client not created",
                error: e
            });
        }
    );
}



// Updating a client
export const updateClient = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    // // dont updateperson_id
    // delete restoperson_id;

    await Client.update(resto, { where: { id } }).then(
        async () => {
            const updatedClient = await Client.findByPk(id, {include: [{model: Person, as: "personInformation"}, {model: Course, as:"courses"}]});
            res.json({
                status: "success",
                message: "Client updated",
                data: updatedClient,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Client not updated",
                error: e
            });
        }
    );
}


//Delete a client(soft delete)
export const deleteClient = async(req: Request, res: Response) => {
    const { id } = req.params;

    await Client.update({activeDB:false},{ where: { id } }).then(
        () => {
            res.json({
                status: "success",
                message: "Client deleted",
                data: {
                    id
                },
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Client not deleted",
                error: e
            });
        }
    );
}