const express = require('express');
const multer = require('multer');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

//to save new user
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

//Login User
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );

        // creating token for 'user' instance defined above
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

//logout user
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

//logout User from all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return false;
        });
        //or we can do the following
        //req.user.tokens = [];
        await req.user.save();
        res.send('Logged out of all devices!');
    } catch (e) {
        res.status(500).send('Server error');
    }
});

//to see the currently authenticated user from db
router.get('/users/me', auth, async (req, res) => {
    // in `auth` we have created a new property named `req.user` that has currently authenticated user
    res.send(req.user);
});

//to update a user
router.patch('/users/me', auth, async (req, res) => {
    //obj.keys returns array of keys in object
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    //array.every(callback) returns true if callback satisfies condition for each item of array else false
    const isValidOperation = updates.every((item) =>
        allowedUpdates.includes(item)
    );
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' });
    }
    try {
        //read user data from auth
        const user = req.user;
        //update user data with new data
        updates.forEach((update) => (user[update] = req.body[update]));
        //save user data back to db
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

//delete a user
router.delete('/users/me', auth, async (req, res) => {
    try {
        //req.user is from auth(middleware folder)
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});
module.exports = router;

//upload profile pic for current user
const upload = multer({
    dest: 'avatars',
});
router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send();
});
