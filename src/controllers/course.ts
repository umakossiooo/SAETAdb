import { Request, Response } from 'express';
import { Course } from '../models/course';

export class CourseController {
    // Create a new course
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const course = await Course.create(req.body);
            res.status(201).json(course);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    // Get all courses
    public static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const courses = await Course.findAll();
            res.status(200).json(courses);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    // Get a course by ID
    public static async getById(req: Request, res: Response): Promise<void> {
        try {
            const course = await Course.findByPk(req.params.id);
            if (course) {
                res.status(200).json(course);
            } else {
                res.status(404).json({ message: 'Course not found' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    // Update a course by ID
    public static async update(req: Request, res: Response): Promise<void> {
        try {
            const [updated] = await Course.update(req.body, {
                where: { id: req.params.id },
            });
            if (updated) {
                const updatedCourse = await Course.findByPk(req.params.id);
                res.status(200).json(updatedCourse);
            } else {
                res.status(404).json({ message: 'Course not found' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    // Delete a course by ID
    public static async delete(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await Course.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(204).json();
            } else {
                res.status(404).json({ message: 'Course not found' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }
}
