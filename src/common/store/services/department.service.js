import {
    post,
    get,
    del,
} from './api.service';

export function getDepartmentsRequest(){
    return get('api/departments/mostrar');
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

    return post('api/departments/actualizar', value);
}