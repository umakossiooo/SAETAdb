import { Request, Response } from "express";
import { Client } from "../models/client";
import { Person } from "../models/person";
import { ClientCreationAttributes } from "../models/client";
import { Course } from "../models/course";

// Getting clients
export const getClients = async(req: Request, res: Response) => {
    const { from = 0, to = 5 } = req.query;

    // DB
    await Client.findAll({ offset: Number(from), limit: Number(to), include: [{model: Person, as: "personInformation"}, {model: Course, as:"courses"}]}).then(
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
export const getClient = async(req: Request, res: Response) => {
    const { id } = req.params;

    // DB
    await Client.findByPk(id, {include: [{model: Person, as: "personInformation"}, {model: Course, as:"courses"}]}).then(
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

// Creating a client
export const postClient = async(req: Request, res: Response) => {
    const { personId, personInformation, courses }:ClientCreationAttributes = req.body;
    
    // if person not found return error because the relationship is required
    const person = await Person.findByPk(personId);
    if (!person) {
        res.json({
            status: "error",
            message: "Person of Client not found",
        });
        return;
    }
    
    await Client.create({ personId, personInformation, courses}, {include: [{model: Person, as: "personInformation"}, {model: Course, as:"courses"}]}).then(
        async(client) => {
            const clientWithAssociations = await Client.findByPk(client.id, {include: [{model: Person, as: "personInformation"}, {model: Course, as:"courses"}]});
            res.json({
                status: "success",
                message: "Client created",
                data: clientWithAssociations,
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