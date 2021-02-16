require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('6027c1884d592c01381153e3', { age: 22 })
//     .then((user) => {
//         console.log(user);
//         return User.countDocuments({ age: 22 });
//     })
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
};

updateAgeAndCount('6027c1884d592c01381153e3', 2)
    .then((count) => {
        console.log(count);
    })
    .catch((error) => {
        console.log(error);
    });
