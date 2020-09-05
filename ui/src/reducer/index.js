import { combineReducers } from 'redux';
import tokenReducer from './token';
import loggedReducer from './isLogged';
import adminReducer from './isAdmin';
import forceRenderer from './forceRenderer';

const allReducers = combineReducers({
    token: tokenReducer,
    loggedStatus: loggedReducer,
    adminStatus: adminReducer,
    forceRenderer: forceRenderer,
});

export default allReducers;