import dumbFetch from 'cross-fetch';

const fetch = (method, url, body) => {
    return dumbFetch(
        url,
        {
            method: method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((res) => {
            return res.json();
        });
}

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
export const fetchNodes = (id) => {
    if (!id) {
        return fetch('GET', '/api/nodes');
    }
    return fetch('GET', '/api/nodes/' + id);
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