import rootEpic from 'actions/rootEpic';
import { History } from 'history';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import rootReducer, { IApplicationState } from 'reducers';
import { applyMiddleware, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

export default function configureStore(
  history: History,
  initialState: IApplicationState,
): Store<IApplicationState> {
  const middleware = [
    createRouterMiddleware(history),
    createEpicMiddleware(rootEpic),
  ];
  if (DEVELOPMENT && CLIENT) {
    middleware.push(createLogger());
  }

  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
}
