// import axios from 'axios';
// import Papa from 'papaparse';
// import React, { useEffect, useState } from 'react';
// import './Dashboard.css';

// function Dashboard() {
//   const [data, setData] = useState([]);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [actionStatus, setActionStatus] = useState({}); // State to track action status for each row

//   useEffect(() => {
//     console.log('Dashboard page loaded');

//     fetch('/nuqi-inventry-CSV - Sheet1.csv')
//       .then((response) => response.text())
//       .then((text) => {
//         Papa.parse(text, {
//           header: true,
//           complete: (results) => {
//             setData(results.data);
//           },
//         });
//       });
//   }, []);

//   const handleCreditToWallet = async (rowIndex, userID, amountCredited) => {
//     if (!userID) {
//       setMessage('Error: User ID not Found');
//       return;
//     }

//     const amount = parseFloat(amountCredited.replace(/,/g, ''));
//     if (isNaN(amount)) {
//       setMessage('Error: Invalid amount');
//       return;
//     }

//     const config = {
//       method: 'POST',
//       url: `http://150.129.118.10:8080/user/${userID}/transaction/wallet`,
//       headers: {
//         'Content-Type': 'application/json',
//         // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTcyNDE0NzI1NSwiZXhwIjoxNzMxOTIzMjU1fQ.u78RekbUOzwT5iuD72QIzJ-Xk4sf7i3lQxRD8INs7Cs'
//       },
//       data: {
//         amount,
//         type: "add",
//         transaction_type: "wallet",
//         status: "success"
//       }
//     };

//     try {
//       setLoading(true);
//       const response = await axios(config);
//       if (response.status === 200) {
//         setMessage('Credit to Wallet successful');
//         setActionStatus(prev => ({ ...prev, [rowIndex]: 'credited' }));
//       } else {
//         setMessage('Error crediting to wallet');
//       }
//       console.log('Credit successful:', response.data);
//     } catch (error) {
//       setMessage('Error crediting to wallet');
//       console.error('Error crediting to wallet:', error.response ? error.response.data : error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReject = (rowIndex) => {
//     setActionStatus(prev => ({ ...prev, [rowIndex]: 'rejected' }));
//   };

//   return (
//     <div className="dashboard-container overflow-x-auto bg-white text-black">
//       <div className="table-container">
//         {message && <div className={`message-box ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</div>} {/* Display success/error message */}
//         {loading && <div className="loading text-black">Processing...</div>} 
//         <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
//           <thead className="ltr:text-left rtl:text-right">
//             <tr>
//               {data.length > 0 && Object.keys(data[0]).map((key, index) => (
//                 <th key={index} className="whitespace-nowrap px-4 py-2 font-medium text-black">{key}</th>
//               ))}
//               <th className="whitespace-nowrap px-4 py-2 font-medium text-black">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {data.map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {Object.values(row).map((value, colIndex) => (
//                   <td key={colIndex} className="whitespace-nowrap px-4 py-2 text-black">{value}</td>
//                 ))}
//                 <td className="whitespace-nowrap px-4 py-2 text-black">
//                   {actionStatus[rowIndex] === 'credited' ? (
//                     <button
//                       className="accept-button px-4 py-2 bg-green-500 text-white rounded"
//                       disabled
//                     >
//                       ✓ Credited
//                     </button>
//                   ) : (
//                     actionStatus[rowIndex] !== 'rejected' && (
//                       <button
//                         className="accept-button px-4 py-2  ml-16 bg-green-500 text-white rounded disabled:opacity-50"
//                         onClick={() => handleCreditToWallet(rowIndex, row['Description'], row['Amount Credited'])}
//                         disabled={loading || actionStatus[rowIndex] === 'rejected'}
//                       >
//                         Credit to Wallet
//                       </button>
//                     )
//                   )}
//                   {actionStatus[rowIndex] !== 'credited' && (
//                     <button
//                       className="reject-button px-4 py-2  ml-16 bg-red-500 text-white rounded disabled:opacity-50 ml-2"
//                       onClick={() => handleReject(rowIndex)}
//                       disabled={loading || actionStatus[rowIndex] === 'credited'}
//                     >
//                       {actionStatus[rowIndex] === 'rejected' ? '✗' : 'Reject'}
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;





