const express = require('express');
const router = new express.Router();
const User = require('../models/user');

//Users
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

//create tokens for new user

//Login process
//tokens etc management
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

//to see all the users from db
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send();
    }
});

//to see specific user from db
router.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findById({ _id });
        if (!user) res.status(404).send('User not found!');
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});
//to update a user
router.patch('/users/:id', async (req, res) => {
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
        //read user data from db
        const user = await User.findById(req.params.id);
        //update user data with new data
        updates.forEach((update) => (user[update] = req.body[update]));
        //save user data back to db
        await user.save();
        if (!user) res.status(404).send();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});
//delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) res.status(404).send('User not found!');
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});
module.exports = router;
