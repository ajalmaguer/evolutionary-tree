import { SELECT_NODE } from '../actions';

export function selectedRootNode(state = '', action) {
    switch (action.type) {
        case SELECT_NODE:
            return action.id;
        default:
            return state;
    }
}
