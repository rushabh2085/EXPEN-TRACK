import React, { useState } from "react";
import axios from 'axios';
import styles from './AddTransaction.module.css';

const AddTransaction = () => {
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

export default AddTransaction;