const Node = require('../models/Node');

function arrayToObject(arr = [], key = '_id') {
    const output = {};
    arr.forEach(node => {
        node.id = node._id;
        output[node[key]] = node;
    });

    return output;
}

function getAllNodes(req, res) {
    let rootNode;

    Node
        .findOne({ path: null })
        .lean()
        .then(node => {
            rootNode = node;
            const path = new RegExp(`,${node._id},`);
            return Node.find({ path });
        })
        .then(nodes => {
            const payload = {
                rootNode,
                nodesById: arrayToObject([rootNode, ...nodes])
            }
            res.json(payload);
        })
        .catch(err => {
            console.log('err =', err);
            res.status(500).json('error')
        });
}

module.exports = {
    getAllNodes
}