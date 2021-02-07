import React, { useState } from 'react';

import { IStoreState } from '../../store/reducers';
import { useSelector } from 'react-redux';
import { UserInfo } from '../../types/user';

import moment, { Moment } from 'moment';
// import { useLocation } from 'react-router-dom';

import { NoticeBar, SwipeAction, List, DatePicker } from 'antd-mobile';
import TabBar from '../../components/TabBar';
import NoLogin from '../../components/NoLogin';

import './style.scss';

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

const mobileNoticBar = (
  <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
    请使用移动模式/设备打开此页以获得更好的体验。
  </NoticeBar>
);

const Home = () => {
  // const location = useLocation();
  const isMobile = useSelector<IStoreState, boolean>(state => state.system.isMobile);
  const userInfo = useSelector<IStoreState, UserInfo>(state => state.user.userInfo);

  const [date, setDate] = useState<Moment>(moment());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [year, month] = date.format('YYYY-MM').split('-');

  return (
    <div className="home">
      {
        userInfo.username === '' ? <NoLogin /> : (
          <div>
            {isMobile ? null : mobileNoticBar}
            <header className="head-container">
              <ul className="header-list">
                <li
                  className="header-item date-item"
                  onClick={() => { setDatePickerVisible(true) }}
                >
                  <p className="title">{year}年</p>
                  <p className="value">{month}月<span className="icon iconfont-base icon-down"></span></p>
                </li>
                <li className="header-item">
                  <p className="title">收入</p>
                  <p className="value">12345.67</p>
                </li>
                <li className="header-item">
                  <p className="title">支出</p>
                  <p className="value">12345.67</p>
                </li>
              </ul>
            </header>

            <div className="book-list-wrapper">
              {
                list.map(bookItem => (
                  <List
                    key={bookItem.id}
                    renderHeader={() => bookItem.date}
                    className="my-list"
                  >
                    {
                      bookItem.list.map(item => (
                        <SwipeAction
                          key={item.id}
                          style={{ backgroundColor: 'gray' }}
                          autoClose
                          right={[
                            {
                              text: '编辑',
                              onPress: () => console.log('edit'),
                              style: { backgroundColor: '#1890ff', color: 'white' },
                            },
                            {
                              text: '删除',
                              onPress: () => console.log('delete'),
                              style: { backgroundColor: '#F4333C', color: 'white' },
                            },
                          ]}
                        >
                          <List.Item
                            extra={`${item.type === '收入' ? '-' : ''}${item.price}`}
                            onClick={e => console.log(e)}
                          >
                            {item.category}
                          </List.Item>
                        </SwipeAction>
                      ))
                    }
                  </List>
                ))
              }
            </div>


            <DatePicker
              mode="month"
              visible={datePickerVisible}
              value={date.toDate()}
              onOk={date => {
                setDate(moment(date));
                setDatePickerVisible(false);
              }}
              onDismiss={() => {
                setDatePickerVisible(false);
              }}
            />
          </div>
        )
      }
      <TabBar />
    </div>
  )
}

export default Home;
