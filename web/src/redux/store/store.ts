import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createMiddleware from 'redux-saga';
import userReducer from '../reducers/UserReducer';
import rootSaga from '../sagas/rootSaga';

export const rootReducer = combineReducers({
    user: userReducer
});

const sagaMiddleware = createMiddleware();

const store = createStore(
    rootReducer, compose(applyMiddleware(sagaMiddleware), (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
);
sagaMiddleware.run(rootSaga);

export default store;