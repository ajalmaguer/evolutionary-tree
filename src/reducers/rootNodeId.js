import { SET_ROOT_NODE_ID } from '../actions';

export function rootNodeId(state = '', action) {
    switch (action.type) {
        case SET_ROOT_NODE_ID:
            return action.nodeId;
        default:
            return state;
    }
}