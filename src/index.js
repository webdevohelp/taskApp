const express = require('express');
require('./db/mongoose');
//
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const app = express();
const port = 80;

app.param('username', function (request, response, next, username) {
    // ... Perform database query and
    // ... Store the user object from the database in the req object
    console.log('app.param running!');
});

//website maintainance mode middleware, websiteMaintain "true" to activate maintain mode
app.use((req, res, next) => {
    websiteMaintain = false;
    if (websiteMaintain) {
        res.status(503).send(
            'Website under maintainance! Please wait for some time.'
        );
    } else {
        next();
    }
});

//file upload system
const multer = require('multer');
const upload = multer({
    dest: 'images',
});
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
});

//
app.use(express.json());

//routers
app.use(userRouter);
app.use(taskRouter);

//test homepage
app.get('/', (req, res) => {
    res.end('Server is working! शुभांग');
});

app.listen(port, '127.0.0.1', () => {
    console.log('Server is up on port ', port);
});
