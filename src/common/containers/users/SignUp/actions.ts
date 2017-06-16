import { FormEvent } from 'react';
import { IApplicationState } from 'reducers';
import { Action, ActionCreator } from 'redux';
import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/dom/ajax';
import { ISignUpFormData } from './SignUp';

export enum SignUpAction {
  Complete = 'SIGNUP_COMPLETE',
  Submit = 'SIGNUP_SUBMIT',
  Update = 'SIGNUP_UPDATE',
}

export interface ISignUpUpdateAction extends Action {
  payload: {
    name: string;
    value: string;
  };
}

export interface ISubmitAction extends Action {
  payload: ISignUpFormData;
}

export const formUpdate = (
  name: string,
  value: string,
): ISignUpUpdateAction => {
  return {
    payload: {
      name,
      value,
    },
    type: SignUpAction.Update,
  };
};

export const formSubmit: ActionCreator<ISubmitAction> = (
  form: ISignUpFormData,
) => {
  return {
    payload: form,
    type: SignUpAction.Submit,
  };
};

export const signUpComplete: ActionCreator<Action> = () => {
  return {
    type: SignUpAction.Complete,
  };
};

export const signUpEpic: Epic<Action, IApplicationState> = (action$, store) =>
  action$
    .ofType(SignUpAction.Submit)
    .do(action => {
      console.log('Loading...');
    })
    .mergeMap((action: ISubmitAction) =>
      Observable.ajax({
        body: action.payload,
        method: 'post',
        url: '/api/users/signup',
      }).map(({ response }) => signUpComplete(response)),
    );
