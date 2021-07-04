import * as productsActionsLabels from '../products/products.enum';

export const createProduct = (data) => ({
    type: productsActionsLabels.CREATE_PRODUCT,
    payload: data,
})

export const createProductSuccess = (response) => ({
    type: productsActionsLabels.CREATE_PRODUCT_SUCCESS,
    payload: response
})

export const createProductFailure = (error) => ({
    type: productsActionsLabels.CREATE_PRODUCT_FAILURE,
    payload: error
})

export const updateProduct = (data) => ({
    type: productsActionsLabels.UPDATE_PRODUCT,
    payload: data
})

export const updateProductSuccess = (response) => ({
    type: productsActionsLabels.UPDATE_PRODUCT_SUCCESS,
    payload: response
})

export const updateProductFailure = (error) => ({
    type: productsActionsLabels.UPDATE_PRODUCT_FAILURE,
    payload: error
})

export const deleteProduct = (id) => ({
    type: productsActionsLabels.DELETE_PRODUCT,
    payload: id
})

export const deleteProductSuccess = (response) => ({
    type: productsActionsLabels.DELETE_PRODUCT_SUCCESS,
    payload: response
})

export const deleteProductFailure = (error) => ({
    type: productsActionsLabels.DELETE_PRODUCT_FAILURE,
    payload: error
})

export const getProducts = (id = '') => ({
    type: productsActionsLabels.GET_PRODUCTS,
    payload: id
})

export const getProductsSuccess = (response) => ({
    type: productsActionsLabels.GET_PRODUCTS_SUCCESS,
    payload: response
})

export const getProductsFaliure = (error) => ({
    type: productsActionsLabels.GET_PRODUCTS_FAILURE,
    payload: error
})