import {Table, Model, Column, CreatedAt, UpdatedAt, DataType} from 'sequelize-typescript';
import {Optional} from 'sequelize';

interface ClientAttributes{
  id: string;
  personId:string;
}

interface ClientCreationAttributes extends Optional<ClientAttributes, 'id'>{}

@Table ({
  tableName: "Clients"
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