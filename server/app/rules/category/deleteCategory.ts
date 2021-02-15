const rules = {
  id: [
    {required: true, message: '必须输入要删除的分类id'},
    {type: 'number', message: 'id必须为数字类型'}
  ]
}

export default rules;