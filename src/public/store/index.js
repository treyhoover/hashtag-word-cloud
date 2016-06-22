import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';

/**
 * Initializes the store and enables hot module replacement.
 * @param {object} initialState - The initial state of the store.
 * @return {object} store - A store object.
 */
export default function configureStore(initialState) {
  const middleware = [thunkMiddleware];
  const { environment } = config;
  if (environment === 'development') middleware.push(createLogger());

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware.apply(this, middleware)
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
