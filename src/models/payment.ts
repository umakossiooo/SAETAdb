import {Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, HasMany} from 'sequelize-typescript';
import {Optional} from 'sequelize';
import { Client } from './client';
import { Course } from './course';

interface PaymentAttributes{
  id: string;
  clinetId: string;
  courseId: string;
  course: Course[]
  cost: number;
  beca: number;
  disocount: number;
  amountPaid: number;
  paymentMethod: number;
  paymentDate: Date;
  type: string;
  status: string;
  totalPayment: number;
  activeDB: boolean;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id'>{}

@Table ({
  tableName: "payment",
  timestamps: true,
  paranoid: true,
})
export class Payment extends Model<PaymentAttributes, PaymentCreationAttributes>{

   @ForeignKey(() => Client)
   @Column(DataType.STRING)
   public clientId!: string;
   
   @ForeignKey(() => Course)
   @Column(DataType.STRING)
   public courseId!: string;


   @Column(DataType.NUMBER)
   public cost!: number;

   @Column(DataType.NUMBER)
   public beca!: number;

   @Column(DataType.NUMBER)
   public discount!: number;

   @Column(DataType.NUMBER)
   public amountPaid!: number;

   @Column(DataType.STRING)
   public paymentMethod!: string;

   @Column(DataType.DATE)
   public paymentDate!: Date;

   @Column(DataType.STRING)
   public type!: string;

   @Column(DataType.STRING)
   public status!: string;

   @Column(DataType.NUMBER)
   public totalPayment!: number;

   @CreatedAt
   @Column
   createdAt!: Date;

   @UpdatedAt
   @Column
   updatedAt!: Date;

   @HasMany(() => Course)
   public course!: Course

   @Column({ type: DataType.BOOLEAN, defaultValue: true })
   public activeDB!: boolean;
}