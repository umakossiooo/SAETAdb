import { Request, Response } from 'express';
import { Enrollment } from '../models/enrollment';

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
    public static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const enrollments = await Enrollment.findAll();
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
    public static async getById(req: Request, res: Response): Promise<void> {
        try {
            const enrollment = await Enrollment.findByPk(req.params.id);
            if (enrollment) {
                res.status(200).json(enrollment);
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
