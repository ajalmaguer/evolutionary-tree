// import fetch from 'cross-fetch';


let nextId = 124;
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
export const fetchNodes = () => {
    return new Promise(function (resolve, reject) {
        setTimeout(() => resolve(responseData), 500);
        // setTimeout(() => reject('There was an error fetching the data.'), 500);
    });
};

export const deleteNode = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 500);
        // setTimeout(() => reject('Sorry, could not delete node.'), 1000);
    });
};

export const updateNode = (id, payload) => {
    return new Promise((resolve, reject) => {
        const editedNode = {
            ...responseData[id],
            ...payload
        };
        responseData[id] = editedNode;
        resolve(editedNode);
    });
}

export const createNode = (payload) => {
    return new Promise((resolve, reject) => {
        const newNode = {
            id: `abc${nextId++}`,
            name: payload.name,
            childIds: []
        }
        responseData[newNode.id] = newNode;
        responseData[payload.parentId].childIds = [
            ...responseData[payload.parentId].childIds,
            newNode.id
        ];

        resolve(newNode);
    });
}