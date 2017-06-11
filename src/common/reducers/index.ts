import { combineReducers } from 'redux';
import browser, { IBrowserState } from './browser';

// tslint:disable-next-line
export interface IApplicationState {}

export default combineReducers({
  browser,
});
