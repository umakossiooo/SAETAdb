import {Table, Model, Column, CreatedAt, UpdatedAt, DataType} from 'sequelize-typescript';
import {Optional} from 'sequelize';
import { Person } from './person';

interface ClientAttributes{
  id: string;
  personId:string;
  personInformation: Person;
  activeDB: boolean;
}

interface ClientCreationAttributes extends Optional<ClientAttributes, 'id' | 'activeDB' | 'personInformation'>{}

@Table ({
  tableName: 'client',
  timestamps: true,
  paranoid: true,
})
export class Client extends Model<ClientAttributes, ClientCreationAttributes>{


   @Column
   personId!: string;

   @CreatedAt
   @Column
   createdAt!: Date;

   @UpdatedAt
   @Column
   updatedAt!: Date;
}