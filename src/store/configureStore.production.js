import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import { persistStore, autoRehydrate } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import rootReducer from '../reducers';
import { PERSISTENCE_ENABLED } from '../env';

const router = routerMiddleware(hashHistory);

const enhancer = compose(
  PERSISTENCE_ENABLED ? autoRehydrate() : f => f,
  applyMiddleware(
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
