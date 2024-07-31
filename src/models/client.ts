import {Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, HasOne, HasMany, BelongsTo} from 'sequelize-typescript';
import {Optional} from 'sequelize';
import { Person } from './person';
import { Course } from './course';

interface ClientAttributes{
  id: string;
  personId:string;
  personInformation: Person;
  courses: Course[];
  activeDB: boolean;
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, 'id' | 'activeDB' | 'personInformation'>{}

@Table ({
  tableName: 'client',
  timestamps: true,
  paranoid: true,
})
export class Client extends Model<ClientAttributes, ClientCreationAttributes>{

   @ForeignKey(() => Person)
   @Column(DataType.STRING)
   public personId!: string;

   @CreatedAt
   @Column
   createdAt!: Date;

   @UpdatedAt
   @Column
   updatedAt!: Date;

   @HasMany(() => Course)
   public courses!: Course

   @BelongsTo(() => Person)
   public personInformation!: Person

   @Column({ type: DataType.BOOLEAN, defaultValue: true })
   public activeDB!: boolean;
}