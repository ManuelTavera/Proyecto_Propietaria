import {
    post,
    get,
    del,
    put
} from './api.service';

export function getClaimRequest(data = ''){
    return get(`api/claim/mostrar/${data}`);
}

export function getByClaimIdRequest(id){
    return get(`api/claim/mostrarPorReclamacion/${id}`)
}

export function deleteClaimRequest(id){
    return del(`api/claim/eliminar/${id}`);
}

export function getClaimsTitleRequest(id = ''){
    return get(`api/claimType/mostrar/${id}`);
}

export function createClaimsTypeRequest(data){
    const value = JSON.parse(JSON.stringify(data));
    
    return post('api/claimType/insertar', value);
}

export function updateClaimsTypeRequest(data){
    const value = JSON.parse(JSON.stringify(data));

    return put('api/claimType/actualizar', value);
}

export function deleteClaimsTypeRequest(id){
    return del(`api/claimType/eliminar/${id}`);
}

export function updateClaimsRequest(data){
    const value = JSON.parse(JSON.stringify(data))

    return put('api/claim/actualizar', value)
}

export function createClaimRequest(data){
    const value = JSON.parse(JSON.stringify(data))

    return post('api/claim/insertar', value)
}