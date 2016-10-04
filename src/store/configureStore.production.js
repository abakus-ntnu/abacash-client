import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import RavenMiddleware from 'redux-raven-middleware';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import { persistStore, autoRehydrate } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import rootReducer from '../reducers';

const PERSISTENCE_ENABLED = process.env.PERSISTENCE_ENABLED;

const router = routerMiddleware(hashHistory);

const enhancer = compose(
  PERSISTENCE_ENABLED ? autoRehydrate() : (f) => f,
  applyMiddleware(
    RavenMiddleware(process.env.RAVEN_DSN),
    router,
    thunk,
    promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE'] }),
  )
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

  return store;
}
