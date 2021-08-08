import React, { FC, useState, useEffect, useCallback } from 'react';

// ui
import { List, WingBlank, Button, Modal } from 'antd-mobile';

// style
import './index.scss';

const { alert } = Modal;

// 临时
const list = [
  {
    date: '2021-08-05',
    list: [
      {
        id: 1,
        category: {
          id: 2,
          categoryType: 1,
          title: '餐饮',
          icon: 'canyin',
          isDefault: 1,
        },
        categoryType: 1,
        price: 8,
        billTime: '2021-08-05',
        remark: '早饭',
      },
      {
        id: 2,
        category: {
          id: 2,
          categoryType: 1,
          title: '餐饮',
          icon: 'canyin',
          isDefault: 1,
        },
        categoryType: 1,
        price: 15,
        billTime: '2021-08-05',
        remark: '午饭',
      },
    ],
  },
];

const DeleteCategoryAndBill: FC = () => {
  return (
    <div className="delete-category-and-bill">
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
                    <List.Item
                      extra={`${item.categoryType === 1 ? '-' : ''}${
                        item.price
                      }`}
                      onClick={(e) => console.log(e)}
                    >
                      {item.remark || item.category.title}
                    </List.Item>
                ))}
              </List>
            ))}
            <WingBlank className="btn-wrapper">
              <Button type="warning">删除全部</Button>
            </WingBlank>
          </div>
    </div>
  )
};

export default DeleteCategoryAndBill;
