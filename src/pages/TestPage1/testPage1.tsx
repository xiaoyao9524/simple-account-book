import React, {useRef} from 'react';
import Calculator from '../../components/Calculator'
import MyFCComponent, {RefProps} from '../../components/MyFCComponent';
import MyClassComponent from '../../components/MyClassComponent';
import {Button} from 'antd-mobile';

const TestPage1: React.FC = () => {
  const fcRef = useRef<RefProps>(null);
  const classRef = useRef<MyClassComponent>(null);
  return (
    <div className="test-page1">
      <Calculator />
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
