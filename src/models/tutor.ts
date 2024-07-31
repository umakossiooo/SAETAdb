import {Table, Model, Column, CreatedAt, UpdatedAt, DataType, HasMany} from 'sequelize-typescript';
import {Optional} from 'sequelize';
import { Course } from './course';

interface TutorAttributes{
  id: string;
  personId: string;
  degree: string;
  course: Course[];
  activeDB: boolean;
}

export interface TutorCreationAttributes extends Optional<TutorAttributes, 'id'>{}

@Table ({
  tableName: "tutors",
  timestamps: true,
  paranoid: true,
})
export class Tutor extends Model<TutorAttributes, TutorCreationAttributes>{

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

   @HasMany(() => Course)
   public courseInformation!: Course

   @Column({ type: DataType.BOOLEAN, defaultValue: true })
   public activeDB!: boolean;
}