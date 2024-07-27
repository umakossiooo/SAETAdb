import {Table, Model, Column, CreatedAt, UpdatedAt, DataType} from 'sequelize-typescript';
import {Optional} from 'sequelize';

interface TutorAttributes{
  id: string;
  personId: string;
  degree: string;
  activeDB: boolean;
}

interface ProductCreationAttributes extends Optional<TutorAttributes, 'id'>{}

@Table ({
  tableName: "Tutors"
})
export class Product extends Model<TutorAttributes, ProductCreationAttributes>{

   @Column(DataType.STRING(128))
   public personId!: string;

   @Column(DataType.STRING(128))
   public degree!: string;

   @CreatedAt
   @Column
   createdAt!: Date;

   @UpdatedAt
   @Column
   updatedAt!: Date;

   @Column({ type: DataType.BOOLEAN, defaultValue: true })
   public activeDB!: boolean;
}