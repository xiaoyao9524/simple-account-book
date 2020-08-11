import React, { Component } from 'react';

type sex = '男' | '女' | '保密';

interface IClassCProps {
  age: number;
  sex: sex;
}

class MyClassComponent extends Component<IClassCProps> {  
  showAge() {
    console.log('年龄为：', this.props.age);
  }

  render() {
    const { age, sex } = this.props;
    return (
      <div>
        <h4>Class组件</h4>
        <p>年龄：{age}</p>
        <p>性别：{sex}</p>
      </div>
    )
  }
}

export default MyClassComponent;
