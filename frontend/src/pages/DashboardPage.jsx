import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTransaction from '../components/AddTransaction';
import TransactionList from '../components/TransactionList';

const DashboardPage = () => {

  const [transactions, setTransactions] = useState([]);
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions =async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer{token}`,
          },
        };

        const url = 'http://localhost:5001/api/transactions';
        const response = await axios.get(url, config);

        setTransactions(response.data);

      }catch(err) {
        setError(err);
      }finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []); //[] means the effect run only once

  if(loading) {
    return <p> Loading transaction... </p>;
  }
  else {
    return <p style={{ color: 'red' }}>{error}</p>;
  }
  
    return (
    <div>
      <h1>My Dashboard</h1>
      <AddTransaction/>
      <TransactionList transactions = { transactions }/>
    </div>
  );
};

export default DashboardPage;
