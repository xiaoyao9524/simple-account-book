import React, { useState } from 'react';
import NavBar from '../../components/NavBar/navBar';
import { SegmentedControl } from 'antd-mobile';

type tabs = '支出' | '收入';
const tabList = ['支出', '收入'];

const CategorySetting = () => {
  const [tab, setTab] = useState<tabs>('支出');


  return (
    <div className="category-setting">
      <NavBar style={{ position: 'fixed', top: 0, zIndex: 5, width: '100%' }}>类别设置</NavBar>

      <div className="tabs">
        <SegmentedControl
          style={{ marginTop: 10 }}
          values={tabList}
          selectedIndex={tabList.indexOf(tab)}
          onChange={e => {
            const tab: tabs = e.nativeEvent.value;
            setTab(tab);
          }}
        />
      </div>

      <ul className="current-category-list">
        <li className="category-item">
          <div className="operation-icon-wrapper">
            <span className="icon iconfont icon-minus"></span>
          </div>
          <div className="category-icon-wrapper">
            <span className="icon iconfont icon-cha"></span>
          </div>
          <p className="category-title">分类名称</p>
          <div className="drag-sort-wrapper">
            <span className="icon iconfont icon-sort"></span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default CategorySetting;
