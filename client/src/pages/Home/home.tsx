import React, { FC, useState, useEffect } from 'react';

import { IStoreState } from '../../store/reducers';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UserInfo } from '../../types/user';
import { BillItem } from '../../types/bill';

// import moment, { Moment } from 'moment';
import dayjs, { Dayjs } from 'dayjs';
// import { useLocation } from 'react-router-dom';

import { getBillListByDate, deleteBill } from '../../api/bill';

import {
  NoticeBar,
  SwipeAction,
  List,
  DatePicker,
  Toast,
  Modal,
} from 'antd-mobile';
import TabBar from '../../components/TabBar';
import NoLogin from '../../components/NoLogin';

import './style.scss';

const { alert } = Modal;

/*
const list = [
  {
    id: 1,
    date: '2020-08-11',
    list: [
      {
        id: 1,
        type: '支出',
        category: '餐饮',
        price: '10.00',
      },
      {
        id: 2,
        type: '收入',
        category: '红包',
        price: '11.00',
      }
    ]
  },
  {
    id: 2,
    date: '2020-08-10',
    list: [
      {
        id: 3,
        type: '支出',
        category: '餐饮',
        price: '10.00',
      },
      {
        id: 4,
        type: '收入',
        category: '红包',
        price: '11.00',
      }
    ]
  },
  {
    id: 3,
    date: '2020-08-10',
    list: [
      {
        id: 5,
        type: '支出',
        category: '餐饮',
        price: '10.00',
      },
      {
        id: 6,
        type: '收入',
        category: '红包',
        price: '11.00',
      },
      {
        id: 7,
        type: '支出',
        category: '餐饮',
        price: '10.00',
      },
      {
        id: 8,
        type: '收入',
        category: '红包',
        price: '11.00',
      },
      {
        id: 9,
        type: '支出',
        category: '餐饮',
        price: '10.00',
      },
      {
        id: 10,
        type: '收入',
        category: '红包',
        price: '11.00',
      },
      {
        id: 11,
        type: '支出',
        category: '餐饮',
        price: '10.00',
      },
      {
        id: 12,
        type: '收入',
        category: '红包',
        price: '11.00',
      },
      {
        id: 13,
        type: '支出',
        category: '餐饮',
        price: '10.00',
      },
      {
        id: 14,
        type: '收入',
        category: '红包',
        price: '11.00',
      },
      {
        id: 15,
        type: '支出',
        category: '餐饮',
        price: '10.00',
      },
      {
        id: 16,
        type: '收入',
        category: '红包',
        price: '11.00',
      },
      {
        id: 17,
        type: '支出',
        category: '餐饮',
        price: '10.00',
      },
      {
        id: 18,
        type: '收入',
        category: '红包',
        price: '11.00',
      },
    ]
  },
]
*/

const mobileNoticBar = (
  <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
    请使用移动模式/设备打开此页以获得更好的体验。
  </NoticeBar>
);

interface BillListItem {
  date: string;
  list: BillItem[];
}

interface IBillBeforeList {
  [key: string]: BillItem[];
}

// 将接口数据转化为可渲染的格式
function handlerList(list: BillItem[]) {
  const obj: IBillBeforeList = {};

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
}

const Home: FC = () => {
  // const location = useLocation();
  const history = useHistory();
  const isMobile = useSelector<IStoreState, boolean>(
    (state) => state.system.isMobile
  );
  const userInfo = useSelector<IStoreState, UserInfo>(
    (state) => state.user.userInfo
  );

  const [date, setDate] = useState<Dayjs>(dayjs());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [incomePrice, setIncomePrice] = useState(0);
  const [expenditurePrice, setExpenditurePrice] = useState(0);
  const [list, setList] = useState<BillListItem[]>([]);
  const [year, month] = date.format('YYYY-MM').split('-');

  useEffect(() => {
    getBillList();
  }, [year, month]); // eslint-disable-line react-hooks/exhaustive-deps

  // 获取列表
  async function getBillList() {
    try {
      const res = await getBillListByDate({
        date: `${year}-${month}`,
      });

      if (res.data.status === 200) {
        let incomePrice = 0;
        let expenditurePrice = 0;
        for (let item of res.data.data.list) {
          if (item.categoryType === 0) {
            incomePrice += item.price;
          } else {
            expenditurePrice += item.price;
          }
        }
        setIncomePrice(incomePrice);
        setExpenditurePrice(expenditurePrice);
        const list = handlerList(res.data.data.list);

        setList(list);
      } else {
        Toast.fail(res.data.message);
      }
    } catch (err) {
      Toast.fail(err.message);
    }
  }

  async function handlerEdit(item: BillItem) {
    history.push('/bookkeeping', item);
  }

  async function handlerDelete(item: BillItem) {
    try {
      const res = await deleteBill({
        id: item.id,
      });

      if (res.data.status === 200) {
        Toast.success('删除成功', 1, () => {}, false);
        getBillList();
      } else {
        Toast.fail(res.data.message);
      }
    } catch (err) {
      Toast.fail(err.message);
    }
  }

  console.log('js: ', JSON.stringify(list));
  

  return (
    <div className="home">
      {userInfo.username === '' ? (
        <NoLogin />
      ) : (
        <div>
          {isMobile ? null : mobileNoticBar}
          <header className="head-container">
            <ul className="header-list">
              <li
                className="header-item date-item"
                onClick={() => {
                  setDatePickerVisible(true);
                }}
              >
                <p className="title">{year}年</p>
                <p className="value">
                  {month}月
                  <span className="icon iconfont-base icon-down"></span>
                </p>
              </li>
              <li className="header-item">
                <p className="title">收入</p>
                <p className="value">{incomePrice.toFixed(2)}</p>
              </li>
              <li className="header-item">
                <p className="title">支出</p>
                <p className="value">{expenditurePrice.toFixed(2)}</p>
              </li>
            </ul>
          </header>

          <div className="book-list-wrapper">
            {list.map((billItem) => (
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
                  <SwipeAction
                    key={item.id}
                    style={{ backgroundColor: 'gray' }}
                    autoClose
                    right={[
                      {
                        text: '编辑',
                        onPress: () => handlerEdit(item),
                        style: { backgroundColor: '#1890ff', color: 'white' },
                      },
                      {
                        text: '删除',
                        onPress: () => {
                          alert('删除', '你确定要删除该项吗？', [
                            { text: '取消' },
                            {
                              text: '确定',
                              onPress: () => {
                                handlerDelete(item);
                              },
                            },
                          ]);
                        },
                        style: { backgroundColor: '#F4333C', color: 'white' },
                      },
                    ]}
                  >
                    <List.Item
                      extra={`${item.categoryType === 1 ? '-' : ''}${
                        item.price
                      }`}
                      onClick={(e) => console.log(e)}
                    >
                      {item.remark || item.category.title}
                    </List.Item>
                  </SwipeAction>
                ))}
              </List>
            ))}
          </div>

          <DatePicker
            mode="month"
            visible={datePickerVisible}
            value={date.toDate()}
            onOk={(date) => {
              setDate(dayjs(date));
              setDatePickerVisible(false);
            }}
            onDismiss={() => {
              setDatePickerVisible(false);
            }}
          />
        </div>
      )}
      <TabBar />
    </div>
  );
};

export default Home;
