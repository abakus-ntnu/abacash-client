import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers';

const PERSISTENCE_ENABLED = process.env.PERSISTENCE_ENABLED;

const actionCreators = {
  push,
};

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators,
  }) :
  compose;
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  PERSISTENCE_ENABLED ? autoRehydrate() : (f) => f,
  applyMiddleware(
    thunk,
    router,
    promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE'] }),
    logger
  )
);

export default function configureStore(initialState: Object, onComplete: ?() => void) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (PERSISTENCE_ENABLED) {
    persistStore(store, {
      transforms: [immutableTransform({})],
      whitelist: ['auth'],
    }, onComplete);
  } else {
    setTimeout(onComplete, 50);
  }

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}
