import React from "react";
import axios from 'axios';
import styles from './TransactionList.module.css';

const TransactionList = ({ transactions ,onTransactionDeleted }) => {

    const handleDelete = async( id ) => {
        if(window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                const token = localStorage.getItem('authToken');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const url = `http://localhost:5001/api/transactions/${id}`;
                await axios.delete(url, config);

                if(onTransactionDeleted) {
                    onTransactionDeleted();
                }
            }catch(error) {
                console.error('Failed to delete transaction ',error);
                alert('Could not delete the transaction');  
            }
        };
    };
    if(!transactions || transactions.length === 0) {
        return <p className={styles.noTransaction}>No transactions yet.Add one above!</p>
    }

    return (
        <div className={styles.listContainer}>
            <h3>History</h3>
            <ul className={styles.list}>
                { transactions.map((transaction) => (
                    <li
                    key={transaction._id}
                    className={transaction.type === 'income' ? styles.income : styles.expense}
                    >
                        {transaction.description}
                        <span>{transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount)}</span>
                        <button onClick={() => handleDelete(transaction._id)}
                        className={styles.deleteBtn}
                        >x
                        </button>
                    </li>
                ))}  
            </ul>
        </div>
    );
};
export default TransactionList;