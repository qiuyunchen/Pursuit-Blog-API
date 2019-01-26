const {readAll, readUser, create, update, delete_} = require('../services/crud');
const bcrypt = require('bcrypt');
const express = require('../services/express');
const uPriRouter = express.Router();

uPriRouter.put('/:user_id', (req, res)=>{
    const id = parseInt(req.params.user_id);
    req.body.id = id;

    const p1 = bcrypt.hash(req.body.password, 10)
                    .then( encryptedPW =>{
                        req.body.password = encryptedPW;
                        return readUser('users', id);
                    })
                    .catch(e =>{
                        console.log('When user is not updating password, expected error msg: ', e.message);
                    })
    const p2 = readUser('users', id);

    const pStart = (req.body.password) ? p1 : p2;

    pStart
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
                res.json({Error: 'Nothing updated'});
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