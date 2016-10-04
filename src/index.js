import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.css';

type AppState = {
  loading: boolean,
  store: Object
}

class App extends React.Component {

  state: AppState = {
    loading: true,
    store: configureStore({}, () => this.setState({ loading: false })),
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    const history = syncHistoryWithStore(hashHistory, this.state.store);
    return (
      <Provider store={this.state.store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }

}

render(
  <App />,
  document.getElementById('root')
);
