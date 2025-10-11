const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction.js');

// @desc    Get transactions
// @route   GET /api/transactions/
// @access  Private
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

// @desc    Add a transaction
// @route   POST /api/transactions/
// @access  Private
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

// @desc    delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if(!transaction) {
        res.status(404);
        throw new Error('Transaction not found');
    }

    if(transaction.user.toString() !== req.user.id) {
        res.status(400);
        throw new Error('User not authorized');
    }

    await transaction.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Transaction removed'});
});

// @desc    Get a single transaction
// @route   GET /api/transactions/:id
// @access  Private
const getTransactionById = asyncHandler( async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if(transaction && transaction.user.toString() == req.user.id) {
        res.status(200).json(transaction);
    }else {
        res.status(404);
        throw new Error('Transaction not found or user not authorized');
    }
});

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = asyncHandler( async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if(!transaction) {
        res.status(404);
        throw new Error('Transaction not');
    }
    //Verify ownership
    if(transaction.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    transaction.description = req.body.description || transaction.description;
    transaction.type = req.body.type || transaction.type;
    transaction.amount = req.body.amount|| transaction.amount;
    transaction.category = req.body.category|| transaction.category;

    const updateTransaction = await transaction.save();
    res.status(200).json(updateTransaction);
});


module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction,
    getTransactionById,
    updateTransaction,
};