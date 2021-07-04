export const getAllProducts = state => state.productsReducer.allProducts;
export const getProductsError = state => state.productsReducer.error;
export const getProductCreated = state => state.productsReducer.productCreated;
export const getProductDeleted = state => state.productsReducer.productDeleted;
export const getProductUpdated = state => state.productsReducer.productUpdated;