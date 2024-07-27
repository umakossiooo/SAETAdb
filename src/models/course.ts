import {Table, Model, Column, CreatedAt, UpdatedAt, DataType} from 'sequelize-typescript';
import {Optional} from 'sequelize';

interface CourseAttributes{
  id: string;
  name: string;
  tutorId: string;
  clientId: string;
}

interface CourseCreationAttributes extends Optional<CourseAttributes, 'id'>{}

@Table ({
  tableName: "Course"
})
export class Product extends Model<CourseAttributes, CourseCreationAttributes>{

   @Column
   name!: string;

   @Column
   tutorId!: string;

   @Column
   clientId!: string;

   @CreatedAt
   @Column
   createdAt!: Date;

   @UpdatedAt
   @Column
   updatedAt!: Date;
}
