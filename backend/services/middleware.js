const {readAll, readUser, create, update, delete_} = require('./crud');

const authenticate = (req, res, next) =>{
    const token = req.body.token;
    if (!token){
        res.json({Error: 'no token provided'});
    }
    // console.log('still in authenticate...token is...', token);
    next();
    // if (req.params.user_id){
    //     console.log('in authenticate, inside user id...')
    //     id = parseInt(req.params.user_id);
    //     console.log('in authenticate, req.params user id is...', id);

    //     readUser('users', id)
    //     .then( user =>{
    //         const storedToken = user.token;
    //         if (token === storedToken) next();
    //         else res.json({status: 'not logged in', token: 'invalid'});
    //     })
    //     .catch(e =>{
    //         console.log('error is...', e);
    //         if (e.received === 0) {
    //             res.json({Error: `User ID ${id} doesn't exist.`});
    //         }
    //     })
    // }

    // if (req.params.post_id){
    //     id = parseInt(req.params.post_id);
    //     console.log('req.params post id is...', id);

    //     readAll('posts', {id})
    //         .then(post =>{
    //             const id = post.author;
    //             return readUser('users', id);
    //         })
    //         .then( user =>{
    //             const storedToken = user.token;
    //             if (token === storedToken) next();
    //             else res.json({status: 'not logged in', token: 'invalid'});
    //         })
    //         .catch(e =>{
    //             if (e.received === 0) {
    //                 res.json({Error: `Post ID ${id} doesn't exist.`});
    //             }
    //         })
    // }

    // if (req.params.comment_id){
    //     id = parseInt(req.params.comment_id);
    //     console.log('req.params comment id is...', id);

    //     readAll('comments', {id})
    //         .then( comment =>{
    //             const id = comment.author;
    //             return readUser('users', id);
    //         })
    //         .then( user =>{
    //             const storedToken = user.token;
    //             if (token === storedToken) next();
    //             else res.json({status: 'not logged in', token: 'invalid'});
    //         })
    //         .catch(e =>{
    //             if (e.received === 0) {
    //                 res.json({Error: `Comment ID ${id} doesn't exist.`});
    //             }
    //         })
    // }
}

module.exports = {authenticate};