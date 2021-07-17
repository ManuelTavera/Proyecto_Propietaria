import "rxjs";
import "rxjs/add/observable/of";

import { of } from "rxjs";
import { mergeMap, map, catchError, tap, ignoreElements } from "rxjs/operators";
import { ofType } from "redux-observable";

import * as userActions from "../actions/SignIn/user.actions";
import * as userActionsLabels from "../actions/SignIn/user.actions.enum";
import * as userRequests from "../services/user.service";
import { saveToLocalStorage, removeItem } from "../localStorage";

export const authUserEpic = (action$, store) =>
  action$.pipe(
    ofType(userActionsLabels.AUTH_USER),
    mergeMap((action) =>
      userRequests.authUserRequest(action.payload).pipe(
        map((response) => userActions.authUserSuccess(response.response)),
        catchError((error) => of(userActions.authUserFailure(error.response)))
      )
    )
  );

export const createUserEpic = (action$, store) =>
  action$.pipe(
    ofType(userActionsLabels.CREATE_USER),
    mergeMap((action) =>
      userRequests.createUserRequest(action.payload).pipe(
        map((response) => userActions.createUserSuccess(response.response)),
        catchError((error) => of(userActions.createUserFailure(error.response)))
      )
    )
  );

export const redirectUserFromLoginEpic = (action$, store, dependencies) =>
  action$.pipe(
    ofType(
      userActionsLabels.CREATE_USER_SUCCESS,
      userActionsLabels.AUTH_USER_SUCCESS
    ),
    tap(() => {
      const {
        value: {
          userReducer: { authUser },
        },
      } = store;
      if (authUser.user.userType === 2) {
        dependencies.history.push("/home");
      } else {
        dependencies.history.push("/admin/home");
      }
      saveToLocalStorage("authUser", authUser);
    }),
    ignoreElements()
  );

export const getAllEmployeesEpic = (action$, store) =>
  action$.pipe(
    ofType(userActionsLabels.GET_EMPLOYESS),
    mergeMap((action) =>
      userRequests.getEmployeesRequest().pipe(
        map((response) => userActions.getEmployeesSuccess(response.response)),
        catchError((error) => of(userActions.getEmployeesFailure(error)))
      )
    )
  );

export const logOutUserEpic = (action$, store) =>
  action$.pipe(
    ofType(userActionsLabels.LOGOUT_USER),
    tap(() => {
      removeItem("authUser");
    }),
    ignoreElements()
  );
