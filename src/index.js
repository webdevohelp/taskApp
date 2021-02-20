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

app.use((req, res, next) => {
    console.log('params: ', req.params);
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});
//test homepage
app.get('/', (req, res) => {
    res.end('Server is working!');
});

app.listen(port, '127.0.0.1', () => {
    console.log('Server is up on port ', port);
});

// const jwt = require('jsonwebtoken');
// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisissecretkeyortoken', {
//         expiresIn: '7 days',
//     });
//     console.log(token);

//     const data = jwt.verify(token, 'thisissecretkeyortoken');
//     console.log(data);
// };
// myFunction();
