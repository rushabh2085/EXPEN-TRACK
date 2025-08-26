const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true,'Name is required'],
    },
    mobileNumber: {
        type: String,
        required: [true,'Mobile Number is required'],
        unique: true,
        match: [/^[0-9]{10}$/,"Please fill a valid 10 digit mobile number"]
    },
    password: {
        type: String,
        required: [true,"Password is required"],
        minlength: 6
    }
},{
    timestamps: true
});
const User = mongoose.model('User',userSchema);

module.exports = User;
