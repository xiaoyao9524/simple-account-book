import React, {useState} from 'react';
import {
  Button,
  Modal
} from 'antd-mobile';
import Calculator from '../../components/Calculator';

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
        <Calculator 
        onConfirm={price => {
          console.log(price);
          setCalculatorShow(false);
          setPrice(price);
        }} 
          />
      </Modal>
      
    </div>
  )
}

export default TestCalculator;
