import { Request, Response } from 'express';
import { Course } from '../models/course';
import { where } from 'sequelize';

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
            // Log para depuración: ID recibido y datos del cuerpo de la solicitud
            console.log('ID recibido:', req.params.id);
            console.log('Datos para actualizar:', req.body);
    
            // Intento de actualización del curso basado en el ID proporcionado y el cuerpo de la solicitud
            const [updated] = await Course.update(req.body, {
                where: { id: req.params.id },
            });
    
            // Log para depuración: resultado de la operación de actualización
            console.log('Resultado de la actualización:', updated);
    
            if (updated) {
                // Si la actualización es exitosa (es decir, se actualizó una o más filas)
                res.status(204).json();
            } else {
                // Si no se actualizó ninguna fila, devuelve un estado 404 con un mensaje de error
                console.log('El curso no se encontró o no se pudo actualizar.');
                res.status(404).json({ message: 'Course nooot found' });
            }
        } catch (error: unknown) {
            // Manejo de errores durante la operación de actualización
            console.error('Error durante la actualización del curso:', error);
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
