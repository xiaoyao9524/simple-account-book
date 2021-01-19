import React, { useState } from 'react';
import NavBar from '../../components/NavBar/navBar';
import { SegmentedControl } from 'antd-mobile';
import { SortableContainer as sortableContainer } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import CategoryItem, { CategoryItemProps } from './components/CategoryItem';
// import iconList from '../../utils/iconList';
type tabs = '支出' | '收入';
const tabList = ['支出', '收入'];

const SortableContainer = sortableContainer(({ children }: any) => {
  return <ul className="current-category-list">{children}</ul>;
});

const CategorySetting = () => {
  const [tab, setTab] = useState<tabs>('支出');
  const [items, setItems] = useState<CategoryItemProps[]>([
    { title: '餐饮', icon: 'canyin' },
    { title: '水果', icon: 'shuiguo' },
    { title: '蔬菜', icon: 'shucai' },
    { title: '零食', icon: 'lingshi' },
    { title: '茶', icon: 'cha' },
    { title: '烟酒', icon: 'yanjiu' }
  ])

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const newItems = arrayMove(items, oldIndex, newIndex);
    console.log('newItems: ', newItems);
    setItems(newItems);
  };


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

      <div className="category-list-wrapper">
        <SortableContainer onSortEnd={onSortEnd} useDragHandle>
          {items.map((item, index) => (
            <CategoryItem key={`item-${item.title}`} index={index} title={item.title} icon={item.icon} />
          ))}
        </SortableContainer>
      </div>


      <div className="category-list-wrapper">
        <h3 className="title">更多类别</h3>
        <ul className="more-category-list">
          <li className="category-item">
            <div className="operation-icon-wrapper" onClick={() => { console.log('添加') }}>
              <span className="icon iconfont-base icon-add"></span>
            </div>
            <div className="category-icon-wrapper">
              <span className="icon iconfont icon-cha"></span>
            </div>
            <p className="category-title">分类名称</p>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default CategorySetting;

// category表
/*
[
  {
    id: 1,
    title: '默认1',
    icon: 'xxx',
    isDefault: 1
  },
  {
    id: 2,
    title: '默认2',
    icon: 'xxx',
    isDefault: 1
  },
  {
    id: 3,
    title: '自定义555',
    icon: 'xxx',
    isDefault: 0
  }
];

// category-sort表
[
  {
    pid: 'admin',
    cid: 1,
    sort: 1
  },
  {
    pid: 'admin',
    cid: 2,
    sort: 2
  },
  {
    pid: 'admin',
    cid: 3,
    sort: 3
  },
]
*/
