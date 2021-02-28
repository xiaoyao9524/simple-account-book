import { Service } from 'egg';

import { TokenParseProps } from '../types/base';
import { InsertBillRequestProps } from '../types/bill';
import { Op } from 'sequelize';

class BillService extends Service {
  // 新增记账
  async insertBill(billItem: InsertBillRequestProps) {
    const { ctx } = this;
    const tokenParse: TokenParseProps = ctx.state.tokenParse;
    try {
      const insertData = {
        ...billItem,
        uId: tokenParse.id,
        price: Number(Number(billItem.price).toFixed(2)),
      };

      const result = await ctx.model.Bill.create(insertData);

      return result;
    } catch (err) {
      return null;
    }
  }

  // 按照时间范围查找列表
  async getBillListByDate(startDate: string, endDate: string) {
    const { ctx } = this;
    try {
      const result = await ctx.model.Bill.findAll({
        where: {
          billTime: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      return result;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  // 删除记账
  async deleteBill(id: number) {
    try {
      const result = await this.ctx.model.Bill.destroy({
        where: {
          id,
        },
      });

      return result;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  }
}

export default BillService;
