import { Request, Response } from 'express';
import { Enrollment } from '../models/enrollment';
import { Client } from '../models';
import { Course } from '../models';

export class EnrollmentController {
    // Create a new enrollment
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const enrollment = await Enrollment.create(req.body);
            res.status(201).json(enrollment);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    // Get all enrollments
    // Get all enrollments with client and course details
    public static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const enrollments = await Enrollment.findAll({
                include: [
                    { model: Client, as: 'client' },
                    { model: Course, as: 'course' }
                ]
            });
            res.status(200).json(enrollments);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }


    // Get an enrollment by ID
    public static async getByCourseId(req: Request, res: Response): Promise<void> {
        try {
            const { courseId } = req.params;
            console.log("Request received for courseId:", courseId); // Agrega este log
    
            const enrollments = await Enrollment.findAll({
                where: { courseId },
                include: [Client, Course], 
            });
    
            console.log("Enrollments found:", enrollments); // Log para verificar los resultados
            
            if (enrollments.length > 0) {
                res.status(200).json(enrollments);
            } else {
                res.status(404).json({ message: 'No enrollments found for this course.' });
            }
        } catch (error: unknown) {
            console.error("Error fetching enrollments:", error);
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }
    
    
    

    // Update an enrollment by ID
    public static async update(req: Request, res: Response): Promise<void> {
        try {
            const [updated] = await Enrollment.update(req.body, {
                where: { id: req.params.id },
            });
            if (updated) {
                const updatedEnrollment = await Enrollment.findByPk(req.params.id);
                res.status(200).json(updatedEnrollment);
            } else {
                res.status(404).json({ message: 'Enrollment not found' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    // Delete an enrollment by ID
    public static async delete(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await Enrollment.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(204).json();
            } else {
                res.status(404).json({ message: 'Enrollment not found' });
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
