import {
  PrimaryKey,
  Column,
  DataType,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey
} from 'sequelize-typescript';

import {SystemUsers} from './SystemUsers';
import {Platform} from './Platform';

@Table({timestamps: true, tableName: 'systemUserToken'})
export class SystemUserToken extends Model<SystemUserToken> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  pushToken!: string;

  @Column(DataType.STRING)
  version!: string;

  @Column(DataType.STRING)
  authToken!: string;

  @Column(DataType.DATE)
  maxDate!: Date;

  @Column(DataType.BOOLEAN)
  updated!: boolean;

  @ForeignKey(() => SystemUsers)
  @Column(DataType.STRING)
  suid!: string;

  @ForeignKey(() => Platform)
  @Column(DataType.NUMBER)
  platformId!: number;

  @Column(DataType.STRING)
  public status!: string;

  @CreatedAt
  readonly createdAt!: Date;

  @UpdatedAt
  readonly updatedAt!: Date;

  @DeletedAt
  readonly deletedAt!: Date;
}
