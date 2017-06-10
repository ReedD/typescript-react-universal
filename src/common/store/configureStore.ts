import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from '../actions';
import rootReducer from '../reducers';

const epicMiddleware = createEpicMiddleware(rootEpic);
const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);

export default function configureStore(initialState?: any) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
