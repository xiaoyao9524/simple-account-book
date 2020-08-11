import React, { Component } from 'react';
import { WingBlank, WhiteSpace, Card, SwipeAction, List } from 'antd-mobile';


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
]

class Home extends Component {
  render() {
    return (
      <div className="home">
        <header className="head-container">
          <ul className="header-list">
            <li className="header-item date-item">
              <p className="title">2020年</p>
              <p className="value">8月 <span className="icon iconfont icon-down"></span></p>
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
        {/* <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <Card>
            <Card.Header
              title="简单记账"
              extra={<span>简单好用的记账工具</span>}
            />
            <Card.Body>
              <div>2020-08-20</div>
            </Card.Body>
            <Card.Footer
              content={<div>收入：1234567.89</div>}
              extra={<div>支出：1234567.89</div>}
            />
          </Card>
          <WhiteSpace size="lg" />
        </WingBlank> */}

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
                        onPress: () => console.log('cancel'),
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
    )
  }
}

export default Home;
