import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const AddTransactionModal = ({ onClose, onTransactionAdded, theme }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('authToken');
      const transactionData = { description, amount: parseFloat(amount), type, category };
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = 'http://localhost:5001/api/transactions';
      await axios.post(url, transactionData, config);
      onTransactionAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add transaction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`dark:bg-slate-800/40 bg-white border dark:border-teal-500/20 border-slate-200 rounded-2xl p-6 sm:p-8 w-full max-w-md`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Add New Transaction</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-red-500/20 transition-colors">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div>
            <label className="block text-sm mb-2 opacity-70">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Groceries, Salary"
              className={`w-full px-4 py-3 rounded-lg dark:bg-slate-800/40 bg-slate-100 border dark:border-teal-500/20 border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500`}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 opacity-70">Amount</label>
            <input
              type="number"
              value={amount}
              // --- THIS WAS THE BUG: e.g.value changed to e.target.value ---
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
              className={`w-full px-4 py-3 rounded-lg dark:bg-slate-800/40 bg-slate-100 border dark:border-teal-500/20 border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500`}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 opacity-70">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className={`w-full px-4 py-3 rounded-lg dark:bg-slate-800/40 bg-slate-100 border dark:border-teal-500/20 border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500`}>
                <option value="expense" className="bg-slate-800">Expense</option>
                <option value="income" className="bg-slate-800">Income</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2 opacity-70">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Food, Salary"
                className={`w-full px-4 py-3 rounded-lg dark:bg-slate-800/40 bg-slate-100 border dark:border-teal-500/20 border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                required
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className={`w-full py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold text-white transition-colors disabled:opacity-50`}>
            {loading ? 'Adding...' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;




/* import React, { useState } from "react";
import axios from 'axios';
import styles from './AddTransaction.module.css';

const AddTransaction = ( { onTransactionAdded } ) => {
    // state for each input field
    const [description,setDescription] = useState('');
    const [amount,setAmount] = useState('');
    const [type,setType] = useState('expense');
    const [category,setCategory] = useState('');

    //states for loading and error
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // we will send the data to the backend here
        try{
            const token = localStorage.getItem('authToken');
            if(!token) {
                setError('You must be logged in to add transaction');
                setLoading(false);
                return;
            }
            // prepare data for api call
            const transactionData = {
                description,
                amount: parseFloat(amount),
                type,
                category,
            };
            // prepare config for api call
            const config = {
                headers: {
                    'Context-Type': 'application/json',
                    Authorization: `Bearer ${token}`, //including the token here
                },
            };

            //send the data to the backend
            const url = 'http://localhost:5001/api/transactions';
            await axios.post(url, transactionData, config);

            // reset form fields after submission
            setDescription('');
            setAmount('');
            setType('');
            setCategory('');

            alert('Transaction added succesfully!');
             if (onTransactionAdded) {
                onTransactionAdded();
             }
        }catch(err) {
            if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
            }else if(err.code === 'ERR_NETWORK') {
                setError('Network Error: Could not connect to the server.');
            }else {
                setError('Failed to add transaction. Please try again.');
            }
        }finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h3>Add New Transaction</h3>
            <form onSubmit = { handleSubmit }>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <div className={styles.formControl}>
                    <label htmlFor="description">Description</label>
                    <input
                    type="text"
                    value = {description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a description..."
                    required
                />
                </div>

                <div className={styles.formControl}>
                    <label htmlFor="amount">Amount</label>
                    <input
                    type="number"
                    value = { amount }
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter the amount..."
                    required
                    />
                </div>

                <div className={styles.formControl}>
                    <label htmlFor="type">Type</label>
                    <select value={ type } onChange={(e) => setType(e.target.value)}>
                        <option value = 'expense'>Expense</option>
                        <option value = 'income'>Income</option>    
                    </select>    
                </div>

                <div className={styles.formControl}>
                    <label htmlFor="category">Category</label>
                    <input
                    type="text"
                    value={ category }
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter a category (Eg.Food , Salary)"
                    required
                    />
                </div>
                <button className={styles.btn}>Add Transaction</button>
            </form>
        </div>
    );
};

export default AddTransaction; */