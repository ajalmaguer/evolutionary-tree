const Node = require('../models/Node');
const sanitize = require('mongo-sanitize');

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
        .catch(err => {
            console.log('err =', err);
            res.status(500).json('error')
        });
}

function getNodeById(req, res) {
    let rootNode;

    Node
        .findOne({ _id: req.params.id })
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
        .catch(err => {
            console.log('err =', err);
            res.status(500).json('error')
        });
}

function updateNode(req, res) {
    Node
        .findOne({ _id: req.params.id })
        .then(node => {
            if (!node) {
                return res.status(404).json('not found');
            }
            node.name = sanitize(req.body.name);
            return node.save();
        })
        .then(node => res.json(node))
        .catch(err => {
            console.log('err =', err);
            res.status(500).json('error')
        });

}

module.exports = {
    getAllNodes,
    getNodeById,
    updateNode
}