import {
  AutoIncrement,
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';

@Table({
  modelName: 'bill',
})
export class Bill extends Model<Bill> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED
  })
  id: number;

  @Column({
    field: 'u_id',
    type: DataType.INTEGER.UNSIGNED,
    comment: '创建用户id'
  })
  uId: number;

  @Column({
    field: 'category_id',
    type: DataType.INTEGER.UNSIGNED,
    comment: '类别id，对应category表'
  })
  categoryId: number;

  @Column({
    field: 'category_type',
    type: DataType.SMALLINT(1),
    comment: '收入：0，支出1'
  })
  categoryType: number;

  @Column({
    type: DataType.FLOAT.UNSIGNED,
    comment: '价格'
  })
  price: number;

  @Column({
    field: 'bill_time',
    type: DataType.DATE,
    comment: '记账时间'
  })
  billTime: Date;

  @AllowNull
  @Column({
    type: DataType.CHAR(10),
    comment: '备注'
  })
  remark: string;

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
export default () => Bill;
