import { IUser } from 'interfaces';
import { IApplicationState } from 'reducers';
import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs';
import 'rxjs/add/observable/dom/ajax';
import actionCreatorFactory, { isType } from 'typescript-fsa';
import { ISignUpFormData, IUpdatePayload } from './SignUp';

export enum SignUpActionType {
  Complete = 'SIGNUP_COMPLETE',
  Submit = 'SIGNUP_SUBMIT',
  Submitting = 'SIGNUP_SUBMITTING',
  ResponseReceived = 'SIGNUP_RESPONSE_RECEIVED',
  Update = 'SIGNUP_UPDATE',
}

const actionCreator = actionCreatorFactory();

export const formUpdate = actionCreator<IUpdatePayload>(
  SignUpActionType.Update,
);
export const formSubmit = actionCreator<ISignUpFormData>(
  SignUpActionType.Submit,
);
export const formSubmitting = actionCreator<undefined>(
  SignUpActionType.Submitting,
);
export const responseReceived = actionCreator<IUser>(
  SignUpActionType.ResponseReceived,
);
export const signUpComplete = actionCreator<undefined>(
  SignUpActionType.Complete,
);

export const signUpEpic: Epic<Action, IApplicationState> = (action$, store) =>
  action$.ofType(SignUpActionType.Submit).mergeMap(action => {
    if (isType(action, formSubmit)) {
      return Observable.concat(
        Observable.ajax({
          body: action.payload,
          method: 'post',
          url: '/api/users',
        }).map(({ response }) => responseReceived(response)),
        Observable.of(signUpComplete(undefined)),
      );
    }
  });
