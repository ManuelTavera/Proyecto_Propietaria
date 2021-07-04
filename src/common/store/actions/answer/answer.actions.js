import * as answerActionsLabels from './answer.enum';

export const answerClaimComplaint = (data) => ({
    type: answerActionsLabels.ANSWER_CLAIM_COMPLAINT,
    payload: data,
})

export const answerClaimComplaintSuccess = (response) => ({
    type: answerActionsLabels.ANSWER_CLAIM_COMPLAINT_SUCCESS,
    payload: response,
})

export const answerClaimComplaintFailure = (error) => ({
    type: answerActionsLabels.ANSWER_CLAIM_COMPLAINT_FAILURE,
    payload: error
})

export const getAnswers = (data) => ({
    type: answerActionsLabels.GET_ANSWERS,
    payload: data
})

export const getAnswersSuccess = (response) => ({
    type: answerActionsLabels.GET_ANSWERS_SUCCESS,
    payload: response
})

export const getAnswersFailure = (error) => ({
    type: answerActionsLabels.GET_ANSWERS_FAILURE,
    payload: error
})

export const getClaimsAnswer = (data) => ({
    type: answerActionsLabels.GET_CLAIMS_ANSWER,
    payload: data
})

export const getClaimsAnswerSuccess = (response) => ({
    type: answerActionsLabels.GET_CLAIMS_ANSWER_SUCCESS,
    payload: response
})

export const getClaimsAnswerFailure = (error) => ({
    type: answerActionsLabels.GET_CLAIMS_ANSWER_FAILURE,
    payload: error
})

export const getComplainsAnswer = (data) => ({
    type: answerActionsLabels.GET_COMPLAINTS_ANSWER,
    payload: data
})

export const getComplainsAnswerSuccess = (response) => ({
    type: answerActionsLabels.GET_COMPLAINTS_ANSWER_SUCCESS,
    payload: response
})

export const getComplainsAnswerFailure = (error) => ({
    type: answerActionsLabels.GET_COMPLAINTS_ANSWER_FAILURE,
    payload: error
})