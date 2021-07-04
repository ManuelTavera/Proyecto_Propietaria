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

export const getClaimsTitle = () => ({
    type: claimsActionsLabels.GET_CLAIMS_TITLE
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
