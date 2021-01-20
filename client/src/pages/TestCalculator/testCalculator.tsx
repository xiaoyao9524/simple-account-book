import React, { useState } from 'react';
import {
  Button,
  Modal
} from 'antd-mobile';
import Calculator from '../../components/Calculator/calculator';

const TestCalculator: React.FC = () => {
  const [calculatorShow, setCalculatorShow] = useState(false);
  const [price, setPrice] = useState('0');

  return (
    <div>
      <Button onClick={() => {
        setCalculatorShow(true);
      }}>打开窗口</Button>

      <p>当前价格：{price}</p>
      <Modal
        popup
        transparent
        visible={calculatorShow}
        animationType="slide-up"

      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Calculator
            onConfirm={res => {
              console.log(res);
              const {date, remark, price} = res;
              console.log(date, remark, price);
              setCalculatorShow(false);
              setPrice(price);
            }}
            style={{ maxWidth: 400 }}
          />
        </div>

      </Modal>

    </div>
  )
}

export default TestCalculator;
