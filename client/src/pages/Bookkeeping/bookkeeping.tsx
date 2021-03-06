import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { IStoreState } from '../../store/reducers';

/** components */
import { SegmentedControl, Toast } from 'antd-mobile';
import NavBar from '../../components/NavBar';
import NoLogin from '../../components/NoLogin/noLogin';
import Calculator, { ICalculatorOnConfirmResult } from '../../components/Calculator/calculator';

/** type */
import { UserInfo } from '../../types/user';
import { CategoryItem } from '../../types/category';
import { InsertBillProps } from "../../types/bill";

/** request */
import { insertBill } from "../../api/bill";

/** style */
import './style.scss';

type tabs = '支出' | '收入';
const tabList = ['支出', '收入'];

enum tabEnum {
  '收入',
  '支出'
}

const Bookkeeping = () => {
  const history = useHistory();
  const userInfo = useSelector<IStoreState, UserInfo>(state => state.user.userInfo);
  const expenditureIcons = useSelector<IStoreState, CategoryItem[]>(state => state.user.userInfo.category.expenditureList);
  const incomeIcons = useSelector<IStoreState, CategoryItem[]>(state => state.user.userInfo.category.incomeList);
  const [tab, setTab] = useState<tabs>('支出');

  const [category, setCategory] = useState<CategoryItem>(tab === '支出' ? expenditureIcons[0] : incomeIcons[0]);

  const currentIcons = tab === '收入' ? incomeIcons : expenditureIcons;

  function handlerConfirm(calculatorResult: ICalculatorOnConfirmResult) {
    const { price, date, remark } = calculatorResult;

    const insertBillData = {
      categoryType: tabEnum[tab],
      categoryId: category.id,
      price,
      billTime: date,
      remark
    }

    _insertBill(insertBillData);
  }

  async function _insertBill (insertBillData: InsertBillProps) {
    try {
      const res = await insertBill(insertBillData);

      if (res.data.status === 200) {
        history.goBack();
      } else {
        Toast.fail(res.data.message);
      }
    } catch (err) {
      Toast.fail(err.message);
    }
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
