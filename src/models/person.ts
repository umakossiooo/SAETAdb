// person.ts
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, HasOne } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Client } from './client';


interface PersonAttributes {
    id: string;
    name: string;
    lastName: string;
    lastName2: number;
    age: number;
    job: string;
    phoneNumber: string;
    startingDay: Date;
    email: string;
    clientInformation: Client;
    activeDB: boolean;
}

export interface PersonCreationAttributes extends Optional<PersonAttributes, 'id' | 'activeDB' | "clientInformation"> { }

@Table({
    tableName: 'person',
    timestamps: true,
    paranoid: true,
})
export class Person extends Model<PersonAttributes, PersonCreationAttributes> {

    @Column(DataType.STRING(128))
    public name!: string;

    @Column(DataType.STRING(128))
    public lastName!: string;

    @Column(DataType.STRING(128))
    public lastName2!: string;

    @Column(DataType.DOUBLE(2))
    public age!: number;

    @Column(DataType.STRING(128))
    public job!: string;

    @Column(DataType.STRING(128))
    public phoneNumber!: string;

    @Column(DataType.STRING(10))
    public startingDay!: string;

    @Column(DataType.STRING(128))
    public email!: string;


    @CreatedAt
    @Column
    public createdAt!: Date;

    @UpdatedAt
    @Column
    public updatedAt!: Date;

    @DeletedAt
    @Column
    public deletedAt!: Date;

    // Default true
    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    public activeDB!: boolean;

    @HasOne(() => Client)
    public clientInformation!: Client
}