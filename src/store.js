// @flow
/* global process */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducer from './reducers';
import INITIAL_STATE from './INITIAL_STATE';
import { init as wsInit } from './actions/websocket';
import { init as postMessageInit } from './actions/postmessage';
import type { State } from './redux/types';

// For those using <https://github.com/zalmoxisus/redux-devtools-extension>.
const composeEnhancers = process.env.NODE_ENV !== 'production'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Ensure that the Symbol action types are properly serialized.
      serialize: true,
    })
    : compose;

const store = createStore<State, {||}, {||}>(
  reducer,
  INITIAL_STATE,
  composeEnhancers(
    applyMiddleware(
      thunk,
      createLogger({
        duration: true,
        predicate: () => process.env.NODE_ENV !== 'production',
        actionTransformer: action => ({
          ...action,
          type: String(action.type),
        }),
      }),
    ),
  ),
);

wsInit(store);
postMessageInit(store);

export default store;
