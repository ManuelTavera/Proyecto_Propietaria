import {
    post,
    get,
    put,
    del
} from './api.service';

export function getProductsRequest(id){
    return get(`api/product/mostrar/${id}`);
}

export function createProductRequest(data){
    const value = JSON.parse(JSON.stringify(data));

    return post('api/product/insertar', value);
}

export function updateProductRequest(data){
    const value = JSON.parse(JSON.stringify(data));

    return put('api/product/actualizar', value);
}

export function deleteProductRequest(id){
    return del(`api/product/eliminar/${id}`);
}