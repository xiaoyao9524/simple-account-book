import React, { useState } from 'react'
import { PullToRefresh } from 'antd-mobile';

const initialList: string[] = [];

for (let i = 0; i < 50; i++) {
  initialList.push(`新闻${i}`)
}

const TestPage4 = () => {
  const [list] = useState(initialList);

  return (
    <div className="test-page4">
      <ul>
        {list.map(i => (<li key={i} style={{ height: 30, lineHeight: '30px' }}>{i}</li>))}
      </ul>
    </div>
  )
}

export default TestPage4;
