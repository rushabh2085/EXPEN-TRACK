import React, { useState } from "react";
import styles from './AddTransaction.module.css';

const AddTransaction = () => {
    // state for each input field
    const [description,setDescription] = useState('');
    const [amount,setAmount] = useState('');
    const [type,setType] = useState('expense');
    const [category,setCategory] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // we will send the data to the backend here
        console.log({
            description,
            amount : parseFloat(amount),
            type,
            category,
        })
        // reset form fields after submission
        setDescription('');
        setAmount('');
        setType('');
        setCategory('');
    };

    return (
        <div className={styles.formContainer}>
            <h3>Add New Transaction</h3>
            <form onSubmit = { handleSubmit }>
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