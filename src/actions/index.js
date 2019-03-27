export const CHANGE_NODE_NAME = 'CHANGE_NODE_NAME';
export const CREATE_NODE = 'CREATE_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const ADD_CHILD = 'ADD_CHILD';
export const REMOVE_CHILD = 'REMOVE_CHILD';
export const RECEIVE_NODES = 'RECEIVE_NODES';

export const changeNodeName = (nodeId, name) => ({
    type: CHANGE_NODE_NAME,
    nodeId,
    name
});

let nextId = 0
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

export const receiveNodes = (nodes) => ({
    type: RECEIVE_NODES,
    nodes
});



const responseData = {
    new_0: {
        id: 'new_0',
        name: 'Amoeba',
        childIds: [
            'new_1',
            'new_2'
        ]
    },
    new_1: {
        id: 'new_1',
        name: 'Worm',
        childIds: []
    },
    new_2: {
        id: 'new_2',
        name: 'Fish',
        childIds: [
            'new_3',
            'new_4'
        ]
    },
    new_3: {
        id: 'new_3',
        name: 'Lizard',
        childIds: []
    },
    new_4: {
        id: 'new_4',
        name: 'Bird',
        childIds: [
            'new_5',
            'new_6'
        ]
    },
    new_5: {
        id: 'new_5',
        name: 'Chicken',
        childIds: []
    },
    new_6: {
        id: 'new_6',
        name: 'Turkey',
        childIds: []
    }
}
export const fetchNodes = (id) => {
    return (dispatch) => {
        console.log('getting posts for id =', id);
        // dispatch(receiveNodes(responseData))
        // return Promise
        //     .resolve(responseData)
        //     .then(
        //         json => dispatch(receiveNodes(json)),
        //         error => console.log('Oops', error) // Todo - error handling
        //     );
    }
}
