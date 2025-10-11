import React from 'react';

const Balance = ({ transactions, theme }) => {
  const amounts = transactions.map(t => t.type === 'income' ? t.amount : -t.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const totalIncome = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const totalExpenses = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

  return (
    <div className={`${theme.glass} border ${theme.cardBorder} rounded-2xl p-6 mb-6`}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
        <div>
          <h4 className={`text-sm font-semibold uppercase ${theme.mutedText} tracking-wider`}>Balance</h4>
          <p className={`text-4xl font-bold tracking-tight ${total >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ${total}
          </p>
        </div>
        <div className="sm:text-right">
          <h4 className={`text-sm font-semibold uppercase ${theme.mutedText} tracking-wider`}>Income</h4>
          <p className="text-2xl font-semibold text-green-400">+${totalIncome}</p>
        </div>
        <div className="sm:text-right">
          <h4 className={`text-sm font-semibold uppercase ${theme.mutedText} tracking-wider`}>Expense</h4>
          <p className="text-2xl font-semibold text-red-400">-${totalExpenses}</p>
        </div>
      </div>
    </div>
  );
};

export default Balance;

