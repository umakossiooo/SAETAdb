import { Request, Response } from 'express';
import { Transaction } from '../models/transaction';

export class TransactionController {
    // Create a new transaction
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const transaction = await Transaction.create(req.body);
            res.status(201).json(transaction);
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
            const transactions = await Transaction.findAll();
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
            const transaction = await Transaction.findByPk(req.params.id);
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
            const [updated] = await Transaction.update(req.body, {
                where: { id: req.params.id },
            });
            if (updated) {
                const updatedTransaction = await Transaction.findByPk(req.params.id);
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
