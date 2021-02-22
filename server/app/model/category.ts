import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';

@Table({
  modelName: 'category',
})
export class Category extends Model<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED
  })
  id: number;

  @Column({
    type: DataType.TINYINT(1),
    comment: '收入0，支出 1',
    field: 'category_type'
  })
  categoryType: number;

  @Column({
    type: DataType.CHAR(20),
    comment: '类别名称'
  })
  title: string;

  @Column({
    type: DataType.CHAR(60),
    comment: 'icon类名'
  })
  icon: string;

  @Column({
    type: DataType.TINYINT(1).UNSIGNED,
    field: 'is_default',
    comment: '是否为默认类别否-0 是-1'
  })
  isDefault: number;

  @Column({
    type: DataType.INTEGER,
    comment: '创建者'
  })
  pid: number;

  @Column({
    type: DataType.DATE(6),
    field: 'create_time',
  })
  createTime: Date;

  @Column({
    type: DataType.DATE(6),
    field: 'update_time',
  })
  updateTime: Date;
}
export default () => Category;
