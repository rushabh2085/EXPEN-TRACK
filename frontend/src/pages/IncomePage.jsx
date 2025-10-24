import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, TrendingUp, DollarSign } from 'lucide-react';

import TransactionList from '../components/TransactionList';
import AddTransactionModal from '../components/AddTransactionModal';
import EditTransactionModal from '../components/EditTransactionModal';

const IncomePage = ({ theme }) => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  // State for controlling the modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingTransactionId, setEditingTransactionId] = useState(null);

  // 1. Fetch ALL transactions
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = `${import.meta.env.VITE_API_URL}/api/transactions`;
      const response = await axios.get(url, config);
      setAllTransactions(response.data);
    } catch (err) {
      setError('Failed to fetch transactions. Please try again.');
    } finally {
      if (loading) setLoading(false);
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  // 2. Filter transactions to get only income
  const incomeTransactions = allTransactions.filter(t => t.type === 'income');

  // 3. Calculate total income
  const totalIncome = incomeTransactions.reduce((acc, t) => acc + t.amount, 0).toFixed(2);

  // Handlers (same logic as DashboardPage)
  const handleTransactionAdded = () => { fetchTransactions(); setAddModalOpen(false); };
  const handleTransactionDeleted = () => { fetchTransactions(); };
  const handleTransactionUpdated = () => { fetchTransactions(); setEditingTransactionId(null); };

  if (loading) return <div className="p-8"><p>Loading Income Data...</p></div>;
  if (error) return <div className="p-8"><p className="text-red-400">{error}</p></div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Income</h1>

      {/* Total Income Card */}
      <div className={`${theme.glass} border ${theme.cardBorder} rounded-2xl p-6 mb-6`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-semibold uppercase ${theme.mutedText} tracking-wider`}>Total Income</span>
          <TrendingUp className="text-green-400" size={24} />
        </div>
        <p className="text-4xl font-bold text-green-400">+${totalIncome}</p>
      </div>

      {/* Income Transaction List */}
      <div className={`${theme.glass} border ${theme.cardBorder} rounded-2xl p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Income History</h3>
          <button 
            onClick={() => setAddModalOpen(true)} 
            className={`flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold text-white transition-colors`}
          >
            <Plus size={20} /> Add Income
          </button>
        </div>
        {/* Pass the FILTERED list to the TransactionList component */}
        <TransactionList 
          transactions={incomeTransactions} 
          onTransactionDeleted={handleTransactionDeleted}
          onEdit={setEditingTransactionId} 
          theme={theme} 
        />
      </div>
      
      {addModalOpen && (
        <AddTransactionModal 
          onClose={() => setAddModalOpen(false)} 
          onTransactionAdded={handleTransactionAdded} 
          theme={theme}
          initialType="income"
        />
      )}
      {editingTransactionId && (
        <EditTransactionModal
          transactionId={editingTransactionId}
          onClose={() => setEditingTransactionId(null)}
          onTransactionUpdated={handleTransactionUpdated}
          theme={theme}
        />
      )}
    </div>
  );
};

export default IncomePage;
