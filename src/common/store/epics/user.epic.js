import 'rxjs';
import 'rxjs/add/observable/of';

import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import * as userActions from '../actions/SignIn/user.actions';
import * as userActionsLabels from '../actions/SignIn/user.actions.enum';
import * as userRequests from '../services/user.service';

export const authUserEpic = (action$, store) => 
    action$.pipe(
        ofType(userActionsLabels.AUTH_USER),
        mergeMap(action => 
            userRequests.authUserRequest(action.payload).pipe(
                map(response => userActions.authUserSuccess(response.response)),
                catchError(error => of(userActions.authUserFailure(error.response)))
            )
        )
    )

export const createUserEpic = (action$, store) => 
    action$.pipe(
        ofType(userActionsLabels.CREATE_USER),
        mergeMap(action => 
            userRequests.createUserRequest(action.payload).pipe(
                map(response => userActions.createUserSuccess(response.response)),
                catchError(error => of(userActions.createUserFailure(error.response)))
            )
        )
    )
