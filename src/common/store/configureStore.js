import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { rootEpics } from './epics/index';
import { rootReducers } from './reducers/index';

const epicMiddleware = createEpicMiddleware(rootEpics);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(epicMiddleware)),
);
