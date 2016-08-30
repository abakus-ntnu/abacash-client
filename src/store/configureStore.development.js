import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import { persistStore, autoRehydrate } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import rootReducer from '../reducers';
import { PERSISTENCE_ENABLED } from '../env';

const actionCreators = {
  push,
};

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

const router = routerMiddleware(hashHistory);

const enhancer = compose(
  PERSISTENCE_ENABLED ? autoRehydrate() : f => f,
  applyMiddleware(
    promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE'] }),
    thunk,
    router,
    logger
  ),
  window.devToolsExtension ? window.devToolsExtension({ actionCreators }) : f => f
);

export default function configureStore(initialState, onComplete) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (PERSISTENCE_ENABLED) {
    persistStore(store, {
      transforms: [immutableTransform({})],
      whitelist: ['auth'],
    }, onComplete);
  } else {
    setTimeout(onComplete, 50);
  }

  if (window.devToolsExtension) {
    window.devToolsExtension.updateStore(store);
  }

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}
