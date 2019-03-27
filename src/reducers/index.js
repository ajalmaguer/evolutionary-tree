import { combineReducers } from 'redux';
import { nodesById } from './nodesById';


const rootReducer = combineReducers({
    nodesById
});

export default rootReducer;