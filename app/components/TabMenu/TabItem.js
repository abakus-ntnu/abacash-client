// @flow
import React from 'react';
import { IndexLink } from 'react-router';
import classNames from 'classnames';
import Style from './TabMenu.css';

type Props = {
  name: string,
  uri?: string,
  active?: boolean,
  disabled?: boolean,
  onClick?: () => void
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
        className={classNames(Style.tabBarItem, { [Style.tabBarItemDisabled]: props.disabled })}
      >
        {props.name}
      </IndexLink>
    }

  </div>
);

export default TabItem;
