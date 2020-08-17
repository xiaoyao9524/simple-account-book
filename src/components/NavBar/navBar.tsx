import React from 'react'
import {
  useHistory
} from 'react-router-dom';
import {
  NavBar as AntdNavBar,
  Icon
} from 'antd-mobile';

interface INavBarProps {
  style?: React.CSSProperties;
  onLeftClick?: () => any;
}

const NavBar: React.FC<INavBarProps> = props => {
  const history = useHistory();

  const {style, onLeftClick, children} = props;

  return (
    <AntdNavBar
      mode="light"
      icon={<Icon type="left" />}
      style={{
        maxWidth: 400,
        ...style
      }}
      onLeftClick={() => {
        onLeftClick ? onLeftClick() : history.goBack();
      }}
    >{children}</AntdNavBar>
  )
}

export default NavBar;
