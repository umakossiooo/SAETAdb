import {Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, HasMany} from 'sequelize-typescript';
import {Optional} from 'sequelize';
import { Tutor } from './tutor';
import { Client } from './client';

interface CourseAttributes{
  id: string;
  name: string;
  tutor: Tutor[];
  client: Client[]
  activeDB: boolean;
}

interface CourseCreationAttributes extends Optional<CourseAttributes, 'id'>{}

@Table ({
  tableName: "course",
  timestamps: true,
  paranoid: true,
})
export class Course extends Model<CourseAttributes, CourseCreationAttributes>{

   @Column(DataType.STRING)
   name!: string;
 
   @HasMany(() => Tutor)
   @Column(DataType.STRING)
   public tutor!: string;

   @HasMany(() => Client)
   @Column(DataType.STRING)
   public client!: string;

   @CreatedAt
   @Column
   createdAt!: Date;

   @UpdatedAt
   @Column
   updatedAt!: Date;

   @Column({ type: DataType.BOOLEAN, defaultValue: true })
   public activeDB!: boolean;
}
