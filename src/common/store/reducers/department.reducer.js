import * as departmentActionsLabels from '../actions/department/department.enum';
import merge from '../../helpers/merge';

export const departmentInitialState = Object.seal({
    allDepartments: [],
    error: null,
    departmentCreated: false,
})

export const departmentReducer = (state = departmentInitialState, action) => {
    let newState = state;
    switch(action.type){
        case departmentActionsLabels.GET_DEPARTMENTS: {
            const newStateObject = Object.assign({}, { error: null });
            newState = merge(state, newStateObject);
            break;
        }
        case departmentActionsLabels.GET_DEPARTMENTS_SUCCESS: {
            const newStateObject = Object.assign({}, { error: null, allDepartments: action.payload });
            newState = merge(state, newStateObject);
            break;
        }
        case departmentActionsLabels.GET_DEPARTMENTS_FAILURE: {
            const newStateObject = Object.assign({}, { error: action.payload ? action.payload.errors.message: 'Error de servidor', allDepartments: []});
            newState = merge(state, newStateObject);
            break;
        }
        case departmentActionsLabels.CREATE_DEPARTMENT: {
            const newStateObject = Object.assign({}, { error: null });
            newState = merge(state, newStateObject);
            break;
        }
        case departmentActionsLabels.CREATE_DEPARTMENT_SUCCESS: {
            const newStateObject = Object.assign({}, { error: null, departmentCreated: true })
            newState = merge(state, newStateObject);
            break;
        }
        case departmentActionsLabels.CREATE_DEPARTMENT_FAILURE: {
            const newStateObject = Object.assign({}, { error: action.payload ? action.payload.errors.message: 'Error de servidor', departmentCreated: false })
            newState = merge(state, newStateObject);
            break;
        }
        default:
            break;
    }
    return newState;
}