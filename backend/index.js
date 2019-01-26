const bodyParser = require('body-parser');
const express = require('./services/express');
const cPriRouter = require('./routes/commt_pri');
const cPubRouter = require('./routes/commt_pub');
const pPriRouter = require('./routes/post_pri');
const pPubRouter = require('./routes/post_pub');
const uPriRouter = require('./routes/user_pri');
const uPubRouter = require('./routes/user_pub');
const {authenticate} = require('./services/middleware');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/user', uPubRouter);
app.use('/post', pPubRouter);
app.use('/comment', cPubRouter);

app.use(authenticate);
app.use('/user', uPriRouter);
app.use('/post', pPriRouter);
app.use('/comment', cPriRouter);

const port = 9000;
app.listen(port, ()=>{
    console.log(`Server turned on, listening to port ${port}`);
});