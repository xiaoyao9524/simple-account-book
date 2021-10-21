import React, { FC, useState, useEffect, useCallback, useMemo } from 'react';

// hooks
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useQuery from '@/hooks/useQuery';

// ui
import { List, Button, Modal, Toast } from 'antd-mobile';

// request
import {
  getBillListByCategoryId,
  deleteCategoryAndBill,
} from '@/api/category';

// types
import { BillItem } from '@/types/bill';

// action
import { actionTypes as UserActionTypes } from '@/store/reducers/modules/user';

// style
import './index.scss';

interface BillListItem {
  date: string;
  list: BillItem[];
}

const { alert } = Modal;

const DeleteCategoryAndBill: FC = (props) => {
  const query = useQuery() as {
    categoryId?: string;
  };

  const dispatch = useDispatch();
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

  const handlerDelete = useCallback(async (categoryId: number) => {
    console.log('del: ', categoryId);

    try {
      const res = await deleteCategoryAndBill(categoryId);

      if (res.data.status === 200 && res.data.data) {
        
        dispatch({
          type: UserActionTypes.UPDATE_USER_CATEGORY,
        });

        history.goBack();

      } else {
        Toast.fail(res.data.message);
      }
    } catch (err) {
      Toast.fail(err.message);
    }
  }, []);

  const showAlert = useCallback(() => {
    alert('警告', '确定要删除该分类以及该分类下全部记账信息吗？', [
      {
        text: '确定',
        onPress: () => {
          handlerDelete(Number(query.categoryId));
        },
      },
    ]);
  }, [handlerDelete, query]);

  return (
    <div className="delete-category-and-bill">
      <div className="book-list-wrapper">
        {renderList.map((billItem) => (
          <List
            key={billItem.date}
            className="my-list"
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
          >
            {billItem.list.map((item) => (
              <List.Item
                key={item.id}
                extra={`${item.categoryType === 1 ? '-' : ''}${item.price}`}
              >
                {item.remark || item.category.title}
              </List.Item>
            ))}
          </List>
        ))}
        <div className="btn-wrapper">
          <Button type="warning" onClick={showAlert}>
            删除全部
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryAndBill;
