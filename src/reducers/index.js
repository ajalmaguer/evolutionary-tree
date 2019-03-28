import { combineReducers } from 'redux';
import { nodesById } from './nodesById';
import { frontend } from './frontend';
import { rootNodeId } from './rootNodeId';


const rootReducer = combineReducers({
    frontend,
    rootNodeId,
    nodesById
});

export default rootReducer;