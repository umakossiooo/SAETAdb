import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Client } from './client';
import { Enrollment } from './enrollment';
import { Optional } from 'sequelize';
import { Course } from './course';

interface TransactionAttributes {
    id: string;
    cost: number;
    promotion: number;
    amountToPay: number;
    paymentMethod: string;
    amount: number;
    date: Date;
    folio: string;
    oneTimePayment: boolean;
    amountToPay2: string;
    status: string;
    clientId: string;
    courseId: string;
    enrollmentId: string;
}

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id'> { }

@Table({
    tableName: 'transactions',
    timestamps: true,
})
export class Transaction extends Model<TransactionAttributes> {

    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id!: string;

    @ForeignKey(() => Enrollment)
    @Column({ type: DataType.UUID, allowNull: true })
    enrollmentId!: string;

    @BelongsTo(() => Enrollment)
    enrollment!: Enrollment;

    @ForeignKey(() => Client)
    @Column({ type: DataType.UUID, allowNull: false })
    clientId!: string;

    @BelongsTo(() => Client)
    client!: Client;

    @ForeignKey(() => Course)
    @Column({ type: DataType.UUID, allowNull: false })
    courseId!: string;

    @BelongsTo(() => Course)
    course!: Course;

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
    status!: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}
