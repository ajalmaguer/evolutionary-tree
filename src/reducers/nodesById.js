import { ADD_CHILD, REMOVE_CHILD, CREATE_NODE, DELETE_NODE } from '../actions'

function childIds(state, action) {
    switch (action.type) {
        case ADD_CHILD:
            return [...state, action.childId]
        case REMOVE_CHILD:
            return state.filter(id => id !== action.childId)
        default:
            return state
    }
}

function node(state, action) {
    switch (action.type) {
        case CREATE_NODE:
            return {
                id: action.nodeId,
                name: '',
                childIds: []
            }
        case ADD_CHILD:
        case REMOVE_CHILD:
            return {
                ...state,
                childIds: childIds(state.childIds, action)
            }
        default:
            return state
    }
}



function getAllDescendantIds(state, nodeId) {
    return state[nodeId].childIds.reduce((acc, childId) => (
        [...acc, childId, ...getAllDescendantIds(state, childId)]
    ), [])
}

function deleteMany(state, ids) {
    state = { ...state }
    ids.forEach(id => delete state[id])
    return state
}

export function nodesById(state = {}, action) {
    const { nodeId } = action;

    switch (action.type) {
        case CREATE_NODE:
        case ADD_CHILD:
            return {
                ...state,
                [nodeId]: node(state[nodeId], action)
            };
        case REMOVE_CHILD:
            const descendantIds = getAllDescendantIds(state, nodeId);
            return deleteMany(state, [nodeId, ...descendantIds]);
        default:
            return state;
    }
}