import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";

/** components */
import {
  List,
  InputItem
} from "antd-mobile";
import NavBar from '../../components/NavBar'

/** components */
import {

} from 'antd-mobile';

/** style */
import './style.scss';

const Item = List.Item;
const Brief = Item.Brief

interface ILocalState {
  type?: '支出' | '收入';
}

const expenditure = [
  {
    title: '娱乐',
    list: [
      'shuma',
      'game',
      'steam',
      'uplay',
      'wegame',
      'gog',
      'epic',
      'origin'
    ]
  },
  {
    title: '饮食',
    list: [
      'canyin',
      'shuiguo',
      'shucai',
      'lingshi',
      'cha',
      'yanjiu'
    ]
  },
  {
    title: '医疗',
    list: [
      'yiliao'
    ]
  },
  {
    title: '学习',
    list: [
      'shuji',
      'xuexi'
    ]
  },
  {
    title: '交通',
    list: [
      'zixingche',
      'chuzuche',
      'gongjiao',
      'ditie',
      'huoche',
      'jipiao',
      'qiche',
      'truck'
    ]
  },
  {
    title: '购物',
    list: [
      'fushi',
      'lvxing',
      'gouwu',
      'taobao',
      'jingdong',
      'chaoshi',
      'riyongpin',
      'liwu'
    ]
  },
  {
    title: '生活',
    list: [
      'shuifei',
      'dianfei',
      'wangluo',
      'huafei',
      'meirong'
    ]
  },
  {
    title: '家居',
    list: [
      'zhufang',
      'jujia',
      'weixiu'
    ]
  },
  {
    title: '家庭',
    list: [
      'haizi',
      'zhangbei',
      'chongwu',
      'qinyou'
    ]
  },
  {
    title: '健身',
    list: [
      'yundong'
    ]
  },
  {
    title: '办公',
    list: [
      'bangong'
    ]
  },
  {
    title: '其它',
    list: [
      'jiaofei',
      'qita',
      'shejiao',
      'lijin',
      'juanzeng',
      'zhuanzhang',
      'caipiao'
    ]
  }
]

const InsertCategory = () => {
  const history = useHistory();
  const location = useLocation<ILocalState>();

  const state = location.state;

  useEffect(() => {
    if (!state || !state.type) {
      history.replace('/');
    }
  })

  const categoryType = useState<0 | 1>(state.type === '收入' ? 0 : 1);

  return (
    <div className="insert-category">
      <NavBar style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 5 }}>新增类别</NavBar>
      <List style={{ position: 'fixed', top: 45, left: 0, width: '100%', zIndex: 5 }}>
        <InputItem
          clear
          placeholder="请输入类别名称"
        >类别名称</InputItem>
      </List>
      <ul className="icon-list-wrapper">
        {expenditure.map(i => (
          <li key={i.title} className="icon-list-item">
            <h3 className="icon-title">{i.title}</h3>
            <ul className="icon-list">
              {
                i.list.map(icon => (
                  <li
                    key={icon}
                    className="icon-item"
                    onClick={() => { console.log(icon) }}
                  >
                    <span className={`icon iconfont icon-${icon}`}></span>
                  </li>
                ))
              }
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InsertCategory;
