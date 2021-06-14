import parseBody from '../../helpers/parse-body';
import {
    post,
    get,
    del,
} from './api.service';

export function getComplainsRequest(id){
    return get(`api/complain/mostrar/${id}`)
}

export function deleteComplainRequest(data){
    const value = JSON.parse(JSON.stringify(data));

    return del(`api/complain/eliminar`, value);
}