import * as answerActionsLabels from '../actions/answer/answer.enum';
import merge from '../../helpers/merge';

export const answerInitialState = Object.seal({
    error: null,
    claimComplainAnswered: false,
    allAnswer: [],
    claimsAnswer: [],
    compaintAnswer: [],
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
        case answerActionsLabels.GET_ANSWERS: {
            const newStateObject = Object.assign({}, { error: null, allAnswer: [] });
            newState = merge(state, newStateObject);
            break;
        }
        case answerActionsLabels.GET_ANSWERS_SUCCESS: {
            const newStateObject = Object.assign({}, { error: null, allAnswer: action.payload });
            newState = merge(state, newStateObject);
            break;
        }
        case answerActionsLabels.GET_ANSWERS_FAILURE: {
            const newStateObject = Object.assign({}, { error: 'Error buscando todas las respuestas', allAnswer: [] });
            newState = merge(state, newStateObject);
            break;
        }
        case answerActionsLabels.GET_CLAIMS_ANSWER: {
            const newStateObject = Object.assign({}, { error: null, claimsAnswer: [] });
            newState = merge(state, newStateObject);
            break;
        }
        case answerActionsLabels.GET_CLAIMS_ANSWER_SUCCESS: {
            const newStateObject = Object.assign({}, { error: null, claimsAnswer: action.payload });
            newState = merge(state, newStateObject);
            break;
        }
        case answerActionsLabels.GET_CLAIMS_ANSWER_FAILURE: {
            const newStateObject = Object.assign({}, { error: 'Error buscando todas las respuestas de las reclamaciones', claimsAnswer: [] });
            newState = merge(state, newStateObject);
            break;
        }
        case answerActionsLabels.GET_COMPLAINTS_ANSWER: {
            const newStateObject = Object.assign({}, { error: null, compaintAnswer: [] });
            newState = merge(state, newStateObject);
            break;
        }
        case answerActionsLabels.GET_COMPLAINTS_ANSWER_SUCCESS: {
            const newStateObject = Object.assign({}, { error: null, compaintAnswer: action.payload });
            newState = merge(state, newStateObject);
            break;
        }
        case answerActionsLabels.GET_COMPLAINTS_ANSWER_FAILURE: {
            const newStateObject = Object.assign({}, { error: 'Error buscando todas las respuestas de las quejas', compaintAnswer: [] });
            newState = merge(state, newStateObject);
            break;
        }
        default:
            break;
    }
    return newState;
}