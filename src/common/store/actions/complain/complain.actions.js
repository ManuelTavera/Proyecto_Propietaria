import * as complainsActionsLabels from './complain.actions.enum';

export const getComplains = (id) => ({
    type: complainsActionsLabels.GET_COMPLAINS,
    payload: id
})

export const getComplainsSuccess = (data) => ({
    type: complainsActionsLabels.GET_COMPLAINS_SUCCESS,
    payload: data
})

export const getComplainsFailure = (error) => ({
    type: complainsActionsLabels.GET_COMPLAINS_FAILURE,
    payload: error.response
})

export const deleteComplain = (data) => ({
    type: complainsActionsLabels.DELETE_COMPLAIN,
    payload: data
})

export const deleteComplainSuccess = (response) => ({
    type: complainsActionsLabels.DELETE_COMPLAIN_SUCCESS,
    payload: response
})

export const deleteComplainFailure = (error) => ({
    type: complainsActionsLabels.DELETE_COMPLAIN_FAILURE,
    payload: error
})


