const {readAll, readUser, create, update, delete_} = require('../services/crud');
const express = require('../services/express');
const cPriRouter = express.Router();

cPriRouter.post('/', (req, res)=>{

});

cPriRouter.put('/:comment_id', (req, res)=>{

});

cPriRouter.delete('/:comment_id', (req, res)=>{

});

module.exports = cPriRouter;