import { rootEpic } from 'actions';
import { History } from 'history';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import rootReducer, { IApplicationState } from 'reducers';
import { applyMiddleware, createStore, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

export default function configureStore(
  history: History,
  initialState: IApplicationState,
): Store<IApplicationState> {
  const createStoreWithMiddleware = applyMiddleware(
    createRouterMiddleware(history),
    createEpicMiddleware(rootEpic),
  )(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
}
