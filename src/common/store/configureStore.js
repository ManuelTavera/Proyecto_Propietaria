import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import history from './History';

import  { rootEpic }  from './epics/index';
import { rootReducer } from './reducers/index';

const epicMiddleware = createEpicMiddleware({
    dependencies: {
        history: history,
    }
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware)),
);

epicMiddleware.run(rootEpic);
export default store;
