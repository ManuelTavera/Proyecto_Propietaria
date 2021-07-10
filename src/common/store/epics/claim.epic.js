import 'rxjs';
import 'rxjs/add/observable/of';

import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import * as claimsActionsLabels from '../actions/claim/claim.enum';
import * as claimsActions from '../actions/claim/claim.action';
import * as claimsRequest from '../services/claim.service';

export const getClaimsEpic = (action$, store) => 
    action$.pipe(
        ofType(claimsActionsLabels.GET_CLAIMS),
        mergeMap(action => 
            claimsRequest.getClaimRequest(action.payload).pipe(
                map(response => claimsActions.getClaimsSuccess(response.response)),
                catchError(error => of(claimsActions.getClaimsFailure(error)))
            )
        ),
    )

export const getByClaimIdEpic = (action$, store) =>
    action$.pipe(
        ofType(claimsActionsLabels.GET_BY_CLAIM_ID),
        mergeMap(action => 
            claimsRequest.getByClaimIdRequest(action.payload).pipe(
                map(response => claimsActions.getClaimsSuccess(response.response)),
                catchError(error => of(claimsActions.getClaimsFailure(error)))
            )
        ),
    )

export const deleteClaimEpic = (action$, store) =>
    action$.pipe(
        ofType(claimsActionsLabels.DELETE_CLAIM),
        mergeMap(action => 
            claimsRequest.deleteClaimRequest(action.payload).pipe(
                map(response => claimsActions.deleteClaimSuccess(response.response)),
                catchError(error => of(claimsActions.deleteClaimFailure(error.response)))
            )
        )
    )

export const getClaimsTitleEpic = (action$, store) =>
    action$.pipe(
        ofType(claimsActionsLabels.GET_CLAIMS_TITLE),
        mergeMap( action => 
            claimsRequest.getClaimsTitleRequest().pipe(
                map(response => claimsActions.getClaimsTitleSuccess(response.response)),
                catchError(error => of(claimsActions.getClaimsTitleFailure(error.response)))
            )
        )
    )

export const updateClaimsEpic = (action$, store) =>
    action$.pipe(
        ofType(claimsActionsLabels.UPDATE_CLAIM),
        mergeMap(action => 
            claimsRequest.updateClaimsRequest(action.payload).pipe(
                map(response => claimsActions.updateClaimSuccess(response.response)),
                catchError(error => of(claimsActions.updateClaimFailure(error.response)))
            )
        )
    )

export const createEpicClaimEpic = (action$, store) =>
    action$.pipe(
        ofType(claimsActionsLabels.CREATE_CLAIM),
        mergeMap(action => 
            claimsRequest.createClaimRequest(action.payload).pipe(
                map(response => claimsActions.createClaimSuccess(response.response)),
                catchError(error => of(claimsActions.createClaimFailure(error)))
            )  
        )
    )

export const createClaimTypeEpic = (action$, store) =>
    action$.pipe(
        ofType(claimsActionsLabels.CREATE_CLAIM_TYPE),
        mergeMap(action => 
            claimsRequest.createClaimsTypeRequest(action.payload).pipe(
                map(response => claimsActions.createTypeClaimSuccess(response.response)),
                catchError(error => of(claimsActions.createTypeClaimFailure(error.response)))
            )
        )
    )

export const updateClaimTypeEpic = (action$, store) =>
    action$.pipe(
        ofType(claimsActionsLabels.UPDATE_CLAIM_TYPE),
        mergeMap(action => 
            claimsRequest.updateClaimsTypeRequest(action.payload).pipe(
                map(response => claimsActions.updateTypeClaimSuccess(response.response)),
                catchError(error => of(claimsActions.updateTypeClaimFailure(error.response)))
            )
        )
    )

export const deleteClaimTypeEpic = (action$, store) =>
    action$.pipe(
        ofType(claimsActionsLabels.DELETE_CLAIM_TYPE),
        mergeMap(action => 
            claimsRequest.deleteClaimsTypeRequest(action.payload).pipe(
                map(response => claimsActions.deleteTypeClaimSuccess(response.response)),
                catchError(error => of(claimsActions.deleteTypeClaimFailure(error.response)))
            )
        )
    )
