const express = require('express');
const router = express.Router();
const nodeController = require('./controllers/node.controller');

const dummy = (req, res) => {res.send('works')};

// nodes
router.post('/nodes', nodeController.createNode);
router.get('/nodes', nodeController.getAllNodes);
router.get('/nodes/:id', nodeController.getNodeById);
router.put('/nodes/:id', nodeController.updateNode);
router.delete('/nodes/:id', nodeController.deleteNode);

module.exports = router;