const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction, getTransactionById,updateTransaction } = require('../controllers/transactionController.js');
const { protect } = require('../middlewares/protect.js');

router.route('/')
  .get(protect, getTransactions)
  .post(protect, addTransaction);

router.route('/:id')
  .get(protect, getTransactionById)
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

module.exports = router;