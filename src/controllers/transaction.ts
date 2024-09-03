import { Request, Response } from 'express';
import { Transaction } from '../models/transaction';
import { Client } from '../models';
import { Enrollment } from '../models';
import { Course } from '../models';


export class TransactionController {
    // Create a new transaction
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            console.log("Request body:", req.body); // Para depuración
    
            // Validar campos requeridos
            if (!req.body.cost || !req.body.enrollmentId) {
                res.status(400).json({ message: 'Required fields are missing' });
                return;
            }
    
            const { cost, promotion, enrollmentId } = req.body;
    
            // Buscar el enrollment para obtener la información del cliente y del curso
            const enrollment = await Enrollment.findByPk(enrollmentId, {
                include: [Client, Course], // Incluir el cliente y curso relacionados
            });

            console.log('Enrollment found: ', enrollment)
    
            if (!enrollment || !enrollment.client || !enrollment.courseId) {
                res.status(404).json({ message: 'Enrollment, client, or course not found' });
                return;
            }
    
            const client = enrollment.client;
            let calculatedAmountToPay = cost;
            const course = enrollment.course;
    
            // Aplicar la beca del cliente si existe
            if (client.scholarship) {
                const scholarship = parseFloat(client.scholarship);
                calculatedAmountToPay -= (cost * (scholarship / 100));
            }
    
            // Aplicar el descuento de promoción si está presente
            if (promotion) {
                calculatedAmountToPay -= (cost * (promotion / 100));
            }
    
            // Crear la transacción con el monto calculado y el clientId del enrollment
            const transaction = await Transaction.create({
                ...req.body,
                amountToPay: calculatedAmountToPay, // Asigna el monto calculado
                clientId: client.id, // Asegura que el clientId se establece desde el enrollment
                courseId: enrollment.course.id,  // Asigna el courseId desde el enrollment
            });
    
            res.status(201).json(transaction); // Enviar la respuesta
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }
    
    

    // Get a transaction by ID
    public static async getById(req: Request, res: Response): Promise<void> {
        try {
            const transaction = await Transaction.findByPk(req.params.id, {
                include: [Client],
            });
            if (transaction) {
                res.status(200).json(transaction);
            } else {
                res.status(404).json({ message: 'Transaction not found' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    // Update a transaction by ID
    public static async update(req: Request, res: Response): Promise<void> {
        try {
            const { cost, promotion, scholarshipId } = req.body;
    
            let calculatedAmountToPay = cost; // Inicializa el monto a pagar con el costo base
    
            // Si scholarshipId está presente, intenta buscar al cliente de la beca
            if (scholarshipId) {
                const scholarshipClient = await Client.findByPk(scholarshipId);
                if (scholarshipClient) {
                    const scholarship = parseFloat(scholarshipClient.scholarship!);
                    calculatedAmountToPay -= (cost * (scholarship / 100)); // Aplica la beca si existe
                }
            }
    
            // Aplica el descuento de promoción si está presente
            if (promotion) {
                calculatedAmountToPay -= (cost * (promotion / 100));
            }
    
            // Actualiza la transacción con el monto recalculado
            const [updated] = await Transaction.update({
                ...req.body,
                amountToPay: calculatedAmountToPay,
            }, {
                where: { id: req.params.id },
            });
    
            if (updated) {
                const updatedTransaction = await Transaction.findByPk(req.params.id, {
                    include: [Client],
                });
                res.status(200).json(updatedTransaction);
            } else {
                res.status(404).json({ message: 'Transaction not found' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    // Delete a transaction by ID
    public static async delete(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await Transaction.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(204).json();
            } else {
                res.status(404).json({ message: 'Transaction not found' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    public static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const transactions = await Transaction.findAll({
                include: [Client, Enrollment], // Incluye relaciones necesarias
            });
            res.status(200).json(transactions);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }
}