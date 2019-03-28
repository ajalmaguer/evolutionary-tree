import { fetch } from './fetch';


export const fetchNodes = (id) => {
    if (!id) {
        return fetch('GET', '/api/nodes');
    }
    return fetch('GET', '/api/nodes/' + id);
};

export const deleteNode = (id) => fetch('DELETE', '/api/nodes/' + id);

export const updateNode = (id, payload) => fetch('PUT', '/api/nodes/' + id, payload);

export const createNode = (payload) => fetch('POST', '/api/nodes', payload);