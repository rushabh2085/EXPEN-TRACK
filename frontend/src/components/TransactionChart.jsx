import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = ({ transactions }) => {
  const expenses = transactions.filter(t => t.type === 'expense');

  const expenseByCategory = expenses.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        label: 'Expenses',
        data: Object.values(expenseByCategory),
        backgroundColor: [
          '#14b8a6', // Teal
          '#3b82f6', // Blue
          '#f97316', // Orange
          '#8b5cf6', // Violet
          '#ec4899', // Pink
          '#f59e0b', // Amber
        ],
        borderColor: '#1f2937', // A dark border for contrast
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#d1d5db', // Gray-300 for legend text
          font: {
            size: 14,
          }
        }
      },
      tooltip: {
        backgroundColor: '#374151', // Gray-700 tooltip background
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
      }
    },
  };

  return (
    // We now use Tailwind classes for the "glassmorphism" card effect
    <div className="bg-slate-800/40 backdrop-blur-xl border border-teal-500/20 rounded-2xl p-6 flex flex-col">
      <h3 className="text-lg font-semibold text-center mb-4 text-gray-200">Expense Breakdown</h3>
      <div className="relative flex-grow">
        {expenses.length > 0 ? (
          <Pie data={chartData} options={chartOptions} />
        ) : (
          <p className="text-center text-gray-400 h-full flex items-center justify-center">
            No expense data to display a chart.
          </p>
        )}
      </div>
    </div>
  );
};

export default TransactionChart;



/* import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './TransactionChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = ({ transactions }) => {
  const expenses = transactions.filter(t => t.type === 'expense');

  const expenseByCategory = expenses.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(expenseByCategory),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)', 'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)', 'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // This is important for the wrapper fix
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Expense Breakdown' },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <h3>Expense Analysis</h3>
      {expenses.length > 0 ? (
        <div className={styles.chartWrapper}>
          <Pie data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p>No expense data available to display a chart.</p>
      )}
    </div>
  );
};

export default TransactionChart;
 */