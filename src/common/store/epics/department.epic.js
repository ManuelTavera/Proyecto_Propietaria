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