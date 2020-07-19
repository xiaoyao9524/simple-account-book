import React, { useState } from 'react';
import './index.scss';
// eslint-disable-next-line
// import { Row, Col, Input, Button } from 'antd';
// eslint-disable-next-line
import { Button, Modal, DatePickerView } from 'antd-mobile';


// import Calendar from "calendar-lite";

interface CodeInterface {
  code: string;
  icon?: string;
  background?: string;
  onClick?: () => void;
}

// eslint-disable-next-line
const codeMap: CodeInterface[][] = [
  [
    { code: '7' },
    { code: '8' },
    { code: '9' },
    {
      code: '今天',
      icon: 'icon-rili',
      onClick: () => {

      }
    }
  ],
  [
    { code: '4' },
    { code: '5' },
    { code: '6' },
    { code: '+' }
  ],
  [
    { code: '1' },
    { code: '2' },
    { code: '3' },
    { code: '-' }
  ],
  [
    { code: '.' },
    { code: '0' },
    { code: '', icon: 'icon-rili' },
    { code: '完成', background: 'rgb(255, 217, 70)' }
  ]
]

const Calculator: React.FC = () => {
  // const [dateVisible, setdateVisible] = useState(true);
  const [count, setCount] = useState(0);
  return (
    <div className="calculator">
      <Button onClick={() => {
        setCount(count + 1)
      }}>{count}</Button>
      <div className="remark-row clearfix">
        <div className="remark-col" >
          <span className="remark-label">备注：</span>
          <input className="remark-inp" />
        </div>
        <div className="calculator-price" >12345.6789</div>
      </div>

      <div className="keys-area">
        <div className="keys-row">
          <Button className="code-item">7</Button>
          <Button className="code-item">8</Button>
          <Button className="code-item">9</Button>
          <Button className="code-item">
            <span className="icon iconfont icon-rili"></span>&nbsp;今天
          </Button>
        </div>
        <div className="keys-row">
          <Button className="code-item">4</Button>
          <Button className="code-item">5</Button>
          <Button className="code-item">6</Button>
          <Button className="code-item">+</Button>
        </div>
        <div className="keys-row">
          <Button className="code-item">1</Button>
          <Button className="code-item">2</Button>
          <Button className="code-item">3</Button>
          <Button className="code-item">-</Button>
        </div>
        <div className="keys-row">
          <Button className="code-item">.</Button>
          <Button className="code-item">0</Button>
          <Button className="code-item"><span className="icon iconfont icon-rili"></span></Button>
          <Button className="code-item" type="primary">完成</Button>
        </div>
        {/* {
          codeMap.map((row, index) => (
            <div key={index} className="keys-row">
              {
                row.map(code => (
                  <Button
                    className="code-item"
                    key={code.code}
                  >
                    <>
                      {code.icon ?
                        <span className={`icon iconfont ${code.icon}`}>&nbsp;</span> :
                        null}{code.code}
                    </>

                  </Button>
                ))
              }
            </div>
          ))
        } */}
      </div>
    </div>
  )
}

export default Calculator;
