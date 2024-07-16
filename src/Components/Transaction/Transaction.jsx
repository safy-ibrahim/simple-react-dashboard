// //http://localhost:5000

// // src/components/Transactions.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Transactions = () => {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/transactions') // ضع هنا الـ API الفعلي الخاص بك
//       .then(response => {
//         console.log('Transactions data:', response.data); // عرض البيانات في الكونسول للتحقق منها
//         setTransactions(response.data);
//       })
//       .catch(error => console.error('Error fetching transactions:', error));
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2 className="my-4 text-center">Transactions</h2>
//       <div className="table-responsive">
//         <table className="table table-hover table-bordered">
//           <thead className="thead-dark">
//             <tr>
//               <th scope="col">ID</th>
//               <th scope="col">Customer ID</th>
//               <th scope="col">Amount</th>
//               <th scope="col">Date</th> {/* إضافة عمود التاريخ */}
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map(transaction => (
//               <tr key={transaction.id}>
//                 <td>{transaction.id}</td>
//                 <td>{transaction.customerId}</td>
//                 <td>${transaction.amount.toFixed(2)}</td> {/* عرض الكمية بتنسيق عملة */}
//                 <td>{new Date(transaction.date).toLocaleDateString()}</td> {/* عرض التاريخ بتنسيق مقروء */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Transactions;








//  اخر حاجه شغاله تمام

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const CustomerTable = () => {
//   const [customers, setCustomers] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [filteredTransactions, setFilteredTransactions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const customerResponse = await axios.get('http://localhost:5001/customers');
//         const transactionResponse = await axios.get('http://localhost:5001/transactions');
//         console.log('Customers:', customerResponse.data);
//         console.log('Transactions:', transactionResponse.data);
//         setCustomers(customerResponse.data);
//         setTransactions(transactionResponse.data);
//         setFilteredTransactions(transactionResponse.data); // Initialize filtered data with all transactions
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     // Filter transactions based on search term
//     const filteredData = transactions.filter(tx =>
//       tx.amount.toString().includes(searchTerm) ||
//       customers.find(c => c.id === tx.customerId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredTransactions(filteredData);
//   }, [searchTerm, transactions, customers]);

//   return (
//     <div className="container mt-5">
//       <h2>Customer Transactions</h2>
//       <div className="mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by customer name or transaction amount"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Customer ID</th>
//             <th>Customer Name</th>
//             <th>Transaction Date</th>
//             <th>Transaction Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.map(customer => {
//             const customerTransactions = filteredTransactions.filter(tx => tx.customerId === customer.id);
//             return customerTransactions.map((transaction, index) => (
//               <tr key={transaction.id}>
//                 {index === 0 && (
//                   <td rowSpan={customerTransactions.length}>{customer.id}</td>
//                 )}
//                 <td>{customer.name}</td>
//                 <td>{transaction.date}</td>
//                 <td>{transaction.amount}</td>
//               </tr>
//             ));
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CustomerTable;
















import React, { useEffect, useState } from 'react';
import { getCustomers, getTransactions } from '../services/';
import TransactionChart from '../TransactionChart/TransactionChart';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      console.log('Customers fetched:', response.data);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions();
      console.log('Transactions fetched:', response.data);
      setTransactions(response.data);
      setFilteredTransactions(response.data); // Initially set to all transactions
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsDataLoaded(false);
      await fetchCustomers();
      await fetchTransactions();
      setIsDataLoaded(true);
    };

    fetchData();
  }, []);

  const filterTransactions = () => {
    const filteredData = transactions.filter(tx =>
      tx.amount.toString().includes(searchTerm) ||
      customers.find(c => c.id === tx.customerId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filteredData);
  };

  useEffect(() => {
    filterTransactions();
  }, [searchTerm, transactions, customers]);

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Customer Transactions</h2>
      <div className="my-4 text-center">
        <input
          type="text"
          className="form-control"
          placeholder="Search by customer name or transaction amount"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '50%', margin: 'auto' }}
        />
      </div>
      {isDataLoaded ? (
        <table className="table table-bordered table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Transaction Date</th>
              <th>Transaction Amount</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="4">No customers found</td>
              </tr>
            ) : (
              customers.map(customer => (
                filteredTransactions
                  .filter(tx => tx.customerId === customer.id)
                  .map((transaction) => (
                    <tr key={transaction.id} onClick={() => handleCustomerClick(customer)}>
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{transaction.date}</td>
                      <td>{transaction.amount}</td>
                    </tr>
                  ))
              ))
            )}
          </tbody>
        </table>
      ) : (
        <div>Loading...</div>
      )}
      {selectedCustomer && isDataLoaded && (
        <TransactionChart 
          selectedCustomer={selectedCustomer} 
          filteredTransactions={filteredTransactions} 
        />
      )}
    </div>
  );
};

export default CustomerTable;