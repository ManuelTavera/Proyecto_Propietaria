import * as complainsActionsLabels from './complain.actions.enum';

export const getComplains = () => ({
    type: complainsActionsLabels.GET_COMPLAINS
})

export const getComplainsSuccess = (data) => ({
    type: complainsActionsLabels.GET_COMPLAINS_SUCCESS,
    payload: data
})

export const getComplainsFailure = (error) => ({
    type: complainsActionsLabels.GET_COMPLAINS_FAILURE,
    payload: error.response
})



