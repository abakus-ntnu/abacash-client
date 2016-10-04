import React from 'react';
import { IndexLink } from 'react-router';
import classNames from 'classnames';
import Style from './TabMenu.css';

type Props = {
  name: String,
  uri: String,
  active: Boolean,
  onClick: () => void
};

const TabItem = (props: Props) => (
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

export default TabItem;