import axios from 'axios';
import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import './Dashboard.css';

// Design Part (Top)
function Dashboard() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionStatus, setActionStatus] = useState({});

  useEffect(() => {
    console.log('Dashboard page loaded');

    fetch('/nuqi-inventry-CSV - Sheet1.csv')
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            setData(results.data);
          },
        });
      });
  }, []);

  return (
    <div className="dashboard-container overflow-x-auto bg-white p-6 text-black">
      <div className="table-container shadow-lg rounded-lg">
        {message && (
          <div
            className={`message-box ${
              message.includes('Error') ? 'text-red-500' : 'text-green-500'
            } p-4 mb-4 rounded`}
          >
            {message}
          </div>
        )}
        {loading && <div className="loading text-black mb-4">Processing...</div>}
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-100">
            <tr>
              {data.length > 0 &&
                Object.keys(data[0]).map((key, index) => (
                  <th key={index} className="whitespace-nowrap px-4 py-2 font-medium text-black">
                    {key}
                  </th>
                ))}
              <th className="whitespace-nowrap px-4 py-2 font-medium text-black">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex} className="whitespace-nowrap px-4 py-2 text-black">
                    {value}
                  </td>
                ))}
                <td className="whitespace-nowrap px-4 py-2 text-black flex items-center gap-2">
                  {actionStatus[rowIndex] === 'credited' ? (
                    <button className="accept-button px-4 py-2 bg-green-500 text-white rounded" disabled>
                      ✓ Credited
                    </button>
                  ) : actionStatus[rowIndex] === 'rejected' || parseFloat(row['Amount Credited'].replace(/,/g, '')) === 0 ? (
                    <button className="reject-button px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50" disabled>
                      ✗ Rejected
                    </button>
                  ) : (
                    <>
                      <button
                        className="accept-button px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
                        onClick={() => handleCreditToWallet(rowIndex, row['Description'], row['Amount Credited'])}
                        disabled={loading || actionStatus[rowIndex] === 'rejected'}
                      >
                        Credit to Wallet
                      </button>
                      <button
                        className="reject-button px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50 ml-2"
                        onClick={() => handleReject(rowIndex)}
                        disabled={loading || actionStatus[rowIndex] === 'credited'}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Functional Part (Bottom)
  async function handleCreditToWallet(rowIndex, userID, amountCredited) {
    const confirmed = window.confirm('Are you sure you want to credit this amount to the wallet?');
    if (!confirmed) return;

    if (!userID) {
      setMessage('Error: User ID not Found');
      return;
    }

    const amount = parseFloat(amountCredited.replace(/,/g, ''));
    if (isNaN(amount) || amount === 0) {
      setMessage('Error: Invalid or Zero amount');
      handleReject(rowIndex);
      return;
    }

    const config = {
      method: 'POST',
      url: `http://150.129.118.10:8080/user/${userID}/transaction/wallet`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        amount,
        type: "add",
        transaction_type: "wallet",
        status: "success"
      }
    };

    try {
      setLoading(true);
      const response = await axios(config);
      if (response.status === 200) {
        setMessage('Credit to Wallet successful');
        setActionStatus(prev => ({ ...prev, [rowIndex]: 'credited' }));
      } else {
        setMessage('Error crediting to wallet');
      }
      console.log('Credit successful:', response.data);
    } catch (error) {
      setMessage('Error crediting to wallet');
      console.error('Error crediting to wallet:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleReject(rowIndex) {
    setActionStatus(prev => ({ ...prev, [rowIndex]: 'rejected' }));
    setMessage('Action rejected');
  }
}

export default Dashboard;
