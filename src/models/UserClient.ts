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
  name!: string;

  @Column(DataType.STRING)
  lastName!: string;

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
