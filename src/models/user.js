const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');
//user schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trin: true,
        },
        email: {
            type: String,
            //set unique email for each user
            unique: true,
            required: [true, 'Please fill in the Email address!'],
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is not valid!');
                }
            },
        },
        password: {
            type: String,
            required: [true, 'Please enter the password!'],
            trim: true,
            validate(value) {
                if (value.length < 6) {
                    throw new Error('Password is too short!');
                } else if (value.toLowerCase().includes('password')) {
                    throw new Error(
                        `Password must not contain the string "password"!`
                    );
                }
            },
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error('Age must be a positive number!');
                }
            },
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);
//virtual property
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
});

//limiting the info what req.user returns ie: removing pwd and rest of the tokens except current one
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};

//user authentication jsonWebToken for login or for new sign-up
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

//login
//to check if email id and password match with DB => (used in routers/user.js)
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login!');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login!');
    }
    return user;
};

//
//hash the plain text password before saving it to database or when the password is changed
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

//delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
