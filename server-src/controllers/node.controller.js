const Node = require('../models/Node');
const sanitize = require('mongo-sanitize');

const doesNodeExist = (node) => {
    if (!node) {
        throw {status: 404, message: 'not found'};
    }
    return node;
}

const errorHandler = (res) => err => {
    console.log('err =', err);
    res.status(err.status || 500).json(err || 'error')
}




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
            return Node.find({ path }).lean();
        })
        .then(nodes => {
            const payload = {
                rootNode,
                nodesById: arrayToObject([rootNode, ...nodes])
            };
            res.json(payload);
        })
        .catch(errorHandler(res));
}



function getNodeById(req, res) {
    let rootNode;

    Node
        .findOne({ _id: sanitize(req.params.id) })
        .lean()
        .then(doesNodeExist)
        .then(node => {
            rootNode = node;
            const path = new RegExp(`,${node._id},`);
            return Node.find({ path }).lean();
        })
        .then(nodes => {
            const payload = {
                rootNode,
                nodesById: arrayToObject([rootNode, ...nodes])
            };
            res.json(payload);
        })
        .catch(errorHandler(res));
}

function updateNode(req, res) {
    Node
        .findOne({ _id: sanitize(req.params.id) })
        .then(doesNodeExist)
        .then(node => {
            if (!node) {
                return res.status(404).json('not found');
            }
            node.name = sanitize(req.body.name);
            return node.save();
        })
        .then(node => res.json(node))
        .catch(errorHandler(res));
}

}

module.exports = {
    getAllNodes,
    getNodeById,
    updateNode
}