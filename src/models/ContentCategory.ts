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
import {Category} from './Category';

@Table({timestamps: true, tableName: 'contentCategory'})
export class ContentCategory extends Model<ContentCategory> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Content)
  @Column(DataType.INTEGER)
  contentId!: number;

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  categoryId!: number;

  @Column(DataType.STRING)
  public status!: string;

  @CreatedAt
  readonly createdAt!: Date;

  @UpdatedAt
  readonly updatedAt!: Date;

  @DeletedAt
  readonly deletedAt!: Date;
}
