import 'rxjs';
import 'rxjs/add/observable/of';

import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import * as complainsActionsLabels from '../actions/complain/complain.actions.enum';
import * as complainsActions from '../actions/complain/complain.actions';
import * as complainsRequest from '../services/complains.service';
import * as departmentActions from '../actions/department/department.action';

export const getComplainsEpic = (action$, store) => 
    action$.pipe(
        ofType(complainsActionsLabels.GET_COMPLAINS),
        mergeMap(action => 
            complainsRequest.getComplainsRequest(action.payload).pipe(
                map(response => complainsActions.getComplainsSuccess(response.response)),
                catchError(error => of(complainsActions.getComplainsFailure(error.response)))
            )
        )
    )

export const deleteComplainEpic = (action$, store) =>
    action$.pipe(
        ofType(complainsActionsLabels.DELETE_COMPLAIN),
        mergeMap(action => 
            complainsRequest.deleteComplainRequest(action.payload).pipe(
                map(response => complainsActions.deleteComplainSuccess(response.response)),
                catchError(error => of(complainsActions.deleteComplainFailure(error.response)))
            )
        )
    )

export const getComplainsTitleEpic = (action$, store) =>
    action$.pipe(
        ofType(complainsActionsLabels.GET_COMPLAINS_TITLE),
        mergeMap(action => 
            complainsRequest.getComplainsTitleRequest().pipe(
                mergeMap(response => of(complainsActions.getComplainsTitleSuccess(response.response), departmentActions.getDepartments())),
                catchError(error => of(complainsActions.getComplainsTitleFailure(error.response)))
            )
        )
    )

export const updateComplainsEpic = (action$, store) =>
    action$.pipe(
        ofType(complainsActionsLabels.UPDATE_COMPLAIN),
        mergeMap(action => 
            complainsRequest.updateComplainsRequest(action.payload).pipe(
                map(response => complainsActions.updateComplainSuccess(response.response)),
                catchError(error => of(complainsActions.updateComplainFailure(error.response)))
            )
        )
    )

export const createComplainEpic = (action$, store) => 
    action$.pipe(
        ofType(complainsActionsLabels.CREATE_COMPLAIN),
        mergeMap(action =>
         complainsRequest.createComplainRequest(action.payload).pipe(
             map(response => complainsActions.createComplainSuccess(response.response)),
             catchError(error => of(complainsActions.createComplainFailure(error.response)))
         )   
        )
    )