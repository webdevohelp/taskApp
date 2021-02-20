const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trin: true,
    },
    email: {
        type: String,
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
});

//user authentication jsonwebtoken
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

//login
//to check if email id and password match with DB
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Unable to login!');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Unable to login!');
    return user;
};

//
//hash the plain text password before saving it to database
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
