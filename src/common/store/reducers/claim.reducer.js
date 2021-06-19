import * as claimsActionsLabels from '../actions/claim/claim.enum';
import merge from '../../helpers/merge';


export const claimsInitialState = Object.seal({
    allClaims: null,
    error: null,
    claimDeleted: false,
    claimsTitle: [],
    claimUpdated: false,
    claimCreated: false,
})

export const claimsReducer = (state = claimsInitialState, action) => {
    let newState = state;
    switch(action.type){
        case claimsActionsLabels.GET_CLAIMS: {
            const newStateObject = Object.assign({}, { error: null })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.GET_CLAIMS_SUCCESS: {
            const newStateObject = Object.assign({}, { allClaims: action.payload, error: null })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.GET_CLAIMS_FAILURE: {
            console.log(action.payload)
            const newStateObject = Object.assign({}, { error: action.payload ? action.payload.error: 'Error de servidor', allClaims: null })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.DELETE_CLAIM: {
            const newStateObject = Object.assign({}, { claimDeleted: false, error: null })
            newState = merge(state, newStateObject)
            break;
        }
        case claimsActionsLabels.DELETE_CLAIM_SUCCESS: {
            const allClaims = state.allClaims.filter((allClaims) => allClaims.id != action.payload)
            const newStateObject = Object.assign({}, { claimDeleted: true, error: null, allClaims: allClaims })
            newState = merge(state, newStateObject)
            break;
        }
        case claimsActionsLabels.DELETE_CLAIM_FAILURE: {
            const newStateObject = Object.assign({}, { error: action.payload ? action.payload.errors.message: 'Error de servidor', claimDeleted: false })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.GET_CLAIMS_TITLE: {
            const newStateObject = Object.assign({}, { error: null, claimsTitle: [] })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.GET_CLAIMS_TITLE_SUCCESS: {
            const newStateObject = Object.assign({}, { error: null, claimsTitle: action.payload })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.GET_CLAIMS_TITLE_FAILURE: {
            const newStateObject = Object.assign({}, { error: action.payload ? action.payload.errors.message: 'Error de servidor', claimsTitle: [] })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.UPDATE_CLAIM: {
            const newStateObject = Object.assign({}, { claimUpdated: false, error: null })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.UPDATE_CLAIM_SUCCESS: {
            const newStateObject = Object.assign({}, { claimUpdated: true, error: null })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.UPDATE_CLAIM_FAILURE: {
            const newStateObject = Object.assign({}, { claimUpdated: false, error: action.payload ? action.payload.errors.message: 'Error de servidor' })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.CREATE_CLAIM: {
            const newStateObject = Object.assign({}, { claimCreated: false, error: null })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.CREATE_CLAIM_SUCCESS: {
            const newStateObject = Object.assign({}, { claimCreated: true, error: null })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.CREATE_CLAIM_FAILURE: {
            const newStateObject = Object.assign({}, { claimCreated: false, error: action.payload ? action.payload.errors.message: 'Error de servidor' })
            newState = merge(state, newStateObject);
            break;
        }
        default:
            break;
    }
    return newState;
}