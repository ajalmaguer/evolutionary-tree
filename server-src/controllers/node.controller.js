const Node = require('../models/Node');


function getNodes(req, res) {
    Node
        .find({})
        .then(nodes => res.json(nodes));
}

module.exports = {
    getNodes
}