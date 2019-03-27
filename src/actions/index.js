export const CHANGE_NODE_NAME = 'CHANGE_NODE_NAME';
export const CREATE_NODE = 'CREATE_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const ADD_CHILD = 'ADD_CHILD';
export const REMOVE_CHILD = 'REMOVE_CHILD';
export const REQUEST_NODES_BY_ID = 'REQUEST_NODES_BY_ID';
export const REQUEST_NODES_ERROR = 'REQUEST_NODES_ERROR';
export const RECEIVE_NODES = 'RECEIVE_NODES';

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

export const requestNodesById = (nodeId) => ({
    type: REQUEST_NODES_BY_ID,
    nodeId
})

export const receiveNodes = (json) => ({
    type: RECEIVE_NODES,
    json
});

export const requestNodeError = (error) => ({
    type: REQUEST_NODES_ERROR,
    error
});

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
export const fetchNodes = (id) => {
    return (dispatch) => {
        console.log('getting posts for id =', id);
        dispatch(requestNodesById(id));

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
