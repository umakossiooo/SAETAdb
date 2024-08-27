import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, HasMany } from 'sequelize-typescript';
import { Enrollment } from './enrollment';
import { Transaction } from './transaction';
import { Optional } from 'sequelize';


interface ClientAttributes {
  id: string;
  name: string;
  lastName: string;
  lastName2: string;
  job: string;
  phoneNumber: string;
  age: number;
  email: string;
  scholarship: string;
  activeDB: boolean;
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, 'id' | 'activeDB'> { }

@Table({
  tableName: 'clients',
  timestamps: true,
  paranoid: true,
})
export class Client extends Model<ClientAttributes, ClientCreationAttributes> {

  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName!: string;

  @Column({ type: DataType.STRING })
  lastName2?: string;

  @Column({ type: DataType.STRING })
  job?: string;

  @Column({ type: DataType.STRING })
  phoneNumber?: string;

  @Column({ type: DataType.INTEGER })
  age?: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING})
  scholarship?: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  activeDB!: boolean;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @HasMany(() => Enrollment)
  enrollments!: Enrollment[];

  @HasMany(() => Transaction)
  transactions!: Transaction[];
}
