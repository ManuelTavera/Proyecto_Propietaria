import * as claimsActionsLabels from '../actions/claim/claim.enum';
import merge from '../../helpers/merge';


export const claimsInitialState = Object.seal({
    allClaims: [],
    error: null,
    claimDeleted: false,
    claimsTitle: [],
    claimUpdated: false,
    claimCreated: false,
    claimTypeCreated: false,
    claimTypeUpdated: false,
    claimTypeDeleted: false,
})

export const claimsReducer = (state = claimsInitialState, action) => {
    let newState = state;
    switch(action.type){
        case claimsActionsLabels.GET_CLAIMS:
        case claimsActionsLabels.GET_BY_CLAIM_ID: {
            const newStateObject = Object.assign({}, { error: null, allClaims: [] })
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
            const newStateObject = Object.assign({}, { error: action.payload ? action.payload.error: 'Error de servidor', allClaims: [] })
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
        case claimsActionsLabels.CREATE_CLAIM_TYPE: {
            const newStateObject = Object.assign({}, { claimTypeCreated: false, error: null })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.CREATE_CLAIM_TYPE_SUCCESS: {
            const newStateObject = Object.assign({}, { claimTypeCreated: true, error: null })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.CREATE_CLAIM_TYPE_FAILURE: {
            const newStateObject = Object.assign({}, { claimTypeCreated: false, error: 'Ha ocurrido un error creando el tipo de reclamación' })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.UPDATE_CLAIM_TYPE: {
            const newStateObject = Object.assign({}, { claimTypeUpdated: false, error: null })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.UPDATE_CLAIM_TYPE_SUCCESS: {
            const newStateObject = Object.assign({}, { claimTypeUpdated: true, error: null })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.UPDATE_CLAIM_TYPE_FAILURE: {
            const newStateObject = Object.assign({}, { claimTypeUpdated: false, error: 'Ha ocurrido un error editando el tipo de reclamación' })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.DELETE_CLAIM_TYPE: {
            const newStateObject = Object.assign({}, { claimTypeDeleted: false, error: null })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.DELETE_CLAIM_TYPE_SUCCESS: {
            const newClaimType = state.claimsTitle.filter((claimType) => claimType.id !== action.payload);
            const newStateObject = Object.assign({}, { claimTypeDeleted: true, error: null, claimsTitle: newClaimType })
            newState = merge(state, newStateObject);
            break;
        }
        case claimsActionsLabels.DELETE_CLAIM_TYPE_FAILURE: {
            const newStateObject = Object.assign({}, { claimTypeDeleted: false, error: 'Ha ocurrido un error eliminando el tipo de reclamación' })
            newState = merge(state, newStateObject);
            break;
        }
        default:
            break;
    }
    return newState;
}