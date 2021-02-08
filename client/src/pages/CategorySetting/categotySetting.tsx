import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import arrayMove from 'array-move';

/** components */
import { SegmentedControl, Toast, WingBlank, Button } from 'antd-mobile';
import { SortableContainer as sortableContainer } from 'react-sortable-hoc';
import NavBar from '../../components/NavBar/navBar';
import CategoryItem from './components/CategoryItem';

/** types */
import { IStoreState } from '../../store/reducers';
import { CategoryItem as ICategoryItemProps } from '../../types/category';
import { AllCategoryListResult } from "../../types/category";

/** request */
import { getAllCategoryList } from '../../api/category';

/** style */
import './style.scss';


type tabs = '支出' | '收入';
const tabList = ['支出', '收入'];

const SortableContainer = sortableContainer(({ children }: any) => {
  return <ul className="current-category-list">{children}</ul>;
});

const CategorySetting = () => {
  const [tab, setTab] = useState<tabs>('支出');
  // store中的数据
  const expenditureIcons = useSelector<IStoreState, ICategoryItemProps[]>(state => state.user.userInfo.category.expenditureList);
  const incomeIcons = useSelector<IStoreState, ICategoryItemProps[]>(state => state.user.userInfo.category.incomeList);

  // 当前操作的数据
  const [currentExpenditureList, setCurrentExpenditureList] = useState([...expenditureIcons]);
  const [currentIncomeList, setCurrentIncomeList] = useState([...incomeIcons]);

  // 当前未选择的数据
  const [noSelectExpenditureList, setNoSelectExpenditureList] = useState<ICategoryItemProps[]>([]);
  const [noSelectIncomeList, setNoSelectIncomeList] = useState<ICategoryItemProps[]>([]);

  // 当前显示的数据
  const [currentIcons, setCurrentIcons] = useState<ICategoryItemProps[]>([]);
  const [currentNoSelectIcons, setCurrentNoSelectIcons] = useState<ICategoryItemProps[]>([]);

  useEffect(() => {
    setCurrentIcons(tab === '支出' ? [...currentExpenditureList] : [...currentIncomeList]);
    setCurrentNoSelectIcons(tab === '支出' ? [...noSelectExpenditureList] : [...noSelectIncomeList]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  useEffect(() => {
    _getAllCategoryList();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /** function start */
  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const newItems = arrayMove(currentIcons, oldIndex, newIndex);
    setCurrentIcons(newItems);
    tab === '支出' ? setCurrentExpenditureList(newItems) : setCurrentIncomeList(newItems);
    console.log(`新的${tab}列表: `, newItems);
  };

  async function _getAllCategoryList() {
    try {
      const res = await getAllCategoryList();

      if (res.data.status === 200) {
        handlerListData(res.data.data);
      } else {
        Toast.fail(res.data.message);
      }
    } catch (err) {
      Toast.fail(err.message);
    }
  }

  // 处理列表的显示
  function handlerListData(category: AllCategoryListResult) {
    const { expenditureList, incomeList } = category;

    // 当前分类id列表
    const currentExpenditureIdList = currentExpenditureList.map(i => i.id);
    const currentIncomeIdList = currentIncomeList.map(i => i.id);
    // 不是当前分类列表
    const noSelectExpenditureList: ICategoryItemProps[] = [];
    const noSelectIncomeList: ICategoryItemProps[] = [];

    for (let item of expenditureList) {
      if (!(currentExpenditureIdList.includes(item.id))) {
        noSelectExpenditureList.push(item);
      }
    }
    setNoSelectExpenditureList(noSelectExpenditureList);
    for (let item of incomeList) {
      if (!(currentIncomeIdList.includes(item.id))) {
        noSelectIncomeList.push(item);
      }
    }
    setNoSelectIncomeList(noSelectIncomeList);
    setCurrentNoSelectIcons(tab === '支出' ? [...noSelectExpenditureList] : [...noSelectIncomeList]);
  }

  // 处理添加
  function handlerAdd (category: ICategoryItemProps) {
    console.log('添加: ', category);
    if (tab === '支出') {
      const newList = [...currentExpenditureList];
      const newNoSelectList = [...noSelectExpenditureList];

      const delIndex = newNoSelectList.findIndex(val => val.id === category.id);

      newNoSelectList.splice(delIndex, 1);
      newList.unshift(category);
      setCurrentExpenditureList(newList);
      setCurrentIcons([...newList]);
      setNoSelectExpenditureList(newNoSelectList);
      setCurrentNoSelectIcons([...newNoSelectList]);
    } else {
      const newList = [...currentIncomeList];
      const newNoSelectList = [...noSelectIncomeList];

      const delIndex = newNoSelectList.findIndex(val => val.id === category.id);

      newNoSelectList.splice(delIndex, 1);
      newList.unshift(category);
      setCurrentIncomeList(newList);
      setCurrentIcons([...newList]);
      setNoSelectIncomeList(newNoSelectList);
      setCurrentNoSelectIcons([...newNoSelectList]);
    }
  }

  // 处理删除
  function handlerDel ({id}: ICategoryItemProps) {
    if (tab === '支出') {
      
      const newList = [...currentExpenditureList];

      const newNoSelectList = [...noSelectExpenditureList];

      const category = newList.find(val => val.id === id);
      const delIndex = newList.findIndex((val) => val.id === id);
      

      if (category && delIndex >= 0) {
        newList.splice(delIndex, 1);
        newNoSelectList.unshift(category);

        setCurrentExpenditureList(newList);
        setNoSelectExpenditureList(newNoSelectList);

        setCurrentIcons([...newList]);
        setCurrentNoSelectIcons([...newNoSelectList]);
      }
    } else {
      const newList = [...currentIncomeList];
      const newNoSelectList = [...noSelectIncomeList];
      
      const category = newList.find(val => val.id === id);
      const delIndex = newList.findIndex((val) => val.id === id);

      if (category && delIndex >= 0) {
        newList.splice(delIndex, 1);
        newNoSelectList.unshift(category);

        setCurrentIncomeList(newList);
        setNoSelectIncomeList(newNoSelectList);

        setCurrentIcons([...newList]);
        setCurrentNoSelectIcons([...newNoSelectList]);
      }
    }
  }

  // 保存
  function handlerSave () {
    const ret = {
      expenditureList: currentExpenditureList.map(i => i.id),
      incomeList: currentIncomeList.map(i => i.id)
    }

    console.log('ret: ', ret);
  }

  /** function end */

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
          {currentIcons.map((item, index) => (
            <CategoryItem 
              key={`item-${item.title}`} 
              index={index} 
              {...item}
              onDelete={category => {
                handlerDel(category);
              }}
            />
          ))}
        </SortableContainer>
        <WingBlank style={{ marginTop: 10 }}>
          <Button type="primary" onClick={handlerSave}>保存</Button>
        </WingBlank>
      </div>


      {
        currentNoSelectIcons.length ? (<div className="category-list-wrapper">
        <h3 className="title">更多类别</h3>
        <ul className="more-category-list">
          {
            currentNoSelectIcons.map(item => (
              <li className="category-item" key={item.id}>
                <div className="operation-icon-wrapper" onClick={() => { handlerAdd(item) }}>
                  <span className={'icon iconfont-base icon-add'}></span>
                </div>
                <div className="category-icon-wrapper">
                  <span className={`icon iconfont icon-${item.icon}`}></span>
                </div>
                <p className="category-title">{item.title}</p>
              </li>
            ))
          }

        </ul>
      </div>) : null
      }

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
