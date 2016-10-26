// @flow
import React, { Component } from 'react';
import Notifications from '../components/Notifications';

type Props = {
  children: Array<*>
};

class App extends Component {

  props: Props;

  render() {
    return (
      <div>
        <Notifications />
        {this.props.children}
      </div>
    );
  }
}

export default App;
