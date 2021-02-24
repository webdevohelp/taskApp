const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');

//to Create new task
router.post(`/tasks`, auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id,
        });
        const taskSave = await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send();
    }
});

//to see all tasks from db for specific user
//GET /tasks?completed=true/false to get completed or incomplete tasks
//GET /tasks?limit=10&skip=0 for pagination and skips
//GET /tasks?sortBy=createdAt:asc or :desc
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};
    if (req.query.completed) {
        //if in URL completed=true then match.completed = true, else false
        match.completed = req.query.completed === 'true';
    }
    if (req.query.sortBy) {
        //to split the url and check whether it is desc or acs
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    try {
        // const tasks = await Task.find({ owner: req.user_id });
        await req.user
            .populate({
                path: 'tasks',
                match,
                //pagination & sorting for mongoose
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort,
                },
            })
            .execPopulate();
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send();
    }
});

//to get a single task from DB using its id created by logged in user
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        // const singleTask = await Task.findById({ _id });
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) res.status(404).send();
        res.status(200).send(task);
    } catch (e) {
        res.status(500).send();
    }
});

//to Update a task
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id,
        });

        if (!task) {
            return res.status(404).send();
        }
        updates.forEach((update) => (task[update] = req.body[update]));
        await task.save();

        res.send(task);
    } catch (e) {
        res.status(400).send();
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id,
        });
        if (!task) res.status(404).send('Task not found');
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});
module.exports = router;
