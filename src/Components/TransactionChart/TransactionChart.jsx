
// TransactionChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

const TransactionChart = ({ transactions }) => {
  const data = {
    labels: transactions.map(t => t.date),
    datasets: [
      {
        label: 'Amount',
        data: transactions.map(t => t.amount),
        backgroundColor: 'rgb(93, 93, 250)',
        borderColor: 'rgb(75,192,192)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
      },
    },
  };

  return <Bar data={data} options={options} key={transactions.length} />;
};

export default TransactionChart;
