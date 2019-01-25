const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/blog');


const readAll = (table, obj) =>{
    const keys = Object.keys(obj);
    const filterStr = keys.map(key => `${key} = $[${key}]`).join(' AND ');
    return db.any(`SELECT * FROM ${table} WHERE ${filterStr}`, obj);
}

const readUser = (table, id) =>{
    if (typeof id === 'string'){
        return db.one(`SELECT * FROM ${table} WHERE username = $[username]`, {username: id})
    }
    return db.one(`SELECT * FROM ${table} WHERE id = $[id]`, {id});
}

const create = (table, obj) =>{
    let parameters = '';
    let valueStr = '';
    if (table === 'users'){
        parameters = 'username, email, password';
        valueStr = '$[username], $[email], $[password]';
    }
    if (table === 'posts'){
        parameters = 'author, title, body';
        valueStr = '$[author], $[title], $[body]';
    }
    if (table === 'comments'){
        parameters = 'author, post_id, title, body';
        valueStr = '$[author], $[post_id], $[title], $[body]';
    }

    return db.result(`INSERT INTO ${table} (${parameters}) VALUES (${valueStr})`, obj);
}

const update = (table, obj) =>{
    const arrOfKeys = Object.keys(obj);
    const update = arrOfKeys.map(key => `${key}=$[${key}]`).join(', ');

    return db.result(`UPDATE ${table} SET ${update} WHERE id = $[id]`, obj);
}

const delete_ = (table, id) =>{
    let deleteTangents = '';
    if (table === 'users'){
        deleteTangents = `
        DELETE FROM comments WHERE author = $[id];
        DELETE FROM posts WHERE author = $[id];`
    }
    if (table === 'posts'){
        deleteTangents = `
        DELETE FROM comments WHERE post_id = $[id];`
    }
    return db.result(`${deleteTangents} DELETE FROM ${table} WHERE id = $[id]`, {id});
}


module.exports = {readAll, readUser, create, update, delete_};