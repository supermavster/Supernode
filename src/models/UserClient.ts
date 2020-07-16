import {
  PrimaryKey,
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from 'sequelize-typescript';

import {CheckUser} from './CheckUser';

@Table({timestamps: true, tableName: 'userClient'})
export class UserClient extends Model<UserClient> {
  @PrimaryKey
  @Column(DataType.STRING)
  uid!: string;

  @Column(DataType.STRING)
  slug!: string;

  @Column(DataType.STRING)
  fullName!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  phone!: string;

  @Column(DataType.STRING)
  password!: string;

  @ForeignKey(() => CheckUser)
  @Column(DataType.INTEGER)
  checkUserId!: number;

  @Column(DataType.STRING)
  public status!: string;

  @CreatedAt
  readonly createdAt!: Date;

  @UpdatedAt
  readonly updatedAt!: Date;

  @DeletedAt
  readonly deletedAt!: Date;
}
