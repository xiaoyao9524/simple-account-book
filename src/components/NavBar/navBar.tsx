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
  showBack?: boolean;
  onLeftClick?: () => any;
}

const NavBar: React.FC<INavBarProps> = props => {
  const history = useHistory();

  const {style, onLeftClick, children, showBack = true} = props;
  
  return (
    <AntdNavBar
      mode="light"
      icon={showBack ? <Icon type="left" /> : null}
      style={{
        maxWidth: 400,
        ...style
      }}
      onLeftClick={() => {
        if (!showBack) {return}
        onLeftClick ? onLeftClick() : history.goBack();
      }}
    >{children}</AntdNavBar>
  )
}

export default NavBar;
