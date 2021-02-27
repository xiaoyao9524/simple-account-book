import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { IStoreState } from '../../store/reducers';
import { UserInfo } from '../../types/user';


import { SegmentedControl } from 'antd-mobile';
import NavBar from '../../components/NavBar';
import NoLogin from '../../components/NoLogin/noLogin';

import Calculator, { ICalculatorOnConfirmResult } from '../../components/Calculator/calculator';

/** type */
import { CategoryItem } from '../../types/category';

/** style */
import './style.scss';

type tabs = '支出' | '收入';
const tabList = ['支出', '收入'];

enum tabEnum {
  '收入',
  '支出'
}

console.log('tabEnum: ', tabEnum.收入);


/*
// 支出icons
const expenditureIcons = [
  // 衣
  { title: '服饰', icon: 'fushi' },
  // 食
  { title: '餐饮', icon: 'canyin' },
  { title: '水果', icon: 'shuiguo' },
  { title: '蔬菜', icon: 'shucai' },
  { title: '零食', icon: 'lingshi' },
  { title: '茶', icon: 'cha' },
  { title: '烟酒', icon: 'yanjiu' },
  // 住
  { title: '住房', icon: 'zhufang' },
  { title: '水费', icon: 'shuifei' },
  { title: '电费', icon: 'dianfei' },
  { title: '网费', icon: 'wangluo' },
  { title: '缴费', icon: 'jiaofei' },
  // 行
  { title: '共享单车', icon: 'zixingche' },
  { title: '打车', icon: 'chuzuche' },
  { title: '公交', icon: 'gongjiao' },
  { title: '地铁', icon: 'ditie' },
  { title: '火车', icon: 'huoche' },
  { title: '飞机', icon: 'jipiao' },
  // 娱乐
  { title: '旅行', icon: 'lvxing' },
  { title: '购物', icon: 'gouwu' },
  { title: '淘宝', icon: 'taobao' },
  { title: '京东', icon: 'jingdong' },
  { title: '数码', icon: 'shuma' },
  { title: '游戏', icon: 'game' },
  { title: 'steam', icon: 'steam' },
  { title: 'uplay', icon: 'uplay' },
  { title: 'wegame', icon: 'wegame' },
  { title: 'gog', icon: 'gog' },
  { title: 'epic', icon: 'epic' },
  { title: 'origin', icon: 'origin' },

  // 日常开销
  { title: '超市', icon: 'chaoshi' },
  { title: '日用品', icon: 'riyongpin' },
  { title: '话费', icon: 'huafei' },
  { title: '居家', icon: 'jujia' },
  { title: '汽车', icon: 'qiche' },
  { title: '维修', icon: 'weixiu' },
  // 提升
  { title: '运动', icon: 'yundong' },
  { title: '美容', icon: 'meirong' },
  { title: '书籍', icon: 'shuji' },
  { title: '学习', icon: 'xuexi' },
  // 医疗
  { title: '医疗', icon: 'yiliao' },
  { title: '其它', icon: 'qita' },
  // 家人
  { title: '孩子', icon: 'haizi' },
  { title: '长辈', icon: 'zhangbei' },
  { title: '宠物', icon: 'chongwu' },
  { title: '亲友', icon: 'qinyou' },
  // 人情往来
  { title: '社交', icon: 'shejiao' },
  { title: '礼金', icon: 'lijin' },
  { title: '礼物', icon: 'liwu' },
  { title: '捐赠', icon: 'juanzeng' },
  { title: '转账', icon: 'zhuanzhang' },
  // 工作
  { title: '办公', icon: 'bangong' },
  // 其它
  { title: '彩票', icon: 'caipiao' },
  { title: '快递', icon: 'truck' }
];

// 收入icons
const incomeIcons = [
  { title: '工资', icon: 'gongzi' },
  { title: '闲鱼', icon: 'xianyu' },
  { title: '理财', icon: 'licai' },
  { title: '红包', icon: 'lijin' },
  { title: '兼职', icon: 'jianzhi' },
  { title: '其它', icon: 'qita' }
];
*/
const Bookkeeping = () => {
  const history = useHistory();
  const userInfo = useSelector<IStoreState, UserInfo>(state => state.user.userInfo);
  const expenditureIcons = useSelector<IStoreState, CategoryItem[]>(state => state.user.userInfo.category.expenditureList);
  const incomeIcons = useSelector<IStoreState, CategoryItem[]>(state => state.user.userInfo.category.incomeList);
  const [tab, setTab] = useState<tabs>('支出');

  const [category, setCategory] = useState<CategoryItem>(tab === '支出' ? expenditureIcons[0] : incomeIcons[0]);

  const currentIcons = tab === '收入' ? incomeIcons : expenditureIcons;

  function handlerConfirm(calculatorResult: ICalculatorOnConfirmResult) {
    console.log('calculatorResult: ', calculatorResult);
    console.log('tab: ', tabEnum[tab]);
    console.log('category: ', category);
  }
  return (
    <div className={`bookkeeping ${category === null ? '' : 'calculation-show'}`}>
      <NavBar style={{ position: 'fixed', top: 0, zIndex: 1, width: '100%' }}>记账</NavBar>

      {
        userInfo.username === '' ? <NoLogin /> : (
          <div>
            <div className="tabs">
              <SegmentedControl
                style={{ marginTop: 10 }}
                values={tabList}
                selectedIndex={tabList.indexOf(tab)}
                onChange={e => {
                  const tab: tabs = e.nativeEvent.value;
                  setCategory(tab === '支出' ? expenditureIcons[0] : incomeIcons[0]);
                  setTab(tab);
                }}
              />
            </div>

            <div className="icon-box">
              <ul className="icon-list">
                {
                  currentIcons.map(i => (
                    <li
                      className={`icon-item ${i.title === category.title ? 'active' : ''}`} key={i.title}
                      onClick={() => {
                        setCategory(i)
                      }}
                    >

                      <div className="icon-container">
                        <span className={`icon iconfont icon-${i.icon}`}></span>
                      </div>
                      <p className="title">{i.title}</p>
                    </li>
                  ))
                }
                <li
                  className={`icon-item`}
                  onClick={() => {
                    history.push('/categorySetting', {
                      tab
                    })
                  }}
                >
                  <div className="icon-container">
                    <span className="icon iconfont-base icon-shezhi"></span>
                  </div>
                  <p className="title">设置</p>
                </li>
              </ul>
            </div>

            {
              category === null ?
                null :
                <Calculator
                  onConfirm={(data) => {
                    handlerConfirm(data);
                  }}
                  style={{ position: 'fixed', bottom: 0, zIndex: 1 }}
                />
            }
          </div>

        )
      }



    </div>
  )
}

export default Bookkeeping;
