// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const { MongoClient, ObjectID } = require(`mongodb`);
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
//
// //for new object id
// const id = new ObjectID();
// console.log(id.id);
// console.log(id.id.length);
// console.log(id.toHexString());
// console.log(id.toHexString().length);
//
MongoClient.connect(
    connectionURL,
    { useNewUrlParser: true },
    (error, client) => {
        if (error) {
            return console.log('Unable to connect to the DB!');
        }
        const db = client.db(databaseName);

        //1
        //to insert one user to database
        // db.collection('users').insertOne(
        //     {
        //         _id: id,
        //         name: 'Back',
        //         age: 23,
        //     },
        //     (error, result) => {
        //         if (error) {
        //             return console.log('Unable to insert user!');
        //         }
        //         console.log(result.insertedCount);
        //         console.log(result.insertedId);
        //     }
        // );

        //2
        //insertMany
        // db.collection('tasks').insertMany(
        //     [
        //         {
        //             description: 'Task one',
        //             completed: true,
        //         },
        //         {
        //             description: 'Task 2',
        //             completed: false,
        //         },
        //         {
        //             description: 'Task 3',
        //             completed: true,
        //         },
        //     ],
        //     (error, result) => {
        //         if (error) {
        //             return console.log('Unable to write data in the database.');
        //         }
        //         console.log(result.ops);
        //     }
        // );

        // //3
        // //findOne
        // db.collection('users').findOne(
        //     ////to search using id
        //     // { _id: new ObjectID('602574646636ec0838933a04') },
        //     ////to search using name
        //     { name: 'Shubhang' },
        //     (error, user) => {
        //         if (error) {
        //             console.log('Unable to fetch');
        //         }
        //         console.log(user);
        //     }
        // );

        // //4
        // //find => must see docs
        // db.collection('users')
        //     .find({ age: 28 })
        //     .toArray((error, users) => {
        //         console.log(users);
        //     });
        // db.collection('users')
        //     .find({ age: 28 })
        //     .count((error, count) => {
        //         console.log(count);
        //     });

        // //5
        // //updateOne with promises
        // db.collection('users')
        //     .updateOne(
        //         {
        //             _id: new ObjectID('6025f90aef1c900b1c7b3032'),
        //         },
        //         {
        //             $inc: {
        //                 age: 1,
        //             },
        //         }
        //     )
        //     .then((result) => {
        //         console.log(result);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // //6
        // //updateMany with promises
        // db.collection('users')
        //     .updateMany(
        //         { name: 'Shubhang' },
        //         {
        //             $set: { name: 'Hello' },
        //         }
        //     )
        //     .then((result) => {
        //         console.log(result);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // //7
        // //deleteOne
        // db.collection('users')
        //     .deleteOne({ name: 'Hello' })
        //     .then((result) => {
        //         console.log(result);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // //8
        // //deleteMany
        // db.collection('users')
        //     .deleteMany({ name: 'Ram' })
        //     .then((result) => {
        //         console.log(result);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        //
    }
);
