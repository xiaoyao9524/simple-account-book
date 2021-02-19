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
  categoryId: [
    { required: true, message: '必须选择记账类别' },
    { type: 'number', message: '记账类别格式不正确' },
  ],
  categoryType: [
    { required: true, message: '必须必须选择收入或支出' },
    { type: 'number', message: '收入或支出格式不正确' },
    { validator: (rule, val: number, callback) => {
      if (val < 0 || val> 1) {
        return callback({message: '收入或支出只能为 0 或 1'});
      }
      return callback();
    }},
  ],
  price: [
    { required: true, message: '必须输入价格' },
    { type: 'string', message: '价格格式不正确' },
  ],
  billTime: [
    { required: true, message: '必须输入日期' },
    {type: 'string', message: '日期格式不正确'},
    {validator: (rule, val: string, callback) => {
      const isDateStr = /^\d{4}-\d{2}-\d{2}$/.test(val);
      return callback(isDateStr ? undefined : {message: `日期格式必须为'YYYY-MM-DD'`})
    }}
  ],
  remark: [
    {required: false},
    {type: 'string', message: '备注格式不正确'}
  ]
};

export default rules;
