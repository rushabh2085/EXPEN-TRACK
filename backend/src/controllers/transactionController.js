const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction.js');

const getTransactions = asyncHandler(async ( req,res ) => {
    try {
        // finding a transaction document in the database associated with the user and displaying it in the order of newest ones
        const transactions = await Transaction.find({ user: req.user.id }).sort({createdAt: -1});
        res.status(200).json(transactions);
    }catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

const addTransaction = asyncHandler(async ( req,res ) => {

        //creating a transaction document in the database and associating it with the user
        const {description, amount , type, category } = req.body;

        if (!description || amount === undefined || !type || !category) {
            res.status(400);
            throw new Error('Please provide all required fields');
        }
        const transactions = await Transaction.create({
            user : req.user.id,
            description, 
            amount , 
            type, 
            category,
            user: req.user.id,
        });
        res.status(200).json(transactions);
});

module.exports = {
    getTransactions,
    addTransaction,
}