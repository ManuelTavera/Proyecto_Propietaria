import * as productsActionsLabels from '../actions/products/products.enum';
import merge from '../../helpers/merge';

export const productsInitialState = Object.seal({
    allProducts: [],
    error: null,
    productDeleted: false,
    productUpdated: false,
    productCreated: false,
})

export const productsReducer = (state = productsInitialState, action) => {
    let newState = state;
    switch(action.type){
        case productsActionsLabels.CREATE_PRODUCT: {
            const newStateObject = Object.assign({}, { error: null, productCreated: false })
            newState = merge(state, newStateObject);
            break;
        }
        case productsActionsLabels.CREATE_PRODUCT_SUCCESS: {
            const newStateObject = Object.assign({}, { error: null, productCreated: true })
            newState = merge(state, newStateObject);
            break;
        }
        case productsActionsLabels.CREATE_PRODUCT_FAILURE: {
            const newStateObject = Object.assign({}, { error: 'Ocurrio un error creando el producto', productCreated: false })
            newState = merge(state, newStateObject);
            break;
        }
        case productsActionsLabels.UPDATE_PRODUCT: {
            const newStateObject = Object.assign({}, { error: null, productUpdated: false })
            newState = merge(state, newStateObject);
            break;
        }
        case productsActionsLabels.UPDATE_PRODUCT_SUCCESS: {
            const newStateObject = Object.assign({}, { error: null, productUpdated: true })
            newState = merge(state, newStateObject);
            break;
        }
        case productsActionsLabels.UPDATE_PRODUCT_FAILURE: {
            const newStateObject = Object.assign({}, { error: 'Ocurrio un error editando el prducto', productUpdated: false })
            newState = merge(state, newStateObject);
            break;
        }
        case productsActionsLabels.DELETE_PRODUCT: {
            const newStateObject = Object.assign({}, { error: null, productDeleted: false })
            newState = merge(state, newStateObject);
            break;
        }
        case productsActionsLabels.DELETE_PRODUCT_SUCCESS: {
            const newStateObject = Object.assign({}, { error: null, productDeleted: true })
            newState = merge(state, newStateObject);
            break;
        }
        case productsActionsLabels.DELETE_PRODUCT_FAILURE: {
            const newStateObject = Object.assign({}, { error: 'Ocurrio un error borrando el producto', productDeleted: false })
            newState = merge(state, newStateObject);
            break;
        }
        case productsActionsLabels.GET_PRODUCTS: {
            const newStateObject = Object.assign({}, { error: null, allProducts: [] })
            newState = merge(state, newStateObject);
            break;
        }
        case productsActionsLabels.GET_PRODUCTS_SUCCESS: {
            const newStateObject = Object.assign({}, { error: null, allProducts: action.payload })
            newState = merge(state, newStateObject);
            break;
        }
        case productsActionsLabels.GET_PRODUCTS_FAILURE: {
            const newStateObject = Object.assign({}, { error: 'Ocurrio un error obteniendo los/el producto(s)', allProducts: [] })
            newState = merge(state, newStateObject);
            break;
        }
    }
    return newState;
}