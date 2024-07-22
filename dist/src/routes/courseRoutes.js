"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseRouter = (0, express_1.Router)();
courseRouter.get('/', (req, res) => {
    res.send('Get a list of courses');
});
courseRouter.get('/:id', (req, res) => {
    res.send(`Get the course ${req.params.id}`);
});
courseRouter.post('/', (req, res) => {
    res.send(`Create a new course with ID: ${req.body.id}`);
});
courseRouter.patch('/:id', (req, res) => {
    res.send(`Update the course ${req.params.id} with the values of ${req.body.name}, ${req.body.price} and ${req.body.stock}`);
});
courseRouter.delete('/', (req, res) => {
    res.send(`Deleting the course ${req.body.id}`);
});
exports.default = courseRouter;
