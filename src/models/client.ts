import {Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, HasOne} from 'sequelize-typescript';
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

   @ForeignKey(() => Person)
   @Column(DataType.STRING)
   personId!: string;

   @CreatedAt
   @Column
   createdAt!: Date;

   @UpdatedAt
   @Column
   updatedAt!: Date;

   @HasOne(() => Person)
   public personInformation!: Person

   @Column({ type: DataType.BOOLEAN, defaultValue: true })
   public activeDB!: boolean;
}