import { ADD_CHILD, REMOVE_CHILD, CREATE_NODE, DELETE_NODE, CHANGE_NODE_NAME, RECEIVE_NODES, CLEAR_NODES, RECEIVE_NODE } from '../actions'

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
        case CHANGE_NODE_NAME:
            return {
                ...state,
                name: action.name
            }
        case RECEIVE_NODE:
            return action.json
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
        case RECEIVE_NODES:
            return {
                // ...state, // TODO - do i want this?
                ...action.json
            }
        case CLEAR_NODES:
            return {}
        case CREATE_NODE:
        case ADD_CHILD:
        case REMOVE_CHILD:
        case CHANGE_NODE_NAME:
        case RECEIVE_NODE:
            return {
                ...state,
                [nodeId]: node(state[nodeId], action)
            };
        case DELETE_NODE:
            const descendantIds = getAllDescendantIds(state, nodeId);
            return deleteMany(state, [nodeId, ...descendantIds]);
        default:
            return state;
    }
}