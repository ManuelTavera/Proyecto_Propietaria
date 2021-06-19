import * as departmentActionsLabels from './department.enum';

export const getDepartments = () => ({
    type: departmentActionsLabels.GET_DEPARTMENTS
})

export const getDepartmentsSuccess = (response) => ({
    type: departmentActionsLabels.GET_DEPARTMENTS_SUCCESS,
    payload: response
})

export const getDepartmentsFailure = (error) => ({
    type: departmentActionsLabels.GET_DEPARTMENTS_FAILURE,
    payload: error
})
