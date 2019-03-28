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
    test('we can get all nodes', () => {
        return rp('GET', '/nodes')
            .then(res => console.log('res =', res));
    });
});

// rp('POST', '/nodes').then(res => console.log('res =', res))
// rp('GET', '/nodes').then(res => console.log('res =', res))
// rp('GET', '/nodes/123').then(res => console.log('res =', res))
// rp('PUT', '/nodes/123').then(res => console.log('res =', res))
// rp('DELETE', '/nodes/123').then(res => console.log('res =', res))