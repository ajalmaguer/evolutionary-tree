import { combineReducers } from 'redux';
import { nodesById } from './nodesById';
import { loading } from './loading';


const rootReducer = combineReducers({
    loading,
    nodesById
});

export default rootReducer;