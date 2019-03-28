const requestPromise = require('request-promise');

const baseUrl = 'http://localhost:4200/api';

const rp = (method, url, body) => {
    return requestPromise(baseUrl + url, {
        method: method,
        body: body,
        json: true,
    });
};

describe('#getNodes', () => {
    test('returns all nodes with amoeba as root node', () => {
        return rp('GET', '/nodes')
            .then(res => {
                // console.log('res =', res);
                expect(res.rootNode.name).toEqual('Amoeba')
            });
    });
});

describe('#getNodesById', () => {
    test('returns child node and all its children', () => {
        const id = '5c9c50e6d4b0ab3b17b57f66'; // bacteria
        return rp('GET', '/nodes/' + id)
            .then(res => {
                expect(res.rootNode.id).toEqual(id);
            });
    });
});

describe('#updateNode', () => {
    test('can update a nodes name', () => {
        expect.assertions(2)
        const id = '5c9c50e6d4b0ab3b17b57f66'; // bacteria
        return rp('PUT', '/nodes/' + id, {name: 'Not Bacteria'})
            .then(res => {
                expect(res.name).toEqual('Not Bacteria');
                return rp('PUT', '/nodes/' + id, {name: 'Bacteria'})
            })
            .then(res => {
                expect(res.name).toEqual('Bacteria');
            });
    });
});

describe('#create and delete node', () => {
    test('can create then delete node', () => {
        const parentId = '5c9c50e6d4b0ab3b17b57f67'; // algae
        let newNode;
        return rp('GET', '/nodes/' + parentId)
            .then(nodes => {
                // console.log('nodes =', nodes);
                return rp('POST', '/nodes', { name: 'Shark', parentId })
            })
            .then(newNodeResponse => {
                newNode = newNodeResponse;
                return rp('DELETE', '/nodes/' + newNode.id);
            })
            .then(res => {
                expect(res).toEqual('success');
                return rp('GET', '/nodes/' + parentId);
            })
            .then(parentNodeResponse => {
                expect(parentNodeResponse.rootNode.childIds).not.toContain(newNode.id);
            });
    });
});

// rp('POST', '/nodes').then(res => console.log('res =', res))
// rp('GET', '/nodes').then(res => console.log('res =', res))
// rp('GET', '/nodes/123').then(res => console.log('res =', res))
// rp('PUT', '/nodes/123').then(res => console.log('res =', res))
// rp('DELETE', '/nodes/123').then(res => console.log('res =', res))