import { LOADING, RECEIVE_NODES, REQUEST_NODES_ERROR } from '../actions';

export function frontend(
    state = {
        loading: false,
        error: ''
    },
    action
) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.value,
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