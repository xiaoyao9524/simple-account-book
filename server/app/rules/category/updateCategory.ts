function createUpdateCategoryRules (type: string) {
  return [
    {required: true, message: `必须传入${type}id列表`},
    {type: 'array', message: `${type}列表格式不正确`},
    {validator: (rule, val: any[], callback) => {
      for (let item of val) {
        if (typeof item !== 'number') {
          return callback({message: `${type}列表数据格式不正确`});
        }
      }
      callback();
    }}
  ]
}

const rules = {
  expenditureList: createUpdateCategoryRules('支出'),
  incomeList: createUpdateCategoryRules('收入')
}

export default rules;