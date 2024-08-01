import { Request, Response } from "express";
import { Course } from "../models/course";
import { CourseCreationAttributes } from "../models/course";
import { Tutor } from "../models/tutor";
import { Client } from "../models/client";

// Getting Courses
export const getCourses = async(req: Request, res: Response) => {
    const { from = 0, to = 5 } = req.query;

    // DB
    await Course.findAll({ offset: Number(from), limit: Number(to), include: [{model: Course, as: "Courses"}, {model: Tutor, as:"tutors"}]}).then(
        Courses => {
            res.json({
                status: "success",
                message: "Courses found",
                data: Courses,
            });
        }   
    ).catch( e =>{
        res.json({
            status: "error",
            message: "Courses not found",
            error: e
        });
    
    });
}

// Getting a Course
export const getCourse = async(req: Request, res: Response) => {
    const { id } = req.params;

    // DB
    await Course.findByPk(id, {include: [{model: Tutor, as:"tutors"}, {model: Client, as: "clients"}]}).then(
        Course => {
            res.json({
                status: "success",
                message: "Course found",
                data: Course,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Course not found",
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
            const courseWithAssociations = await Course.findByPk(course.id, {include: [{model: Tutor, as: "tutors"}]});
            res.json({
                status: "success",
                message: "Course created",
                data: courseWithAssociations,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Course not created",
                error: e
            });
        }
    );
}



// Updating a Course
export const updateCourse = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    // // dont updateperson_id
    // delete restoperson_id;

    await Course.update(resto, { where: { id } }).then(
        async () => {
            const updatedCourse = await Course.findByPk(id, {include: [{model: Tutor, as: "tutors"}]});
            res.json({
                status: "success",
                message: "Course updated",
                data: updatedCourse,
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Course not updated",
                error: e
            });
        }
    );
}


//Delete a Course(soft delete)
export const deleteCourse = async(req: Request, res: Response) => {
    const { id } = req.params;

    await Course.update({activeDB:false},{ where: { id } }).then(
        () => {
            res.json({
                status: "success",
                message: "Course deleted",
                data: {
                    id
                },
            });
        }
    ).catch(
        e => {
            res.json({
                status: "error",
                message: "Course not deleted",
                error: e
            });
        }
    );
}