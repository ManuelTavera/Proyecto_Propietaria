import parseBody from '../../helpers/parse-body';
import {
    post,
    get,
    del,
    put
} from './api.service';

export function getClaimRequest(id = ''){
    return get(`api/claim/mostrar/${id}`);
}

export function deleteClaimRequest(id){
    return del(`api/claim/eliminar/${id}`);
}

export function getClaimsTitleRequest(){
    return get('api/claimType/mostrar');
}

export function updateClaimsRequest(data){
    const value = JSON.parse(JSON.stringify(data))

    return put('api/claim/actualizar', value)
}

export function createClaimRequest(data){
    const value = JSON.parse(JSON.stringify(data))

    return post('api/claim/insertar', value)
}