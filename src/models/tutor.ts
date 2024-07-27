import {Table, Model, Column, CreatedAt, UpdatedAt, DataType} from 'sequelize-typescript';
import {Optional} from 'sequelize';

interface TutorAttributes{
  id: string;
  personId: string;
  degree: string;
}

interface ProductCreationAttributes extends Optional<TutorAttributes, 'id'>{}

@Table ({
  tableName: "Tutors"
})
export class Product extends Model<TutorAttributes, ProductCreationAttributes>{

   @Column
   personId!: string;

   @Column
   degree!: string;

   @CreatedAt
   @Column
   createdAt!: Date;

   @UpdatedAt
   @Column
   updatedAt!: Date;
}
