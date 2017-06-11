import { combineReducers } from 'redux';
import browser, { IBrowserState } from './browser';

export interface IApplicationState {
  browser: IBrowserState;
}

export default combineReducers({
  browser,
});
