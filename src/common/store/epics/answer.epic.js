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