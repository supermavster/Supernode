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

import {UserClient} from './UserClient';

@Table({timestamps: true, tableName: 'content'})
export class Content extends Model<Content> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  public title!: string;

  @Column(DataType.STRING)
  public subtitle!: string;

  @Column(DataType.STRING)
  public description!: string;

  @Column(DataType.STRING)
  public slug!: string;

  @Column(DataType.TEXT)
  public content!: string;

  @Column(DataType.DATE)
  public datePublish!: Date;

  @Column(DataType.DATE)
  public dateApprove!: Date;

  @Column(DataType.DATE)
  public dateEdit!: Date;

  @Column(DataType.BOOLEAN)
  public isDraw!: boolean;

  @ForeignKey(() => UserClient)
  @Column(DataType.INTEGER)
  userClientId!: number;

  @Column(DataType.STRING)
  public status!: string;

  @CreatedAt
  readonly createdAt!: Date;

  @UpdatedAt
  readonly updatedAt!: Date;

  @DeletedAt
  readonly deletedAt!: Date;
}
