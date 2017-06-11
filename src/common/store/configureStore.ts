import { rootEpic } from 'actions';
import rootReducer from 'reducers';
import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware(rootEpic);
const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);

export default function configureStore(initialState?: any) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
