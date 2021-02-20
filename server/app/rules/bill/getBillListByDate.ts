/**
  {
    categoryId: 6,
    categoryType: 1,
    price: '5.6',
    billTime: '2021-02-17',
    remark: '备注备注'
  }
 */
const rules = {
  date: [
    { required: true, message: '必须选择查询日期' },
    { type: 'string', message: '查询日期格式不正确' },
    {validator: (rule, val: string, callback) => {
      const validate = /^\d{4}-\d{2}$/.test(val);
      if (!validate) {
        return callback({message: '查询日期格式必须为YYYY-MM格式'})
      }
      callback();
    }}
  ]
};

export default rules;
