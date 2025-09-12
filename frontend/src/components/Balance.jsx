import React from 'react';
import styles from './Balance.module.css';

const Balance = ({ transactions }) => {
  // --- Calculation Logic ---
  const amounts = transactions.map(transaction => 
    transaction.type === 'income' ? transaction.amount : -transaction.amount
  );

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const totalIncome = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const totalExpenses = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);


  return (
    <div className={styles.container}>
      <div className={styles.balance}>
        <h4>Your Balance</h4>
        <h1 className={total >= 0 ? styles.positive : styles.negative}>${total}</h1>
      </div>
      <div className={styles.summaryContainer}>
        <div className={`${styles.summaryBox} ${styles.income}`}>
          <h4>Income</h4>
          <p className={styles.money}>+${totalIncome}</p>
        </div>
        <div className={`${styles.summaryBox} ${styles.expense}`}>
          <h4>Expense</h4>
          <p className={styles.money}>-${totalExpenses}</p>
        </div>
      </div>
    </div>
  );
};
export default Balance;

