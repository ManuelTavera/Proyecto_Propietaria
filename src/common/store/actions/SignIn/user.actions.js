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

export const createUser = (data) => ({
    type: userActionsLabels.CREATE_USER,
    payload: data
})

export const createUserSuccess = (data) => ({
    type: userActionsLabels.CREATE_USER_SUCCESS,
    payload: data
})

export const createUserFailure = (data) => ({
    type: userActionsLabels.CREATE_USER_FAILURE,
    payload: data
})

export const resetProperties = () => ({
    type: userActionsLabels.RESET_PROPERTIES
})