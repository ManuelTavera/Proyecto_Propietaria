import 'rxjs';
import 'rxjs/add/observable/of';

import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import * as answerActionsLabels from '../actions/answer/answer.enum';
import * as answerActions from '../actions/answer/answer.actions';
import * as answerRequest from '../services/answer.service';

export const answerClaimComplaintEpic = (action$, store) => 
    action$.pipe(
        ofType(answerActionsLabels.ANSWER_CLAIM_COMPLAINT),
        mergeMap(action => 
            answerRequest.answerClaimComplaintRequest(action.payload).pipe(
                map(response => answerActions.answerClaimComplaintSuccess(response.response)),
                catchError(error => of(answerActions.answerClaimComplaintFailure(error.response)))
            )
        )
    )

export const getAnswersEpic = (action$, store) => 
    action$.pipe(
        ofType(answerActionsLabels.GET_ANSWERS),
        mergeMap(action => 
            answerRequest.getAnswersRequest(action.payload).pipe(
                map(response => answerActions.getAnswersSuccess(response.response)),
                catchError(error => of(answerActions.getAnswersFailure(error.response)))
            )
        )
    )

export const getClaimsAnswerEpic = (action$, store) => 
    action$.pipe(
        ofType(answerActionsLabels.GET_CLAIMS_ANSWER),
        mergeMap(action => 
            answerRequest.getClaimsAnswersRequest(action.payload).pipe(
                mergeMap(response => of(answerActions.getClaimsAnswerSuccess(response.response), answerActions.getComplainsAnswer())),
                catchError(error => of(answerActions.getClaimsAnswerFailure(error.response)))
            )
        )
    )

export const getComplaintsAnswerEpic = (action$, store) => 
    action$.pipe(
        ofType(answerActionsLabels.GET_COMPLAINTS_ANSWER),
        mergeMap(action => 
            answerRequest.getComplaintsAnswersRequest(action.payload).pipe(
                map(response => answerActions.getComplainsAnswerSuccess(response.response)),
                catchError(error => of(answerActions.getComplainsAnswerFailure(error.response)))
            )
        )
    )