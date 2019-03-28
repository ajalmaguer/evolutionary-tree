import dumbFetch from 'cross-fetch';

export const fetch = (method, url, body) => {
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