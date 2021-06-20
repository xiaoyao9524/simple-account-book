const rules = {
  id: [
    { required: true, message: '必须选择要更新的记账项' },
    { type: 'number', message: '记账类型不正确' },
  ],
  categoryType: [
    { required: true, message: '必须选择记账类型' },
    {
      validator: (rule, value, callback) => {
        if (value !== 0 && value !== 1) {
          callback({ message: '记账类型不正确' });
          return;
        }
        callback();
      },
    },
  ],
  categoryId: [
    { required: true, message: '必须选择分类' },
    { type: 'number', message: '分类类型不正确' },
  ],
  price: [
    { required: true, message: '必须输入价格' },
    {
      validator: (rule, value, callback) => {
        console.log('校验价格：', value);
        const type = typeof value;

        switch (type) {
          case 'number': {
            return callback();
          }
          case 'string': {
            const priceReg = /^\d+(\.?\d+)?$/;
            if (!priceReg.test(value)) {
              return callback({ message: '价格格式不正确1' });
            }
            return callback();
          }
          default: {
            callback({ message: '价格格式不正确2' });
            return;
          }
        }
      },
    },
  ],
  billTime: [
    { required: true, message: '必须选择记账日期' },
    { pattern: /^\d{4}-\d{2}-\d{2}$/, message: '记账日期格式必须为YYYY-MM-DD格式' },
  ],
};

export default rules;
