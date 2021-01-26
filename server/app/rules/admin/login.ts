const rules = {
  username: [
    {required: true, message: '必须传入用户名'},
    {type: 'string', message: '用户名格式不正确'},
    {min: 4, max: 8, message: '用户名长度为4-8位'}
  ],
  password: [
    {required: true, message: '必须传入密码'},
    {type: 'string', message: '密码格式不正确'},
    {min: 6, max: 10, message: '密码长度为6-10位'}
  ]
}

export default rules;
