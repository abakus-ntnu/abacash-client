import React, { PropTypes } from 'react';
import Style from './TabMenu.css';

const TabMenu = (props) => (
  <div className={Style.tabBar}>
    {props.children}
  </div>
);

TabMenu.propTypes = {
  children: PropTypes.array
};

export default TabMenu;
export TabItem from './TabItem';
