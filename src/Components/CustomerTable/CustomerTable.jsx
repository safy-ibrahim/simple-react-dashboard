   
import React, { useState, useEffect } from 'react';
import data from '../services/api/data.json';
import TransactionChart from '../TransactionChart/TransactionChart';
import './CustomerTable.module.css';

export default function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    setCustomers(data.customers);
    setTransactions(data.transactions);
  }, []);

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleCloseChart = () => {
    setSelectedCustomer(null);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const customer = customers.find(c => c.id === transaction.customer_id);
    if (!customer) return false;
    const searchTermLower = searchTerm.toLowerCase();
    return (
      customer.name.toLowerCase().includes(searchTermLower) ||
      transaction.amount.toString().includes(searchTermLower)
    );
  });

  return (
    <div className='container'>
      <div className="text-center py-4">
        <h2>Customer Transaction Data</h2>
        <div className="my-4">
          <input
            type="text"
            className="form-control w-75 m-auto"
            placeholder="Search by customer name or transaction amount"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className='table table-dark table-striped table-hover'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Transaction Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => {
              const customer = customers.find(c => c.id === transaction.customer_id);
              if (!customer) return null; 
              return (
                <tr key={transaction.id} onClick={() => handleRowClick(customer)}>
                  <td>{transaction.id}</td>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {selectedCustomer && (
          <div className='py-5'>
            <h3>Transactions for {selectedCustomer.name}</h3>
            <TransactionChart transactions={transactions.filter(t => t.customer_id === selectedCustomer.id)} />
            <button className="btn btn-danger mt-3" onClick={handleCloseChart}>
              Close Chart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
