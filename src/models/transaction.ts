import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Client } from './client';
import { Optional } from 'sequelize';

interface TransactionAttributes {
    id: string;
    amount: number;
    date: Date;
    status: string; // e.g., 'paid', 'unpaid'
}

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id'> { }

@Table({
    tableName: 'transactions',
    timestamps: true,
})
export class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> {

    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id!: string;

    @Column({ type: DataType.FLOAT, allowNull: false })
    amount!: number;

    @Column({ type: DataType.DATE, allowNull: false })
    date!: Date;

    @Column({ type: DataType.STRING, allowNull: false })
    status!: string; // e.g., 'paid', 'unpaid'

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

    @ForeignKey(() => Client)
    @Column({ type: DataType.UUID, allowNull: false })
    clientId!: string;

    @BelongsTo(() => Client)
    client!: Client;
}
