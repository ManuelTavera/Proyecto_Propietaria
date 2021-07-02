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