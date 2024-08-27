import { Request, Response } from 'express';
import { Transaction } from '../models/transaction';
import { Client } from '../models';

export class TransactionController {
    // Create a new transaction
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            // Validar campos requeridos
            if (!req.body.cost || !req.body.clientId) {
                res.status(400).json({ message: 'Required fields are missing' });
                return; // Salir de la función después de enviar la respuesta
            }

            const { cost, promotion, scholarshipId } = req.body;

            const scholarshipClientId = scholarshipId || '';

            let calculatedAmountToPay = cost;

            // Aplicar lógica para la beca si está presente
            if (scholarshipClientId) {
                const scholarshipClient = await Client.findByPk(scholarshipClientId);
                if (scholarshipClient) {
                    const scholarship = parseFloat(scholarshipClient.scholarship!);
                    calculatedAmountToPay -= (cost * (scholarship / 100));
                }
            }

            // Aplicar lógica para la promoción
            if (promotion) {
                calculatedAmountToPay -= (cost * (promotion / 100));
            }

            // Crear la transacción con el monto calculado
            const transaction = await Transaction.create({
                ...req.body,
                amountToPay: calculatedAmountToPay,
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



    // Get all transactions
    public static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const transactions = await Transaction.findAll({
                include: [Client], // Esto incluye la información del cliente con cada transacción
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
}

