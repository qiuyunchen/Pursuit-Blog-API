const {readAll, readUser, create, update, delete_} = require('../services/crud');
const express = require('../services/express');
const pPubRouter = express.Router();

pPubRouter.get('/:post_id', (req, res) =>{
    const id = req.params.post_id;
    
})

pPubRouter.get('/:post_id/comments', (req, res) =>{
    const id = req.params.post_id;

})

pPubRouter.get('/:post_id/comments/:comment_id', (req, res) =>{
    const postId = req.params.post_id;
    const commentId = req.params.comment_id;
    
})

module.exports = pPubRouter;