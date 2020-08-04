import React, { useState } from 'react';
import './index.scss';

// eslint-disable-next-line
import { Button } from 'antd-mobile';

type calculationType = null | '+' | '-';

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

interface ICalculator {
  onConfirm?: (result: string) => void;
}

const Calculator: React.FC<ICalculator> = props => {
  const {onConfirm} = props;
  const [firstPrice, setFirstPrice] = useState<string>('0');
  const [secondPrice, setSecondPrice] = useState<string>('');
  const [calculation, setCalculation] = useState<calculationType>(null);

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
    const secondPriceNum = (secondPrice === '' || secondPrice === '.') ? 0 :parseFloat(secondPrice);

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
      } else  {
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
    onConfirm && onConfirm(price);
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
    </div>
  )
}

export default Calculator;
