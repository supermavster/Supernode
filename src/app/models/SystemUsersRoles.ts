import {
  PrimaryKey,
  Column,
  DataType,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  HasMany
} from 'sequelize-typescript';

import {SystemUsers} from './SystemUsers';

@Table({timestamps: true, tableName: 'systemUsersRoles'})
export class SystemUsersRoles extends Model<SystemUsersRoles> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  public status!: string;

  @CreatedAt
  readonly createdAt!: Date;

  @UpdatedAt
  readonly updatedAt!: Date;

  @DeletedAt
  readonly deletedAt!: Date;

  @HasMany(() => SystemUsers)
  SystemUsers: SystemUsers[];
}
