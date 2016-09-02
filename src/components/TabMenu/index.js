import React from 'react';
import Style from './TabMenu.css';

type Props = {
  children?: Object
};

const TabMenu = (props: Props) => (
  <div className={Style.tabBar}>
    {props.children}
  </div>
);

export default TabMenu;
export TabItem from './TabItem';
