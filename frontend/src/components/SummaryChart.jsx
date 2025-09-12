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
