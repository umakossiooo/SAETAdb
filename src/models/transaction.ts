import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { Client } from './client';
import { Enrollment } from './enrollment';
import { Optional } from 'sequelize';

interface TransactionAttributes {
    id: string;
    course: Enrollment;
    cost: number;
    scholarship: Client
    promotion: number;
    amountToPay: number;
    paymentMethod: string;
    amount: number;
    date: Date;
    folio: string;
    oneTimePayment: boolean;
    amountToPay2: string;
    status: string; // e.g., 'paid', 'unpaid'
    clientId: string;
    courseId: string;
}

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id'> { }

@Table({
    tableName: 'transactions',
    timestamps: true,
})
export class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> {

    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id!: string;

    @ForeignKey(() => Enrollment) // Referencia a Enrollment (Course)
    @Column({ type: DataType.UUID, allowNull: true })
    courseId!: string;

    @BelongsTo(() => Enrollment)
    course!: Enrollment;

    @ForeignKey(() => Client) // Referencia a Client (Scholarship)
    @Column({ type: DataType.UUID, allowNull: true })
    scholarshipId!: string;

    @BelongsTo(() => Client)
    scholarship!: Client;

    @Column({ type: DataType.FLOAT, allowNull: false })
    cost!: number;

    @Column({ type: DataType.FLOAT, allowNull: true })
    promotion!: number;

    @Column({ type: DataType.FLOAT, allowNull: false })
    amountToPay!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    paymentMethod!: string;

    @Column({ type: DataType.FLOAT, allowNull: false })
    amount!: number;

    @Column({ type: DataType.DATE, allowNull: false })
    date!: Date;

    @Column({ type: DataType.STRING, allowNull: false })
    folio!: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    oneTimePayment!: boolean;

    @Column({ type: DataType.STRING, allowNull: false })
    amountToPay2!: string;

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

