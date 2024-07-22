"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentRouter = (0, express_1.Router)();
paymentRouter.get('/', (req, res) => {
    res.send('Get a list of payments');
});
paymentRouter.get('/:id', (req, res) => {
    res.send(`Get the payment ${req.params.id}`);
});
paymentRouter.post('/', (req, res) => {
    res.send(`Create a new payment with ID: ${req.body.id}`);
});
paymentRouter.patch('/:id', (req, res) => {
    res.send(`Update the payment ${req.params.id} with the values of ${req.body.name}, ${req.body.price} and ${req.body.stock}`);
});
paymentRouter.delete('/', (req, res) => {
    res.send(`Deleting the payment ${req.body.id}`);
});
exports.default = paymentRouter;
