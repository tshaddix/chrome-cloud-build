import {createStore, applyMiddleware} from 'redux';
import {alias} from 'react-chrome-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import aliases from '../aliases';

const logger = createLogger();
const middleware = [alias(aliases), thunk, logger];

export default (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
};