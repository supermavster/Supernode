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

import {SystemUsersRoles} from './SystemUsersRoles';

@Table({timestamps: true, tableName: 'systemUsers'})
export class SystemUsers extends Model<SystemUsers> {
  @PrimaryKey
  @Column(DataType.STRING)
  suid: string;

  @Column(DataType.STRING)
  fullName: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  image: string;

  @Column(DataType.STRING)
  slug: string;

  @ForeignKey(() => SystemUsersRoles)
  @Column(DataType.INTEGER)
  roleId: number;

  @Column(DataType.STRING)
  public status: string;

  @CreatedAt
  readonly createdAt: Date;

  @UpdatedAt
  readonly updatedAt: Date;

  @DeletedAt
  readonly deletedAt: Date;

  @BelongsTo(() => SystemUsersRoles)
  systemUsersRoles: SystemUsersRoles[];
}
