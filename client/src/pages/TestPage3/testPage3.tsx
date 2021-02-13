import React, { useState } from 'react'
import { SegmentedControl } from 'antd-mobile';
import NavBar from '../../components/NavBar';
import Calculator from '../../components/Calculator/calculator';
type tabs = '收入' | '支出';
const tabList = ['收入', '支出'];

// 收入icons
const incomeIcons = [
  // ----- default -----

  // 衣👇
  { title: '服饰', icon: 'fushi' },

  // 食👇
  { title: '餐饮', icon: 'canyin' },
  { title: '水果', icon: 'shuiguo' },
  { title: '蔬菜', icon: 'shucai' },
  { title: '零食', icon: 'lingshi' },
  { title: '茶', icon: 'cha' },
  { title: '烟酒', icon: 'yanjiu' },


  // 住👇
  { title: '住房', icon: 'zhufang' },
  { title: '水费', icon: 'shuifei' },
  { title: '电费', icon: 'dianfeifuwu' },
  { title: '网费', icon: 'wangluo' },

  { title: '缴费', icon: 'jiaofei' },

  // 行👇
  { title: '共享单车', icon: 'zixingche' },
  { title: '打车', icon: 'chuzuche' },
  { title: '公交', icon: 'gongjiao' },
  { title: '地铁', icon: 'ditie' },
  { title: '火车', icon: 'huoche' },
  { title: '飞机', icon: 'jipiao' },

  // 娱乐👇
  { title: '旅行', icon: 'lvxing' },
  { title: '购物', icon: 'gouwu' },

  { title: '淘宝', icon: 'taobao' },
  { title: '京东', icon: 'jingdong' },
  { title: '数码', icon: 'shuma' },
  { title: 'steam', icon: 'steam' },
  { title: 'uplay', icon: 'uplay' },
  { title: 'wegame', icon: 'wegame' },
  { title: 'gog', icon: 'gog' },
  { title: 'epic', icon: 'epic' },
  { title: 'origin', icon: 'origin' },

  { title: '游戏', icon: 'game' },

  // 日常开销👇
  { title: '超市', icon: 'chaoshi' },
  { title: '日用品', icon: 'riyongpin' },
  { title: '话费', icon: 'huafei' },
  { title: '居家', icon: 'jujia' },
  { title: '汽车', icon: 'qiche' },
  { title: '维修', icon: 'weixiu' },
  // 提升👇
  { title: '运动', icon: 'yundong' },
  { title: '美容', icon: 'meirong' },
  { title: '书籍', icon: 'shuji' },
  { title: '学习', icon: 'xuexi' },

  // 医疗👇
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
  { title: '快递', icon: 'truck' },

];

// 支出icons
const expenditureIcons = [
  { title: '工资', icon: 'gongzi' },
  { title: '闲鱼', icon: 'xianyu' },
  { title: '理财', icon: 'licai' },
  { title: '礼金', icon: 'lijin' },
  { title: '兼职', icon: 'jianzhi' },
  { title: '其它', icon: 'qita' }
];

const testList = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]

const Bookkeeping = () => {
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

      <h3>图标测试{testList.length}</h3>
      <div className="icon-box">
        <ul className="icon-list">
          {
            testList.map(i => (
              <li
                className={`icon-item`} key={i}
                
              >
                <div className="icon-container">
                  <span className={`icon iconfont icon-${i}`}></span>
                </div>
                <p className="title">{i}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Bookkeeping;
