import React, { FC, useState, useEffect, useCallback, useMemo } from 'react';

// hooks
import useQuery from '../../hooks/useQuery';
// ui
import { List, WingBlank, Button, Modal, Toast } from 'antd-mobile';

// request
import { getBillListByCategoryId } from '../../api/category';

// types
import { BillItem } from '../../types/bill';

// style
import './index.scss';
import { useLocation, useHistory } from 'react-router-dom';

interface BillListItem {
  date: string;
  list: BillItem[];
}

const { alert } = Modal;

const DeleteCategoryAndBill: FC = (props) => {
  const query = useQuery() as {
    categoryId?: string;
  };

  const history = useHistory();

  if (!query.categoryId) {
    history.goBack();
  }

  const [list, setList] = useState<BillItem[]>([]);

  const fetchBillList = useCallback(async () => {
    try {
      const res = await getBillListByCategoryId({
        categoryId: Number(query.categoryId),
      });

      if (res.data.status === 200) {
        setList(res.data.data.billList);
      } else {
        Toast.fail(res.data.message);
      }
    } catch (err) {
      Toast.fail(err.message);
    }
  }, [query.categoryId]);

  useEffect(() => {
    fetchBillList();
  }, []);

  // 将接口数据转化为可渲染的格式
  
  const handlerList = useCallback((list: BillItem[]) => {
    const obj = {} as {
      [key: string]: any;
    };

    for (let item of list) {
      if (obj[item.billTime]) {
        obj[item.billTime].push(item);
      } else {
        obj[item.billTime] = [item];
      }
    }

    const keys = Object.keys(obj);

    const ret: BillListItem[] = keys
      .map((key) => ({
        date: key,
        list: obj[key],
      }))
      .sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

    return ret;
  }, []);

  const renderList = useMemo(() => {
    return handlerList(list);
  }, [handlerList, list]);

  console.log('renderList: ', renderList);
  

  return (
    <div className="delete-category-and-bill">
      <div className="book-list-wrapper">
        {renderList.map((billItem) => (
          <List
            key={billItem.date}
            renderHeader={() => (
              <div className="bill-item-header">
                <p className="date">{billItem.date}</p>
                <p className="price-total">
                  {billItem.list
                    .map((i) => (i.categoryType === 0 ? i.price : -i.price))
                    .reduce((total, num) => total + num)}
                </p>
              </div>
            )}
            className="my-list"
          >
            {billItem.list.map((item) => (
              <List.Item
                extra={`${item.categoryType === 1 ? '-' : ''}${item.price}`}
              >
                {item.remark || item.category.title}
              </List.Item>
            ))}
          </List>
        ))}
        <div className="btn-wrapper">
          <Button type="warning">删除全部</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryAndBill;
