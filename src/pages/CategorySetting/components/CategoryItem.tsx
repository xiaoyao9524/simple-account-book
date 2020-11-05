import React from 'react';

import {SortableElement, SortableHandle} from 'react-sortable-hoc';

export interface CategoryItemProps {
  title: string;
  icon: string;
}

const DragHandle = SortableHandle(() => (<span className="icon iconfont-base icon-sort"></span>));

const CategoryItem: React.FC<CategoryItemProps> = ({ title, icon }) => {
  return (
    <li className="category-item">
      <div className="operation-icon-wrapper" onClick={() => { console.log('删除') }}>
      <span className="icon iconfont-base icon-minus"></span>
      </div>
      <div className="category-icon-wrapper">
        <span className={`icon iconfont icon-${icon}`}></span>
      </div>
      <p className="category-title">{title}</p>
      <div className="drag-sort-wrapper">
        <DragHandle />
      </div>
    </li>
  )
}

const SortableItem = SortableElement((props: CategoryItemProps) => (
  <CategoryItem {...props} />
));



export default SortableItem;
