import React, {forwardRef, useImperativeHandle} from 'react';

interface IFCProps {
  firstName: string;
  lastName: string;
}

export interface RefProps {
  showName: () => void;
}

const MyFCComponent = forwardRef<RefProps, IFCProps>((props, ref) => {
  console.log(ref);
  const {firstName,lastName} = props;

  useImperativeHandle(ref, () => ({
    showName
  }))

  function showName () {
    console.log('姓名为：', `${firstName}${lastName}`);
  }

  return (
  <div>
    <h4>函数组件</h4>
    <p>Hello {firstName}-{lastName}</p>
  </div>
  )
})

export default MyFCComponent;
