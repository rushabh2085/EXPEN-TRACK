const Transaction = require('../models/Transaction.js');

const getTransactions = async ( req,res ) => {
    try {
        // finding a transaction document in the database associated with the user and displaying it in the order of newest ones
        const transactions = await Transaction.find({ user: req.user.id }).sort({createdAt: -1});
        res.status(200).json(transactions);
    }catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};

const addTransaction = async ( req,res ) => {
    try {
        //creating a transaction document in the database and associating it with the user
        const {description, amount , type, category } = req.body;
        const transactions = await Transaction.create({
            user : req.user.id,
            description, 
            amount , 
            type, 
            category,
        });
        res.status(200).json(transactions);
    }catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages[0] });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getTransactions,
    addTransaction,
}