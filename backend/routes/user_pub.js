const {readAll, readUser, create, update, delete_} = require('../services/crud');
const bcrypt = require('bcrypt');
const express = require('../services/express');
const uuidv1 = require('uuid/v1');
const uPubRouter = express.Router();


uPubRouter.post('/', (req, res)=>{
    const {username, email, password} = req.body;
    if (!username || !email || !password){
        res.json({Error: 'Not enough info passed to create new user.'});
    }
    bcrypt.hash(password, 10)
        .then( encryptedPW =>{
            const password = encryptedPW;
            return create('users', {username, email, password});
        })
        .then( result =>{
            res.json({success: `New user ${username} created.`})
        })
        .catch(e =>{
            res.json({Error: e.detail});
        })
})

uPubRouter.post('/login', (req, res)=>{
    let user = null;
    const {username, password} = req.body;
    readUser('users', username)
        .then( userData =>{
            user = userData;
            return bcrypt.compare(password, user.password);
        })
        .then(match =>{
            if (!match){
                res.json({Error: 'Your password is incorrect.'});
            } else {
                const token = uuidv1();
                // Taq specified a 16 character length for token.
                user.token = token.slice(0,16);
                return update('users', user);
            }
        })
        .then((result)=>{
            if (result.rowCount > 0){
                res.json({
                    login: 'success', 
                    token: user.token, 
                    message: 'Use token for account updates.',
                })
            } else {
                throw new Error(`Internal Error: could not store token.`);
            }
        })
        .catch(e =>{
            if (e.received === 0){
                res.json({Error: `User ${username} doesn't exist.`});
            }
        })
})

uPubRouter.get('/:user_id', (req, res) =>{
    const id = parseInt(req.params.user_id);

    readUser('users', id)
        .then( user =>{
            const {id, username, email} = user;
            res.json({id, username, email});
        })
        .catch(e =>{
            if (e.received === 0) {
                res.json({Error: `User ID ${id} doesn't exist.`});
            }
        })
})

uPubRouter.get('/:user_id/posts', (req, res) =>{
    const id = parseInt(req.params.user_id);

    readAll('posts', {author: id})
        .then( posts =>{
            res.json(posts);
        })
        .catch(e =>{
            res.json({Error: e.message});
        })
})

uPubRouter.get('/:user_id/posts/:post_id', (req, res) =>{
    const userId = parseInt(req.params.user_id);
    const postId = parseInt(req.params.post_id);

    readAll('posts', {author: userId, id: postId})
        .then( posts =>{
            if (posts.length === 1) res.json(posts[0]);
            else res.json({Error: `No post with both userID ${userId} and postID ${postId}.`});
        })
        .catch( e =>{
            res.json({Error: e.message});
        })
})

uPubRouter.get('/:user_id/comments', (req, res) =>{
    const userId = parseInt(req.params.user_id);

    readAll('comments', {author: userId})
        .then( comments =>{
            if (comments.length === 0){
                res.json({comments: []})
            }
            res.json(comments);
        })
        .catch( e =>{
            res.json({Error: e.message});
        })
})

uPubRouter.get('/:user_id/comments/:comment_id', (req, res) =>{
    const userId = parseInt(req.params.user_id);
    const commentId = parseInt(req.params.comment_id);

    readAll('comments', {author: userId, id: commentId})
        .then( comments =>{
            if (comments.length === 1) res.json(comments[0]);
            else res.json({comments: []});
        })
        .catch( e =>{
            res.json({Error: e.message});
        })
})

module.exports = uPubRouter;