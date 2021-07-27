const rules = {
  categoryId: [
    { required: true, message: '必须输入分类ID' },
    { type: 'number', message: '分类ID格式不正确' }
  ],
};

export default rules;
