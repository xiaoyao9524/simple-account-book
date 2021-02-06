import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';

@Table({
  modelName: 'user',
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.SMALLINT.UNSIGNED,
    comment: '用户ID'
  })
  id: number;

  @Column({
    type: DataType.CHAR(255),
    comment: '用户头像'
  })
  avatar: string;

  @Column({
    type: DataType.CHAR(20),
    comment: '用户姓名',
  })
  username: string;

  @Column({
    type: DataType.CHAR(32),
    comment: '密码'
  })
  password: string;

  @Column({
    type: DataType.CHAR(255),
    field: 'expenditure_list',
    comment: '支出类型id字符串，使用逗号分隔'
  })
  expenditureList: string;

  @Column({
    type: DataType.CHAR(255),
    field: 'income_list',
    comment: '收入类型id字符串，使用逗号分隔'
  })
  incomeList: string;

  @Column({
    type: DataType.DATEONLY,
    field: 'create_time',
  })
  createTime: Date;

  @Column({
    type: DataType.DATE(6),
    field: 'update_time',
  })
  updateTime: Date;
}
export default () => User;
