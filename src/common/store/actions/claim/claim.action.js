import * as claimsActionsLabels from './claim.enum';

export const getClaims = (data) => ({
    type: claimsActionsLabels.GET_CLAIMS,
    payload: data
})

export const getClaimsSuccess = (data) => ({
    type: claimsActionsLabels.GET_CLAIMS_SUCCESS,
    payload: data
})

export const getClaimsFailure = (error) => ({
    type: claimsActionsLabels.GET_CLAIMS_FAILURE,
    payload: error
})

export const getByClaimId = (id) => ({
    type: claimsActionsLabels.GET_BY_CLAIM_ID,
    payload: id
})

export const deleteClaim = (data) => ({
    type: claimsActionsLabels.DELETE_CLAIM,
    payload: data
})

export const deleteClaimSuccess = (response) => ({
    type: claimsActionsLabels.DELETE_CLAIM_SUCCESS,
    payload: response
})

export const deleteClaimFailure = (error) => ({
    type: claimsActionsLabels.DELETE_CLAIM_FAILURE,
    payload: error
})

export const getClaimsTitle = (id = '') => ({
    type: claimsActionsLabels.GET_CLAIMS_TITLE,
    payload: id,
})

export const getClaimsTitleSuccess = (response) => ({
    type: claimsActionsLabels.GET_CLAIMS_TITLE_SUCCESS,
    payload: response
})

export const getClaimsTitleFailure = (error) => ({
    type: claimsActionsLabels.GET_CLAIMS_TITLE_FAILURE,
    payload: error
})

export const updateClaim = (data) => ({
    type: claimsActionsLabels.UPDATE_CLAIM,
    payload: data
})

export const updateClaimSuccess = (response) => ({
    type: claimsActionsLabels.UPDATE_CLAIM_SUCCESS,
    payload: response
})

export const updateClaimFailure = (error) => ({
    type: claimsActionsLabels.UPDATE_CLAIM_FAILURE,
    payload: error
})

export const createClaim = (data) => ({
    type: claimsActionsLabels.CREATE_CLAIM,
    payload: data
})

export const createClaimSuccess = (response) => ({
    type: claimsActionsLabels.CREATE_CLAIM_SUCCESS,
    payload: response
})

export const createClaimFailure = (error) => ({
    type: claimsActionsLabels.CREATE_CLAIM_FAILURE,
    payload: error
})

export const createTypeClaim = (data) => ({
    type: claimsActionsLabels.CREATE_CLAIM_TYPE,
    payload: data
})

export const createTypeClaimSuccess = (response) => ({
    type: claimsActionsLabels.CREATE_CLAIM_TYPE_SUCCESS,
    payload: response
})

export const createTypeClaimFailure = (error) => ({
    type: claimsActionsLabels.CREATE_CLAIM_TYPE_FAILURE,
    payload: error
})

export const updateTypeClaim = (data) => ({
    type: claimsActionsLabels.UPDATE_CLAIM_TYPE,
    payload: data
})

export const updateTypeClaimSuccess = (response) => ({
    type: claimsActionsLabels.UPDATE_CLAIM_TYPE_SUCCESS,
    payload: response
})

export const updateTypeClaimFailure = (error) => ({
    type: claimsActionsLabels.UPDATE_CLAIM_TYPE_FAILURE,
    payload: error
})

export const deleteTypeClaim = (data) => ({
    type: claimsActionsLabels.DELETE_CLAIM_TYPE,
    payload: data
})

export const deleteTypeClaimSuccess = (response) => ({
    type: claimsActionsLabels.DELETE_CLAIM_TYPE_SUCCESS,
    payload: response
})

export const deleteTypeClaimFailure = (error) => ({
    type: claimsActionsLabels.DELETE_CLAIM_TYPE_FAILURE,
    payload: error
})
