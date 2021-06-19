import { combineReducers } from 'redux';
import { userReducer } from './user.reducer';
import { complainsReducer } from './complains.reducer';
import { departmentReducer } from './department.reducer';

export const rootReducer = combineReducers({
    userReducer,
    complainsReducer,
    departmentReducer,
});