const Node = require('../models/Node');
const sanitize = require('mongo-sanitize');

const doesNodeExist = (node) => {
    if (!node) {
        throw { status: 404, message: 'not found' };
    }
    return node;
}

const errorHandler = (res) => err => {
    console.log('err =', err);
    res.status(err.status || 500).json(err || 'error')
}

const getParentNodeId = node => {
    const stringArray = node.path.split(',').filter(string => !!string);
    return stringArray[stringArray.length - 1];
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
    Node
        .find({})
        .sort({ path: 1 })
        .then(nodes => {
            let rootNode = nodes[0];
            rootNode = rootNode.toObject();
            rootNode.id = rootNode._id;
            const payload = {
                rootNode,
                nodesById: arrayToObject([...nodes])
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

function createNode(req, res) {
    const name = sanitize(req.body.name);
    const parentId = sanitize(req.body.parentId);

    Node
        .findById(parentId)
        .then(doesNodeExist)
        .then(parentNode => {
            const path = parentNode.path + `${parentNode._id},`;
            const newNode = new Node({ name, path });

            parentNode.childIds.push(newNode._id);

            return Promise.all([
                parentNode.save(),
                newNode.save()
            ])
        })
        .then(([savedParent, newNode]) => {
            newNode = newNode.toObject();
            newNode.id = newNode._id;
            res.json(newNode);
        })
        .catch(errorHandler(res));
}

function deleteNode(req, res) {
    const nodeId = sanitize(req.params.id);
    let nodeToDelete;

    Node
        .findById(nodeId)
        .then(doesNodeExist)
        .then(node => {
            if (node.path !== null) {
                return node;
            }
            throw { status: 405, message: 'cant delete root node' }
        })
        .then(node => {
            nodeToDelete = node;
            const parentId = getParentNodeId(nodeToDelete);
            return Node.findById(parentId)
        })
        .then(parentNode => {
            if (!parentNode) {
                console.log('no parent node?');
                throw 'couldnt find parent'; // Todo - clean up
            }
            parentNode.childIds = parentNode
                .childIds
                .filter(id => id.toString() !== nodeToDelete._id.toString());

            return Promise.all([
                parentNode.save(),
                Node.findByIdAndDelete(nodeToDelete._id)
            ]);
        })
        .then(() => res.json('success'))
        .catch(errorHandler(res));
}

module.exports = {
    getAllNodes,
    getNodeById,
    updateNode,
    createNode,
    deleteNode
}