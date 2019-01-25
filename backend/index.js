const bodyParser = require('body-parser');
const express = require('./services/express');
const uPubRouter = require('./routes/user_pub');
const uPriRouter = require('./routes/user_pri');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/user', uPubRouter);

app.use('/user', uPriRouter);

const port = 9000;
app.listen(port, ()=>{
    console.log(`Server turned on, listening to port ${port}`);
});