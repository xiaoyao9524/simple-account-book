const rules = {
  categoryId: [
    { required: true, message: '必须传入要检查的分类ID' },
    { type: 'number', message: '参数类型不正确' },
  ]
};

export default rules;
