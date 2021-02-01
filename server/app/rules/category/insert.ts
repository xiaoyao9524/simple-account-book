const rules = {
  categoryType: [
    {required: true, message: '必须选择收入或支出'},
    {type: 'number', message: '类型格式不正确'}
  ],
  title: [
    {required: true, message: '必须输入类别名称'},
    {type: 'string', message: '类别名称格式不正确'}
  ],
  icon: [
    {required: true, message: '必须选择图标类型'},
    {type: 'string', message: '图标类型格式不正确'}
  ]
}

export default rules;
