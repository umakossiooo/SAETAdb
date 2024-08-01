import { Request, Response } from "express";
import { Client } from "../models/client";
import { Person, PersonCreationAttributes } from "../models/person";
import { DATE } from "sequelize";

// Getting clients
export const getPerson = async(req: Request, res: Response) => {
    const { from = 0, to = 5 } = req.query;

    // DB
    await Person.findAll({ offset: Number(from), limit: Number(to), include: [{model: Client, as: "clientInformation"},]}).then(
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
export const getPersons = async(req: Request, res: Response) => {
    const { id } = req.params;

    // DB
    await Person.findByPk(id, {include: [{model: Client, as: "clientInformation"},]}).then(
        client => {
            res.json({
                status: "success",
                message: "Person found",
                data: client,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Person not found",
                error: e
            });
        }
    );
    
}

// Creating a client
export const postPerson = async(req: Request, res: Response) => {
    const { name, lastName, lastName2, age, job, phoneNumber, startingDay, email, clientInformation }:PersonCreationAttributes = req.body;
    
    await Person.create({ name, lastName, lastName2, age, job, phoneNumber, startingDay, email, clientInformation }, {include: [{model: Client, as: "clientInformation"},]}).then(
        async(client) => {
            const clientWithAssociations = await Client.findByPk(client.id, {include: [{model: Client, as: "clientInformation"},]});
            res.json({
                status: "success",
                message: "Person created",
                data: clientWithAssociations,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Person not created",
                error: e
            });
        }
    );
}



// Updating a client
export const updatePerson = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    // // dont updateperson_id
    // delete restoperson_id;

    await Person.update(resto, { where: { id } }).then(
        async () => {
            const updatedClient = await Person.findByPk(id, {include: [{model: Client, as: "clientInformation"},]});
            res.json({
                status: "success",
                message: "Person updated",
                data: updatedClient,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Person not updated",
                error: e
            });
        }
    );
}


//Delete a client(soft delete)
export const deletePerson = async(req: Request, res: Response) => {
    const { id } = req.params;

    await Person.update({activeDB:false},{ where: { id } }).then(
        () => {
            res.json({
                status: "success",
                message: "Person deleted",
                data: {
                    id
                },
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Person not deleted",
                error: e
            });
        }
    );
}