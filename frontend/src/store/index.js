import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/authReducer';
import threadReducer from './reducers/threadReducer';
import searchReducer from './reducers/searchReducer';
import { watchAuth, watchThread, watchSearch } from './sagas';


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const rootReducer = combineReducers({
  auth: authReducer,
  thread: threadReducer,
  search: searchReducer
});

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
  // other store enhancers if any
);

const store = createStore(
  rootReducer,
  enhancer
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchThread);
sagaMiddleware.run(watchSearch);

export default store;

