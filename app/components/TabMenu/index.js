import React from 'react';
import Style from './TabMenu.css';

class TabMenu extends React.Component {

  render() {
    return (
      <div className={Style.tabBar}>
        <div className={`${Style.tabBarItem} ${Style.tabBarItemActive}`}>
          Test 1
        </div>
        <div className={Style.tabBarItem}>
          Test 2
        </div>
      </div>
    );
  }

}

export default TabMenu;
