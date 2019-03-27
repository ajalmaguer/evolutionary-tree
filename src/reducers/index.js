import { combineReducers } from 'redux';
import { nodesById } from './nodesById';
import { frontend } from './frontend';


const rootReducer = combineReducers({
    frontend,
    nodesById
});

export default rootReducer;