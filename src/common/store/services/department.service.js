import {
    post,
    get,
    del,
    put
} from './api.service';

export function getDepartmentsRequest(id = ''){
    return get(`api/departments/mostrar/${id}`);
} 

export function createDepartmentRequest(data){
    const value = JSON.parse(JSON.stringify(data));

    return post('api/departments/insertar', value);
}

export function deleteDepartmentRequest(id){
    return del(`api/departments/eliminar/${id}`);
}

export function updateDepartmentRequest(data){
    const value = JSON.parse(JSON.stringify(data));

    return put('api/departments/actualizar', value);
}