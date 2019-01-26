const {readAll, readUser, create, update, delete_} = require('../services/crud');
const bcrypt = require('bcrypt');
const express = require('../services/express');
const uPriRouter = express.Router();

uPriRouter.put('/:user_id', (req, res)=>{
    const id = parseInt(req.params.user_id);
    req.body.id = id;
    
    bcrypt.hash(req.body.password, 10)
        .then( encryptedPW =>{
            req.body.password = encryptedPW;
            return readUser('users', id)
        })
        .then(user =>{
            const storedToken = user.token;
            if (req.body.token === storedToken){
                return update('users', req.body);
            } else {
                res.json({status: 'not logged in', token: 'invalid'});
            }
        })
        .then( result =>{
            if (result.rowCount === 1){
                res.json({success: `User ID ${id} successfully updated.`});
            } else {
                res.json({Error: 'Failed to update.'});
            }
        })
        .catch(e =>{
            if (e.result.rowCount === 0){
                res.json({Error: `User ID ${id} does not exist.`});
            } else {
                res.json({Error: e.message});
            }
        })
})

uPriRouter.delete('/:user_id', (req, res)=>{
    const id = parseInt(req.params.user_id);
    req.body.id = id;

    readUser('users', id)
        .then(user =>{
            const storedToken = user.token;
            if (req.body.token === storedToken){
                return delete_('users', id);
            } else {
                res.json({Error: 'invalid token'});
            }
        })
        .then(result =>{
            // console.log('after deleting user, result is...', result);
            if (result.rowCount === 1){
                res.json({success: `User ID ${id} successfully deleted.`});
            } else {
                res.json({Error: 'Failed to delete.'});
            }
        })
        .catch(e =>{
            res.json({Error: `User ID ${id} does not exist.`});
        })
})

module.exports = uPriRouter;