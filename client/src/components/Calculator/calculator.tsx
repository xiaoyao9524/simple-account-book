import React, { useState, useImperativeHandle, forwardRef } from 'react';
import './index.scss';

import { Button, List, DatePicker, InputItem } from 'antd-mobile';

// import moment, { Moment } from 'moment';
import dayjs, {Dayjs} from 'dayjs';

type calculationType = null | '+' | '-';

const dateFormat = 'YYYY-MM-DD';

// 判断一个数字是否为整数
function checkNumberIsInt(num: number | string): boolean {
  if (typeof num === 'string') {
    num = parseFloat(num);
  }
  if (isNaN(num)) {
    return false;
  }
  return `${num}`.indexOf('.') < 0;
}

export interface ICalculatorOnConfirmResult {
  date: string;
  remark: string;
  price: string;
}

interface ICalculator {
  onConfirm?: (result: ICalculatorOnConfirmResult) => void;
  style?: React.CSSProperties;
}

export interface CalculatorRefProps {
  setData: (data: SetDataProps, dateFormat?: string) => void;
}

interface SetDataProps {
  date?: string | Dayjs;
  remark?: string;
  price: number | string;
}

const Calculator = forwardRef<CalculatorRefProps, ICalculator>((props, ref) => {
  const { onConfirm, style } = props;
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [remark, setRemark] = useState('');
  // 当前的金额
  const [firstPrice, setFirstPrice] = useState<string>('0');
  // 加或减的金额
  const [secondPrice, setSecondPrice] = useState<string>('');
  // 符号
  const [calculation, setCalculation] = useState<calculationType>(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    setData: (data) => {
      let { date, price, remark } = data;

      if (date !== undefined) {
        setDate((typeof date === 'string' ? dayjs(date) : date))
      }
      
      if (remark !== undefined) {
        setRemark(remark);
      }

      if (price !== undefined) {
        setFirstPrice((typeof price === 'string' ? price : `${price}`));
        setSecondPrice('');
        setCalculation(null);
      }
    }
  }))

  function handlerInputNumber(num: number) {
    const isFirst = calculation === null;
    const isZero = num === 0;
    let price: string;
    if (isZero) {
      let curPrice = isFirst ? firstPrice : secondPrice;
      let floatStr = curPrice.split('.')[1];
      if (floatStr && floatStr.length >= 2) {
        return;
      }
    }

    price = (isFirst ? firstPrice : secondPrice);
    price = ((price === '') || (price === '0')) ? `${num}` : price + num;


    const setPrice = isFirst ? setFirstPrice : setSecondPrice;
    setPrice(price);
  }

  function handlerInputCalculation(inpCalculation: calculationType) {
    const firstPriceNumber = parseFloat(firstPrice);

    const secondPriceNumber = parseInt(secondPrice);
    const isInputSecondPrice = !isNaN(secondPriceNumber);
    // 如果输入了 secondPrice
    if (isInputSecondPrice) {
      const currentPrice = calculation === '+' ? (firstPriceNumber + secondPriceNumber) : (firstPriceNumber - secondPriceNumber);
      const priceStr = checkNumberIsInt(currentPrice) ? `${currentPrice}` : currentPrice.toFixed(2);
      setFirstPrice(priceStr);
      setSecondPrice('');
    }
    setCalculation(inpCalculation);
  }

  function handlerInputPoint() {
    const isInpCalculation = calculation !== null;

    if (!isInpCalculation && firstPrice === '0') {
      setFirstPrice('.');
      return;
    } else if (isInpCalculation && secondPrice === '') {
      setSecondPrice('.');
      return;
    }

    let price = isInpCalculation ? secondPrice : firstPrice;
    if (checkNumberIsInt(price)) {
      price += '.';
      isInpCalculation ? setSecondPrice(price) : setFirstPrice(price);
    }

  }

  function calculationPrice(): string {
    const firstPriceNum = firstPrice === '.' ? 0 : parseFloat(firstPrice);
    const secondPriceNum = (secondPrice === '' || secondPrice === '.') ? 0 : parseFloat(secondPrice);

    let priceNum = 0;
    switch (calculation) {
      case null:
        priceNum = firstPriceNum;
        break;
      case '+':
        priceNum = firstPriceNum + secondPriceNum;
        break;
      case '-':
        priceNum = firstPriceNum - secondPriceNum;
        break;
    }
    const ret = checkNumberIsInt(priceNum) ? `${priceNum}` : priceNum.toFixed(2);
    setFirstPrice(ret);
    setCalculation(null);
    setSecondPrice('');
    return ret;
  }

  function handlerDelete() {
    if (firstPrice !== '0' && calculation === null && !secondPrice) {
      if (firstPrice === '.') {
        setFirstPrice('0');
      } else {
        setFirstPrice(firstPrice.length <= 1 ? '0' : firstPrice.slice(0, firstPrice.length - 1));
      }
    } else
      if (calculation !== null && !secondPrice) {
        setCalculation(null);
      } else {
        setSecondPrice(secondPrice.length <= 1 ? '' : secondPrice.slice(0, secondPrice.length - 1));
      }
  }

  function handlerConfirm() {
    const price = calculationPrice();
    onConfirm && onConfirm({
      date: date.format(dateFormat),
      remark,
      price
    });
  }

  // 判断选择的日期是否为今天
  const dateIsToday = date?.format(dateFormat) === dayjs().format(dateFormat);

  return (
    <div className="calculator" style={style || void 0}>
      <div className="remark-row clearfix">
        <List>
          <InputItem
            clear
            value={remark}
            onChange={val => {
              setRemark(val);
            }}
            placeholder="请输入备注"
          >备注</InputItem>

          <InputItem
            clear
            editable={false}
            value={`${firstPrice} ${calculation || ''} ${calculation && secondPrice ? secondPrice : ''}`}
            placeholder="请输入备注"
          >当前价格</InputItem>
        </List>
      </div>

      <div className="keys-area">
        <div className="keys-row">
          <Button
            className="code-item"
            onClick={() => {
              handlerInputNumber(7);
            }}
          >7</Button>
          <Button
            className="code-item"
            onClick={() => {
              handlerInputNumber(8);
            }}
          >8</Button>
          <Button
            className="code-item"
            onClick={() => {
              handlerInputNumber(9);
            }}
          >9</Button>
          <Button
            className="code-item"
            onClick={() => {
              setDatePickerVisible(true);
            }}
          >
            {
              dateIsToday ? (
                <><span className="icon iconfont icon-rili"></span>&nbsp;今天</>
              ) : date.format(dateFormat)
            }

          </Button>
        </div>
        <div className="keys-row">
          <Button
            className="code-item"
            onClick={() => {
              handlerInputNumber(4);
            }}
          >4</Button>
          <Button
            className="code-item"
            onClick={() => {
              handlerInputNumber(5);
            }}
          >5</Button>
          <Button
            className="code-item"
            onClick={() => {
              handlerInputNumber(6);
            }}
          >6</Button>
          <Button
            className="code-item"
            onClick={() => {
              handlerInputCalculation('+');
            }}
          >+</Button>
        </div>
        <div className="keys-row">
          <Button
            className="code-item"
            onClick={() => {
              handlerInputNumber(1);
            }}
          >1</Button>
          <Button
            className="code-item"
            onClick={() => {
              handlerInputNumber(2);
            }}
          >2</Button>
          <Button
            className="code-item"
            onClick={() => {
              handlerInputNumber(3);
            }}
          >3</Button>
          <Button
            className="code-item"
            onClick={() => {
              handlerInputCalculation('-');
            }}
          >-</Button>
        </div>
        <div className="keys-row">
          <Button
            className="code-item"
            onClick={() => {
              handlerInputPoint();
            }}
          >.</Button>
          <Button
            className="code-item"
            onClick={() => {
              handlerInputNumber(0);
            }}
          >0</Button>
          <Button
            className="code-item"
            onClick={handlerDelete}
          >
            <span className="icon iconfont icon-delete"></span>
          </Button>
          {
            secondPrice === '' ?
              (
                <Button
                  className="code-item"
                  type="primary"
                  onClick={handlerConfirm}
                >完成</Button>
              ) : (
                <Button
                  className="code-item"
                  type="primary"
                  onClick={calculationPrice}
                >=</Button>
              )
          }

        </div>
      </div>
      <DatePicker
        mode="date"
        visible={datePickerVisible}
        value={date.toDate()}
        onOk={date => {
          console.log(date, 222)
          const d1 =  dayjs(date);
          console.log('dayjs: ',d1.format(dateFormat));
          
          setDate(dayjs(date));
          setDatePickerVisible(false);
        }}
        onDismiss={() => {
          setDatePickerVisible(false);
        }}
      />
    </div>
  )
});

export default Calculator;
