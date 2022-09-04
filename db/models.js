const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email:  {
        type: String,
    },
    password:  {
        type: String,
    },
	createdAt: {
		type: String,
	},
	modifiedAt: {
		type: String,
	},
    roles: [{
        type: String,
    }]
})

const ErrorSchema = new mongoose.Schema({
	message: {
        type: String,
    },
    stack:  {
        type: Object,
    },
    timestamp:  {
        type: String,
    }
})

const Error = mongoose.model('Error', ErrorSchema);
const User = mongoose.model('User', UserSchema);

module.exports = { Error, User }