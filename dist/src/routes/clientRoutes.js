"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientRouter = (0, express_1.Router)();
clientRouter.get('/', (req, res) => {
    res.send('Get a list of clients');
});
clientRouter.get('/:id', (req, res) => {
    res.send(`Get the client ${req.params.id}`);
});
clientRouter.post('/', (req, res) => {
    res.send(`Create a new client with ID: ${req.body.id}`);
});
clientRouter.patch('/:id', (req, res) => {
    res.send(`Update the client ${req.params.id} with the values of ${req.body.name}, ${req.body.price} and ${req.body.stock}`);
});
clientRouter.delete('/', (req, res) => {
    res.send(`Deleting the client ${req.body.id}`);
});
exports.default = clientRouter;
