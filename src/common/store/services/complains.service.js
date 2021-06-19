import parseBody from '../../helpers/parse-body';
import {
    post,
    get,
    del,
    put
} from './api.service';

export function getComplainsRequest(id){
    return get(`api/complain/mostrar/${id}`)
}

export function deleteComplainRequest(id){
    return del(`api/complain/eliminar/${id}`);
}

export function getComplainsTitleRequest(){
    return get('api/complainType/Mostrar');
}

export function updateComplainsRequest(data){
    const value = JSON.parse(JSON.stringify(data))

    return put('api/complain/actualizar', value)
}

export function createComplainRequest(data){
    const value = JSON.parse(JSON.stringify(data))
    console.log('Value: ', value)
    return post('api/complain/insertar', value)
}