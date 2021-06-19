import * as complainsActionsLabels from '../actions/complain/complain.actions.enum';
import merge from '../../helpers/merge';

export const complainsInitialState = Object.seal({
    allComplains: null,
    error: null,
    complainDeleted: false,
    complainsTitle: [],
    complainUpdated: false,
    complainCreated: false,
})

export const complainsReducer = (state = complainsInitialState, action) => {
    let newState = state;
    switch(action.type){
        case complainsActionsLabels.GET_COMPLAINS: {
            const newStateObject = Object.assign({}, { error: null });
            newState = merge(state, newStateObject);
            break;
        }
        case complainsActionsLabels.GET_COMPLAINS_SUCCESS: {
            const newStateObject = Object.assign({}, { allComplains: action.payload, error: null });
            newState = merge(state, newStateObject);
            break;
        }
        case complainsActionsLabels.GET_COMPLAINS_FAILURE: {
            const newStateObject = Object.assign({}, { error: action.payload ? action.payload.errors.message: 'Error de servidor' })
            newState = merge(state, newStateObject);
            break;
        }
        case complainsActionsLabels.DELETE_COMPLAIN: {
            const newStateObject = Object.assign({}, { error: null });
            newState = merge(state, newStateObject);
            break;
        }
        case complainsActionsLabels.DELETE_COMPLAIN_SUCCESS: {
            const newAllComplains = state.allComplains.filter((complain) => complain.id != action.payload)
            const newStateObject = Object.assign({}, { complainDeleted: true, allComplains: newAllComplains });
            newState = merge(state, newStateObject)
            break;
        }
        case complainsActionsLabels.DELETE_COMPLAIN_FAILURE: {
            const newStateObject = Object.assign({}, { error: action.payload ? action.payload.errors.message: 'Error de servidor', complainDeleted: false });
            newState = merge(state, newStateObject);
            break;
        }
        case complainsActionsLabels.GET_COMPLAINS_TITLE: {
            const newStateObject = Object.assign({}, { error: null });
            newState = merge(state, newStateObject);
            break;
        }
        case complainsActionsLabels.GET_COMPLAINS_TITLE_SUCCESS: {
            const newStateObject = Object.assign({}, { error: null, complainsTitle: action.payload });
            newState = merge(state, newStateObject);
            break;
        }
        case complainsActionsLabels.GET_COMPLAINS_TITLE_FAILURE: {
            const newStateObject = Object.assign({}, { error: action.payload ? action.payload.errors.message: 'Error de servidor', complainsTitle: [] });
            newState = merge(state, newStateObject);
            break;
        }
        case complainsActionsLabels.UPDATE_COMPLAIN: {
            const newStateObject = Object.assign({}, { complainUpdated: false });
            newState = merge(state, newStateObject);
            break;
        }
        case complainsActionsLabels.UPDATE_COMPLAIN_SUCCESS: {
            const newStateObject = Object.assign({}, { complainUpdated: true });
            newState = merge(state, newStateObject);
            break;
        }
        case complainsActionsLabels.UPDATE_COMPLAIN_FAILURE: {
            const newStateObject = Object.assign({}, { complainUpdated: false });
            newState = merge(state, newStateObject);
            break;
        }
        case complainsActionsLabels.CREATE_COMPLAIN: {
            const newStateObject = Object.assign({}, { complainCreated: false, error: null })
            newState = merge(state, newStateObject);
            break;
        }
        case complainsActionsLabels.CREATE_COMPLAIN_SUCCESS: {
            const newStateObject = Object.assign({}, { complainCreated: true, error: null })
            newState = merge(state, newStateObject);
            break;
        }
        case complainsActionsLabels.CREATE_COMPLAIN_FAILURE: {
            const newStateObject = Object.assign({}, { complainCreated: false, error: action.payload ? action.payload.error: 'Error de servidor' })
            newState = merge(state, newStateObject);
            break;
        }
        default:
            break;
    }
    return newState;
}