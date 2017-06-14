import { FormEvent } from 'react';
import { Action } from 'redux';
import * as ActionType from './constants';

export interface ISignUpAction extends Action {
  name: string;
  value: string;
}

export const formUpdate = (name: string, value: string): ISignUpAction => {
  return {
    name,
    type: ActionType.SIGNUP_FORM_UPDATE,
    value,
  };
};
