const {readAll, readUser, create, update, delete_} = require('../services/crud');
const express = require('../services/express');
const pPriRouter = express.Router();

pPriRouter.post('/', (req,res)=>{

})

pPriRouter.put('/:post_id', (req,res)=>{

})

pPriRouter.delete('/:post_id', (req,res)=>{

})

module.exports = pPriRouter;