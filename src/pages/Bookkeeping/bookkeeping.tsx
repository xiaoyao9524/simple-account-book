import React, { useState, useEffect } from 'react'
import { SegmentedControl } from 'antd-mobile';
import NavBar from '../../components/NavBar';
import {
  useDispatch
} from 'react-redux';
import {
  actionCreators as SystemActionCreators
} from '../../store/reducers/modules/system';
import Calculator from '../../components/Calculator';
type tabs = '收入' | '支出';
const tabList = ['收入', '支出'];

// 收入icons
const incomeIcons = [
  { title: '餐饮', icon: 'canyin' },
  { title: '超市', icon: 'chaoshi' },
  { title: '水果', icon: 'shuiguo' },
  { title: '日用品', icon: 'riyongpin' },
  { title: '游戏', icon: 'game' },
  { title: '淘宝', icon: 'taobao' },
  { title: '京东', icon: 'jingdong' },
  { title: '数码手机', icon: 'shumashouji' },
  { title: '住房', icon: 'zhufang' },
  { title: '缴费', icon: 'weibiaoti--' },
  { title: '数码', icon: 'shuma' },
  { title: '医疗', icon: 'yiliao' },
  { title: '其它', icon: 'qita' }
];

// 支出icons
const expenditureIcons = [
  { title: '工资', icon: 'gongzi' }, 
  { title: '兼职', icon: 'jianzhi' }, 
  { title: '理财', icon: 'licai' },   
  { title: '礼金', icon: 'lijin' },
  { title: '其它', icon: 'qita' }
];

const Bookkeeping = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SystemActionCreators.setTabbarShowAction(false));
    return () => {
      dispatch(SystemActionCreators.setTabbarShowAction(true));
    }
  });

  const [tab, setTab] = useState<tabs>('收入');

  const [category, setCategory] = useState<string | null>(null);

  const currentIcons = tab === '收入' ? incomeIcons : expenditureIcons;
  return (
    <div className={`bookkeeping ${category === null ? '' : 'calculation-show'}`}>
      <NavBar style={{ position: 'fixed', top: 0, width: '100%' }}>记账</NavBar>

      <div className="tabs">
        <SegmentedControl
          style={{ marginTop: 10 }}
          values={tabList}
          selectedIndex={tabList.indexOf(tab)}
          onChange={e => {
            const tab: tabs = e.nativeEvent.value;
            setCategory(null);
            setTab(tab);
          }}
        />
      </div>

      <div className="icon-box">
        <ul className="icon-list">
          {
            currentIcons.map(i => (
              <li
                className={`icon-item ${i.title === category ? 'active' : ''}`} key={i.title}
                onClick={() => {
                  setCategory(i.title)
                }}
              >

                <div className="icon-container">
                  <span className={`icon iconfont icon-${i.icon}`}></span>
                </div>
                <p className="title">{i.title}</p>
              </li>
            ))
          }
        </ul>
      </div>

      {
        category === null ?
          null :
          <Calculator
            onConfirm={(data) => {
              console.log('data1: ', data);
              console.log('tab: ', tab);
              console.log('category: ', category);
              
            }}
            style={{ position: 'fixed', bottom: 0, zIndex: 1 }} 
          />
      }

    </div>
  )
}

export default Bookkeeping;
