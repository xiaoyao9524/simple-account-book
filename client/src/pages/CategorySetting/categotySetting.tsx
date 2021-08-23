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
  checkBillByCategoryId,
  deleteCategory,
  updateCurrentUserCategory
} from '../../api/category';

/** action */
import {
  // getUpdateUserCategoryAction,
  getSetUserCategoryAction,
  getDeleteOneCtegoryAction,
} from '../../store/reducers/modules/user/actionCreator';
import {
  actionTypes as UserActionTypes
} from '../../store/reducers/modules/user'

/** style */
import './style.scss';

const alert = Modal.alert;

type tabs = '支出' | '收入';
const tabList = ['支出', '收入'];

const SortableContainer = sortableContainer(({ children }: any) => {
  return <ul className="current-category-list">{children}</ul>;
});

const CategorySetting = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const state = location.state as { tab?: tabs };

  const [tab, setTab] = useState<tabs>('支出');
  // 当前用户已有的分类(store)
  const expenditureIcons = useSelector<IStoreState, ICategoryItemProps[]>(
    (state) => state.user.userInfo.category.expenditureList
  );
  const incomeIcons = useSelector<IStoreState, ICategoryItemProps[]>(
    (state) => state.user.userInfo.category.incomeList
  );

  // 组件中操作的数据，还起到备份store中数据的作用，避免直接操作store中的数据
  const [currentExpenditureList, setCurrentExpenditureList] = useState([
    ...expenditureIcons,
  ]);

  useEffect(() => {
    setCurrentExpenditureList([...expenditureIcons]);
  }, [expenditureIcons]);

  const [currentIncomeList, setCurrentIncomeList] = useState([...incomeIcons]);
  useEffect(() => {
    setCurrentIncomeList([...incomeIcons])
  }, [incomeIcons]);

  // 当前用户所有的分类(接口获取，包括启用的和未启用的)
  const [allExpenditureCategoryList, setAllExpenditureCategoryList] = useState<
    ICategoryItemProps[]
  >([]);
  const [allIncomeCategoryList, setAllIncomeCategoryList] = useState<
    ICategoryItemProps[]
  >([]);

  // 当前显示的列表（选中的和未选的）
  const currentCategory = useMemo<{
    selectedCategory: ICategoryItemProps[];
    noSelectedCategory: ICategoryItemProps[];
  }>(() => {
    const isExpenditrue = tab === '支出';
    const currentCategoryIds = (
      isExpenditrue ? currentExpenditureList : currentIncomeList
    ).map((item) => item.id);

    const noSelectedCategory: ICategoryItemProps[] = (
      isExpenditrue ? allExpenditureCategoryList : allIncomeCategoryList
    ).filter((item) => !currentCategoryIds.includes(item.id));

    return {
      selectedCategory: isExpenditrue
        ? currentExpenditureList
        : currentIncomeList,
      noSelectedCategory,
    };
  }, [
    tab,
    currentExpenditureList,
    currentIncomeList,
    allExpenditureCategoryList,
    allIncomeCategoryList,
  ]);

  /** 拖拽排序结束回调 */
  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      const isExpenditure = tab === '支出';

      const newItems = arrayMove(
        isExpenditure ? currentExpenditureList : currentIncomeList,
        oldIndex,
        newIndex
      );

      isExpenditure
        ? setCurrentExpenditureList(newItems)
        : setCurrentIncomeList(newItems);
    },
    [tab, currentExpenditureList, currentIncomeList]
  );

  // 获取当前用户分类数据(所有的，包括默认分类和用户自定义分类)
  const fetchAllCategoryList = useCallback(async () => {
    try {
      const res = await getAllCategoryList();

      if (res.data.status === 200) {
        const { expenditureList, incomeList } = res.data.data;

        setAllExpenditureCategoryList(expenditureList);
        setAllIncomeCategoryList(incomeList);
      } else {
        Toast.fail(res.data.message);
      }
    } catch (err) {
      Toast.fail(err.message);
    }
  }, []);

  useEffect(() => {
    fetchAllCategoryList();
  }, [fetchAllCategoryList]);

  // 处理添加
  const handlerAdd = useCallback(
    (category: ICategoryItemProps) => {
      // 这里只要把要添加的分类添加到当前分类列表中就可以
      const isExpenditure = tab === '支出';

      const currentSelectedCategoryList = isExpenditure
        ? [...currentExpenditureList]
        : [...currentIncomeList];

      currentSelectedCategoryList.unshift(category);

      isExpenditure
        ? setCurrentExpenditureList(currentSelectedCategoryList)
        : setCurrentIncomeList(currentSelectedCategoryList);
    },
    [tab, currentExpenditureList, currentIncomeList]
  );

  // 跳转删除记账页弹窗
  const toDelBillPage = useCallback((category: ICategoryItemProps) => {
    const operations = [
      {
        text: '取消',
        onPress: () => {},
      },
      {
        text: '确认',
        onPress: () => {
          console.log('删除分类: ', category);
        },
      },
    ];

    alert('警告', '删除类别会同事删除该类别下所有记账信息', operations);
  }, []);

  // 接口请求删除某个分类
  const fetchDeleteCategoryItem = useCallback(
    async (category: ICategoryItemProps) => {
      const { id } = category;

      try {
        const res = await deleteCategory({
          id
        });

        if (res.data.status === 200) {
          // 删除成功，更新用户分类信息
          dispatch({
            type: UserActionTypes.UPDATE_USER_CATEGORY
          })
          // 重新获取当前用户所有的分类信息
          fetchAllCategoryList();
        } else {
          Toast.fail(res.data.message);
        }
        
      } catch (err) {
        Toast.fail(err.message);
      }
  }, [dispatch, fetchAllCategoryList]);

  // 点击删除， 检查当前分类下是否有记账信息
  const handlerDelCategoryClick = useCallback(
    async (category: ICategoryItemProps) => {
      const { id } = category;

      try {
        const res = await checkBillByCategoryId(id);

        if (res.data.status === 200) {
          const { existBill } = res.data.data;

          if (existBill) {
            // 当前分类下有记账信息，跳转删除记账信息页
            toDelBillPage(category);
          } else {
            // 当前分类没有记账信息，处理删除逻辑
            fetchDeleteCategoryItem(category);
          }
        } else {
          Toast.fail(res.data.message);
        }
      } catch (err) {
        Toast.fail(err.message);
      }
    },
    [toDelBillPage, fetchDeleteCategoryItem]
  );

  // 保存
  async function handlerSave() {
    const params = {
      expenditureList: currentExpenditureList.map((i) => i.id),
      incomeList: currentIncomeList.map((i) => i.id),
    };

    try {
      const res = await updateCategory(params);

      if (res.data.status === 200) {
        dispatch(getSetUserCategoryAction(res.data.data));
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

  useEffect(() => {
    if (state?.tab) {
      setTab(state.tab);
    }
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

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
          {currentCategory.selectedCategory.map((item, index) => (
            <CategoryItem
              key={`item-${item.title}`}
              index={index}
              {...item}
              onDelete={(category) => {
                handlerDelCategoryClick(category);
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

      {currentCategory.noSelectedCategory.length > 0 && (
        <div className="category-list-wrapper">
          <h3 className="title">更多类别</h3>
          <ul className="more-category-list">
            {currentCategory.noSelectedCategory.map((item) => (
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
