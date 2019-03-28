const express = require('express');
const router = express.Router();
const nodeController = require('./controllers/node.controller');

const dummy = (req, res) => {res.send('works')};

// nodes
router.post('/nodes', dummy);
router.get('/nodes', nodeController.getAllNodes);
router.get('/nodes/:id', nodeController.getNodeById);
router.put('/nodes/:id', dummy);
router.delete('/nodes/:id', dummy);

module.exports = router;