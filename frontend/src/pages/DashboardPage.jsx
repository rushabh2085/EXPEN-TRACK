import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css'
import AddTransaction from '../components/AddTransaction';
import TransactionList from '../components/TransactionList';
import TransactionChart from '../components/TransactionChart';
import SummaryChart from '../components/SummaryChart';
import Balance from '../components/Balance';

const DashboardPage = () => {

  const [transactions, setTransactions] = useState([]);
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(true);

    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const url = 'http://localhost:5001/api/transactions';
        const response = await axios.get(url, config);

        setTransactions(response.data);

      }catch(err) {
        setError('Failed to fetch transactions. Please try again.');
      }finally {
        setLoading(false);
      }
    };

    useEffect(() => {
    fetchTransactions();
  }, []); //[] means the effect run only once

   const handleTransactionAdded = () => {
    // This function can be passed to AddTransaction so it can trigger a refresh
    fetchTransactions();
  }; 

  if (loading) {
    return <p> Loading transaction... </p>;
  }
  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

    return (
    <div>
      <h1>My Dashboard</h1>
      <Balance transactions={ transactions }/>
      <div className={styles.chartsWrapper}>
        <SummaryChart transactions={transactions} />
        <TransactionChart transactions={transactions} />
      </div>
      <AddTransaction onTransactionAdded = { handleTransactionAdded }/>
      <TransactionList transactions = { transactions }/>
    </div>
  );
};

export default DashboardPage;
