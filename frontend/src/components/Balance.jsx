import React from 'react';

const Balance = ({ transactions, theme }) => {
  const amounts = transactions.map(t => t.type === 'income' ? t.amount : -t.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const totalIncome = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const totalExpenses = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

  return (
    <div>
        <div className="text-center">
            <h4 className={`text-sm uppercase ${theme.mutedText} font-semibold tracking-wider`}>Your Balance</h4>
            <h1 className={`text-4xl font-bold tracking-tight ${total >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${total}
            </h1>
        </div>
      
        <div className={`mt-6 grid grid-cols-2 divide-x ${theme.cardBorder} ${theme.cardBg} ${theme.glass} border rounded-2xl p-4 text-center`}>
            <div className="px-4">
                <h4 className={`text-sm font-semibold uppercase ${theme.mutedText} tracking-wider`}>Income</h4>
                <p className="text-2xl font-semibold text-green-400">+${totalIncome}</p>
            </div>
            <div className="px-4">
                <h4 className={`text-sm font-semibold uppercase ${theme.mutedText} tracking-wider`}>Expense</h4>
                <p className="text-2xl font-semibold text-red-400">-${totalExpenses}</p>
            </div>
        </div>
    </div>
  );
};

export default Balance;

