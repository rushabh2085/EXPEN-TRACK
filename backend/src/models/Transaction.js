const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        trim: true,
    },
    amount: {
        type: Number,
        required: [true, 'Please add an amount'],
        min: [0, 'Amount must be a positive number'],
    },
    type: {
        type: String,
        enum: ['income','expense'],
        required: true,
    },
    category: {
        type: String,
        required: [true, 'Please add a category(e.g. Food, Salary etc)'],
        trim: true,
    },
}, {
    timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;