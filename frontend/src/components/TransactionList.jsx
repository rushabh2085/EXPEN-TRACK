import React from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';

const TransactionList = ({ transactions, onTransactionDeleted, onEdit, theme }) => {
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = `${import.meta.env.VITE_API_URL}/api/transactions/${id}`;
      await axios.delete(url, config);
      onTransactionDeleted();
    } catch (err) {
      alert('Failed to delete transaction. Please try again.');
    }
  };

  if (!transactions || transactions.length === 0) {
    return <p className={theme.mutedText}>No transactions yet. Add your first one!</p>;
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className={`flex items-center justify-between p-4 rounded-lg ${theme.cardBg} border ${theme.cardBorder} hover:border-opacity-40 transition-all`}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-10 rounded-full ${transaction.type === 'income' ? 'bg-green-400' : 'bg-red-400'}`} />
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className={`text-sm ${theme.mutedText}`}>{transaction.category}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
              {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
            </span>
            
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(transaction._id)}
                className="p-2 rounded-lg bg-blue-400/10 hover:bg-blue-400/20 text-blue-400 transition-colors"
                title="Edit"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(transaction._id)}
                className="p-2 rounded-lg bg-red-400/10 hover:bg-red-400/20 text-red-400 transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;





/* import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Trash2, Edit } from 'lucide-react';

const TransactionList = ({ transactions, onTransactionDeleted, theme }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        const token = localStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const url = `${import.meta.env.VITE_API_URL}/api/transactions/${id}`;
        await axios.delete(url, config);
        if (onTransactionDeleted) onTransactionDeleted();
      } catch (error) {
        alert('Could not delete the transaction.');
      }
    }
  };

  if (!transactions || transactions.length === 0) {
    return <p className={`text-center ${theme.mutedText} mt-6`}>No transactions yet. Add one to get started!</p>;
  }

  return (
    <div className="space-y-3">
      {transactions.map((t) => (
        <div key={t._id} className={`group flex items-center justify-between p-4 rounded-lg ${theme.cardBg} border border-transparent hover:${theme.cardBorder} transition-all`}>
          <div className="flex items-center gap-4">
            <div className={`w-1.5 h-10 rounded-full ${t.type === 'income' ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <div>
              <p className="font-medium">{t.description}</p>
              <p className={`text-sm ${theme.mutedText}`}>{t.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className={`font-bold text-lg ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
              {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toFixed(2)}
            </span>
            <div className={`flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity`}>
              <Link to={`/edit/${t._id}`} className={`p-2 ${theme.mutedText} hover:text-orange-400 transition-colors`}>
                <Edit size={16} />
              </Link>
              <button onClick={() => handleDelete(t._id)} className={`p-2 ${theme.mutedText} hover:text-red-400 transition-colors`}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList; */





/* import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 1. Import Link
import styles from './TransactionList.module.css';

const TransactionList = ({ transactions, onTransactionDeleted }) => {
  const handleDelete = async (id) => {
    // ... (handleDelete function is unchanged)
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        const token = localStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const url = `http://localhost:5001/api/transactions/${id}`;
        await axios.delete(url, config);
        if (onTransactionDeleted) {
          onTransactionDeleted();
        }
      } catch (error) {
        console.error('Failed to delete transaction', error);
        alert('Could not delete the transaction.');
      }
    }
  };

  if (!transactions || transactions.length === 0) {
    return <p className={styles.noTransactions}>No transactions yet. Add one above!</p>;
  }

  return (
    <div className={styles.listContainer}>
      <h3>History</h3>
      <ul className={styles.list}>
        {transactions.map((transaction) => (
          <li 
            key={transaction._id} 
            className={transaction.type === 'income' ? styles.income : styles.expense}
          >
            <div className={styles.transactionDetails}>
              <span>{transaction.description} ({transaction.category})</span>
              <span>{transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount)}</span>
            </div>
            <div className={styles.buttons}>
              <Link to={`/edit/${transaction._id}`} className={styles.editBtn}>
                Edit
              </Link>
              <button 
                onClick={() => handleDelete(transaction._id)} 
                className={styles.deleteBtn}
              >
                x
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TransactionList;
 */

