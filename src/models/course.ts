import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, HasMany } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Enrollment } from './enrollment';

interface CourseAttributes {
  id: string;
  courseName: string;
  courseDescription: string;
}

export interface CourseCreationAttributes extends Optional<CourseAttributes, 'id'> { }

@Table({
  tableName: 'courses',
  timestamps: true,
})
export class Course extends Model<CourseAttributes, CourseCreationAttributes> {

  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  courseName!: string;

  @Column({ type: DataType.STRING })
  courseDescription?: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @HasMany(() => Enrollment)
  enrollments!: Enrollment[];
}
