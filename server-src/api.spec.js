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
            .then(res => expect(res).toMatchSnapshot());
    });
});

describe('#getNodesById', () => {
    test('returns child node and all its children', () => {
        const id = '5c9c27c1ab34d91ecd77027d';
        return rp('GET', '/nodes/' + id)
            .then(res => {
                expect(res.rootNode.id).toEqual(id);
                expect(res).toMatchSnapshot();
            });
    });
});

// rp('POST', '/nodes').then(res => console.log('res =', res))
// rp('GET', '/nodes').then(res => console.log('res =', res))
// rp('GET', '/nodes/123').then(res => console.log('res =', res))
// rp('PUT', '/nodes/123').then(res => console.log('res =', res))
// rp('DELETE', '/nodes/123').then(res => console.log('res =', res))