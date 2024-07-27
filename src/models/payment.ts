import {Table, Model, Column, CreatedAt, UpdatedAt, DataType} from 'sequelize-typescript';
import {Optional} from 'sequelize';

interface PaymentAttributes{
  id: string;
  clinetId: string;
  courseId: string;
  cost: number;
  beca: number;
  disocount: number;
  amountPaid: number;
  paymentMethod: number;
  paymentDate: Date;
  type: string;
  status: string;
  totalPayment: number;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id'>{}

@Table ({
  tableName: "Payment"
})
export class Product extends Model<PaymentAttributes, PaymentCreationAttributes>{

   @Column
   clientId!: string;

   @Column
   courseId!: string;

   @Column
   cost!: number;

   @Column
   beca!: number;

   @Column
   discount!: number;

   @Column
   amountPaid!: number;

   @Column
   paymentMethod!: string;

   @Column
   paymentDate!: Date;

   @Column
   type!: string;

   @Column
   status!: string;

   @Column
   totalPayment!: number;

   @CreatedAt
   @Column
   createdAt!: Date;

   @UpdatedAt
   @Column
   updatedAt!: Date;
}