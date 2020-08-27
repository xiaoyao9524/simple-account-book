import React, {useRef} from 'react';
import Calculator, {CalculatorRefProps} from '../../components/Calculator/calculator';

import MyFCComponent, {RefProps} from '../../components/MyFCComponent';
import MyClassComponent from '../../components/MyClassComponent';
import {Button} from 'antd-mobile';
import moment from 'moment';

const TestPage1: React.FC = () => {
  const fcRef = useRef<RefProps>(null);
  const classRef = useRef<MyClassComponent>(null);
  const ref1 = useRef<CalculatorRefProps>(null);
  
  return (
    <div className="test-page1">
      <Calculator ref={ref1} />
      <Button onClick={() => {
        if (ref1.current) {
          ref1.current.setData({
            date: moment('2020-08-22'),
            price: 68,
            remark: '测试设置数据'
          })
        }
      }}>测试ref</Button>
      <h3>测试页面1</h3>
      <MyFCComponent ref={fcRef} firstName="张" lastName="三" />
      <Button
        onClick={() => {
          if (fcRef.current) {
            fcRef.current.showName();
          }
        }}
      >显示姓名</Button>

      <MyClassComponent ref={classRef} age={23} sex="男" />
      <Button
        onClick={() => {
          if (classRef.current) {
            classRef.current.showAge();
          }
        }}
      >显示Age</Button>
    </div>
  )
}

export default TestPage1;
