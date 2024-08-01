import { Request, Response } from "express";
import { Client } from "../models/client";
import { Payment, PaymentCreationAttributes } from "../models/payment";
import { Course } from "../models/course";

// Getting clients
export const getPayments = async(req: Request, res: Response) => {
    const { from = 0, to = 5 } = req.query;

    // DB
    await Payment.findAll({ offset: Number(from), limit: Number(to), include: [{model: Client, as: "clientInformation"}]}).then(
        payment => {
            res.json({
                status: "success",
                message: "Payment found",
                data: payment,
            });
        }   
    ).catch( e =>{
        res.json({
            status: "error",
            message: "Payment not found",
            error: e
        });
    
    });
}

// Getting a client
export const getPayment = async(req: Request, res: Response) => {
    const { id } = req.params;

    // DB
    await Payment.findByPk(id, {include: [{model: Client, as: "clientInformation"}]}).then(
        payment => {
            res.json({
                status: "success",
                message: "Client found",
                data: payment,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Payment not found",
                error: e
            });
        }
    );
    
}

// Creating a client
export const postPayment = async(req: Request, res: Response) => {
    const { clientId, clientInformation, cost, scolarship, disocount, amountPaid, paymentMethod, paymentDate, type, status, totalPayment, activeDB }:PaymentCreationAttributes = req.body;
    
    // if person not found return error because the relationship is required
    const payment = await Payment.findByPk(clientId);
    if (!payment) {
        res.json({
            status: "error",
            message: "Payment not found",
        });
        return;
    }
    
    await Payment.create({ clientId, clientInformation, cost, scolarship, disocount, amountPaid, paymentMethod, paymentDate, type, status, totalPayment, activeDB }, {include: [{model: Client, as: "clientInformation"}]}).then(
        async(payment) => {
            const paymentWithAssociations = await Payment.findByPk(clientId, {include: [{model: Client, as: "clientInformation"}]});
            res.json({
                status: "success",
                message: "Payment created",
                data: paymentWithAssociations,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Payment not created",
                error: e
            });
        }
    );
}



// Updating a client
export const updatePayment = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    // // dont updateperson_id
    // delete restoperson_id;

    await Payment.update(resto, { where: { id } }).then(
        async () => {
            const updatedPayment = await Payment.findByPk(id, {include: [{model: Client, as: "clientInformation"}]});
            res.json({
                status: "success",
                message: "Payment updated",
                data: updatedPayment,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Payment not updated",
                error: e
            });
        }
    );
}


//Delete a client(soft delete)
export const deletePayment = async(req: Request, res: Response) => {
    const { id } = req.params;

    await Payment.update({activeDB:false},{ where: { id } }).then(
        () => {
            res.json({
                status: "success",
                message: "Payment deleted",
                data: {
                    id
                },
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Payment not deleted",
                error: e
            });
        }
    );
}