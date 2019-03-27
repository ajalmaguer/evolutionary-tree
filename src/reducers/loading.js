import { REQUEST_NODES_BY_ID, RECEIVE_NODES } from '../actions';

export function loading(state = false, action) {
    switch (action.type) {
        case REQUEST_NODES_BY_ID:
            return true;
        case RECEIVE_NODES:
            return false;
        default:
            return state;
    }
}