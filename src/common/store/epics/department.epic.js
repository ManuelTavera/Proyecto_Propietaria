import 'rxjs';
import 'rxjs/add/observable/of';

import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import * as departmentActionsLabels from '../actions/department/department.enum';
import * as departmentActions from '../actions/department/department.action';
import * as departmentRequest from '../services/department.service';

export const getDepartmentsEpic = (action$, store) =>
    action$.pipe(
        ofType(departmentActionsLabels.GET_DEPARTMENTS),
        mergeMap(action =>
            departmentRequest.getDepartmentsRequest().pipe(
                map(response => departmentActions.getDepartmentsSuccess(response.response)),
                catchError(error => of(departmentActions.getDepartmentsFailure(error.response)))
            )
        )
    )

export const createDepartmentEpic = (action$, store) => 
    action$.pipe(
        ofType(departmentActionsLabels.CREATE_DEPARTMENT),
        mergeMap(action => 
            departmentRequest.createDepartmentRequest(action.payload).pipe(
                map(response => departmentActions.createDepartmentSuccess(response.response)),
                catchError(error => of(departmentActions.createDepartmentFailure(error.response)))
            )
        )
    )

export const deleteDepartmentEpic = (action$, store) =>
    action$.pipe(
        ofType(departmentActionsLabels.DELETE_DEPARTMENT),
        mergeMap(action => 
            departmentRequest.deleteDepartmentRequest(action.payload).pipe(
                map(response => departmentActions.deleteDepartmentSuccess(response.response)),
                catchError(error => of(departmentActions.deleteDepartmentFailure(error.response)))
            )
        )
    )

export const updateDepartmentRequest = (action$, store) => 
    action$.pipe(
        ofType(departmentActionsLabels.UPDATE_DEPARTMENT),
        mergeMap(action => 
            departmentRequest.updateDepartmentRequest(action.payload).pipe(
                map(response => departmentActions.updateDepartmentSuccess(response.response)),
                catchError(error => of(departmentActions.updateDepartmentFailure(error.response)))
            )
        )
    )

export const getDepartmentByIdRequest = (action$, store) =>
    action$.pipe(
        ofType(departmentActionsLabels.GET_DEPARTMENT_BY_ID),
        mergeMap(action => 
            departmentRequest.getDepartmentsRequest(action.payload).pipe(
                map(response => departmentActions.getDepartmentByIdSuccess(response.response)),
                catchError(error => of(departmentActions.getDepartmentByIdFailure(error.response)))
            )
        )
    )