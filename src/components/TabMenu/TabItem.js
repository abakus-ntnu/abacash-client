import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import classNames from 'classnames';
import Style from './TabMenu.css';

const TabItem = (props) => (
  <div>

    {!props.uri &&
      <div
        onClick={props.onClick}
        className={classNames(Style.tabBarItem, { [Style.tabBarItemActive]: props.active })}
      >
        {props.name}
      </div>
    }

    {props.uri &&
      <IndexLink
        key={props.name}
        to={props.uri}
        activeClassName={Style.tabBarItemActive}
        className={Style.tabBarItem}
      >
      {props.name}
      </IndexLink>
    }

  </div>
);

TabItem.propTypes = {
  children: PropTypes.object,
  name: PropTypes.string.isRequired,
  uri: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func
};

export default TabItem;
