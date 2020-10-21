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

@Table({timestamps: true, tableName: 'systemPasswordReset'})
export class SystemPasswordReset extends Model<SystemPasswordReset> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  public code!: string;

  @ForeignKey(() => SystemUsers)
  @Column(DataType.STRING)
  suid!: string;

  @Column(DataType.STRING)
  public status!: string;

  @CreatedAt
  readonly createdAt!: Date;

  @UpdatedAt
  readonly updatedAt!: Date;

  @DeletedAt
  readonly deletedAt!: Date;
}
