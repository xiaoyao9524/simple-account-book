const rules = {
  categoryId: [
    { required: true, message: '必须选择要添加的分类id' },
    { type: 'number', message: '分类id类型不正确' }
  ]
};

export default rules;
