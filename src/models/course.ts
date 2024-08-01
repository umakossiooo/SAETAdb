import {Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, HasMany} from 'sequelize-typescript';
import {Optional} from 'sequelize';
import { Tutor } from './tutor';
import { Client } from './client';

interface CourseAttributes{
  id: string;
  name: string;
  tutors: Tutor[];
  clients?: Client[];
  activeDB: boolean;
}

export interface CourseCreationAttributes extends Optional<CourseAttributes, 'id' | 'name' | 'tutors' | 'activeDB'>{}

@Table ({
  tableName: "course",
  timestamps: true,
  paranoid: true,
})
export class Course extends Model<CourseAttributes, CourseCreationAttributes>{

   @Column(DataType.STRING)
   name!: string;
 
   @HasMany(() => Tutor)
   public tutors!: Tutor;

   @HasMany(() => Client)
   public clients?: Client;

   @CreatedAt
   @Column
   createdAt!: Date;

   @UpdatedAt
   @Column
   updatedAt!: Date;

   @Column({ type: DataType.BOOLEAN, defaultValue: true })
   public activeDB!: boolean;
}
