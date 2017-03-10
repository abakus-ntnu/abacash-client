// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import ravenMiddleware from 'redux-raven-middleware';
import rootReducer from '../reducers';

const router = routerMiddleware(hashHistory);

const enhancer = compose(
  applyMiddleware(
    ravenMiddleware(process.env.RAVEN_DSN),
    thunk,
    router,
    promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE'] })
  )
);

export default function configureStore(initialState: Object, onComplete: ?() => void) {
  const store = createStore(rootReducer, initialState, enhancer);
  setTimeout(onComplete, 50);
  return store;
}
