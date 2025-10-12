import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,  
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SummaryChart = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const chartData = {
    labels: ['Summary'],
    datasets: [
      {
        label: 'Income',
        data: [totalIncome],
        backgroundColor: '#4ade80', // Green-400
        borderColor: '#22c55e',     // Green-500
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: 'Expenses',
        data: [totalExpenses],
        backgroundColor: '#f87171', // Red-400
        borderColor: '#ef4444',     // Red-500
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#d1d5db', // Gray-300 for legend text
          font: { size: 14 }
        }
      },
      tooltip: {
        backgroundColor: '#374151',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Lighter grid lines
        },
        ticks: {
          color: '#d1d5db', // Gray-300 for Y-axis labels
        },
      },
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
        ticks: {
          color: '#d1d5db', // Gray-300 for X-axis labels
        },
      },
    },
  };

  return (
    // We now use Tailwind classes for the "glassmorphism" card effect
    <div className="bg-slate-800/40 backdrop-blur-xl border border-teal-500/20 rounded-2xl p-6 flex flex-col">
      <h3 className="text-lg font-semibold text-center mb-4 text-gray-200">Income vs. Expenses</h3>
      <div className="relative flex-grow">
        {transactions.length > 0 ? (
          <Bar options={chartOptions} data={chartData} />
        ) : (
          <p className="text-center text-gray-400 h-full flex items-center justify-center">
            No data available to display a chart.
          </p>
        )}
      </div>
    </div>
  );
};

export default SummaryChart;


/* import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './SummaryChart.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SummaryChart = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const chartData = {
    labels: ['Monthly Summary'],
    datasets: [
      {
        label: 'Income',
        data: [totalIncome],
        backgroundColor: 'rgba(39, 174, 96, 0.7)',
        borderColor: 'rgba(39, 174, 96, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: [totalExpenses],
        backgroundColor: 'rgba(192, 57, 43, 0.7)',
        borderColor: 'rgba(192, 57, 43, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // This is important for the wrapper fix
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Income vs. Expenses' },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className={styles.chartContainer}>
      <h3>Financial Summary</h3>
      {transactions.length > 0 ? (
        <div className={styles.chartWrapper}>
          <Bar options={chartOptions} data={chartData} />
        </div>
      ) : (
        <p>No data available to display a chart.</p>
      )}
    </div>
  );
};

export default SummaryChart;
 */