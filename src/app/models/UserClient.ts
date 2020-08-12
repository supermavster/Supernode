import {
  PrimaryKey,
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
  BelongsTo
} from 'sequelize-typescript';

import {CheckUser} from './CheckUser';
import {Users} from './Users';
import {RoleClient} from './RoleClient';

@Table({timestamps: true, tableName: 'userClient'})
export class UserClient extends Model<UserClient> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  lastName!: string;

  @ForeignKey(() => Users)
  @Column(DataType.STRING)
  uid!: string;

  @BelongsTo(() => Users)
  user: Users;

  @ForeignKey(() => RoleClient)
  @Column(DataType.INTEGER)
  roleId!: number;

  @Column(DataType.STRING)
  public status!: string;

  @CreatedAt
  readonly createdAt!: Date;

  @UpdatedAt
  readonly updatedAt!: Date;

  @DeletedAt
  readonly deletedAt!: Date;
}
