import React, { useState, useRef } from 'react';
import './index.scss';

// eslint-disable-next-line
import { Button } from 'antd-mobile';

type calculationType = null | '+' | '-';

const Calculator: React.FC = () => {
  const [firstPrice, setFirstPrice] = useState<string>('0');
  const [secondPrice, setSecondPrice] = useState<string>('');
  const [calculation, setCalculation] = useState<calculationType>(null);

  // const refCalculation = useRef(calculation);

  function handlerInputNumber(num: number) {
    console.log('输入了数字：', num);
    const isFirst = calculation === null;
    let price = (isFirst ? firstPrice : secondPrice);
    price = ((price === '') || (price === '0')) ? `${num}` : price + num;

    const setPrice = isFirst ? setFirstPrice : setSecondPrice;
    setPrice(price);
  }

  function handlerInputCalculation (inpCalculation: calculationType) {
    console.log('输入了运算符：', inpCalculation);
    // 什么都没有输入
    const firstPriceNumber = parseFloat(firstPrice);
    if (!firstPrice || firstPriceNumber <= 0) {
      return
    }
    // 只输入了firstPrice
    else if (calculation === null || firstPriceNumber <= 0) {
      setCalculation(inpCalculation);
      return
    }
    // 输入了firstPrice 和 secondPrice
    else {
      const secondPriceNumber = parseFloat(secondPrice);
      const price = calculation === '+' ? (firstPriceNumber + secondPriceNumber) : (firstPriceNumber - secondPriceNumber);
      const priceIsInt = String(price).indexOf('.') < 0;
      setFirstPrice(priceIsInt ? `${price}` : price.toFixed(2));
      setSecondPrice('');
      setCalculation(inpCalculation);
    }
  }

  return (
    <div className="calculator">
      <div className="remark-row clearfix">
        <div className="remark-col" >
          <span className="remark-label">备注：</span>
          <input className="remark-inp" />
        </div>
  <div className="calculator-price" >{firstPrice} {calculation || null} {calculation && secondPrice ? secondPrice : null}</div>
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
          <Button className="code-item">
            <span className="icon iconfont icon-rili"></span>&nbsp;今天
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
          <Button className="code-item">.</Button>
          <Button className="code-item">0</Button>
          <Button className="code-item">
            <span className="icon iconfont icon-rili"></span>
          </Button>
          <Button className="code-item" type="primary">完成</Button>
        </div>
      </div>
    </div>
  )
}

export default Calculator;
