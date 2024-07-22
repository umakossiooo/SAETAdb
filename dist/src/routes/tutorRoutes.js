"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tutorRouter = (0, express_1.Router)();
tutorRouter.get('/', (req, res) => {
    res.send('Get a list of tutors');
});
tutorRouter.get('/:id', (req, res) => {
    res.send(`Get the tutor ${req.params.id}`);
});
tutorRouter.post('/', (req, res) => {
    res.send(`Create a new tutor with ID: ${req.body.id}`);
});
tutorRouter.patch('/:id', (req, res) => {
    res.send(`Update the tutor ${req.params.id} with the values of ${req.body.name}, ${req.body.price} and ${req.body.stock}`);
});
tutorRouter.delete('/', (req, res) => {
    res.send(`Deleting the tutor ${req.body.id}`);
});
exports.default = tutorRouter;
