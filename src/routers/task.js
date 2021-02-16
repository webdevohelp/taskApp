const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

//Tasks
//to store new task
router.post(`/tasks`, async (req, res) => {
    try {
        const task = new Task(req.body);
        console.log(task);
        const taskSave = await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});
//to see all tasks from db
router.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    });
});
//to get a single task from DB using its id
router.get('/tasks/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const singleTask = await Task.findById({ _id });
        res.status(200).send(singleTask);
    } catch (e) {
        res.status(500).send(e);
    }
});
//to Update a task
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((item) =>
        allowedUpdates.includes(item)
    );
    if (!isValidOperation) res.status(400).send('Not allowed!');
    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true,
        // });
        const task = await Task.findById(req.params.id);
        updates.forEach((update) => (task[update] = req.body[update]));
        await task.save();
        res.status(200).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) res.status(404).send('Task not found');
        res.status(200).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});
module.exports = router;
