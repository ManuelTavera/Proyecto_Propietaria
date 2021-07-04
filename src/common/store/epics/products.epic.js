import 'rxjs';
import 'rxjs/add/observable/of';

import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import * as productsActionsLabels from '../actions/products/products.enum';
import * as productsActions from '../actions/products/products.action';
import * as productsRequest from '../services/products.service';

export const getProductsEpic = (action$, store) =>
    action$.pipe(
        ofType(productsActionsLabels.GET_PRODUCTS),
        mergeMap(action =>
            productsRequest.getProductsRequest(action.payload).pipe(
                map(response => productsActions.getProductsSuccess(response.response)),
                catchError(error => of(productsActions.getProductsFaliure(error.response)))
            )
        )
    )

export const updateProductEpic = (action$, store) => 
    action$.pipe(
        ofType(productsActionsLabels.UPDATE_PRODUCT),
        mergeMap(action =>
            productsRequest.updateProductRequest(action.payload).pipe(
                map(response => productsActions.updateProductSuccess(response.response)),
                catchError(error => of(productsActions.updateProductFailure(error.response)))
            )
        )
    )

export const deleteProductEpic = (action$, store) =>
    action$.pipe(
        ofType(productsActionsLabels.DELETE_PRODUCT),
        mergeMap(action =>
            productsRequest.deleteProductRequest(action.payload).pipe(
                map(response => productsActions.deleteProductSuccess(response.response)),
                catchError(error => of(productsActions.deleteProductFailure(error.response)))
            )
        )
    )

export const createProductEpic = (action$, store) =>
    action$.pipe(
        ofType(productsActionsLabels.CREATE_PRODUCT),
        mergeMap(action => 
            productsRequest.createProductRequest(action.payload).pipe(
                map(response => productsActions.createProductSuccess(response.response)),
                catchError(error => of(productsActions.createProductFailure(error.response)))
            )
        )
    )