import { REQUEST_NODES_BY_ID, RECEIVE_NODES, REQUEST_NODES_ERROR } from '../actions';

export function frontend(
    state = {
        loading: false,
        error: ''
    },
    action
) {
    switch (action.type) {
        case REQUEST_NODES_BY_ID:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case RECEIVE_NODES:
            return {
                ...state,
                loading: false,
                error: ''
            };
        case REQUEST_NODES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}