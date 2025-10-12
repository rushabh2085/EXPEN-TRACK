import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const EditTransactionModal = ({ transactionId, onClose, onTransactionUpdated, theme }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!transactionId) return;
    
    const fetchTransaction = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const url = `${import.meta.env.VITE_API_URL}/api/transactions/${transactionId}`;
        const { data } = await axios.get(url, config);

        setDescription(data.description);
        setAmount(data.amount);
        setType(data.type);
        setCategory(data.category);
      } catch (err) {
        setError('Failed to fetch transaction data.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTransaction();
  }, [transactionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = `${import.meta.env.VITE_API_URL}/api/transactions/${transactionId}`;
      
      const updatedData = { 
        description, 
        amount: parseFloat(amount), 
        type, 
        category 
      };

      await axios.put(url, updatedData, config);
      onTransactionUpdated();
    } catch (err) {
      setError('Failed to update transaction.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`dark:bg-slate-800/40 bg-white border dark:border-teal-500/20 border-slate-200 rounded-2xl p-6 sm:p-8 w-full max-w-md`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Edit Transaction</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {loading && !error ? (
          <p className={theme.mutedText}>Loading transaction...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            
            <div>
              <label className="block text-sm mb-2 opacity-70">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Groceries, Salary"
                className="w-full px-4 py-3 rounded-lg dark:bg-slate-800/40 bg-slate-100 border dark:border-teal-500/20 border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm mb-2 opacity-70">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount..."
                className="w-full px-4 py-3 rounded-lg dark:bg-slate-800/40 bg-slate-100 border dark:border-teal-500/20 border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 opacity-70">Type</label>
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value)} 
                  className="w-full px-4 py-3 rounded-lg dark:bg-slate-800/40 bg-slate-100 border dark:border-teal-500/20 border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="expense" className="bg-slate-800">Expense</option>
                  <option value="income" className="bg-slate-800">Income</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm mb-2 opacity-70">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Food, Salary"
                  className="w-full px-4 py-3 rounded-lg dark:bg-slate-800/40 bg-slate-100 border dark:border-teal-500/20 border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold text-white transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditTransactionModal;


/* import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTransactionPage = () => {
  const { id } = useParams(); // Get the transaction ID from the URL
  const navigate = useNavigate();

  // State for form fields
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  
  // State for loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch the specific transaction data when the page loads
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const url = `${import.meta.env.VITE_API_URL}/api/transactions/${id}`;
        const { data } = await axios.get(url, config);

        // Pre-fill the form with the fetched data
        setDescription(data.description);
        setAmount(data.amount);
        setType(data.type);
        setCategory(data.category);
      } catch (err) {
        setError('Failed to fetch transaction data.');
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [id]); // The effect re-runs if the ID in the URL changes

  // 2. Handle the form submission to update the data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = `${import.meta.env.VITE_API_URL}/api/transactions/${id}`;
      
      const updatedData = {
        description,
        amount: parseFloat(amount),
        type,
        category,
      };

      await axios.put(url, updatedData, config);
      alert('Transaction updated successfully!');
      navigate('/'); // Go back to the dashboard after updating
    } catch (err) {
      setError('Failed to update transaction.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className={styles.formContainer}>
      <h3>Edit Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formControl}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className={styles.formControl}>
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className={styles.formControl}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditTransactionPage;
 */