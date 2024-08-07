import { Request, Response } from 'express';
import { Client } from '../models/client';

export class ClientController {
    // Create a new client
    public static async create(req: Request, res: Response): Promise<void> {
        console.log("Request Body:", req.body); // Log the request body for debugging

        // Validate the request body
        const { name, lastName, email } = req.body;
        console.log("Received name:", name); // Log individual fields for debugging
        console.log("Received lastName:", lastName);
        console.log("Received email:", email);

        if (!name || !lastName || !email) {
            res.status(400).json({ message: 'Name, last name, and email are required' });
            return;
        }

        try {
            const client = await Client.create(req.body);
            res.status(201).json(client);
        } catch (error: unknown) {
            console.error("Error during client creation:", error); // Log the error for debugging
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    // Get all clients
    public static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const clients = await Client.findAll();
            res.status(200).json(clients);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    // Get a client by ID
    public static async getById(req: Request, res: Response): Promise<void> {
        try {
            const client = await Client.findByPk(req.params.id);
            if (client) {
                res.status(200).json(client);
            } else {
                res.status(404).json({ message: 'Client not found' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    // Update a client by ID
    public static async update(req: Request, res: Response): Promise<void> {
        try {
            const [updated] = await Client.update(req.body, {
                where: { id: req.params.id },
            });
            if (updated) {
                const updatedClient = await Client.findByPk(req.params.id);
                res.status(200).json(updatedClient);
            } else {
                res.status(404).json({ message: 'Client not found' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    // Delete a client by ID
    public static async delete(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await Client.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(204).json();
            } else {
                res.status(404).json({ message: 'Client not found' });
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
