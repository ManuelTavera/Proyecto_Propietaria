import * as answerActionsLabels from '../actions/answer/answer.enum';
import merge from '../../helpers/merge';

export const answerInitialState = Object.seal({
    error: null,
    claimComplainAnswered: false,
})

export const answerReducer = (state = answerInitialState, action) => {
    let newState = state;
    switch(action.type){
        case answerActionsLabels.ANSWER_CLAIM_COMPLAINT: {
            const newStateObject = Object.assign({}, { error: null, claimComplainAnswered: false });
            newState = merge(state, newStateObject);
            break;
        }
        case answerActionsLabels.ANSWER_CLAIM_COMPLAINT_SUCCESS: {
            const newStateObject = Object.assign({}, { error: null, claimComplainAnswered: true });
            newState = merge(state, newStateObject);
            break;
        }
        case answerActionsLabels.ANSWER_CLAIM_COMPLAINT_FAILURE: {
            const newStateObject = Object.assign({}, { error: 'Ha ocurrido un error', claimComplainAnswered: false })
            newState = merge(state, newStateObject);
            break;
        }
        default:
            break;
    }
    return newState;
}