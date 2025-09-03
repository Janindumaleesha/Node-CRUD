const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please enter first name."]
        },
        lastName: {
            type: String,
            required: [true, "Please enter last name."]
        },
        userName: {
            type: String,
            required: [true, "Please enter username."],
            unique: true,
            minlength: [3, "Username must be at least 3 characters long."]
        },
        password: {
            type: String,
            required: [true, "Please enter password."],
            minlength: [6, "Password must be at least 6 characters long."]
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;