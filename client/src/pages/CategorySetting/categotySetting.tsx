import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import arrayMove from 'array-move';

/** components */
import { SegmentedControl, Toast, WingBlank, Button, Modal } from 'antd-mobile';
import { SortableContainer as sortableContainer } from 'react-sortable-hoc';
import NavBar from '../../components/NavBar/navBar';
import CategoryItem from './components/CategoryItem';

/** types */
import { IStoreState } from '../../store/reducers';
import { CategoryItem as ICategoryItemProps } from '../../types/category';
import { AllCategoryListResult } from '../../types/category';

/** request */
import {
  getAllCategoryList,
  updateCategory,
  getBillListByCategoryId,
  deleteCategory,
} from '../../api/category';

/** action */
import {
  getUpdateUserCategoryAction,
  getDeleteOneCtegoryAction,
} from '../../store/reducers/modules/user/actionCreator';
/** style */
import './style.scss';

const alert = Modal.alert;

type tabs = '支出' | '收入';
const tabList = ['支出', '收入'];

const SortableContainer = sortableContainer(({ children }: any) => {
  return <ul className="current-category-list">{children}</ul>;
});

const CategorySetting = () => {
  const [tab, setTab] = useState<tabs>('支出');
  // 当前用户已有的分类(store)
  const expenditureIcons = useSelector<IStoreState, ICategoryItemProps[]>(
    (state) => state.user.userInfo.category.expenditureList
  );
  const incomeIcons = useSelector<IStoreState, ICategoryItemProps[]>(
    (state) => state.user.userInfo.category.incomeList
  );

  // 当前用户所有的分类(接口获取，包括启用的和未启用的) 
  const [allExpenditureCategoryList, setAllExpenditureCategoryList] = useState<ICategoryItemProps[]>([]);
  const [allIncomeCategoryList, setAllIncomeCategoryList] = useState<ICategoryItemProps[]>([]);

  // 备份store中的数据（不能直接操作store中的数据）
  const [currentExpenditureList, setCurrentExpenditureList] = useState([
    ...expenditureIcons
  ]);
  const [currentIncomeList, setCurrentIncomeList] = useState([...incomeIcons]);

  // 当前未选择的数据
  /** !memo */
  const [noSelectExpenditureList, setNoSelectExpenditureList] = useState<
    ICategoryItemProps[]
  >([]);
  /** !memo */
  const [noSelectIncomeList, setNoSelectIncomeList] = useState<
    ICategoryItemProps[]
  >([]);

  // 当前显示的数据
  /** !memo */
  const [currentIcons, setCurrentIcons] = useState<ICategoryItemProps[]>([]);
  /** !memo */
  const [currentNoSelectIcons, setCurrentNoSelectIcons] = useState<
    ICategoryItemProps[]
  >([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentIcons(
      tab === '支出' ? [...currentExpenditureList] : [...currentIncomeList]
    );
    setCurrentNoSelectIcons(
      tab === '支出' ? [...noSelectExpenditureList] : [...noSelectIncomeList]
    );
  }, [
    tab,
    currentExpenditureList,
    currentIncomeList,
    noSelectExpenditureList,
    noSelectIncomeList,
  ]);

  

  /** 拖拽排序结束回调 */
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const newItems = arrayMove(currentIcons, oldIndex, newIndex);
    setCurrentIcons(newItems);
    tab === '支出'
      ? setCurrentExpenditureList(newItems)
      : setCurrentIncomeList(newItems);
  };

  // 转换列表数据
  const handlerListData = useCallback(
    (category: AllCategoryListResult) => {
      const { expenditureList, incomeList } = category;

      // 当前分类id列表
      const currentExpenditureIdList = currentExpenditureList.map((i) => i.id);
      const currentIncomeIdList = currentIncomeList.map((i) => i.id);
      // 不是当前分类列表
      const noSelectExpenditureList: ICategoryItemProps[] = [];
      const noSelectIncomeList: ICategoryItemProps[] = [];

      for (let item of expenditureList) {
        if (!currentExpenditureIdList.includes(item.id)) {
          noSelectExpenditureList.push(item);
        }
      }
      setNoSelectExpenditureList(noSelectExpenditureList);
      for (let item of incomeList) {
        if (!currentIncomeIdList.includes(item.id)) {
          noSelectIncomeList.push(item);
        }
      }
      setNoSelectIncomeList(noSelectIncomeList);
      setCurrentNoSelectIcons(
        tab === '支出' ? [...noSelectExpenditureList] : [...noSelectIncomeList]
      );
    },
    [currentExpenditureList, currentIncomeList, tab]
  );

  // 获取当前用户分类数据
  const fetchAllCategoryList = useCallback(async () => {
    try {
      const res = await getAllCategoryList();

      if (res.data.status === 200) {
        console.log('分类数据: ', res.data.data);
        
        handlerListData(res.data.data);
      } else {
        Toast.fail(res.data.message);
      }
    } catch (err) {
      Toast.fail(err.message);
    }
  }, [handlerListData]);

  useEffect(() => {
    fetchAllCategoryList();
  }, [fetchAllCategoryList]);

  // 处理添加
  function handlerAdd(category: ICategoryItemProps) {
    if (tab === '支出') {
      const newList = [...currentExpenditureList];
      const newNoSelectList = [...noSelectExpenditureList];

      const delIndex = newNoSelectList.findIndex(
        (val) => val.id === category.id
      );

      newNoSelectList.splice(delIndex, 1);
      newList.unshift(category);
      setCurrentExpenditureList(newList);
      setCurrentIcons([...newList]);
      setNoSelectExpenditureList(newNoSelectList);
      setCurrentNoSelectIcons([...newNoSelectList]);
    } else {
      const newList = [...currentIncomeList];
      const newNoSelectList = [...noSelectIncomeList];

      const delIndex = newNoSelectList.findIndex(
        (val) => val.id === category.id
      );

      newNoSelectList.splice(delIndex, 1);
      newList.unshift(category);
      setCurrentIncomeList(newList);
      setCurrentIcons([...newList]);
      setNoSelectIncomeList(newNoSelectList);
      setCurrentNoSelectIcons([...newNoSelectList]);
    }
  }

  // 点击删除， 从当前列表中删除分类
  const handlerDel = useCallback(
    async ({ id }: ICategoryItemProps) => {
      // 弹窗提示如果删除分类，那么需要首先删除该分类下所有记账信息
      if (tab === '支出') {
        const newList = [...currentExpenditureList];

        const newNoSelectList = [...noSelectExpenditureList];

        const category = newList.find((val) => val.id === id);
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

        const category = newList.find((val) => val.id === id);
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
    },
    [
      currentExpenditureList,
      currentIncomeList,
      noSelectIncomeList,
      noSelectExpenditureList,
      currentExpenditureList,
      tab,
    ]
  );

  // 确认删除某分类
  const handlerConfirmDeleteCategory = useCallback(() => {

  }, []);

  // 保存
  async function handlerSave() {
    const params = {
      expenditureList: currentExpenditureList.map((i) => i.id),
      incomeList: currentIncomeList.map((i) => i.id),
    };

    try {
      const res = await updateCategory(params);

      if (res.data.status === 200) {
        dispatch(getUpdateUserCategoryAction(res.data.data));
        Toast.success('保存成功', 1, () => {}, false);
      } else {
        Toast.fail(res.data.message);
      }
    } catch (err) {
      Toast.fail(err.message);
    }
  }

  // 点击删除分类 => 确认
  const handlerDeleteCategory = useCallback(
    async (
      item: ICategoryItemProps,
      alertInstance: {
        close: () => void;
      }
    ) => {
      try {
        const billListRes = await getBillListByCategoryId({
          categoryId: item.id,
        });

        if (billListRes.data.status === 200) {
          const { billList } = billListRes.data.data;
          if (billList.length) {
            return;
          }
        } else {
          Toast.fail(billListRes.data.message);
        }

        const res = await deleteCategory({ id: item.id });

        if (res.data.status === 200) {
          Toast.success(res.data.message);
          dispatch(getDeleteOneCtegoryAction(item));
          fetchAllCategoryList();
        } else {
          Toast.fail(res.data.message);
        }
      } catch (err) {
        Toast.fail(err.message);
      }
      alertInstance.close();
    },
    []
  );

  // 删除弹窗
  const showAlert = (item: ICategoryItemProps) => {
    const alertInstance = alert('删除', `确认删除“${item.title}”吗？`, [
      { text: '取消' },
      {
        text: '确认',
        onPress: async () => {
          handlerDeleteCategory(item, alertInstance);
        },
        style: 'warning',
      },
    ]);
  };

  const history = useHistory();
  const location = useLocation();
  const state = location.state as { tab?: tabs };

  useEffect(() => {
    if (state?.tab) {
      setTab(state.tab);
    }
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  // const currentIcons = useMemo(() => {

  //   return []
  // }, []);

  return (
    <div className="category-setting">
      <NavBar style={{ position: 'fixed', top: 0, zIndex: 5, width: '100%' }}>
        类别设置
      </NavBar>

      <div className="tabs">
        <SegmentedControl
          style={{ marginTop: 10 }}
          values={tabList}
          selectedIndex={tabList.indexOf(tab)}
          onChange={(e) => {
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
              onDelete={(category) => {
                handlerDel(category);
              }}
            />
          ))}
        </SortableContainer>
        <WingBlank style={{ marginTop: 10 }}>
          <Button type="primary" onClick={handlerSave}>
            保存
          </Button>
          <Button
            type="primary"
            style={{ marginTop: 10 }}
            onClick={() => {
              history.push('/insertCategory', {
                type: tab,
              });
            }}
          >
            新增
          </Button>
        </WingBlank>
      </div>

      {currentNoSelectIcons.length > 0 && (
        <div className="category-list-wrapper">
          <h3 className="title">更多类别</h3>
          <ul className="more-category-list">
            {currentNoSelectIcons.map((item) => (
              <li className="category-item" key={item.id}>
                <div
                  className="operation-icon-wrapper"
                  onClick={() => {
                    handlerAdd(item);
                  }}
                >
                  <span className={'icon iconfont-base icon-add'}></span>
                </div>
                <div className="category-icon-wrapper">
                  <span className={`icon iconfont icon-${item.icon}`}></span>
                </div>
                <p className="category-title">{item.title}</p>
                <div className="del-btn-wrapper">
                  {item.isDefault === 1 ? null : (
                    <Button
                      type="warning"
                      inline
                      size="small"
                      onClick={() => {
                        showAlert(item);
                      }}
                    >
                      删除
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategorySetting;
