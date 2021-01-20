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
    field: 'create_time',
  })
  create_time: Date;

  @Column({
    field: 'update_time',
  })
  update_time: Date;
}
export default () => User;
