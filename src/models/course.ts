import {Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey} from 'sequelize-typescript';
import {Optional} from 'sequelize';
import { Tutor } from './tutor';
import { Client } from './client';

interface CourseAttributes{
  id: string;
  name: string;
  tutorId: string;
  clientId: string;
  activeDB: boolean;
}

interface CourseCreationAttributes extends Optional<CourseAttributes, 'id'>{}

@Table ({
  tableName: "Course"
})
export class Course extends Model<CourseAttributes, CourseCreationAttributes>{

   @Column(DataType.STRING)
   name!: string;
 
   @ForeignKey(() => Tutor)
   @Column(DataType.STRING)
   tutorId!: string;

   @ForeignKey(() => Client)
   @Column(DataType.STRING)
   clientId!: string;

   @CreatedAt
   @Column
   createdAt!: Date;

   @UpdatedAt
   @Column
   updatedAt!: Date;

   @Column({ type: DataType.BOOLEAN, defaultValue: true })
   public activeDB!: boolean;
}
