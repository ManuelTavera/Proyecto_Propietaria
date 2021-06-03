import * as userActionsLabels from './user.actions.enum';

export const authUser = (data) => ({
    type: userActionsLabels.AUTH_USER,
    payload: data,
})

export const authUserSuccess = (data) => ({
    type: userActionsLabels.AUTH_USER_SUCCESS,
    payload: data
})

export const authUserFailure = (data) => ({
    type: userActionsLabels.AUTH_USER_FAILURE,
    payload: data
})