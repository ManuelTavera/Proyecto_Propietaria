import * as departmentActionsLabels from '../actions/department/department.enum';
import merge from '../../helpers/merge';

export const departmentInitialState = Object.seal({
    allDepartments: [],
    error: null,
    departmentCreated: false,
    departmentDeleted: false,
    departmentUpdated: false,
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
            const newStateObject = Object.assign({}, { error: null, departmentCreated: false });
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
        case departmentActionsLabels.DELETE_DEPARTMENT: {
            const newStateObject = Object.assign({}, { error: null, departmentDeleted: false });
            newState = merge(state, newStateObject);
            break;
        }
        case departmentActionsLabels.DELETE_DEPARTMENT_SUCCESS: {
            const newAllDepartments = state.allDepartments.filter((department) => department.id !== action.payload)
            const newStateObject = Object.assign({}, { error: null, departmentDeleted: true, allDepartments: newAllDepartments });
            newState = merge(state, newStateObject);
            break;
        }
        case departmentActionsLabels.DELETE_DEPARTMENT_FAILURE: {
            const newStateObject = Object.assign({}, { error: 'Ocurrio un error borrando el departamento', departmentDeleted: false });
            newState = merge(state, newStateObject);
            break;
        }
        case departmentActionsLabels.UPDATE_DEPARTMENT: {
            const newStateObject = Object.assign({}, { error: null, departmentUpdated: false });
            newState = merge(state, newStateObject);
            break;
        }
        case departmentActionsLabels.UPDATE_DEPARTMENT_SUCCESS: {
            const newStateObject = Object.assign({}, { error: null, departmentUpdated: true });
            newState = merge(state, newStateObject);
            break;
        }
        case departmentActionsLabels.UPDATE_DEPARTMENT_FAILURE: {
            const newStateObject = Object.assign({}, { error: 'Ocurrio un error actualizando el departamento', departmentUpdated: false });
            newState = merge(state, newStateObject);
            break;
        }
        default:
            break;
    }
    return newState;
}