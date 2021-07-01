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

export const createDepartment = (data) => ({
    type: departmentActionsLabels.CREATE_DEPARTMENT,
    payload: data,
})

export const createDepartmentSuccess = (response) => ({
    type: departmentActionsLabels.CREATE_DEPARTMENT_SUCCESS,
    payload: response
})

export const createDepartmentFailure = (error) => ({
    type: departmentActionsLabels.CREATE_DEPARTMENT_FAILURE,
    payload: error
})

export const deleteDepartment = (id) => ({
    type: departmentActionsLabels.DELETE_DEPARTMENT,
    payload: id,
})

export const deleteDepartmentSuccess = (response) => ({
    type: departmentActionsLabels.DELETE_DEPARTMENT_SUCCESS,
    payload: response
})

export const deleteDepartmentFailure = (error) => ({
    type: departmentActionsLabels.DELETE_DEPARTMENT_FAILURE,
    payload: error
})

export const updateDepartment = (data) => ({
    type: departmentActionsLabels.UPDATE_DEPARTMENT,
    payload: data
})

export const updateDepartmentSuccess = (response) => ({
    type: departmentActionsLabels.UPDATE_DEPARTMENT_SUCCESS,
    payload: response
})

export const updateDepartmentFailure = (error) => ({
    type: departmentActionsLabels.UPDATE_DEPARTMENT_FAILURE,
    payload: error
})
