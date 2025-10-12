import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';

// Import all your components
import Balance from '../components/Balance';
import TransactionList from '../components/TransactionList';
import TransactionChart from '../components/TransactionChart';
import SummaryChart from '../components/SummaryChart';
import AddTransactionModal from '../components/AddTransactionModal';

// Notice this component no longer receives or uses 'sidebarOpen'
const DashboardPage = ({ theme }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = `${import.meta.env.VITE_API_URL}/api/transactions`;
      const response = await axios.get(url, config);
      setTransactions(response.data);
    } catch (err) {
      setError('Failed to fetch transactions. Please try again.');
    } finally {
      if(loading) setLoading(false);
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  const handleTransactionAdded = () => {
    fetchTransactions();
    setModalOpen(false);
  };
  
  const handleTransactionDeleted = () => fetchTransactions();

  if (loading) return <div className="p-8"><p>Loading FinTrack Data...</p></div>;
  if (error) return <div className="p-8"><p className="text-red-400">{error}</p></div>;

  // The <aside> element has been completely removed from this file.
  // This component now only renders the <main> content area.
  return (
    <div className="p-4 sm:p-6 lg:p-8">
        <Balance transactions={transactions} theme={theme} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
            <SummaryChart transactions={transactions} theme={theme} />
            <TransactionChart transactions={transactions} theme={theme} />
        </div>

        <div className={`${theme.glass} border ${theme.cardBorder} rounded-2xl p-6`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Recent Transactions</h3>
                <button onClick={() => setModalOpen(true)} className={`flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors font-semibold text-white`}>
                    <Plus size={20} />
                    Add Transaction
                </button>
            </div>
            <TransactionList transactions={transactions} onTransactionDeleted={handleTransactionDeleted} theme={theme} />
        </div>
        
        {modalOpen && (
            <AddTransactionModal 
                onClose={() => setModalOpen(false)} 
                onTransactionAdded={handleTransactionAdded} 
                theme={theme}
            />
        )}
    </div>
  );
};
export default DashboardPage;


/* import React, { useState, useEffect } from 'react';
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

    const handleTransactionDeleted = () => {
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
      <TransactionList transactions = { transactions }
      onTransactionDeleted={ handleTransactionDeleted }
      />
    </div>
  );
};

export default DashboardPage;
 */
