import * as api from '../services/api';

export const SET_ROOT_NODE_ID = 'SET_ROOT_NODE_ID';
export const CHANGE_NODE_NAME = 'CHANGE_NODE_NAME';
export const CREATE_NODE = 'CREATE_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const ADD_CHILD = 'ADD_CHILD';
export const REMOVE_CHILD = 'REMOVE_CHILD';
export const LOADING = 'LOADING';
export const REQUEST_NODES_ERROR = 'REQUEST_NODES_ERROR';
export const RECEIVE_NODES = 'RECEIVE_NODES';
export const RECEIVE_NODE = 'RECEIVE_NODE';
export const CLEAR_NODES = 'CLEAR_NODES';
export const SAVE_NODE = 'SAVE_NODE';

// frontend actions
export const loading = (value) => ({
    type: LOADING,
    value
});


// node actions
export const setRootNode = (nodeId) => ({
    type: SET_ROOT_NODE_ID,
    nodeId,
});

export const changeNodeName = (nodeId, name) => ({
    type: CHANGE_NODE_NAME,
    nodeId,
    name
});

let nextId = 100
export const createNode = () => ({
    type: CREATE_NODE,
    nodeId: `new_${nextId++}`
});

export const deleteNode = (nodeId) => ({
    type: DELETE_NODE,
    nodeId
});

export const addChild = (nodeId, childId) => ({
    type: ADD_CHILD,
    nodeId,
    childId
});

export const removeChild = (nodeId, childId) => ({
    type: REMOVE_CHILD,
    nodeId,
    childId
});


export const receiveNodes = (json) => ({
    type: RECEIVE_NODES,
    json
});

export const receiveNode = (nodeId, json) => ({
    type: RECEIVE_NODE,
    nodeId,
    json
});

export const requestNodeError = (error) => ({
    type: REQUEST_NODES_ERROR,
    error
});

export const clearNodes = () => ({
    type: CLEAR_NODES
});

export const requestDeleteNode = (id) => {
    return (dispatch) => {
        dispatch(loading(true));

        return api.deleteNode(id)
            .then(
                () => {
                    // dispatch(deleteNode(id)); // TODO - remove?
                    dispatch(loading(false));
                    dispatch(clearNodes());
                },
                error => dispatch(requestNodeError(error))
            );;
    }
}

export const fetchNodes = (id = '') => {
    return (dispatch, getState) => {
        if (getState().nodesById[id]) {
            return Promise.resolve();
        }

        dispatch(loading(true));

        return api.fetchNodes(id)
            .then(
                response => {
                    dispatch(setRootNode(response.rootNode.id));
                    dispatch(receiveNodes(response.nodesById));
                },
                error => dispatch(requestNodeError(error))
            );

    }
}

const isNewNodeId = (id) => (id.indexOf('new') > -1);

export const saveNode = (id, currentState, parentId) => {
    return (dispatch) => {
        if (isNewNodeId(id)) {
            api
                .createNode({
                    ...currentState,
                    parentId
                })
                .then(newNode => {
                    dispatch(removeChild(parentId, id));
                    dispatch(deleteNode(id));
                    dispatch(receiveNode(newNode.id, newNode));
                    dispatch(addChild(parentId, newNode.id));
                });
            // Todo - error handling

        } else {
            api
                .updateNode(id, currentState)
                .then(editedNode => dispatch(receiveNode(id, editedNode)));
            // Todo - error handling
        }
    }
}