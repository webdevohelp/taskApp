const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = Task;
// task = new Task({
//     description: 'Study',
// });

// task.save()
//     .then((task) => {
//         console.log(task);
//     })
//     .catch((error) => {
//         console.log('Error!', error);
//     });
