import 'rxjs';
import 'rxjs/add/observable/of';

import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import * as complainsActionsLabels from '../actions/complain/complain.actions.enum';
import * as complainsActions from '../actions/complain/complain.actions';
import * as complainsRequest from '../services/complains.service';

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