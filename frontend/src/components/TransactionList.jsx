import React from "react";
import styles from './TransactionList.module.css';

const TransactionList = ({transactions}) => {
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
                    </li>
                ))}  
            </ul>
        </div>
    );
};
export default TransactionList;