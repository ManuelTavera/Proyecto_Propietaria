import { combineReducers } from 'redux';
import { userReducer } from './user.reducer';
import { complainsReducer } from './complains.reducer';
import { departmentReducer } from './department.reducer';
import { claimsReducer } from './claim.reducer';
import { answerReducer } from './answer.reducer';
import { productsReducer } from './products.reducer';

export const rootReducer = combineReducers({
    userReducer,
    complainsReducer,
    departmentReducer,
    claimsReducer,
    answerReducer,
    productsReducer
});