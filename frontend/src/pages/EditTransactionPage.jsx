import React, { useState, useEffect } from 'react';
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
