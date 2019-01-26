const {readAll, readUser, create, update, delete_} = require('../services/crud');
const express = require('../services/express');
const cPubRouter = express.Router();

cPubRouter.get('/:comment_id', (req, res) =>{
    
})

module.exports = cPubRouter;