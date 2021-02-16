require('../src/db/mongoose');
const Task = require('../src/models/task');

// _id = '602812d0a132d44500927801';

// Task.deleteOne({ _id })
//     .then((success) => {
//         console.log('Task removed!');
//         return Task.countDocuments({ completed: false });
//     })
//     .then((data) => {
//         console.log('remaining incomplete tasks: ', data);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

const deleteAndCount = async (id) => {
    const del = await Task.deleteOne({ _id: id });
    const remTasks = await Task.countDocuments({ completed: false });
    return remTasks;
};
deleteAndCount('60290ad0bdb0dc535462b0f6')
    .then((count) => {
        console.log(count);
    })
    .catch((error) => {
        console.log(error);
    });
