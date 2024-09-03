import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Client } from './client';
import { Course } from './course';
import { Optional } from 'sequelize';
import { Transaction } from './transaction';

interface EnrollmentAttributes {
    id: string;
    enrollmentDate: Date;
    courseId: string;
    clientId: string;
}

export interface EnrollmentCreationAttributes extends Optional<EnrollmentAttributes, 'id'> { }

@Table({
    tableName: 'enrollments',
    timestamps: true,
    paranoid: true
})
export class Enrollment extends Model<EnrollmentAttributes, EnrollmentCreationAttributes> {

    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id!: string;

    @Column({ type: DataType.DATE, allowNull: false })
    enrollmentDate!: Date;

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

    @ForeignKey(() => Course)
    @Column({ type: DataType.UUID, allowNull: false })
    courseId!: string;

    @BelongsTo(() => Course)
    course!: Course;

    @HasMany(() => Transaction)
    transactions!: Transaction[];
}
