import * as complainsActionsLabels from './complain.actions.enum';

export const getComplains = (data) => ({
    type: complainsActionsLabels.GET_COMPLAINS,
    payload: data
})

export const getComplainsSuccess = (data) => ({
    type: complainsActionsLabels.GET_COMPLAINS_SUCCESS,
    payload: data
})

export const getComplainsFailure = (error) => ({
    type: complainsActionsLabels.GET_COMPLAINS_FAILURE,
    payload: error
})

export const getByComplainsId = (id) => ({
    type: complainsActionsLabels.GET_BY_COMPLAIN_ID,
    payload: id,
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

export const getComplainsTitle = (id = '') => ({
    type: complainsActionsLabels.GET_COMPLAINS_TITLE,
    payload: id,
})

export const getComplainsTitleSuccess = (response) => ({
    type: complainsActionsLabels.GET_COMPLAINS_TITLE_SUCCESS,
    payload: response
})

export const getComplainsTitleFailure = (error) => ({
    type: complainsActionsLabels.GET_COMPLAINS_TITLE_FAILURE,
    payload: error
})

export const updateComplain = (data) => ({
    type: complainsActionsLabels.UPDATE_COMPLAIN,
    payload: data
})

export const updateComplainSuccess = (response) => ({
    type: complainsActionsLabels.UPDATE_COMPLAIN_SUCCESS,
    payload: response
})

export const updateComplainFailure = (error) => ({
    type: complainsActionsLabels.UPDATE_COMPLAIN_FAILURE,
    payload: error
})

export const createComplain = (data) => ({
    type: complainsActionsLabels.CREATE_COMPLAIN,
    payload: data
})

export const createComplainSuccess = (response) => ({
    type: complainsActionsLabels.CREATE_COMPLAIN_SUCCESS,
    payload: response
})

export const createComplainFailure = (error) => ({
    type: complainsActionsLabels.CREATE_COMPLAIN_FAILURE,
    payload: error
})

export const createTypeComplaint = (data) => ({
    type: complainsActionsLabels.CREATE_COMPLAINT_TYPE,
    payload: data
})

export const createTypeComplaintSuccess = (response) => ({
    type: complainsActionsLabels.CREATE_COMPLAINT_TYPE_SUCCESS,
    payload: response
})

export const createTypeComplaintFailure = (error) => ({
    type: complainsActionsLabels.CREATE_COMPLAINT_TYPE_FAILURE,
    payload: error
})

export const updateTypeComplaint = (data) => ({
    type: complainsActionsLabels.UPDATE_COMPLAINT_TYPE,
    payload: data
})

export const updateTypeComplaintSuccess = (response) => ({
    type: complainsActionsLabels.UPDATE_COMPLAINT_TYPE_SUCCESS,
    payload: response
})

export const updateTypeComplaintFailure = (error) => ({
    type: complainsActionsLabels.UPDATE_COMPLAINT_TYPE_FAILURE,
    payload: error
})

export const deleteTypeComplaint = (data) => ({
    type: complainsActionsLabels.DELETE_COMPLAINT_TYPE,
    payload: data
})

export const deleteTypeComplaintSuccess = (response) => ({
    type: complainsActionsLabels.DELETE_COMPLAINT_TYPE_SUCCESS,
    payload: response
})

export const deleteTypeComplaintFailure = (error) => ({
    type: complainsActionsLabels.DELETE_COMPLAINT_TYPE_FAILURE,
    payload: error
})