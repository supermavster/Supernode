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

import {Content} from './Content';
import {Sustainable} from './Sustainable';

@Table({timestamps: true, tableName: 'contentSustainableDevelopment'})
export class ContentSustainableDevelopment extends Model<
  ContentSustainableDevelopment
> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Content)
  @Column(DataType.INTEGER)
  contentId!: number;

  @ForeignKey(() => Sustainable)
  @Column(DataType.INTEGER)
  sustainableDevelopmentId!: number;

  @Column(DataType.STRING)
  public status!: string;

  @CreatedAt
  readonly createdAt!: Date;

  @UpdatedAt
  readonly updatedAt!: Date;

  @DeletedAt
  readonly deletedAt!: Date;
}
