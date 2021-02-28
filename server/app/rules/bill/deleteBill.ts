const rules = {
  id: [
    { required: true, message: '必须选择要删除的明细' },
    { type: 'number', message: '明细格式不正确' },
  ]
};

export default rules;
