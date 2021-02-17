import Item from 'antd-mobile/lib/popover/Item';
import React from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

import { CategoryItem as ICategoryItemProps } from '../../../types/category';
export interface CategoryItemProps extends ICategoryItemProps {
  onDelete?: (category: ICategoryItemProps) => void;
}

const DragHandle = SortableHandle(() => (<span className="icon iconfont-base icon-sort"></span>));

const CategoryItem: React.FC<CategoryItemProps> = props => {
  const { id, title, icon, categoryType,isDefault, onDelete } = props;

  return (
    <li className="category-item">
      <div
        className="operation-icon-wrapper"
        onClick={() => {
          onDelete && onDelete({
            id,
            categoryType,
            title,
            isDefault,
            icon
          });
        }}
      >
        <span className="icon iconfont-base icon-minus"></span>
      </div>
      <div className="category-icon-wrapper">
        <span className={`icon iconfont icon-${icon}`}></span>
      </div>
      <p className="category-title">{title} {isDefault === 0 ? <span>（自定义）</span> : ''}</p>
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
