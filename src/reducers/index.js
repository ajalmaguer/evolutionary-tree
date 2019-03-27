import { combineReducers } from 'redux';
import { selectedRootNode } from './selectedRootNode';
import { nodesById } from './nodesById';


const rootReducer = combineReducers({
    selectedRootNode,
    nodesById
});

export default rootReducer;