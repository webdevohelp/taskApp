const express = require('express');
require('./db/mongoose');
//
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const app = express();
const port = 80;

app.use(express.json());
//routers
app.use(userRouter);
app.use(taskRouter);

//test homepage
app.get('/', (req, res) => {
    res.end('Server is working!');
});

app.listen(port, '127.0.0.1', () => {
    console.log('Server is up on port ', port);
});
