import * as ActionType from 'constants/actionTypes';
import { FormEvent } from 'react';
import { Action } from 'redux';

export interface ISignUpAction extends Action {
  value: string;
}

export function updateEmail(e: FormEvent<{}>, value: string): ISignUpAction {
  return {
    type: ActionType.SIGNUP_UPDATE_EMAIL,
    value,
  };
}

export function updateName(e: FormEvent<{}>, value: string): ISignUpAction {
  return {
    type: ActionType.SIGNUP_UPDATE_NAME,
    value,
  };
}

export function updatePassword(e: FormEvent<{}>, value: string): ISignUpAction {
  return {
    type: ActionType.SIGNUP_UPDATE_PASSWORD,
    value,
  };
}
