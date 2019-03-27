export const CHANGE_NODE_NAME = 'CHANGE_NODE_NAME';
export const CREATE_NODE = 'CREATE_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const ADD_CHILD = 'ADD_CHILD';
export const LOADING = 'LOADING';
export const REQUEST_NODES_ERROR = 'REQUEST_NODES_ERROR';
export const RECEIVE_NODES = 'RECEIVE_NODES';
export const CLEAR_NODES = 'CLEAR_NODES';

// frontend actions
export const loading = (value) => ({
    type: LOADING,
    value
});


// node actions
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

export const receiveNodes = (json) => ({
    type: RECEIVE_NODES,
    json
});

export const requestNodeError = (error) => ({
    type: REQUEST_NODES_ERROR,
    error
});

export const clearNodes = () => ({
    type: CLEAR_NODES
})

export const requestDeleteNode = (id) => {
    return (dispatch) => {
        dispatch(loading(true));

        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 500);
            // setTimeout(() => reject('Sorry, could not delete node.'), 1000);
        })
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

const responseData = {
    amoeba: {
        id: 'amoeba',
        name: 'Amoeba',
        childIds: [
            'abc123'
        ]
    },
    abc123: {
        id: 'abc123',
        name: 'Snail',
        childIds: []
    }
}
export const fetchNodes = (id = '') => {
    return (dispatch, getState) => {
        if (getState().nodesById[id]) {
            return Promise.resolve();
        }

        dispatch(loading(true));

        return new Promise(function (resolve, reject) {
            setTimeout(() => resolve(responseData), 500);
            // setTimeout(() => reject('There was an error fetching the data.'), 500);
        })
            .then(
                json => dispatch(receiveNodes(json)),
                error => dispatch(requestNodeError(error))
            );

    }
}
