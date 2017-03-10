// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { loadConfig } from '../actions/config';
import { fetchSystem } from '../actions/system';
import Notifications from '../components/Notifications';

type Props = {
  children: any,
  loadConfig: () => Promise<*>,
  fetchSystem: () => Promise<*>,
  system: Object,
  push: () => void,
  path: string,
};

class App extends Component {

  componentDidMount() {
    const { loadConfig, fetchSystem, path } = this.props;
    loadConfig().then(fetchSystem).catch(() => {
      if (path !== '/') {
        return this.props.push('/');
      }
      return Promise.resolve();
    });
  }

  props: Props;

  render() {
    return (
      <div>
        <Notifications />
        {React.cloneElement(this.props.children, {
          system: this.props.system
        })}
      </div>
    );
  }
}

const mapStateToProps = (store, router) => ({
  system: store.system.get('system'),
  path: router.location.pathname
});

const mapDispatchToProps = {
  loadConfig,
  fetchSystem,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
